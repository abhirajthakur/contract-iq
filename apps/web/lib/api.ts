import type { AnalyzeResponse, ContractAnalysis } from "@contract-iq/types";

export async function analyzeContract(file: File): Promise<ContractAnalysis> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  const json: AnalyzeResponse = await res.json();

  if (!res.ok) {
    throw new Error("Server error. Please try again.");
  }

  if (!json.success) {
    throw new Error(json.error);
  }

  return json.data;
}
