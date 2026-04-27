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

  useEffect(() => {
    // Load China map data from jsdelivr CDN (echarts-china-cities-js)
    fetch("https://cdn.jsdelivr.net/npm/echarts@5/map/json/china.json")
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
        // Fallback: use simple map without provinces
        setMapLoaded(true);
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
      tooltip: {
        trigger: "item",
        formatter: (params: { data?: { name: string; climate: string } }) => {
          if (params.data) {
            return `<strong>${params.data.name}</strong><br/>${params.data.climate}`;
          }
          return "";
        },
      },
      geo: {
        map: "china",
        roam: true,
        zoom: 1.15,
        center: [105, 36],
        itemStyle: {
          areaColor: "#f3e9d2",
          borderColor: "#c9a86c",
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#e8dcc4",
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
          symbolSize: 14,
          itemStyle: {
            shadowBlur: 8,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
          emphasis: {
            scale: 1.5,
            itemStyle: {
              shadowBlur: 12,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Click handler
    chartInstance.current.on("click", (params: { seriesType?: string; data?: { name: string } }) => {
      if (params.seriesType === "scatter" && params.data) {
        const house = houses.find((h) => h.name === params.data?.name);
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
      {!mapLoaded ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-muted-foreground">加载地图中...</div>
        </div>
      ) : (
        <div ref={chartRef} className="h-full w-full min-h-[400px]" />
      )}
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 rounded-full bg-muted/50 px-4 py-2">
        {Object.entries(climateColors).map(([climate, color]) => (
          <div key={climate} className="flex items-center gap-2 text-xs font-medium">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground">{climate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
