"use client";

import { cva } from "class-variance-authority";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const riskBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-display tracking-wide uppercase",
  {
    variants: {
      level: {
        High: "bg-risk-high-bg text-risk-high border border-risk-high/20",
        Medium:
          "bg-risk-medium-bg text-risk-medium border border-risk-medium/20",
        Low: "bg-risk-low-bg text-risk-low border border-risk-low/20",
      },
    },
    defaultVariants: {
      level: "Low",
    },
  },
);

interface RiskBadgeProps {
  level: "High" | "Medium" | "Low";
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  // Map level to color
  const color =
    level === "High"
      ? "text-risk-high"
      : level === "Medium"
        ? "text-risk-medium"
        : "text-risk-low";

  return (
    <span className={cn(riskBadgeVariants({ level }), className)}>
      <Circle className={`h-2 w-2 ${color} shrink-0`} />
      {level}
    </span>
  );
}
