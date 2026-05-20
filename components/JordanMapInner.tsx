"use client";

import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
import type { Layer, PathOptions } from "leaflet";
import type { Feature } from "geojson";
import {
  JORDAN_GOVERNORATES_GEOJSON,
  type GovFeature,
} from "@/data/geojson";
import { GOVERNORATES, type GovernorateId } from "@/data/governorates";
import { useLanguage } from "./LanguageContext";

export interface MapLayerSpec {
  /** color per governorate */
  fillById: Record<GovernorateId, string>;
  /** human-readable value per governorate for tooltips */
  valueById?: Partial<Record<GovernorateId, string>>;
  /** small secondary label per governorate */
  detailById?: Partial<Record<GovernorateId, string>>;
}

export interface JordanMapInnerProps {
  layer: MapLayerSpec;
  selectedId?: GovernorateId;
  onSelect?: (id: GovernorateId) => void;
  height?: number | string;
}

const JORDAN_CENTER: [number, number] = [31.4, 36.4];
const JORDAN_ZOOM = 7;

export default function JordanMapInner({
  layer,
  selectedId,
  onSelect,
  height = "100%",
}: JordanMapInnerProps) {
  const { lang } = useLanguage();

  const styleFn = (feature?: Feature): PathOptions => {
    const id = (feature?.properties as GovFeature["properties"] | undefined)?.id;
    const fill = id ? layer.fillById[id] ?? "#E1E7EF" : "#E1E7EF";
    const isSelected = id && selectedId === id;
    return {
      fillColor: fill,
      fillOpacity: 0.78,
      color: isSelected ? "#0A2540" : "#FFFFFF",
      weight: isSelected ? 2.4 : 1.2,
    };
  };

  const onEach = (feature: Feature, lyr: Layer) => {
    const props = feature.properties as GovFeature["properties"];
    const name = lang === "ar" ? props.nameAr : props.nameEn;
    const val = layer.valueById?.[props.id];
    const detail = layer.detailById?.[props.id];
    const html = `
      <div style="min-width:140px">
        <div style="font-weight:600;color:#0A2540">${name}</div>
        ${val ? `<div style="margin-top:2px;color:#475467">${val}</div>` : ""}
        ${detail ? `<div style="margin-top:1px;color:#98A2B3;font-size:11px">${detail}</div>` : ""}
      </div>`;
    lyr.bindTooltip(html, { sticky: true, direction: "top", opacity: 1 });
    if (onSelect) {
      lyr.on("click", () => onSelect(props.id));
    }
  };

  // re-render trigger when layer changes
  const geoKey = useMemo(
    () =>
      Object.values(layer.fillById).join("|") +
      "::" +
      (selectedId ?? "") +
      "::" +
      lang,
    [layer, selectedId, lang]
  );

  return (
    <div style={{ width: "100%", height }}>
      <MapContainer
        center={JORDAN_CENTER}
        zoom={JORDAN_ZOOM}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%", borderRadius: 6 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON
          key={geoKey}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={JORDAN_GOVERNORATES_GEOJSON as any}
          style={styleFn}
          onEachFeature={onEach}
        />
        {/* Floating labels (governorate names) */}
        {GOVERNORATES.map((g) => (
          <LabelMarker key={g.id} lat={g.lat} lon={g.lon} label={lang === "ar" ? g.nameAr : g.nameEn} />
        ))}
      </MapContainer>
    </div>
  );
}

import { CircleMarker } from "react-leaflet";

function LabelMarker({
  lat,
  lon,
  label,
}: {
  lat: number;
  lon: number;
  label: string;
}) {
  return (
    <CircleMarker
      center={[lat, lon]}
      radius={2}
      pathOptions={{
        color: "#0A2540",
        fillColor: "#0A2540",
        fillOpacity: 0.9,
        weight: 1,
      }}
    >
      <LeafletTooltip
        permanent
        direction="top"
        opacity={0.92}
        className="!bg-transparent !border-0 !shadow-none"
      >
        <span
          style={{
            color: "#0A2540",
            fontSize: 11,
            fontWeight: 500,
            background: "rgba(255,255,255,0.85)",
            padding: "1px 4px",
            borderRadius: 3,
          }}
        >
          {label}
        </span>
      </LeafletTooltip>
    </CircleMarker>
  );
}
