"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastSeries } from "@/lib/forecasting";
import { formatNumber } from "@/lib/utils";

interface ForecastChartProps {
  series: ForecastSeries;
  height?: number;
  historyLabel: string;
  forecastLabel: string;
  ciLabel: string;
}

export function ForecastChart({
  series,
  height = 260,
  historyLabel,
  forecastLabel,
  ciLabel,
}: ForecastChartProps) {
  const data = series.all.map((p) => ({
    monthLabel: p.monthLabel,
    historyValue: p.isForecast ? null : p.value,
    forecastValue: p.isForecast ? p.value : null,
    ciLower: p.lower,
    ciUpper: p.upper,
  }));
  // Stitch the boundary so history line connects forecast line
  const lastHistIdx = series.history.length - 1;
  if (lastHistIdx >= 0 && data[lastHistIdx]) {
    data[lastHistIdx].forecastValue = data[lastHistIdx].historyValue;
  }
  const forecastStart = series.history.at(-1)?.monthLabel;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#E1E7EF"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="monthLabel"
            tick={{ fontSize: 10, fill: "#98A2B3" }}
            tickLine={false}
            axisLine={{ stroke: "#E1E7EF" }}
            interval="preserveStartEnd"
            minTickGap={32}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#98A2B3" }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(v) => formatNumber(v)}
          />
          <Tooltip
            cursor={{ stroke: "#0F4C81", strokeDasharray: 3 }}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E1E7EF",
              borderRadius: 6,
              fontSize: 12,
              color: "#0A2540",
            }}
            formatter={(value, name) => {
              if (value == null || Array.isArray(value))
                return ["—", String(name)];
              return [formatNumber(Number(value)), String(name)];
            }}
          />
          {forecastStart && (
            <ReferenceLine
              x={forecastStart}
              stroke="#98A2B3"
              strokeDasharray="2 4"
              label={{
                value: forecastLabel,
                position: "insideTopRight",
                fill: "#98A2B3",
                fontSize: 10,
              }}
            />
          )}
          {/* CI band — drawn as upper line with area, lower line as transparent base trick.
              Recharts doesn't directly support band; we approximate by drawing upper area
              with a gradient and lower as a masking transparent line. Simpler: use
              two stacked Area-like Lines via Line+dot. We'll draw both bounds as faint lines. */}
          <Area
            type="monotone"
            dataKey="ciUpper"
            stroke="none"
            fill="#0F4C81"
            fillOpacity={0.08}
            isAnimationActive={false}
            connectNulls
            name={ciLabel}
          />
          <Area
            type="monotone"
            dataKey="ciLower"
            stroke="none"
            fill="#FAFBFC"
            fillOpacity={1}
            isAnimationActive={false}
            connectNulls
            name=""
          />
          <Line
            type="monotone"
            dataKey="historyValue"
            stroke="#0F4C81"
            strokeWidth={2}
            dot={false}
            connectNulls
            name={historyLabel}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="forecastValue"
            stroke="#0F4C81"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            connectNulls
            name={forecastLabel}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
