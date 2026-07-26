const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function askMockAI(message) {

    await delay(1000);

    const question = message.toLowerCase();

    if(question.includes("cena")){

        return `
🍽️ Cena Fitness

200 g pollo

180 g arroz

Ensalada

620 kcal
`;
    }

    if(question.includes("desayuno")){

        return `
🥣 Desayuno

Avena

Yogur

Plátano

520 kcal
`;
    }

    if(question.includes("proteína")){

        return `
💪 Para aumentar tu proteína puedes consumir:

• Pollo

• Pavo

• Atún

• Claras de huevo
`;
    }

    return `
Soy tu asistente nutricional.

Puedo ayudarte con:

🥗 Recetas

🍽️ Comidas

🥩 Proteínas

🍌 Snacks

🥑 Alimentación saludable
`;
}