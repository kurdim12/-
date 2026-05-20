"use client";

interface LegendItem {
  color: string;
  label: string;
}

export function Legend({
  title,
  items,
}: {
  title: string;
  items: LegendItem[];
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-secondary p-4">
      {title && (
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          {title}
        </div>
      )}
      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-2.5 text-xs text-text-secondary"
          >
            <span
              className="inline-block h-3 w-5 rounded-[3px] ring-1 ring-inset ring-black/5"
              style={{ backgroundColor: it.color }}
              aria-hidden
            />
            <span className="font-medium text-text-primary">{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
