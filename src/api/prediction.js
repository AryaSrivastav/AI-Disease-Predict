import { diseases } from "../data/diseases";

export const predictDisease = async (input) => {
  const inputSymptoms = input.symptoms || [];

  if (!diseases || diseases.length === 0) {
    throw new Error("Disease data not loaded");
  }

  let bestMatch = null;
  let maxScore = 0;

  diseases.forEach((disease) => {
    let score = disease.symptoms.filter((s) =>
      inputSymptoms
        .map((i) => i.toLowerCase())
        .includes(s.toLowerCase())
    ).length;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = disease;
    }
  });

  return {
    disease: bestMatch?.name || "Unknown",
    category: bestMatch?.category || "General",
    confidence: maxScore / 3,
    risk: maxScore > 2 ? "High" : maxScore > 1 ? "Medium" : "Low",
  };
};