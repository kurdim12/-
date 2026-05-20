"use client";

import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageContext";

export function TopBar() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg-secondary/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-primary text-white">
            <span className="text-xs font-bold">+</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-text-primary">
              {t.brand.name}
            </div>
            <div className="hidden text-xs text-text-muted sm:block">
              {t.brand.tagline}
            </div>
          </div>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}
