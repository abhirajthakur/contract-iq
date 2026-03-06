"use client";

import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ClauseList } from "@/components/clause-list";
import { ContractSummary } from "@/components/contract-summary";
import { useAnalysisStore } from "@/store/analysis-store";

export default function AnalysisPage() {
  const analysis = useAnalysisStore((state) => state.analysis);

  if (!analysis) {
    return (
      <div className="p-10 text-center">
        No analysis found. Please upload a contract first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-lg text-foreground">
                ContractIQ
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        <ContractSummary analysis={analysis} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold font-display text-foreground mb-4">
            Clause Analysis
          </h2>
          <ClauseList clauses={analysis.clauses} />
        </motion.div>
      </main>
    </div>
  );
}
