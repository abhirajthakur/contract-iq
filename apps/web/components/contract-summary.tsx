"use client";

import type { ContractAnalysis } from "@contract-iq/types";
import { AlertTriangle, FileText, Shield } from "lucide-react";
import { motion } from "motion/react";

interface ContractSummaryProps {
  analysis: ContractAnalysis;
}

export function ContractSummary({ analysis }: ContractSummaryProps) {
  const riskColor =
    analysis.overallRiskScore >= 7
      ? "text-risk-high"
      : analysis.overallRiskScore >= 4
        ? "text-risk-medium"
        : "text-risk-low";

  const riskBg =
    analysis.overallRiskScore >= 7
      ? "bg-risk-high-bg border-risk-high/20"
      : analysis.overallRiskScore >= 4
        ? "bg-risk-medium-bg border-risk-medium/20"
        : "bg-risk-low-bg border-risk-low/20";

  const stats = [
    {
      icon: Shield,
      label: "Risk Score",
      value: `${analysis.overallRiskScore}/10`,
      colorClass: riskColor,
      bgClass: riskBg,
    },
    {
      icon: FileText,
      label: "Total Clauses",
      value: analysis.totalClauses,
      colorClass: "text-primary",
      bgClass: "bg-secondary border-border",
    },
    {
      icon: AlertTriangle,
      label: "High Risk",
      value: analysis.highRiskCount,
      colorClass: "text-risk-high",
      bgClass: "bg-risk-high-bg border-risk-high/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
          {analysis.documentName}
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
          {analysis.summary}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className={`rounded-xl border p-4 ${stat.bgClass}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 ${stat.colorClass}`} />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <p className={`text-2xl font-bold font-display ${stat.colorClass}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
