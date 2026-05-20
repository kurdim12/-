"use client";

import { useMemo, useState } from "react";
import { Stethoscope, Users, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { JordanMap } from "@/components/JordanMap";
import { Legend } from "@/components/Legend";
import { RankingTable, type RankingColumn } from "@/components/RankingTable";
import { IndicatorBadge } from "@/components/IndicatorBadge";
import { InfoTooltip } from "@/components/Tooltip";
import { useLanguage } from "@/components/LanguageContext";
import {
  SPECIALTIES,
  type SpecialtyId,
  specialistsBy,
  totalsBySpecialty,
  avgPer100kBySpecialty,
  underservedCountBySpecialty,
  type SpecialistRow,
} from "@/data/specialists";
import { GOVERNORATES, type GovernorateId } from "@/data/governorates";
import { specialistColor } from "@/lib/classifiers";
import {
  formatNumber,
  formatPercent,
  formatDecimal,
  localeFor,
} from "@/lib/utils";

export default function SpecialistsPage() {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);
  const [specialty, setSpecialty] = useState<SpecialtyId>("cardiology");

  const rows = useMemo(() => specialistsBy(specialty), [specialty]);

  const fillById = useMemo(() => {
    const m: Record<string, string> = {};
    rows.forEach((r) => (m[r.id] = specialistColor(r.status)));
    return m as Record<GovernorateId, string>;
  }, [rows]);

  const valueById = useMemo(() => {
    const m: Record<string, string> = {};
    rows.forEach((r) => {
      m[r.id] = `${formatDecimal(r.per100k, 1, locale)} ${t.specialists.table.per100k}`;
    });
    return m as Record<GovernorateId, string>;
  }, [rows, t, locale]);

  const detailById = useMemo(() => {
    const m: Record<string, string> = {};
    rows.forEach((r) => {
      m[r.id] = `${t.specialists.status[r.status]} · ${formatPercent(r.travelBurden, locale)}`;
    });
    return m as Record<GovernorateId, string>;
  }, [rows, t, locale]);

  const ranked = useMemo(() => {
    const order = { critical: 0, underserved: 1, adequate: 2, wellServed: 3 } as const;
    return [...rows].sort(
      (a, b) =>
        order[a.status] - order[b.status] ||
        b.travelBurden - a.travelBurden
    );
  }, [rows]);

  const govName = (id: GovernorateId) => {
    const g = GOVERNORATES.find((x) => x.id === id)!;
    return lang === "ar" ? g.nameAr : g.nameEn;
  };

  const columns: RankingColumn<SpecialistRow>[] = [
    {
      key: "gov",
      header: t.specialists.table.governorate,
      render: (r) => (
        <span className="font-medium text-text-primary">{govName(r.id)}</span>
      ),
    },
    {
      key: "count",
      header: t.specialists.table.specialists,
      align: "end",
      render: (r) => formatNumber(r.count, locale),
    },
    {
      key: "per100k",
      header: t.specialists.table.per100k,
      align: "end",
      render: (r) => formatDecimal(r.per100k, 1, locale),
    },
    {
      key: "burden",
      header: t.specialists.table.travelBurden,
      align: "end",
      render: (r) => (
        <span className={r.travelBurden >= 0.6 ? "text-accent-alert" : ""}>
          {formatPercent(r.travelBurden, locale)}
        </span>
      ),
    },
    {
      key: "status",
      header: t.specialists.table.status,
      render: (r) => (
        <IndicatorBadge
          label={t.specialists.status[r.status]}
          tone={
            r.status === "critical"
              ? "alert"
              : r.status === "underserved"
              ? "warning"
              : r.status === "adequate"
              ? "good"
              : "info"
          }
        />
      ),
    },
  ];

  const total = totalsBySpecialty(specialty);
  const avg = avgPer100kBySpecialty(specialty);
  const under = underservedCountBySpecialty(specialty);

  return (
    <div>
      <PageHeader
        title={t.specialists.title}
        subtitle={t.specialists.subtitle}
        actions={
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-text-muted">
              {t.specialists.specialty}
            </label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value as SpecialtyId)}
              className="rounded-md border border-border bg-bg-secondary px-2.5 py-1.5 text-sm text-text-primary"
            >
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {t.specialists.specialties[s]}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <div className="grid gap-4 px-4 py-4 md:grid-cols-3 md:px-6">
        <KPICard
          label={t.specialists.kpis.total}
          value={formatNumber(total, locale)}
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          label={t.specialists.kpis.per100k}
          value={formatDecimal(avg, 1, locale)}
          icon={<Stethoscope className="h-5 w-5" />}
        />
        <KPICard
          label={t.specialists.kpis.under}
          value={`${under} / ${rows.length}`}
          icon={<AlertCircle className="h-5 w-5" />}
          accent="alert"
        />
      </div>

      <div className="grid gap-4 px-4 pb-4 md:px-6 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-lg border border-border bg-bg-secondary">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <h2 className="text-sm font-semibold text-text-primary">
              {t.specialists.specialties[specialty]}
            </h2>
            <InfoTooltip text={t.specialists.tooltips.per100k} />
          </div>
          <div className="h-[460px]">
            <JordanMap layer={{ fillById, valueById, detailById }} />
          </div>
        </div>
        <Legend
          title={t.common.legend}
          items={[
            { color: specialistColor("critical"),    label: t.specialists.status.critical },
            { color: specialistColor("underserved"), label: t.specialists.status.underserved },
            { color: specialistColor("adequate"),    label: t.specialists.status.adequate },
            { color: specialistColor("wellServed"),  label: t.specialists.status.wellServed },
          ]}
        />
      </div>

      <div className="px-4 pb-6 md:px-6">
        <RankingTable
          title={t.specialists.table.title}
          rows={ranked}
          columns={columns}
          rankColumnHeader={t.common.rank}
        />
      </div>
    </div>
  );
}
