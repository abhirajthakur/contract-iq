"use client";

import type { RiskClause } from "@contract-iq/types";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type RiskFilter, useSearchFilter } from "@/hooks/useSearchFilter";
import { cn } from "@/lib/utils";
import { ClauseCard } from "./clause-card";

interface ClauseListProps {
  clauses: RiskClause[];
}

const filterOptions: { label: string; value: RiskFilter }[] = [
  { label: "All", value: "All" },
  { label: "🔴 High", value: "High" },
  { label: "🟠 Medium", value: "Medium" },
  { label: "🟢 Low", value: "Low" },
];

export function ClauseList({ clauses }: ClauseListProps) {
  const { filtered, searchTerm, setSearchTerm, riskFilter, setRiskFilter } =
    useSearchFilter(clauses);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clauses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border bg-card p-1">
          <Filter className="h-4 w-4 text-muted-foreground ml-2 mr-1" />
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRiskFilter(opt.value)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                riskFilter === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {clauses.length} clauses
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-display text-lg">No clauses found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          filtered.map((clause, i) => (
            <ClauseCard
              key={clause.clauseTitle + i.toString()}
              clause={clause}
              searchTerm={searchTerm}
              index={i}
            />
          ))
        )}
      </div>
    </div>
  );
}
