const FALLBACK_IMAGE = {
  url: "/images/food.png",
  alt: "Alimentación saludable",
  photographer: null,
  photographerUrl: null,
  sourceUrl: null,
  isFallback: true,
};

export async function searchRecipeImage(query) {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey || !query) {
    return FALLBACK_IMAGE;
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: "1",
      orientation: "landscape",
      locale: "en-US",
    });

    const response = await fetch(
      `https://api.pexels.com/v1/search?${params}`,
      {
        headers: {
          Authorization: apiKey,
        },
        next: {
          revalidate: 86400,
        },
      },
    );

    if (!response.ok) {
      return FALLBACK_IMAGE;
    }

    const data = await response.json();
    const photo = data.photos?.[0];
    const imageUrl = photo?.src?.large || photo?.src?.medium;

    if (!photo || !imageUrl) {
      return FALLBACK_IMAGE;
    }

    return {
      url: imageUrl,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      sourceUrl: photo.url,
      isFallback: false,
    };
  } catch (error) {
    console.error("Error buscando imagen en Pexels:", error);
    return FALLBACK_IMAGE;
  }
}
