import type { ContractAnalysis } from "./contract.js";

export type AnalyzeSuccessResponse = {
  success: true;
  data: ContractAnalysis;
};

export type AnalyzeErrorResponse = {
  success: false;
  error: string;
};

export type AnalyzeResponse = AnalyzeSuccessResponse | AnalyzeErrorResponse;
