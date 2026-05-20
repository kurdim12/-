"use client";

import { useMemo } from "react";
import {
  MapContainer,
  GeoJSON,
  Marker,
} from "react-leaflet";
import L, { type Layer, type PathOptions } from "leaflet";
import type { Feature } from "geojson";
import {
  JORDAN_GOVERNORATES_GEOJSON,
  type GovFeature,
} from "@/data/geojson";
import { GOVERNORATES, type GovernorateId } from "@/data/governorates";
import { useLanguage } from "./LanguageContext";

export interface MapLayerSpec {
  fillById: Record<GovernorateId, string>;
  valueById?: Partial<Record<GovernorateId, string>>;
  detailById?: Partial<Record<GovernorateId, string>>;
}

export interface JordanMapInnerProps {
  layer: MapLayerSpec;
  selectedId?: GovernorateId;
  onSelect?: (id: GovernorateId) => void;
  height?: number | string;
  showLabels?: boolean;
}

// Real Jordan bounding box
const JORDAN_BOUNDS: L.LatLngBoundsExpression = [
  [29.18, 34.95],
  [33.38, 39.30],
];

export default function JordanMapInner({
  layer,
  selectedId,
  onSelect,
  height = "100%",
  showLabels = true,
}: JordanMapInnerProps) {
  const { lang } = useLanguage();

  const styleFn = (feature?: Feature): PathOptions => {
    const id = (feature?.properties as GovFeature["properties"] | undefined)?.id;
    const fill = id ? layer.fillById[id] ?? "#E5EAF2" : "#E5EAF2";
    const isSelected = id && selectedId === id;
    return {
      fillColor: fill,
      fillOpacity: isSelected ? 0.92 : 0.82,
      color: isSelected ? "#0A2540" : "#FFFFFF",
      weight: isSelected ? 2.2 : 1.1,
      lineJoin: "round",
    };
  };

  const onEach = (feature: Feature, lyr: Layer) => {
    const props = feature.properties as GovFeature["properties"];
    const name = lang === "ar" ? props.nameAr : props.nameEn;
    const val = layer.valueById?.[props.id];
    const detail = layer.detailById?.[props.id];
    const html = `
      <div style="min-width:140px;font-family:inherit">
        <div style="font-weight:600;color:#0A2540;font-size:13px">${name}</div>
        ${val ? `<div style="margin-top:2px;color:#475467;font-size:12px">${val}</div>` : ""}
        ${detail ? `<div style="margin-top:1px;color:#98A2B3;font-size:11px">${detail}</div>` : ""}
      </div>`;
    lyr.bindTooltip(html, { sticky: true, direction: "top", opacity: 1, className: "sehha-tip" });

    // Hover effect
    lyr.on("mouseover", (e) => {
      const target = e.target as L.Path;
      target.setStyle({ fillOpacity: 0.94, weight: 1.8 });
      target.bringToFront();
    });
    lyr.on("mouseout", (e) => {
      const target = e.target as L.Path;
      const id = props.id;
      const isSel = id === selectedId;
      target.setStyle({
        fillOpacity: isSel ? 0.92 : 0.82,
        weight: isSel ? 2.2 : 1.1,
      });
    });

    if (onSelect) lyr.on("click", () => onSelect(props.id));
  };

  // re-render trigger when layer / selection / language changes
  const geoKey = useMemo(
    () =>
      Object.values(layer.fillById).join("|") +
      "::" +
      (selectedId ?? "") +
      "::" +
      lang,
    [layer, selectedId, lang]
  );

  // Build label markers
  const labelMarkers = useMemo(() => {
    if (!showLabels) return [];
    return GOVERNORATES.map((g) => {
      const text = lang === "ar" ? g.nameAr : g.nameEn;
      const icon = L.divIcon({
        className: "sehha-label",
        html: `<span class="sehha-label-pill">${text}</span>`,
        iconSize: [80, 18],
        iconAnchor: [40, 9],
      });
      return { id: g.id, lat: g.lat, lon: g.lon, icon };
    });
  }, [lang, showLabels]);

  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <MapContainer
        bounds={JORDAN_BOUNDS}
        boundsOptions={{ padding: [12, 12] }}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={false}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 6,
          background: "#F1F4F8",
        }}
      >
        <GeoJSON
          key={geoKey}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={JORDAN_GOVERNORATES_GEOJSON as any}
          style={styleFn}
          onEachFeature={onEach}
        />
        {labelMarkers.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lon]}
            icon={m.icon}
            interactive={false}
            keyboard={false}
          />
        ))}
      </MapContainer>
    </div>
  );
}
