"use client";

import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageContext";

export function TopBar() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg-secondary/85 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <div className="leading-tight">
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold tracking-tightish text-text-primary">
                {t.brand.name}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted sm:inline">
                HAAC 2026
              </span>
            </div>
            <div className="hidden text-xs text-text-secondary sm:block">
              {t.brand.tagline}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-accent-good ring-1 ring-inset ring-emerald-100 md:inline-flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-good" />
            Live
          </span>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
