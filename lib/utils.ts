import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (n: number, locale: string = "en-US"): string =>
  new Intl.NumberFormat(locale).format(Math.round(n));

export const formatCompact = (n: number, locale: string = "en-US"): string =>
  new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const formatPercent = (n: number, locale: string = "en-US"): string =>
  new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(n);

export const formatDecimal = (
  n: number,
  digits: number = 1,
  locale: string = "en-US"
): string =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);

export const localeFor = (lang: "en" | "ar"): string =>
  lang === "ar" ? "ar-JO" : "en-US";
