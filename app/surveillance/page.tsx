"use client";

import { useMemo, useState } from "react";
import { Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { JordanMap } from "@/components/JordanMap";
import { Legend } from "@/components/Legend";
import { RankingTable, type RankingColumn } from "@/components/RankingTable";
import { IndicatorBadge } from "@/components/IndicatorBadge";
import { ForecastChart } from "@/components/ForecastChart";
import { FilterSelect } from "@/components/FilterSelect";
import { useLanguage } from "@/components/LanguageContext";
import {
  DISEASES,
  type DiseaseId,
  surveillanceByDisease,
  totalCasesLast12,
  momChange,
  alertCount,
  surveillanceFor,
  type SurveillanceCell,
} from "@/data/surveillance";
import { GOVERNORATES, type GovernorateId } from "@/data/governorates";
import { incidenceColor } from "@/lib/classifiers";
import {
  formatNumber,
  formatPercent,
  formatDecimal,
  localeFor,
} from "@/lib/utils";

export default function SurveillancePage() {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);

  const [disease, setDisease] = useState<DiseaseId>("diabetes");

  const cells = useMemo(() => surveillanceByDisease(disease), [disease]);

  const incidenceById = useMemo(() => {
    const m: Record<string, number> = {};
    cells.forEach((c) => {
      const gov = GOVERNORATES.find((g) => g.id === c.governorateId)!;
      m[c.governorateId] = (c.current / gov.population) * 100_000;
    });
    return m;
  }, [cells]);

  const incMax = Math.max(...Object.values(incidenceById), 1);

  const fillById = useMemo(() => {
    const m: Record<string, string> = {};
    Object.entries(incidenceById).forEach(([id, v]) => {
      m[id] = incidenceColor(v / incMax);
    });
    return m as Record<GovernorateId, string>;
  }, [incidenceById, incMax]);

  const valueById = useMemo(() => {
    const m: Record<string, string> = {};
    cells.forEach((c) => {
      m[c.governorateId] = `${formatNumber(c.current, locale)} cases / mo`;
    });
    return m as Record<GovernorateId, string>;
  }, [cells, locale]);

  const detailById = useMemo(() => {
    const m: Record<string, string> = {};
    cells.forEach((c) => {
      const sev = t.surveillance.severity[c.severity];
      m[c.governorateId] = `${sev} · Δ ${formatPercent(c.deltaPct, locale)}`;
    });
    return m as Record<GovernorateId, string>;
  }, [cells, t, locale]);

  const [selectedGov, setSelectedGov] = useState<GovernorateId | null>(null);
  const chartCell: SurveillanceCell = useMemo(() => {
    if (selectedGov) return surveillanceFor(selectedGov, disease);
    return [...cells].sort((a, b) => b.z - a.z)[0];
  }, [cells, disease, selectedGov]);

  const watchList = useMemo(
    () =>
      [...cells]
        .filter((c) => c.severity !== "low")
        .sort((a, b) => b.deltaPct - a.deltaPct),
    [cells]
  );

  const totalCases = totalCasesLast12(disease);
  const mom = momChange(disease);
  const alerts = alertCount(disease);

  const govName = (id: GovernorateId) => {
    const g = GOVERNORATES.find((x) => x.id === id)!;
    return lang === "ar" ? g.nameAr : g.nameEn;
  };

  const watchColumns: RankingColumn<SurveillanceCell>[] = [
    {
      key: "gov",
      header: t.surveillance.watchlist.governorate,
      render: (r) => (
        <button
          onClick={() => setSelectedGov(r.governorateId)}
          className="font-medium text-text-primary transition hover:text-accent-primary"
        >
          {govName(r.governorateId)}
        </button>
      ),
    },
    {
      key: "current",
      header: t.surveillance.watchlist.current,
      align: "end",
      render: (r) => formatNumber(r.current, locale),
    },
    {
      key: "projected",
      header: t.surveillance.watchlist.projected,
      align: "end",
      render: (r) => (
        <span className="font-semibold">
          {formatNumber(r.projected12mo, locale)}
        </span>
      ),
    },
    {
      key: "delta",
      header: t.surveillance.watchlist.delta,
      align: "end",
      render: (r) => (
        <span
          className={
            r.deltaPct >= 0.5
              ? "font-semibold text-accent-alert"
              : "font-semibold text-accent-warning"
          }
        >
          +{formatPercent(r.deltaPct, locale)}
        </span>
      ),
    },
    {
      key: "sev",
      header: t.surveillance.watchlist.severity,
      render: (r) => (
        <IndicatorBadge
          label={t.surveillance.severity[r.severity]}
          tone={
            r.severity === "high"
              ? "alert"
              : r.severity === "medium"
              ? "warning"
              : "neutral"
          }
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t.nav.surveillance}
        title={t.surveillance.title}
        subtitle={t.surveillance.subtitle}
        actions={
          <FilterSelect
            label={t.surveillance.disease}
            value={disease}
            onChange={(v) => {
              setDisease(v);
              setSelectedGov(null);
            }}
            options={DISEASES.map((d) => ({
              value: d,
              label: t.surveillance.diseases[d],
            }))}
          />
        }
      />

      <div className="grid gap-4 px-4 py-5 md:grid-cols-3 md:px-6">
        <KPICard
          label={t.surveillance.kpis.cases}
          value={formatNumber(totalCases, locale)}
          icon={<Activity className="h-5 w-5" />}
        />
        <KPICard
          label={t.surveillance.kpis.mom}
          value={`${mom >= 0 ? "+" : ""}${formatPercent(mom, locale)}`}
          icon={<TrendingUp className="h-5 w-5" />}
          accent={mom > 0.05 ? "alert" : "default"}
        />
        <KPICard
          label={t.surveillance.kpis.alerts}
          value={`${alerts} / ${cells.length}`}
          icon={<AlertTriangle className="h-5 w-5" />}
          accent={alerts > 0 ? "alert" : "default"}
        />
      </div>

      <div className="grid gap-4 px-4 pb-5 md:px-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {t.home.layers.surveillance}
              </div>
              <h2 className="mt-0.5 text-sm font-semibold text-text-primary">
                {t.surveillance.diseases[disease]}
              </h2>
            </div>
            <Legend
              title=""
              items={[
                { color: incidenceColor(0.15), label: t.surveillance.severity.low },
                { color: incidenceColor(0.55), label: t.surveillance.severity.medium },
                { color: incidenceColor(0.95), label: t.surveillance.severity.high },
              ]}
            />
          </div>
          <div className="h-[440px]">
            <JordanMap
              layer={{ fillById, valueById, detailById }}
              selectedId={chartCell.governorateId}
              onSelect={(id) => setSelectedGov(id)}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {t.surveillance.chart.title}
              </div>
              <h2 className="mt-0.5 text-sm font-semibold text-text-primary">
                {govName(chartCell.governorateId)} ·{" "}
                {t.surveillance.diseases[disease]}
              </h2>
            </div>
            <IndicatorBadge
              label={`Z = ${formatDecimal(chartCell.z, 2, locale)}`}
              tone={
                chartCell.severity === "high"
                  ? "alert"
                  : chartCell.severity === "medium"
                  ? "warning"
                  : "neutral"
              }
            />
          </div>
          <div className="px-4 py-4">
            <ForecastChart
              series={chartCell.series}
              historyLabel={t.surveillance.chart.history}
              forecastLabel={t.surveillance.chart.forecast}
              ciLabel={t.surveillance.chart.ci}
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 md:px-6">
        <RankingTable
          title={t.surveillance.watchlist.title}
          rows={watchList}
          columns={watchColumns}
          rankColumnHeader={t.common.rank}
        />
      </div>
    </div>
  );
}
