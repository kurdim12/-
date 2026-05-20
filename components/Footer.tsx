"use client";

import { useLanguage } from "./LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-bg-secondary px-4 py-4 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
        <span>{t.footer.built}</span>
        <span>{t.footer.submission}</span>
        <span>{t.footer.author}</span>
      </div>
    </footer>
  );
}
