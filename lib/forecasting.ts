/**
 * Deterministic seasonal forecast generator.
 *
 * Produces a base + linear trend + sine seasonality + small pseudo-random
 * noise component, shaped to look like Prophet/ARIMA outputs. The PRNG is
 * seeded so the same governorate × disease combo is reproducible across renders.
 */

export interface ForecastPoint {
  monthIndex: number;          // 0..N-1 across full history + forecast
  monthLabel: string;          // e.g. "2024-03"
  value: number;               // actual or forecast point
  lower?: number;              // forecast lower CI
  upper?: number;              // forecast upper CI
  isForecast: boolean;
}

export interface ForecastSeries {
  history: ForecastPoint[];
  forecast: ForecastPoint[];
  all: ForecastPoint[];
}

interface BuildParams {
  seed: number;
  historyMonths: number;       // typically 36
  forecastMonths: number;      // typically 12
  baseline: number;            // mean monthly value
  trendPerMonth: number;       // linear slope (positive = rising)
  seasonalAmplitude: number;   // peak-to-peak / 2
  seasonalPeakMonth?: number;  // 0=Jan, 1=Feb… defaults to Jan (peak winter)
  noisePct?: number;           // 0..1 — relative noise scale
  startDate?: Date;            // anchor month for labels
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function monthLabel(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function buildSeries(p: BuildParams): ForecastSeries {
  const rng = mulberry32(p.seed);
  const noisePct = p.noisePct ?? 0.05;
  const peakMonth = p.seasonalPeakMonth ?? 0;

  const totalMonths = p.historyMonths + p.forecastMonths;
  const anchor = p.startDate ?? new Date(2023, 0, 1);
  // anchor represents the FIRST historical month
  const points: ForecastPoint[] = [];

  for (let i = 0; i < totalMonths; i++) {
    const d = new Date(anchor.getFullYear(), anchor.getMonth() + i, 1);
    const trend = p.trendPerMonth * i;
    // seasonal: peak at peakMonth — cosine of (currentMonth - peakMonth)
    const phase = ((d.getMonth() - peakMonth) / 12) * Math.PI * 2;
    const seasonal = p.seasonalAmplitude * Math.cos(phase);

    const noise =
      (rng() - 0.5) * 2 * noisePct * Math.max(p.baseline, 1);
    const value = Math.max(0, p.baseline + trend + seasonal + noise);

    const isForecast = i >= p.historyMonths;
    const point: ForecastPoint = {
      monthIndex: i,
      monthLabel: monthLabel(d),
      value: Math.round(value),
      isForecast,
    };

    if (isForecast) {
      // 95% CI widens with forecast horizon
      const horizon = i - p.historyMonths + 1;
      const ci =
        (0.08 + horizon * 0.012) * Math.max(p.baseline + trend, 1);
      point.lower = Math.max(0, Math.round(value - ci));
      point.upper = Math.round(value + ci);
    }

    points.push(point);
  }

  return {
    all: points,
    history: points.filter((p) => !p.isForecast),
    forecast: points.filter((p) => p.isForecast),
  };
}

/**
 * Severity index for forecast: positive Z-score of forecast mean vs history mean.
 */
export function forecastSeverity(s: ForecastSeries): {
  z: number;
  level: "high" | "medium" | "low";
  deltaPct: number;
} {
  const histMean =
    s.history.reduce((a, b) => a + b.value, 0) / s.history.length;
  const histStd =
    Math.sqrt(
      s.history.reduce((a, b) => a + (b.value - histMean) ** 2, 0) /
        s.history.length
    ) || 1;
  const fcastMean =
    s.forecast.reduce((a, b) => a + b.value, 0) / s.forecast.length;

  const z = (fcastMean - histMean) / histStd;
  const deltaPct = (fcastMean - histMean) / Math.max(histMean, 1);

  let level: "high" | "medium" | "low" = "low";
  if (z >= 2.0) level = "high";
  else if (z >= 1.0) level = "medium";

  return { z, level, deltaPct };
}
