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
    <div className="rounded-md border border-border bg-bg-secondary px-3 py-2.5">
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
        {title}
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2 text-xs text-text-secondary">
            <span
              className="inline-block h-3 w-4 rounded-sm"
              style={{ backgroundColor: it.color }}
              aria-hidden
            />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
