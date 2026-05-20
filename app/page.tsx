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
  MapPin,
} from "lucide-react";
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
import {
  TOTAL_POPULATION,
  GOVERNORATES,
  type GovernorateId,
} from "@/data/governorates";
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

  const capacityFill = useMemo(() => {
    const m: Record<string, string> = {};
    CAPACITY.forEach((r) => (m[r.id] = capacityColor(r.status)));
    return m as Record<GovernorateId, string>;
  }, []);

  const surveillanceFill = useMemo(() => {
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
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-bg-secondary">
        <BgGrid />
        <div className="relative px-4 py-10 md:px-6 md:py-12">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-primary">
            <span className="inline-flex h-1 w-1 rounded-full bg-accent-primary" />
            {t.brand.submission}
          </div>
          <h1 className="mt-3 max-w-3xl text-[28px] font-semibold leading-[1.18] tracking-tightish text-text-primary md:text-[36px]">
            {t.home.hero}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
            {t.home.subhero}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <HeroChip
              icon={<Hospital className="h-3.5 w-3.5" />}
              label={t.nav.capacity}
              href="/capacity"
            />
            <HeroChip
              icon={<Activity className="h-3.5 w-3.5" />}
              label={t.nav.surveillance}
              href="/surveillance"
            />
            <HeroChip
              icon={<Stethoscope className="h-3.5 w-3.5" />}
              label={t.nav.specialists}
              href="/specialists"
            />
            <span className="ms-2 inline-flex items-center gap-1 text-xs text-text-muted">
              <MapPin className="h-3 w-3" /> 12 {t.common.governorate.toLowerCase()}
            </span>
          </div>
        </div>
      </section>

      {/* KPI banner */}
      <div className="grid gap-4 px-4 py-5 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <KPICard
          label={t.home.kpis.population}
          value={formatCompact(TOTAL_POPULATION, locale)}
          icon={<Users className="h-5 w-5" />}
          hint="2024"
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

      {/* Map + layer toggles */}
      <div className="grid gap-4 px-4 pb-5 md:px-6 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {t.home.layers.title}
              </div>
              <h2 className="mt-0.5 text-sm font-semibold text-text-primary">
                {layerKey === "capacity"
                  ? t.home.modules.capacity.title
                  : layerKey === "surveillance"
                  ? t.home.modules.surveillance.title
                  : t.home.modules.specialists.title}
              </h2>
            </div>
            <div className="flex items-center gap-0.5 rounded-lg border border-border bg-bg-tertiary p-0.5">
              {(
                [
                  ["capacity", t.home.layers.capacity, Hospital],
                  ["surveillance", t.home.layers.surveillance, Activity],
                  ["specialists", t.home.layers.specialists, Stethoscope],
                ] as const
              ).map(([key, label, Icon]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLayerKey(key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition",
                    layerKey === key
                      ? "bg-bg-secondary text-accent-primary shadow-[0_1px_0_rgba(10,37,64,0.04)]"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[520px]">
            <JordanMap layer={{ fillById }} />
          </div>
        </div>
        <Legend title={t.common.legend} items={legend} />
      </div>

      {/* Module preview cards */}
      <div className="grid gap-4 px-4 pb-10 md:grid-cols-3 md:px-6">
        <ModuleCard
          href="/capacity"
          icon={<Hospital className="h-5 w-5" />}
          eyebrow="01"
          title={t.home.modules.capacity.title}
          desc={t.home.modules.capacity.desc}
          cta={t.common.explore}
          accent="bg-accent-primary"
        />
        <ModuleCard
          href="/surveillance"
          icon={<Activity className="h-5 w-5" />}
          eyebrow="02"
          title={t.home.modules.surveillance.title}
          desc={t.home.modules.surveillance.desc}
          cta={t.common.explore}
          accent="bg-accent-alert"
        />
        <ModuleCard
          href="/specialists"
          icon={<Stethoscope className="h-5 w-5" />}
          eyebrow="03"
          title={t.home.modules.specialists.title}
          desc={t.home.modules.specialists.desc}
          cta={t.common.explore}
          accent="bg-accent-medical"
        />
      </div>
    </div>
  );
}

function BgGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(15,76,129,0.08) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

function HeroChip({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-medium text-text-secondary transition hover:border-accent-primary hover:text-accent-primary"
    >
      {icon}
      {label}
    </Link>
  );
}

function ModuleCard({
  href,
  icon,
  eyebrow,
  title,
  desc,
  cta,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-bg-secondary p-5 transition hover:-translate-y-0.5 hover:border-accent-primary"
    >
      <span className={cn("absolute inset-x-0 top-0 h-[3px]", accent)} />
      <div className="flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-bg-tertiary text-accent-primary">
          {icon}
        </div>
        <span className="text-[11px] font-semibold tracking-[0.18em] text-text-muted">
          {eyebrow}
        </span>
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
          {desc}
        </p>
      </div>
      <div className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-primary">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      </div>
    </Link>
  );
}
