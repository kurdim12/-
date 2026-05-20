"use client";

import { type ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-bg-secondary">
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 py-6 md:px-6">
        <div className="min-w-0">
          {eyebrow && (
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-primary">
              {eyebrow}
            </div>
          )}
          <h1 className="text-[22px] font-semibold tracking-tightish text-text-primary md:text-[26px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
