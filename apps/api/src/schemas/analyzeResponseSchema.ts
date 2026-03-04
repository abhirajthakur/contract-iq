import { riskLevels } from "@contract-iq/types";
import { z } from "zod";

import type { ContractAnalysis, RiskClause } from "@contract-iq/types";

export const highRiskClauseSchema: z.ZodType<RiskClause> = z.object({
  clauseTitle: z.string(),
  clauseText: z.string(),
  summary: z.string(),
  riskLevel: z.enum(riskLevels),
  riskScore: z.number().min(1).max(10),
  reason: z.string(),
  negotiationTip: z.string(),
  deviationExplanation: z.string().optional(),
});

export const contractAnalysisSchema: z.ZodType<ContractAnalysis> = z.object({
  documentName: z.string(),
  summary: z.string(),
  overallRiskScore: z.number().min(0).max(10),
  totalClauses: z.number().int(),
  highRiskCount: z.number().int(),
  clauses: z.array(highRiskClauseSchema),
  createdAt: z.string(),
});
