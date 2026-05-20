"use client";

import { cn } from "@/lib/utils";

export type IndicatorTone =
  | "alert"
  | "warning"
  | "good"
  | "neutral"
  | "info";

interface IndicatorBadgeProps {
  label: string;
  tone?: IndicatorTone;
  className?: string;
}

const TONE: Record<IndicatorTone, string> = {
  alert:   "bg-red-50 text-accent-alert ring-1 ring-inset ring-red-100",
  warning: "bg-amber-50 text-accent-warning ring-1 ring-inset ring-amber-100",
  good:    "bg-emerald-50 text-accent-good ring-1 ring-inset ring-emerald-100",
  neutral: "bg-bg-tertiary text-text-secondary ring-1 ring-inset ring-border",
  info:    "bg-sky-50 text-accent-primary ring-1 ring-inset ring-sky-100",
};

export function IndicatorBadge({
  label,
  tone = "neutral",
  className,
}: IndicatorBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        TONE[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
