"use client";

import type { RiskClause } from "@contract-iq/types";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RiskBadge } from "./risk-badge";

interface ClauseCardProps {
  clause: RiskClause;
  searchTerm: string;
  index: number;
}

function highlightText(text: string, term: string) {
  if (!term.trim()) return text;

  const regex = new RegExp(
    `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  let charIndex = 0;

  return parts.map((part) => {
    const isMatch = regex.test(part);
    const key = `${part}-${charIndex}`;
    charIndex += part.length;

    return isMatch ? (
      <mark
        key={key}
        className="bg-risk-medium/30 text-foreground rounded px-0.5"
      >
        {part}
      </mark>
    ) : (
      part
    );
  });
}

export function ClauseCard({ clause, searchTerm, index }: ClauseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(clause.clauseText);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group rounded-xl border bg-card shadow-card hover:shadow-elevated transition-shadow duration-300"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <RiskBadge level={clause.riskLevel} />
            <span className="text-xs text-muted-foreground font-mono">
              Score: {clause.riskScore}/10
            </span>
          </div>
          <h3 className="font-semibold font-display text-foreground truncate">
            {highlightText(clause.clauseTitle, searchTerm)}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {highlightText(clause.summary, searchTerm)}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-4 md:px-5 pb-4 md:pb-5 space-y-4 border-t pt-4"
          >
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Clause Text
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed bg-surface-sunken rounded-lg p-3">
                {highlightText(clause.clauseText, searchTerm)}
              </p>

              <AnimatePresence>
                {showToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 right-0 bg-foreground text-background text-xs px-2 py-1 rounded shadow-md"
                  >
                    {copied ? "Copied!" : "Failed to copy"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-risk-high">
                  Risk Reason
                </span>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  {clause.reason}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-risk-low">
                  Negotiation Tip
                </span>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  {clause.negotiationTip}
                </p>
              </div>
            </div>

            {clause.deviationExplanation && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-risk-medium">
                  Deviation
                </span>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  {clause.deviationExplanation}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
