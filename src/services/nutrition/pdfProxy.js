const MAX_PDF_BYTES = 10 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 20_000;

function failure(message, status) {
  return Response.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

// Only Firebase download URLs in this application's bucket are accepted.
export function isAllowedPdfUrl(value, bucket) {
  if (typeof value !== "string" || !bucket) return false;
  try {
    const url = new URL(value);
    const match = url.pathname.match(/^\/v0\/b\/([^/]+)\/o\/(.+)$/);
    return url.protocol === "https:"
      && url.hostname === "firebasestorage.googleapis.com"
      && !url.port && !url.username && !url.password
      && Boolean(match)
      && decodeURIComponent(match[1]) === bucket
      && url.searchParams.get("alt") === "media";
  } catch {
    return false;
  }
}

export async function proxyNutritionPdf(request, {
  bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  fetchPdf = fetch,
  timeoutMs = DOWNLOAD_TIMEOUT_MS,
} = {}) {
  let body;
  try {
    body = await request.json();
  } catch {
    return failure("La solicitud del PDF no es válida.", 400);
  }
  if (!isAllowedPdfUrl(body?.url, bucket)) {
    return failure("El archivo debe pertenecer al Storage de esta aplicación.", 400);
  }

  const controller = new AbortController();
  const abort = () => controller.abort();
  request.signal.addEventListener("abort", abort, { once: true });
  if (request.signal.aborted) controller.abort();
  const timeout = setTimeout(abort, timeoutMs);
  let reader;
  try {
    const response = await fetchPdf(body.url, {
      signal: controller.signal,
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok || !response.body) {
      await response.body?.cancel();
      return failure("No se pudo descargar el plan de alimentación.", 502);
    }
    if (Number(response.headers.get("content-length")) > MAX_PDF_BYTES) {
      await response.body.cancel();
      return failure("El PDF supera el límite de 10 MB.", 413);
    }

    reader = response.body.getReader();
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_PDF_BYTES) {
        await reader.cancel();
        return failure("El PDF supera el límite de 10 MB.", 413);
      }
      chunks.push(value);
    }
    const data = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      data.set(chunk, offset);
      offset += chunk.byteLength;
    }
    if (!new TextDecoder().decode(data.subarray(0, 1024)).includes("%PDF-")) {
      return failure("El archivo recibido no es un PDF.", 422);
    }
    return new Response(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(size),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return failure(
      controller.signal.aborted
        ? "Se agotó el tiempo de descarga del plan. Inténtalo nuevamente."
        : "No se pudo descargar el plan de alimentación.",
      controller.signal.aborted ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
    request.signal.removeEventListener("abort", abort);
    reader?.releaseLock();
  }
}
