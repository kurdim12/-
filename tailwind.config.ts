import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#FAFBFC",
          secondary: "#FFFFFF",
          tertiary: "#F1F4F8",
        },
        border: {
          DEFAULT: "#E1E7EF",
        },
        text: {
          primary: "#0A2540",
          secondary: "#475467",
          muted: "#98A2B3",
        },
        accent: {
          primary: "#0F4C81",
          medical: "#10B981",
          alert: "#DC2626",
          warning: "#F59E0B",
          good: "#059669",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        arabic: ["IBM Plex Sans Arabic", "Tahoma", "sans-serif"],
      },
      fontVariantNumeric: {
        "tabular-nums": "tabular-nums",
      },
      letterSpacing: {
        tightish: "-0.01em",
      },
    },
  },
  plugins: [],
};

export default config;
