"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RankingColumn<T> {
  key: string;
  header: string;
  align?: "start" | "end" | "center";
  width?: string;
  render: (row: T, idx: number) => ReactNode;
}

interface RankingTableProps<T> {
  title?: string;
  rows: T[];
  columns: RankingColumn<T>[];
  caption?: string;
  rankColumnHeader?: string;
  highlightTop?: number;
}

export function RankingTable<T>({
  title,
  rows,
  columns,
  caption,
  rankColumnHeader,
  highlightTop = 3,
}: RankingTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
      {title && (
        <div className="flex items-baseline justify-between border-b border-border px-5 py-3.5">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
            {caption && (
              <p className="mt-0.5 text-xs text-text-muted">{caption}</p>
            )}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            {rows.length} · {rankColumnHeader || ""}
          </span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-bg-tertiary">
            <tr>
              {rankColumnHeader !== undefined && (
                <th
                  className="px-5 py-2.5 text-start text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted"
                  style={{ width: 56 }}
                >
                  #
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted",
                    c.align === "end"
                      ? "text-end"
                      : c.align === "center"
                      ? "text-center"
                      : "text-start"
                  )}
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr
                key={i}
                className="transition hover:bg-bg-tertiary/60"
              >
                {rankColumnHeader !== undefined && (
                  <td className="px-5 py-3 text-start">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold tabular",
                        i < highlightTop
                          ? "bg-accent-alert/10 text-accent-alert"
                          : "bg-bg-tertiary text-text-muted"
                      )}
                    >
                      {i + 1}
                    </span>
                  </td>
                )}
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-3",
                      c.align === "end"
                        ? "text-end tabular"
                        : c.align === "center"
                        ? "text-center"
                        : "text-start"
                    )}
                  >
                    {c.render(row, i)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
