"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Users,
  Building2,
  Stethoscope,
  AlertCircle,
  Hospital,
  Activity,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { JordanMap } from "@/components/JordanMap";
import { Legend } from "@/components/Legend";
import { useLanguage } from "@/components/LanguageContext";
import {
  CAPACITY,
  TOTAL_FACILITIES,
  UNDER_CAPACITY_COUNT,
} from "@/data/capacity";
import { surveillanceByDisease } from "@/data/surveillance";
import {
  SPECIALISTS,
  TOTAL_SPECIALISTS_MAPPED,
  specialistsBy,
} from "@/data/specialists";
import { TOTAL_POPULATION, GOVERNORATES, type GovernorateId } from "@/data/governorates";
import {
  capacityColor,
  incidenceColor,
  specialistColor,
} from "@/lib/classifiers";
import { formatCompact, localeFor, cn } from "@/lib/utils";

type LayerKey = "capacity" | "surveillance" | "specialists";

export default function HomePage() {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);
  const [layerKey, setLayerKey] = useState<LayerKey>("capacity");

  // ---- Layer specs ----
  const capacityFill = useMemo(() => {
    const m: Record<string, string> = {};
    CAPACITY.forEach((r) => (m[r.id] = capacityColor(r.status)));
    return m as Record<GovernorateId, string>;
  }, []);

  const surveillanceFill = useMemo(() => {
    // Use diabetes (the brief's outbreak-signal example) as overview disease
    const cells = surveillanceByDisease("diabetes");
    const per100k: Record<string, number> = {};
    cells.forEach((c) => {
      const gov = GOVERNORATES.find((g) => g.id === c.governorateId)!;
      per100k[c.governorateId] = (c.current / gov.population) * 100_000;
    });
    const max = Math.max(...Object.values(per100k), 1);
    const m: Record<string, string> = {};
    Object.entries(per100k).forEach(([id, v]) => {
      m[id] = incidenceColor(v / max);
    });
    return m as Record<GovernorateId, string>;
  }, []);

  const specialistsFill = useMemo(() => {
    const rows = specialistsBy("cardiology");
    const m: Record<string, string> = {};
    rows.forEach((r) => (m[r.id] = specialistColor(r.status)));
    return m as Record<GovernorateId, string>;
  }, []);

  const fillById =
    layerKey === "capacity"
      ? capacityFill
      : layerKey === "surveillance"
      ? surveillanceFill
      : specialistsFill;

  const legend =
    layerKey === "capacity"
      ? [
          { color: capacityColor("under"),    label: t.capacity.status.under },
          { color: capacityColor("balanced"), label: t.capacity.status.balanced },
          { color: capacityColor("over"),     label: t.capacity.status.over },
        ]
      : layerKey === "surveillance"
      ? [
          { color: incidenceColor(0.15), label: t.surveillance.severity.low },
          { color: incidenceColor(0.55), label: t.surveillance.severity.medium },
          { color: incidenceColor(0.95), label: t.surveillance.severity.high },
        ]
      : [
          { color: specialistColor("critical"),    label: t.specialists.status.critical },
          { color: specialistColor("underserved"), label: t.specialists.status.underserved },
          { color: specialistColor("adequate"),    label: t.specialists.status.adequate },
          { color: specialistColor("wellServed"),  label: t.specialists.status.wellServed },
        ];

  // High-priority zones = under-capacity OR critical cardiology
  const highPriorityZones = useMemo(() => {
    const ids = new Set<GovernorateId>();
    CAPACITY.filter((r) => r.status === "under").forEach((r) => ids.add(r.id));
    SPECIALISTS.filter(
      (r) => r.specialty === "cardiology" && r.status === "critical"
    ).forEach((r) => ids.add(r.id));
    return ids.size;
  }, []);

  return (
    <div>
      <PageHeader title={t.home.hero} subtitle={t.home.subhero} />

      {/* KPI banner */}
      <div className="grid gap-4 px-4 py-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <KPICard
          label={t.home.kpis.population}
          value={formatCompact(TOTAL_POPULATION, locale)}
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          label={t.home.kpis.facilities}
          value={formatCompact(TOTAL_FACILITIES, locale)}
          icon={<Building2 className="h-5 w-5" />}
        />
        <KPICard
          label={t.home.kpis.specialists}
          value={formatCompact(TOTAL_SPECIALISTS_MAPPED, locale)}
          icon={<Stethoscope className="h-5 w-5" />}
        />
        <KPICard
          label={t.home.kpis.priorityZones}
          value={`${highPriorityZones}`}
          icon={<AlertCircle className="h-5 w-5" />}
          accent="alert"
          hint={`${UNDER_CAPACITY_COUNT} ${t.capacity.kpis.under.toLowerCase()}`}
        />
      </div>

      {/* Main map + layer toggles */}
      <div className="grid gap-4 px-4 pb-4 md:px-6 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-lg border border-border bg-bg-secondary">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
            <h2 className="text-sm font-semibold text-text-primary">
              {t.home.layers.title}
            </h2>
            <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
              {([
                ["capacity", t.home.layers.capacity],
                ["surveillance", t.home.layers.surveillance],
                ["specialists", t.home.layers.specialists],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLayerKey(key)}
                  className={cn(
                    "rounded px-2.5 py-1 text-xs font-medium transition",
                    layerKey === key
                      ? "bg-bg-tertiary text-accent-primary"
                      : "text-text-secondary hover:bg-bg-tertiary"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[500px]">
            <JordanMap layer={{ fillById }} />
          </div>
        </div>
        <Legend title={t.common.legend} items={legend} />
      </div>

      {/* Module preview cards */}
      <div className="grid gap-4 px-4 pb-8 md:grid-cols-3 md:px-6">
        <ModuleCard
          href="/capacity"
          icon={<Hospital className="h-5 w-5" />}
          title={t.home.modules.capacity.title}
          desc={t.home.modules.capacity.desc}
          cta={t.common.explore}
        />
        <ModuleCard
          href="/surveillance"
          icon={<Activity className="h-5 w-5" />}
          title={t.home.modules.surveillance.title}
          desc={t.home.modules.surveillance.desc}
          cta={t.common.explore}
        />
        <ModuleCard
          href="/specialists"
          icon={<Stethoscope className="h-5 w-5" />}
          title={t.home.modules.specialists.title}
          desc={t.home.modules.specialists.desc}
          cta={t.common.explore}
        />
      </div>
    </div>
  );
}

function ModuleCard({
  href,
  icon,
  title,
  desc,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-bg-secondary p-4 transition hover:border-accent-primary"
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-bg-tertiary text-accent-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">{desc}</p>
      </div>
      <div className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-accent-primary">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      </div>
    </Link>
  );
}
