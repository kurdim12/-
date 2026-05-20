"use client";

import { useMemo } from "react";
import { Hospital, AlertCircle, Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { JordanMap } from "@/components/JordanMap";
import { Legend } from "@/components/Legend";
import { RankingTable, type RankingColumn } from "@/components/RankingTable";
import { IndicatorBadge } from "@/components/IndicatorBadge";
import { InfoTooltip } from "@/components/Tooltip";
import { useLanguage } from "@/components/LanguageContext";
import {
  CAPACITY,
  AVG_BEDS_PER_1K,
  AVG_OCCUPANCY,
  UNDER_CAPACITY_COUNT,
  type CapacityRow,
} from "@/data/capacity";
import { GOVERNORATES, type GovernorateId } from "@/data/governorates";
import { capacityColor } from "@/lib/classifiers";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
  localeFor,
} from "@/lib/utils";

export default function CapacityPage() {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);

  const govName = (id: GovernorateId) => {
    const g = GOVERNORATES.find((x) => x.id === id)!;
    return lang === "ar" ? g.nameAr : g.nameEn;
  };

  const fillById = useMemo(() => {
    const map: Record<string, string> = {};
    CAPACITY.forEach((r) => (map[r.id] = capacityColor(r.status)));
    return map as Record<GovernorateId, string>;
  }, []);

  const valueById = useMemo(() => {
    const map: Record<string, string> = {};
    CAPACITY.forEach(
      (r) =>
        (map[r.id] = `${formatDecimal(r.bedsPer1k, 1, locale)} ${t.capacity.table.per1k}`)
    );
    return map as Record<GovernorateId, string>;
  }, [locale, t]);

  const detailById = useMemo(() => {
    const map: Record<string, string> = {};
    CAPACITY.forEach((r) => {
      const status = t.capacity.status[r.status];
      map[r.id] = `${status} · ${formatPercent(r.occupancy, locale)}`;
    });
    return map as Record<GovernorateId, string>;
  }, [locale, t]);

  const ranked = useMemo(() => {
    const order = { under: 0, balanced: 1, over: 2 } as const;
    return [...CAPACITY].sort(
      (a, b) =>
        order[a.status] - order[b.status] || a.bedsPer1k - b.bedsPer1k
    );
  }, []);

  const columns: RankingColumn<CapacityRow>[] = [
    {
      key: "gov",
      header: t.capacity.table.governorate,
      render: (r) => (
        <span className="font-medium text-text-primary">{govName(r.id)}</span>
      ),
    },
    {
      key: "beds",
      header: t.capacity.table.beds,
      align: "end",
      render: (r) => formatNumber(r.beds, locale),
    },
    {
      key: "per1k",
      header: t.capacity.table.per1k,
      align: "end",
      render: (r) => (
        <span className="font-semibold">
          {formatDecimal(r.bedsPer1k, 1, locale)}
        </span>
      ),
    },
    {
      key: "occupancy",
      header: t.capacity.table.occupancy,
      align: "end",
      render: (r) => formatPercent(r.occupancy, locale),
    },
    {
      key: "demand",
      header: t.capacity.table.projectedDemand,
      align: "end",
      render: (r) => (
        <span
          className={
            r.projectedDemand12mo > 0.1
              ? "font-semibold text-accent-alert"
              : "text-text-secondary"
          }
        >
          +{formatPercent(r.projectedDemand12mo, locale)}
        </span>
      ),
    },
    {
      key: "status",
      header: t.capacity.table.status,
      render: (r) => (
        <IndicatorBadge
          label={t.capacity.status[r.status]}
          tone={
            r.status === "under"
              ? "alert"
              : r.status === "over"
              ? "warning"
              : "good"
          }
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t.nav.capacity}
        title={t.capacity.title}
        subtitle={t.capacity.subtitle}
      />

      <div className="grid gap-4 px-4 py-5 md:grid-cols-3 md:px-6">
        <KPICard
          label={t.capacity.kpis.bedsPer1k}
          value={formatDecimal(AVG_BEDS_PER_1K, 2, locale)}
          icon={<Hospital className="h-5 w-5" />}
          hint="WHO ≈ 3.0"
        />
        <KPICard
          label={t.capacity.kpis.occupancy}
          value={formatPercent(AVG_OCCUPANCY, locale)}
          icon={<Activity className="h-5 w-5" />}
          accent={AVG_OCCUPANCY > 0.85 ? "alert" : "default"}
        />
        <KPICard
          label={t.capacity.kpis.under}
          value={`${UNDER_CAPACITY_COUNT} / ${CAPACITY.length}`}
          icon={<AlertCircle className="h-5 w-5" />}
          accent="alert"
        />
      </div>

      <div className="grid gap-4 px-4 pb-5 md:px-6 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {t.home.layers.capacity}
              </div>
              <h2 className="mt-0.5 text-sm font-semibold text-text-primary">
                {t.capacity.table.per1k}
              </h2>
            </div>
            <InfoTooltip text={t.capacity.tooltips.bedsPer1k} />
          </div>
          <div className="h-[480px]">
            <JordanMap layer={{ fillById, valueById, detailById }} />
          </div>
        </div>
        <Legend
          title={t.common.legend}
          items={[
            { color: capacityColor("under"),    label: t.capacity.status.under },
            { color: capacityColor("balanced"), label: t.capacity.status.balanced },
            { color: capacityColor("over"),     label: t.capacity.status.over },
          ]}
        />
      </div>

      <div className="px-4 pb-8 md:px-6">
        <RankingTable
          title={t.capacity.table.title}
          rows={ranked}
          columns={columns}
          rankColumnHeader={t.capacity.table.rank}
        />
      </div>
    </div>
  );
}
