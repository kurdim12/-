import { GOVERNORATES, GovernorateId } from "./governorates";
import {
  classifySpecialistAccess,
  SpecialistStatus,
} from "@/lib/classifiers";

export type SpecialtyId =
  | "cardiology"
  | "oncology"
  | "pediatrics"
  | "neurology";

export const SPECIALTIES: SpecialtyId[] = [
  "cardiology",
  "oncology",
  "pediatrics",
  "neurology",
];

/**
 * National totals (illustrative, brief-aligned):
 *  ~1,800 cardiologists nationally, ~80% in Amman.
 *  Oncology similarly Amman-concentrated.
 *  Pediatrics more evenly distributed.
 *  Neurology heavily Amman-concentrated.
 */
const NATIONAL_TOTAL: Record<SpecialtyId, number> = {
  cardiology:  1_800,
  oncology:      450,
  pediatrics:  2_800,
  neurology:     520,
};

const AMMAN_SHARE: Record<SpecialtyId, number> = {
  cardiology:  0.80,
  oncology:    0.85,
  pediatrics:  0.62,
  neurology:   0.83,
};

/** Among the non-Amman share, weights by governorate (sum = 1). */
const REST_WEIGHTS: Record<GovernorateId, number> = {
  amman:   0.00,
  irbid:   0.34,
  zarqa:   0.18,
  balqa:   0.08,
  jerash:  0.05,
  ajloun:  0.04,
  madaba:  0.05,
  karak:   0.08,
  aqaba:   0.07,
  mafraq:  0.05,
  maan:    0.03,
  tafilah: 0.03,
};

export interface SpecialistRow {
  id: GovernorateId;
  specialty: SpecialtyId;
  count: number;
  per100k: number;
  travelBurden: number;        // 0..1 — share referred outside governorate
  status: SpecialistStatus;
}

function travelBurdenFor(
  gov: GovernorateId,
  per100k: number
): number {
  if (gov === "amman") return 0.04;
  // inverse to local supply, floor at ~0.18, cap at ~0.92
  const fromSupply = Math.max(0.18, Math.min(0.92, 1 - per100k / 25));
  return Math.round(fromSupply * 100) / 100;
}

export const SPECIALISTS: SpecialistRow[] = SPECIALTIES.flatMap((sp) => {
  const total = NATIONAL_TOTAL[sp];
  const ammanShare = AMMAN_SHARE[sp];
  const ammanCount = Math.round(total * ammanShare);
  const restCount = total - ammanCount;

  return GOVERNORATES.map((g) => {
    const count =
      g.id === "amman"
        ? ammanCount
        : Math.max(1, Math.round(restCount * REST_WEIGHTS[g.id]));
    const per100k = (count / g.population) * 100_000;
    const travelBurden = travelBurdenFor(g.id, per100k);
    return {
      id: g.id,
      specialty: sp,
      count,
      per100k: Math.round(per100k * 10) / 10,
      travelBurden,
      status: classifySpecialistAccess(per100k),
    };
  });
});

export const specialistsBy = (sp: SpecialtyId): SpecialistRow[] =>
  SPECIALISTS.filter((r) => r.specialty === sp);

export const specialistRow = (
  gov: GovernorateId,
  sp: SpecialtyId
): SpecialistRow =>
  SPECIALISTS.find((r) => r.id === gov && r.specialty === sp)!;

export const TOTAL_SPECIALISTS_MAPPED = SPECIALISTS.reduce(
  (s, r) => s + r.count,
  0
);

export const totalsBySpecialty = (sp: SpecialtyId): number =>
  specialistsBy(sp).reduce((s, r) => s + r.count, 0);

export const avgPer100kBySpecialty = (sp: SpecialtyId): number => {
  const rows = specialistsBy(sp);
  return rows.reduce((s, r) => s + r.per100k, 0) / rows.length;
};

export const underservedCountBySpecialty = (sp: SpecialtyId): number =>
  specialistsBy(sp).filter(
    (r) => r.status === "critical" || r.status === "underserved"
  ).length;

