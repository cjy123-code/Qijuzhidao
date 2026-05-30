"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { House, climateColors } from "@/lib/data";

interface ChinaMapProps {
  houses: House[];
  onHouseClick: (house: House) => void;
}

export function ChinaMap({ houses, onHouseClick }: ChinaMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load China map data from public folder
    fetch("/china.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((geoJson) => {
        echarts.registerMap("china", geoJson);
        setMapLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load map:", err);
        setError("地图加载失败");
      });
  }, []);

  useEffect(() => {
    if (!chartRef.current || !mapLoaded) return;

    chartInstance.current = echarts.init(chartRef.current);

    const scatterData = houses.map((h) => ({
      name: h.name,
      value: [...h.coords, h.wall],
      climate: h.climate,
      itemStyle: { color: climateColors[h.climate] },
    }));

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: [8, 12],
        textStyle: {
          color: "#1f2937",
          fontSize: 13,
        },
        formatter: (params: unknown) => {
          const p = params as { data?: { name: string; climate: string } };
          if (p.data) {
            return `<strong>${p.data.name}</strong><br/><span style="color:#6b7280">${p.data.climate}</span>`;
          }
          return "";
        },
      },
      geo: {
        map: "china",
        roam: true,
        zoom: 1.2,
        center: [105, 36],
        itemStyle: {
          areaColor: "#fef3c7",
          borderColor: "#d97706",
          borderWidth: 1.5,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#fde68a",
          },
          label: {
            show: false,
          },
        },
        select: {
          disabled: true,
        },
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: scatterData,
          symbolSize: 16,
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.25)",
          },
          emphasis: {
            scale: 1.6,
            itemStyle: {
              shadowBlur: 16,
              shadowColor: "rgba(0, 0, 0, 0.35)",
            },
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Click handler
    chartInstance.current.on("click", (params: unknown) => {
      const p = params as { seriesType?: string; data?: { name: string } };
      if (p.seriesType === "scatter" && p.data) {
        const house = houses.find((h) => h.name === p.data?.name);
        if (house) {
          onHouseClick(house);
        }
      }
    });

    // Resize handler
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [houses, onHouseClick, mapLoaded]);

  return (
    <div className="h-full w-full">
      {!mapLoaded && !error && (
        <div className="flex h-[400px] items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>加载地图中...</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      )}
      
      <div 
        ref={chartRef} 
        className="h-full w-full min-h-[400px]" 
        style={{ display: mapLoaded ? "block" : "none" }}
      />
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 rounded-full bg-muted/50 px-4 py-2">
        {Object.entries(climateColors).map(([climate, color]) => (
          <div key={climate} className="flex items-center gap-2 text-xs font-medium">
            <span
              className="h-3 w-3 rounded-full shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground">{climate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
