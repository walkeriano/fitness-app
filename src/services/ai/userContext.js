const PHYSICAL_GOALS = {
  definicion: "definición",
  definición: "definición",

  masaMuscular: "masa muscular",
  "masa muscular": "masa muscular",

  recomposicionCorporal: "recomposición corporal",

  "recomposicion corporal": "recomposición corporal",

  "recomposición corporal": "recomposición corporal",
};

function normalizeName(value) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value
    .trim()
    .slice(0, 60)
    .replace(/[^\p{L}\p{M}\s'-]/gu, "");

  return normalized || null;
}

function normalizeInteger(value) {
  const number = Number.parseInt(value, 10);

  return Number.isInteger(number) && number > 0 ? number : null;
}

function normalizeNumber(value) {
  const number = Number.parseFloat(value);

  return Number.isFinite(number) && number > 0 ? number : null;
}

function normalizePhysicalGoal(value) {
  if (typeof value !== "string") {
    return null;
  }

  return PHYSICAL_GOALS[value.trim()] || null;
}

export function normalizeUserContext(profile, calculatedData = profile) {
  if (!profile || typeof profile !== "object") {
    return null;
  }

  return {
    name: normalizeName(profile.name),
    edad: normalizeInteger(profile.edad),
    comidasXdia: normalizeInteger(profile.comidasXdia),
    peso: normalizeNumber(profile.peso),
    objetivoFisico: normalizePhysicalGoal(profile.objetivoFisico),

    tdee: normalizeNumber(calculatedData.tdee),
    proteinas: normalizeNumber(calculatedData.proteinas),
    grasas: normalizeNumber(calculatedData.grasas),
    carbohidratos: normalizeNumber(calculatedData.carbohidratos),

    proteinasCalorias: normalizeNumber(calculatedData.proteinasCalorias),
    grasasCalorias: normalizeNumber(calculatedData.grasasCalorias),
    carbohidratosCalorias: normalizeNumber(
      calculatedData.carbohidratosCalorias,
    ),
  };
}

export function getMissingUserContextFields(userContext) {
  const requiredFields = [
    "name",
    "edad",
    "comidasXdia",
    "peso",
    "objetivoFisico",
    "tdee",
    "proteinas",
    "grasas",
    "carbohidratos",
    "proteinasCalorias",
    "grasasCalorias",
    "carbohidratosCalorias",
  ];

  if (!userContext) {
    return requiredFields;
  }

  return requiredFields.filter((field) => {
    const value = userContext[field];

    return value === null || value === undefined || value === "";
  });
}
