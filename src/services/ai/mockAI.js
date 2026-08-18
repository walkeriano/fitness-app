const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function askMockAI(message) {
  await delay(1000);

  const question = message.toLowerCase();

  if (question.includes("cena")) {
    return {
      answer: `
🍽️ Cena Fitness

200 g pollo

180 g arroz

Ensalada

620 kcal
`,
      imageQuery: "healthy chicken rice dinner",
    };
  }

  if (question.includes("desayuno")) {
    return {
      answer: `
🥣 Desayuno

Avena

Yogur

Plátano

520 kcal
`,
      imageQuery: "healthy oatmeal yogurt banana",
    };
  }

  if (question.includes("proteína")) {
    return {
      answer: `
💪 Para aumentar tu proteína puedes consumir:

• Pollo

• Pavo

• Atún

• Claras de huevo
`,
      imageQuery: "healthy high protein foods",
    };
  }

  return {
    answer: `
Soy tu asistente nutricional.

Puedo ayudarte con:

🥗 Recetas

🍽️ Comidas

🥩 Proteínas

🍌 Snacks

🥑 Alimentación saludable
`,
    imageQuery: "healthy colorful nutritious food",
  };
}
