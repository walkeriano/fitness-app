import test from "node:test";
import assert from "node:assert/strict";
import { isAllowedPdfUrl, proxyNutritionPdf } from "../src/services/nutrition/pdfProxy.js";

const bucket = "test.firebasestorage.app";
const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/plans%2Fdiet.pdf?alt=media&token=test`;
const request = (value = url) => new Request("http://localhost/api/nutrition-pdf", {
  method: "POST", body: JSON.stringify({ url: value }),
});

test("limits download URLs to the configured bucket", () => {
  assert.equal(isAllowedPdfUrl(url, bucket), true);
  for (const invalid of [
    "http://127.0.0.1/private", url.replace(bucket,"other-bucket"),
    url.replace("https:","http:"), url.replace("googleapis.com", "googleapis.com.evil.test"),
    url.replace("alt=media", "alt=json"), url.replace("https://", "https://user:password@"),
  ]) assert.equal(isAllowedPdfUrl(invalid,bucket),false);
});

test("returns PDF bytes without sharing cached user documents", async () => {
  const bytes = new TextEncoder().encode("%PDF-1.4\nfixture");
  const result = await proxyNutritionPdf(request(), { bucket, fetchPdf: async (target, options) => {
    assert.equal(target, url);
    assert.equal(options.redirect, "error");
    assert.equal(options.cache, "no-store");
    return new Response(bytes);
  }});
  assert.equal(result.status,200);
  assert.equal(result.headers.get("content-type"),"application/pdf");
  assert.equal(result.headers.get("cache-control"),"private, no-store");
  assert.deepEqual(new Uint8Array(await result.arrayBuffer()),bytes);
});

test("rejects another bucket before making a request", async () => {
  const result = await proxyNutritionPdf(request(url.replace(bucket,"other")), {
    bucket, fetchPdf: () => assert.fail("Must not fetch"),
  });
  assert.equal(result.status,400);
});

test("handles expired files and non-PDF responses", async () => {
  const missing = await proxyNutritionPdf(request(), {bucket,fetchPdf: async () => new Response("missing",{status:404})});
  assert.equal(missing.status,502);
  const html = await proxyNutritionPdf(request(), {bucket,fetchPdf: async () => new Response("<html>error</html>")});
  assert.equal(html.status,422);
});

test("enforces size limits even without content-length", async () => {
  const result = await proxyNutritionPdf(request(), {bucket,fetchPdf: async () => new Response(new Uint8Array(10*1024*1024+1))});
  assert.equal(result.status,413);
});

test("aborts slow downloads", async () => {
  const result = await proxyNutritionPdf(request(), {bucket,timeoutMs:5,fetchPdf: (_, {signal}) => new Promise((resolve,reject) => {
    signal.addEventListener("abort", () => reject(new Error("aborted")), {once:true});
  })});
  assert.equal(result.status,504);
});
