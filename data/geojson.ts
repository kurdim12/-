import type { GovernorateId } from "./governorates";

export interface GovFeature {
  type: "Feature";
  properties: { id: GovernorateId; nameEn: string; nameAr: string };
  geometry: { type: "Polygon"; coordinates: [number, number][][] };
}

export interface GovFeatureCollection {
  type: "FeatureCollection";
  features: GovFeature[];
}

/**
 * Simplified polygonal boundaries for Jordan's 12 governorates.
 * These are demo-grade approximations — recognizable shapes that fit
 * together over the real geography, not survey-grade boundaries.
 * Coordinates are [lon, lat] as required by GeoJSON.
 */
export const JORDAN_GOVERNORATES_GEOJSON: GovFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: "irbid", nameEn: "Irbid", nameAr: "إربد" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.65, 32.40], [35.95, 32.40], [36.05, 32.55],
          [36.00, 32.75], [35.70, 32.75], [35.60, 32.55], [35.65, 32.40],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "ajloun", nameEn: "Ajloun", nameAr: "عجلون" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.60, 32.20], [35.80, 32.20], [35.85, 32.40],
          [35.65, 32.40], [35.55, 32.30], [35.60, 32.20],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "jerash", nameEn: "Jerash", nameAr: "جرش" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.80, 32.20], [36.00, 32.20], [36.05, 32.40],
          [35.85, 32.40], [35.80, 32.20],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "mafraq", nameEn: "Mafraq", nameAr: "المفرق" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [36.05, 32.10], [37.40, 32.05], [38.20, 32.20],
          [38.30, 32.70], [36.05, 32.75], [36.05, 32.10],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "balqa", nameEn: "Balqa", nameAr: "البلقاء" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.55, 31.85], [35.85, 31.85], [35.90, 32.20],
          [35.60, 32.20], [35.50, 32.05], [35.55, 31.85],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "amman", nameEn: "Amman", nameAr: "عمّان" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.85, 31.70], [36.30, 31.70], [36.45, 31.95],
          [36.30, 32.15], [35.90, 32.20], [35.85, 31.95], [35.85, 31.70],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "zarqa", nameEn: "Zarqa", nameAr: "الزرقاء" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [36.00, 32.00], [36.60, 31.95], [36.80, 32.10],
          [36.60, 32.30], [36.05, 32.20], [36.00, 32.00],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "madaba", nameEn: "Madaba", nameAr: "مادبا" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.65, 31.55], [35.95, 31.55], [35.95, 31.75],
          [35.65, 31.75], [35.55, 31.65], [35.65, 31.55],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "karak", nameEn: "Karak", nameAr: "الكرك" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.55, 31.00], [36.30, 30.95], [36.50, 31.30],
          [36.10, 31.55], [35.55, 31.45], [35.45, 31.20], [35.55, 31.00],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "tafilah", nameEn: "Tafilah", nameAr: "الطفيلة" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.40, 30.60], [35.95, 30.55], [36.00, 30.90],
          [35.55, 31.00], [35.40, 30.85], [35.40, 30.60],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "maan", nameEn: "Maan", nameAr: "معان" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35.40, 29.50], [37.00, 29.30], [37.90, 30.00],
          [36.80, 30.85], [35.90, 30.55], [35.40, 30.60], [35.40, 29.50],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { id: "aqaba", nameEn: "Aqaba", nameAr: "العقبة" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [34.95, 29.20], [35.60, 29.20], [35.55, 29.70],
          [35.40, 29.85], [34.95, 29.60], [34.95, 29.20],
        ]],
      },
    },
  ],
};
