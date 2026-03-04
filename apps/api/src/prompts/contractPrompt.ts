export function getContractPrompt(chunkText: string, documentName: string) {
  return `
Analyze the following contract chunk. Return valid JSON exactly following this structure:

{
  "documentName": "${documentName}",
  "summary": string,
  "overallRiskScore": number,
  "totalClauses": number,
  "highRiskCount": number,
  "clauses": [
    {
      "clauseTitle": string,
      "clauseText": string,
      "summary": string,
      "riskLevel": "Low|Medium|High",
      "riskScore": number,
      "reason": string,
      "negotiationTip": string,
      "deviationExplanation": string (optional)
    }
  ]
}

Contract chunk:
${chunkText}
`;
}
