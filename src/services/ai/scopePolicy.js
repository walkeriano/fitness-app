const NUTRITION_PATTERNS = [
  /\baliment/,
  /\bnutri/,
  /\bcomida/,
  /\bcomer\b/,
  /\bdesayun/,
  /\balmuerz/,
  /\bcen(a|ar)\b/,
  /\bmeriend/,
  /\bsnack/,
  /\breceta/,
  /\bcocina/,
  /\bplato/,
  /\bmenu\b/,
  /\bmenus\b/,
  /\bingrediente/,
  /\bproteina/,
  /\bcarbohidrato/,
  /\bgrasa/,
  /\bfibra/,
  /\bcaloria/,
  /\bmacronutriente/,
  /\bmicronutriente/,
  /\bvitamina/,
  /\bmineral/,
  /\bhidrat/,
  /\bagua\b/,
  /\bfruta/,
  /\bverdura/,
  /\bvegetal/,
  /\bcarne/,
  /\bpescado/,
  /\bpollo/,
  /\bhuevo/,
  /\bleche/,
  /\byogur/,
  /\bavena/,
  /\barroz/,
  /\bpasta/,
  /\blegumbre/,
  /\blenteja/,
  /\bgarbanzo/,
  /\bpostre/,
  /\bazucar/,
  /\bgluten/,
  /\blactosa/,
  /\bdieta/,
  /\bporcion/,
  /\bracion/,
  /\bkilocaloria/,
  /\bkcal\b/,
  /\bmasa muscular/,
  /\bdefinicion/,
  /\brecomposicion corporal/,
  /\bsubir de peso/,
  /\bbajar de peso/,
  /\bperder peso/,
  /\bganar peso/,
];

const CLEARLY_OUT_OF_SCOPE_PATTERNS = [
  /\bprogram/,
  /\bcodigo\b/,
  /\bjavascript\b/,
  /\bpython\b/,
  /\breact\b/,
  /\bnext\.?js\b/,
  /\bpolitic/,
  /\belecciones?\b/,
  /\bpresidente\b/,
  /\bcriptomoneda/,
  /\bbitcoin\b/,
  /\binversion/,
  /\bbolsa de valores\b/,
  /\bfinanzas?\b/,
  /\bviaj/,
  /\bhotel/,
  /\bvuelo/,
  /\bpelicula/,
  /\bserie\b/,
  /\bvideojuego/,
  /\bfutbol\b/,
  /\btraduc/,
  /\bcontrato/,
  /\bdemanda legal\b/,
  /\bprograma de entrenamiento\b/,
  /\brutina de ejercicios?\b/,
];

const FOLLOW_UP_PATTERNS = [
  /^(y|o)\b/,
  /\botra opcion\b/,
  /\botro ejemplo\b/,
  /\bpuedes cambiar/,
  /\bpuedes adaptar/,
  /\by si\b/,
  /\bque cantidad\b/,
  /\bcuanto deberia\b/,
  /\bsin eso\b/,
  /\bcon eso\b/,
  /\bmejor asi\b/,
  /\bno me gusta\b/,
  /\bprefiero\b/,
];

const GREETING_PATTERN =
  /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|ey)[.!¡¿?\s]*$/;

const THANKS_PATTERN =
  /^(gracias|muchas gracias|perfecto|genial|entendido|excelente)[.!¡¿?\s]*$/;

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function hasPreviousNutritionContext(messages) {
  return messages
    .slice(0, -1)
    .some((message) =>
      matchesAny(normalizeText(message.content), NUTRITION_PATTERNS),
    );
}

export function evaluateChatScope(messages, userName) {
  const lastMessage = messages.at(-1);
  const text = normalizeText(lastMessage?.content || "");
  const name = userName || "Hola";

  if (GREETING_PATTERN.test(text)) {
    return {
      allowAI: false,
      localAnswer: `${name}, estoy listo para ayudarte con recetas, organización de comidas y nutrición personalizada. ¿Qué te gustaría preparar o consultar?`,
      imageQuery: "healthy colorful nutritious food",
    };
  }

  if (THANKS_PATTERN.test(text)) {
    return {
      allowAI: false,
      localAnswer: `De nada, ${name}. Cuando quieras, podemos continuar organizando tu alimentación.`,
      imageQuery: "healthy meal preparation",
    };
  }

  const isNutritionRelated = matchesAny(text, NUTRITION_PATTERNS);

  const isClearlyOutOfScope = matchesAny(text, CLEARLY_OUT_OF_SCOPE_PATTERNS);

  if (isClearlyOutOfScope && !isNutritionRelated) {
    return {
      allowAI: false,
      localAnswer: `${name}, puedo ayudarte exclusivamente con alimentación, recetas, organización de comidas y nutrición personalizada según tu perfil.`,
      imageQuery: "healthy nutrition ingredients",
    };
  }

  if (isNutritionRelated) {
    return {
      allowAI: true,
      localAnswer: null,
      imageQuery: null,
    };
  }

  const isNutritionFollowUp =
    matchesAny(text, FOLLOW_UP_PATTERNS) &&
    hasPreviousNutritionContext(messages);

  if (isNutritionFollowUp) {
    return {
      allowAI: true,
      localAnswer: null,
      imageQuery: null,
    };
  }

  return {
    allowAI: false,
    localAnswer: `${name}, esta consulta está fuera de mi función como Chef Nutricionista IA. Puedo ayudarte con recetas, alimentos, distribución de comidas y recomendaciones nutricionales personalizadas.`,
    imageQuery: "healthy food nutrition",
  };
}
