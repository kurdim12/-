import { GOVERNORATES, GovernorateId } from "./governorates";
import {
  buildSeries,
  forecastSeverity,
  ForecastSeries,
} from "@/lib/forecasting";

export type DiseaseId = "diabetes" | "hypertension" | "flu" | "respiratory";

export const DISEASES: DiseaseId[] = [
  "diabetes",
  "hypertension",
  "flu",
  "respiratory",
];

interface DiseaseProfile {
  /** Cases per 100k per month baseline (national average). */
  baselinePer100k: number;
  /** Monthly trend per 100k. */
  trendPer100k: number;
  /** Seasonal amplitude as fraction of baseline. */
  seasonalAmp: number;
  /** 0=Jan peak (winter), 6=Jul peak. */
  peakMonth: number;
}

const PROFILE: Record<DiseaseId, DiseaseProfile> = {
  diabetes:     { baselinePer100k: 140, trendPer100k: 0.40, seasonalAmp: 0.05, peakMonth: 0 },
  hypertension: { baselinePer100k: 180, trendPer100k: 0.35, seasonalAmp: 0.04, peakMonth: 0 },
  flu:          { baselinePer100k:  80, trendPer100k: 0.00, seasonalAmp: 0.85, peakMonth: 0 },
  respiratory:  { baselinePer100k:  60, trendPer100k: 0.10, seasonalAmp: 0.35, peakMonth: 0 },
};

/**
 * Per-governorate multipliers — Mafraq gets a strong upward kick on diabetes
 * to give the demo a "watch list" story moment (Section 6 of the brief).
 */
const GOV_TREND_MULT: Partial<
  Record<GovernorateId, Partial<Record<DiseaseId, number>>>
> = {
  mafraq:  { diabetes: 4.5, hypertension: 2.0, respiratory: 1.8 },
  zarqa:   { diabetes: 1.6, hypertension: 1.4 },
  amman:   { diabetes: 1.1, hypertension: 1.1 },
  aqaba:   { respiratory: 1.5 },
  irbid:   { hypertension: 1.2 },
  maan:    { diabetes: 1.3 },
  tafilah: { diabetes: 1.2 },
};

const GOV_BASE_MULT: Partial<Record<GovernorateId, number>> = {
  mafraq: 1.15, // refugee-strain population
  zarqa:  1.05,
  amman:  1.00,
};

function hashSeed(gov: GovernorateId, disease: DiseaseId): number {
  let h = 2166136261;
  const s = `${gov}-${disease}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface SurveillanceCell {
  governorateId: GovernorateId;
  disease: DiseaseId;
  series: ForecastSeries;
  current: number;            // last historical month
  projected12mo: number;      // mean of forecast window
  deltaPct: number;
  z: number;
  severity: "high" | "medium" | "low";
}

function buildCell(
  governorateId: GovernorateId,
  disease: DiseaseId
): SurveillanceCell {
  const gov = GOVERNORATES.find((g) => g.id === governorateId)!;
  const p = PROFILE[disease];
  const baseMult = GOV_BASE_MULT[governorateId] ?? 1;
  const trendMult = GOV_TREND_MULT[governorateId]?.[disease] ?? 1;
  const popHundredK = gov.population / 100_000;

  const baseline = p.baselinePer100k * popHundredK * baseMult;
  const trend = p.trendPer100k * popHundredK * trendMult;
  const seasonalAmplitude = baseline * p.seasonalAmp;

  const series = buildSeries({
    seed: hashSeed(governorateId, disease),
    historyMonths: 36,
    forecastMonths: 12,
    baseline,
    trendPerMonth: trend,
    seasonalAmplitude,
    seasonalPeakMonth: p.peakMonth,
    noisePct: 0.06,
  });

  const current = series.history[series.history.length - 1].value;
  const projected12mo =
    series.forecast.reduce((s, f) => s + f.value, 0) / series.forecast.length;
  const sev = forecastSeverity(series);

  return {
    governorateId,
    disease,
    series,
    current,
    projected12mo,
    deltaPct: sev.deltaPct,
    z: sev.z,
    severity: sev.level,
  };
}

export const SURVEILLANCE: SurveillanceCell[] = GOVERNORATES.flatMap((g) =>
  DISEASES.map((d) => buildCell(g.id, d))
);

export const surveillanceFor = (
  gov: GovernorateId,
  disease: DiseaseId
): SurveillanceCell =>
  SURVEILLANCE.find((c) => c.governorateId === gov && c.disease === disease)!;

export const surveillanceByDisease = (disease: DiseaseId): SurveillanceCell[] =>
  SURVEILLANCE.filter((c) => c.disease === disease);

export const totalCasesLast12 = (disease: DiseaseId): number =>
  surveillanceByDisease(disease).reduce(
    (s, c) =>
      s +
      c.series.history
        .slice(-12)
        .reduce((a, b) => a + b.value, 0),
    0
  );

export const momChange = (disease: DiseaseId): number => {
  const cells = surveillanceByDisease(disease);
  const last = cells.reduce((s, c) => s + c.series.history.at(-1)!.value, 0);
  const prev = cells.reduce((s, c) => s + c.series.history.at(-2)!.value, 0);
  return (last - prev) / Math.max(prev, 1);
};

export const alertCount = (disease: DiseaseId): number =>
  surveillanceByDisease(disease).filter((c) => c.severity !== "low").length;
