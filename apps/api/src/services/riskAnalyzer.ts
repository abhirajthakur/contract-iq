import ai from "#api/config/gemini.js";
import { getContractPrompt } from "#api/prompts/contractPrompt.js";
import { contractAnalysisSchema } from "#api/schemas/analyzeResponseSchema.js";
import type { ContractAnalysis, RiskClause } from "@contract-iq/types";

export async function analyzeContract(
  pages: string[],
  documentName = "contract.pdf",
): Promise<ContractAnalysis> {
  const allClauses: RiskClause[] = [];
  let overallSummary = "";
  let totalRiskScore = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (!page) continue;

    const prompt = getContractPrompt(page, documentName);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: contractAnalysisSchema.toJSONSchema(),
      },
    });

    if (!response.text)
      throw new Error(`No response from Gemini for page ${i + 1}`);

    const validatedPage = contractAnalysisSchema.parse(
      JSON.parse(response.text),
    );

    allClauses.push(...validatedPage.clauses);
    overallSummary += validatedPage.summary + "\n";
    totalRiskScore += validatedPage.overallRiskScore;
  }

  const aggregated: ContractAnalysis = {
    documentName,
    summary: overallSummary.trim(),
    overallRiskScore: parseFloat((totalRiskScore / pages.length).toFixed(2)),
    totalClauses: allClauses.length,
    highRiskCount: allClauses.filter((c) => c.riskLevel === "High").length,
    clauses: allClauses,
  };

  return contractAnalysisSchema.parse(aggregated);
}
