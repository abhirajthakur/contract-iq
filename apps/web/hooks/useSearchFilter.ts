import type { RiskClause } from "@contract-iq/types";
import { useMemo, useState } from "react";

export type RiskFilter = "All" | "High" | "Medium" | "Low";

export function useSearchFilter(clauses: RiskClause[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("All");

  const filtered = useMemo(() => {
    let result = clauses;

    if (riskFilter !== "All") {
      result = result.filter((c) => c.riskLevel === riskFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.clauseTitle.toLowerCase().includes(term) ||
          c.clauseText.toLowerCase().includes(term) ||
          c.summary.toLowerCase().includes(term),
      );
    }

    return result;
  }, [clauses, searchTerm, riskFilter]);

  return { filtered, searchTerm, setSearchTerm, riskFilter, setRiskFilter };
}
