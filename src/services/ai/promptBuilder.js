export function buildPrompt(userData, question) {
    return `
        Usuario:

        ${JSON.stringify(userData)}

        Pregunta:

        ${question}
    `;
}