"use client";

import { Info } from "lucide-react";
import { useState } from "react";

export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Info"
        className="inline-flex items-center justify-center rounded-full text-text-muted transition hover:text-accent-primary"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span className="absolute bottom-full start-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-md border border-border bg-bg-secondary px-3 py-2 text-xs leading-relaxed text-text-secondary shadow-sm">
          {text}
        </span>
      )}
    </span>
  );
}
