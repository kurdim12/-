export type GovernorateId =
  | "amman"
  | "irbid"
  | "zarqa"
  | "mafraq"
  | "balqa"
  | "karak"
  | "jerash"
  | "madaba"
  | "ajloun"
  | "aqaba"
  | "maan"
  | "tafilah";

export interface Governorate {
  id: GovernorateId;
  nameEn: string;
  nameAr: string;
  population: number;
  lat: number;
  lon: number;
}

export const GOVERNORATES: Governorate[] = [
  { id: "amman",   nameEn: "Amman",   nameAr: "عمّان",    population: 4_500_000, lat: 31.95, lon: 35.93 },
  { id: "irbid",   nameEn: "Irbid",   nameAr: "إربد",    population: 2_000_000, lat: 32.55, lon: 35.85 },
  { id: "zarqa",   nameEn: "Zarqa",   nameAr: "الزرقاء", population: 1_500_000, lat: 32.07, lon: 36.09 },
  { id: "mafraq",  nameEn: "Mafraq",  nameAr: "المفرق",  population:   600_000, lat: 32.34, lon: 36.21 },
  { id: "balqa",   nameEn: "Balqa",   nameAr: "البلقاء", population:   540_000, lat: 32.04, lon: 35.73 },
  { id: "karak",   nameEn: "Karak",   nameAr: "الكرك",   population:   360_000, lat: 31.18, lon: 35.70 },
  { id: "jerash",  nameEn: "Jerash",  nameAr: "جرش",     population:   270_000, lat: 32.27, lon: 35.90 },
  { id: "madaba",  nameEn: "Madaba",  nameAr: "مادبا",   population:   220_000, lat: 31.72, lon: 35.79 },
  { id: "ajloun",  nameEn: "Ajloun",  nameAr: "عجلون",   population:   200_000, lat: 32.33, lon: 35.75 },
  { id: "aqaba",   nameEn: "Aqaba",   nameAr: "العقبة",  population:   200_000, lat: 29.53, lon: 35.01 },
  { id: "maan",    nameEn: "Maan",    nameAr: "معان",    population:   170_000, lat: 30.20, lon: 35.73 },
  { id: "tafilah", nameEn: "Tafilah", nameAr: "الطفيلة", population:   110_000, lat: 30.84, lon: 35.60 },
];

export const TOTAL_POPULATION = GOVERNORATES.reduce((s, g) => s + g.population, 0);

export const govById = (id: GovernorateId): Governorate =>
  GOVERNORATES.find((g) => g.id === id)!;
