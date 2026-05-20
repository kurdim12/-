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
  dot?: boolean;
  className?: string;
}

const TONE: Record<IndicatorTone, { pill: string; dot: string }> = {
  alert:   { pill: "bg-red-50 text-accent-alert ring-1 ring-inset ring-red-100",         dot: "bg-accent-alert" },
  warning: { pill: "bg-amber-50 text-accent-warning ring-1 ring-inset ring-amber-100",  dot: "bg-accent-warning" },
  good:    { pill: "bg-emerald-50 text-accent-good ring-1 ring-inset ring-emerald-100", dot: "bg-accent-good" },
  neutral: { pill: "bg-bg-tertiary text-text-secondary ring-1 ring-inset ring-border",  dot: "bg-text-muted" },
  info:    { pill: "bg-sky-50 text-accent-primary ring-1 ring-inset ring-sky-100",      dot: "bg-accent-primary" },
};

export function IndicatorBadge({
  label,
  tone = "neutral",
  dot = true,
  className,
}: IndicatorBadgeProps) {
  const t = TONE[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        t.pill,
        className
      )}
    >
      {dot && (
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", t.dot)} />
      )}
      {label}
    </span>
  );
}
