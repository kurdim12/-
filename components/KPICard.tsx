"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string;
  hint?: string;
  trend?: { value: string; positive?: boolean };
  icon?: ReactNode;
  accent?: "default" | "alert" | "warning" | "good";
}

const ACCENT = {
  default: {
    iconBg: "bg-sky-50 text-accent-primary",
    bar: "bg-accent-primary",
  },
  alert: {
    iconBg: "bg-red-50 text-accent-alert",
    bar: "bg-accent-alert",
  },
  warning: {
    iconBg: "bg-amber-50 text-accent-warning",
    bar: "bg-accent-warning",
  },
  good: {
    iconBg: "bg-emerald-50 text-accent-good",
    bar: "bg-accent-good",
  },
} as const;

export function KPICard({
  label,
  value,
  hint,
  trend,
  icon,
  accent = "default",
}: KPICardProps) {
  const a = ACCENT[accent];
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-bg-secondary p-5 transition hover:border-text-muted/40">
      <div className={cn("absolute inset-y-0 start-0 w-[3px]", a.bar)} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">
            {label}
          </div>
          <div className="mt-2 tabular text-3xl font-semibold tracking-tightish text-text-primary">
            {value}
          </div>
          {(hint || trend) && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              {trend && (
                <span
                  className={cn(
                    "tabular inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                    trend.positive
                      ? "bg-emerald-50 text-accent-good"
                      : "bg-red-50 text-accent-alert"
                  )}
                >
                  {trend.value}
                </span>
              )}
              {hint && <span className="text-text-muted">{hint}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "shrink-0 rounded-lg p-2",
              a.iconBg
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
