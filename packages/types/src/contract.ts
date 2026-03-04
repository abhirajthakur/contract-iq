export const riskLevels = ["Low", "Medium", "High"] as const;
export type RiskLevel = (typeof riskLevels)[number];

export type RiskClause = {
  clauseTitle: string;
  clauseText: string;
  summary: string;
  riskLevel: RiskLevel;
  riskScore: number; // 1–10
  reason: string;
  negotiationTip: string;
  deviationExplanation?: string;
};

export type ContractAnalysis = {
  documentName: string;
  summary: string;
  overallRiskScore: number;
  totalClauses: number;
  highRiskCount: number;
  clauses: RiskClause[];
};
