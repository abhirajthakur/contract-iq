import type { ContractAnalysis } from "@contract-iq/types";
import { create } from "zustand";

type AnalysisState = {
  analysis: ContractAnalysis | null;
  setAnalysis: (analysis: ContractAnalysis) => void;
  clearAnalysis: () => void;
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
  clearAnalysis: () => set({ analysis: null }),
}));
