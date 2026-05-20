import { GOVERNORATES, GovernorateId } from "./governorates";
import { classifyCapacity, CapacityStatus } from "@/lib/classifiers";

export interface CapacityRow {
  id: GovernorateId;
  beds: number;
  bedsPer1k: number;
  occupancy: number;          // 0..1
  projectedDemand12mo: number; // projected bed-days demand growth %, signed
  status: CapacityStatus;
}

/**
 * Calibrated to the realistic Jordanian distribution:
 *  - Amman: well-balanced, slight oversupply downtown
 *  - Irbid: balanced
 *  - South (Maan, Tafilah, Aqaba): under-capacity (0.6–1.0/1k)
 *  - Zarqa: under-capacity (high pop, mediocre supply)
 *  - Mafraq: under-capacity (Syrian refugee strain)
 *  - Ajloun/Jerash: balanced to slightly over
 */
const RAW: Record<GovernorateId, { bedsPer1k: number; occupancy: number; projected: number }> = {
  amman:   { bedsPer1k: 2.1, occupancy: 0.78, projected: 0.06 },
  irbid:   { bedsPer1k: 1.8, occupancy: 0.81, projected: 0.08 },
  zarqa:   { bedsPer1k: 1.1, occupancy: 0.89, projected: 0.12 },
  mafraq:  { bedsPer1k: 0.9, occupancy: 0.93, projected: 0.18 },
  balqa:   { bedsPer1k: 1.5, occupancy: 0.82, projected: 0.07 },
  karak:   { bedsPer1k: 1.4, occupancy: 0.80, projected: 0.06 },
  jerash:  { bedsPer1k: 2.0, occupancy: 0.74, projected: 0.05 },
  madaba:  { bedsPer1k: 1.7, occupancy: 0.77, projected: 0.06 },
  ajloun:  { bedsPer1k: 2.2, occupancy: 0.72, projected: 0.04 },
  aqaba:   { bedsPer1k: 1.0, occupancy: 0.86, projected: 0.14 },
  maan:    { bedsPer1k: 0.7, occupancy: 0.91, projected: 0.16 },
  tafilah: { bedsPer1k: 0.6, occupancy: 0.88, projected: 0.15 },
};

export const CAPACITY: CapacityRow[] = GOVERNORATES.map((g) => {
  const r = RAW[g.id];
  const beds = Math.round((r.bedsPer1k * g.population) / 1000);
  return {
    id: g.id,
    beds,
    bedsPer1k: r.bedsPer1k,
    occupancy: r.occupancy,
    projectedDemand12mo: r.projected,
    status: classifyCapacity(r.bedsPer1k),
  };
});

export const capacityById = (id: GovernorateId) =>
  CAPACITY.find((r) => r.id === id)!;

export const TOTAL_BEDS = CAPACITY.reduce((s, r) => s + r.beds, 0);

export const AVG_BEDS_PER_1K =
  CAPACITY.reduce((s, r) => s + r.bedsPer1k, 0) / CAPACITY.length;

export const AVG_OCCUPANCY =
  CAPACITY.reduce((s, r) => s + r.occupancy, 0) / CAPACITY.length;

export const UNDER_CAPACITY_COUNT = CAPACITY.filter(
  (r) => r.status === "under"
).length;

/** Active facilities (synthetic — illustrative). */
export const TOTAL_FACILITIES = 1_247;
