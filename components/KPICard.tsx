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

export function KPICard({
  label,
  value,
  hint,
  trend,
  icon,
  accent = "default",
}: KPICardProps) {
  const accentBar = {
    default: "bg-accent-primary",
    alert:   "bg-accent-alert",
    warning: "bg-accent-warning",
    good:    "bg-accent-good",
  }[accent];

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-bg-secondary p-4">
      <div className={cn("absolute inset-y-0 start-0 w-1", accentBar)} />
      <div className="flex items-start justify-between gap-3 ps-2">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {label}
          </div>
          <div className="mt-1 tabular text-2xl font-semibold tracking-tightish text-text-primary">
            {value}
          </div>
          {(hint || trend) && (
            <div className="mt-1 flex items-center gap-2 text-xs">
              {trend && (
                <span
                  className={cn(
                    "tabular font-medium",
                    trend.positive ? "text-accent-good" : "text-accent-alert"
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
          <div className="shrink-0 text-text-muted">{icon}</div>
        )}
      </div>
    </div>
  );
}
