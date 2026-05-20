"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "./LanguageContext";
import type { JordanMapInnerProps } from "./JordanMapInner";

const JordanMapInner = dynamic(() => import("./JordanMapInner"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-tertiary text-sm text-text-muted">
      <span>…</span>
    </div>
  );
}

export function JordanMap(props: JordanMapInnerProps) {
  const { t } = useLanguage();
  return (
    <div className="h-full w-full" aria-label={t.common.loading}>
      <JordanMapInner {...props} />
    </div>
  );
}
