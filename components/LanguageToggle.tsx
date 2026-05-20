"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary transition hover:bg-bg-tertiary"
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span className={lang === "ar" ? "font-sans" : "font-arabic"}>
        {t.common.language}
      </span>
    </button>
  );
}
