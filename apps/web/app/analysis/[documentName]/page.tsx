"use client";

import type { ContractAnalysis } from "@contract-iq/types";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import { ClauseList } from "@/components/clause-list";
import { ContractSummary } from "@/components/contract-summary";

// Demo data for when no API is connected
const DEMO_DATA: ContractAnalysis = {
  documentName: "Service Agreement 2024",
  summary:
    "This is a standard service agreement with several notable risk areas including broad indemnification clauses, limited liability caps, and auto-renewal terms that may not align with industry standards.",
  overallRiskScore: 6.5,
  totalClauses: 8,
  highRiskCount: 3,
  clauses: [
    {
      clauseTitle: "Indemnification",
      clauseText:
        "The Client shall indemnify and hold harmless the Provider from any and all claims, damages, losses, costs, and expenses arising from the Client's use of the services.",
      summary:
        "Broad indemnification obligation placed entirely on the client.",
      riskLevel: "High",
      riskScore: 9,
      reason:
        "One-sided indemnification without mutual obligations or reasonable caps creates significant financial exposure.",
      negotiationTip:
        "Request mutual indemnification and add carve-outs for gross negligence or willful misconduct by the Provider.",
      deviationExplanation:
        "Standard agreements typically include mutual indemnification provisions.",
    },
    {
      clauseTitle: "Limitation of Liability",
      clauseText:
        "Provider's total liability shall not exceed the fees paid in the 3 months preceding the claim.",
      summary: "Very low liability cap favoring the provider.",
      riskLevel: "High",
      riskScore: 8,
      reason:
        "A 3-month cap is unusually low. Industry standard is typically 12 months of fees paid.",
      negotiationTip:
        "Negotiate for a 12-month fee cap and exclude certain damages categories from the cap.",
    },
    {
      clauseTitle: "Auto-Renewal",
      clauseText:
        "This agreement shall automatically renew for successive 1-year terms unless either party provides 90 days written notice.",
      summary: "Long auto-renewal with extended notice period.",
      riskLevel: "Medium",
      riskScore: 6,
      reason:
        "90-day notice period is longer than typical 30-day requirements, creating lock-in risk.",
      negotiationTip:
        "Reduce notice period to 30 days and add a right to terminate for convenience.",
    },
    {
      clauseTitle: "Intellectual Property",
      clauseText:
        "All work product created during the engagement shall be the sole property of the Provider.",
      summary: "Provider retains all IP created during engagement.",
      riskLevel: "High",
      riskScore: 8,
      reason:
        "Client pays for services but retains no rights to the deliverables.",
      negotiationTip:
        "Negotiate for full IP assignment or at minimum a perpetual, irrevocable license.",
    },
    {
      clauseTitle: "Confidentiality",
      clauseText:
        "Both parties agree to maintain the confidentiality of proprietary information for a period of 3 years following termination.",
      summary: "Mutual confidentiality with reasonable duration.",
      riskLevel: "Low",
      riskScore: 2,
      reason: "Standard mutual NDA with acceptable time frame.",
      negotiationTip: "Consider extending to 5 years for trade secrets.",
    },
    {
      clauseTitle: "Payment Terms",
      clauseText:
        "Client shall pay all invoices within 15 days of receipt. Late payments incur 2% monthly interest.",
      summary: "Short payment window with high interest penalty.",
      riskLevel: "Medium",
      riskScore: 5,
      reason:
        "15-day payment terms are aggressive; 2% monthly interest exceeds many jurisdictions' limits.",
      negotiationTip:
        "Negotiate for Net 30 terms and cap interest at 1% or the legal maximum.",
    },
    {
      clauseTitle: "Termination for Convenience",
      clauseText:
        "Either party may terminate this agreement with 60 days written notice without cause.",
      summary: "Mutual termination right with reasonable notice.",
      riskLevel: "Low",
      riskScore: 2,
      reason: "Fair termination provisions for both parties.",
      negotiationTip:
        "Ensure termination triggers don't accelerate unpaid fees beyond work completed.",
    },
    {
      clauseTitle: "Governing Law",
      clauseText:
        "This agreement shall be governed by the laws of the State of Delaware, USA.",
      summary: "Delaware law governs the agreement.",
      riskLevel: "Low",
      riskScore: 1,
      reason: "Delaware is a standard and business-friendly jurisdiction.",
      negotiationTip:
        "Acceptable as-is; consider adding arbitration clause for dispute resolution.",
    },
  ],
};

type Params = Promise<{ documentName: string }>;

export default function AnalysisPage(props: { params: Params }) {
  const params = use(props.params);

  const documentNameParam = params.documentName;

  // Use demo data for now, override documentName if present
  const analysis: ContractAnalysis = {
    ...DEMO_DATA,
    documentName: documentNameParam
      ? decodeURIComponent(documentNameParam)
      : DEMO_DATA.documentName,
  };

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
