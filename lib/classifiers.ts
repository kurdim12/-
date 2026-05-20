export type CapacityStatus = "under" | "balanced" | "over";
export type SpecialistStatus =
  | "critical"
  | "underserved"
  | "adequate"
  | "wellServed";

/** Beds per 1k thresholds, calibrated near WHO benchmark (~3.0). */
export function classifyCapacity(bedsPer1k: number): CapacityStatus {
  if (bedsPer1k < 1.4) return "under";
  if (bedsPer1k > 2.6) return "over";
  return "balanced";
}

/** Specialists per 100k. */
export function classifySpecialistAccess(per100k: number): SpecialistStatus {
  if (per100k < 4) return "critical";
  if (per100k < 10) return "underserved";
  if (per100k < 20) return "adequate";
  return "wellServed";
}

/* ---------- color ramps used by maps + tables ---------- */

export const capacityColor = (s: CapacityStatus): string => {
  switch (s) {
    case "under":    return "#DC2626"; // red
    case "balanced": return "#10B981"; // green
    case "over":     return "#F59E0B"; // amber (over-supply is also signal)
  }
};

export const specialistColor = (s: SpecialistStatus): string => {
  switch (s) {
    case "critical":    return "#DC2626";
    case "underserved": return "#F59E0B";
    case "adequate":    return "#10B981";
    case "wellServed":  return "#059669";
  }
};

/** Sequential white → orange → red ramp for incidence heatmap. */
export const incidenceColor = (normalized: number): string => {
  // normalized ∈ [0,1]
  const n = Math.max(0, Math.min(1, normalized));
  // simple 3-stop blend
  if (n < 0.5) {
    // white → orange
    const t = n / 0.5;
    const r = Math.round(255 + t * (245 - 255));
    const g = Math.round(255 + t * (158 - 255));
    const b = Math.round(255 + t * (11 - 255));
    return `rgb(${r}, ${g}, ${b})`;
  }
  // orange → red
  const t = (n - 0.5) / 0.5;
  const r = Math.round(245 + t * (220 - 245));
  const g = Math.round(158 + t * (38 - 158));
  const b = Math.round(11 + t * (38 - 11));
  return `rgb(${r}, ${g}, ${b})`;
};
