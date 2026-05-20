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
}

export function RankingTable<T>({
  title,
  rows,
  columns,
  caption,
  rankColumnHeader,
}: RankingTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-secondary">
      {title && (
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {caption && (
            <p className="mt-1 text-xs text-text-muted">{caption}</p>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-bg-tertiary text-xs uppercase tracking-wide text-text-muted">
            <tr>
              {rankColumnHeader !== undefined && (
                <th className="px-4 py-2 text-start font-medium" style={{ width: 64 }}>
                  {rankColumnHeader}
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-2 font-medium",
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
              <tr key={i} className="hover:bg-bg-tertiary">
                {rankColumnHeader !== undefined && (
                  <td className="px-4 py-2.5 text-start tabular text-text-muted">
                    {i + 1}
                  </td>
                )}
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-2.5",
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
