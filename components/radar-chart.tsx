"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { House, climateColors } from "@/lib/data";

interface RadarChartProps {
  houses: House[];
}

export function RadarChart({ houses }: RadarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: (params: { name?: string; value?: number[] }) => {
          if (!params.value || !params.name) return "";
          const indicators = ["保温", "隔热", "通风", "防潮", "采光"];
          let html = `<strong>${params.name}</strong><br/>`;
          (params.value as number[]).forEach((val, idx) => {
            html += `${indicators[idx]}: ${val} 分<br/>`;
          });
          return html;
        },
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: 0,
        top: 20,
        bottom: 20,
        textStyle: {
          fontSize: 9,
        },
        formatter: (name: string) => (name.length > 8 ? name.slice(0, 6) + "..." : name),
        pageIconSize: 10,
        pageIconColor: "#6a994e",
      },
      radar: {
        indicator: [
          { name: "保温", max: 10 },
          { name: "隔热", max: 10 },
          { name: "通风", max: 10 },
          { name: "防潮", max: 10 },
          { name: "采光", max: 10 },
        ],
        shape: "circle",
        center: ["55%", "50%"],
        radius: "60%",
        name: {
          textStyle: {
            fontSize: 11,
            fontWeight: "bold",
            color: "#5a3a2a",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#e8e0d3",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#e8e0d3",
          },
        },
        splitArea: {
          areaStyle: {
            color: ["#faf8f5", "#f4efe6"],
          },
        },
      },
      series: [
        {
          type: "radar",
          data: houses.map((house) => ({
            name: house.name,
            value: [
              house.scores.保温,
              house.scores.隔热,
              house.scores.通风,
              house.scores.防潮,
              house.scores.采光,
            ],
            lineStyle: {
              color: climateColors[house.climate],
              width: 1.5,
            },
            areaStyle: {
              color: climateColors[house.climate] + "30",
            },
            symbol: "circle",
            symbolSize: 4,
            itemStyle: {
              color: climateColors[house.climate],
            },
          })),
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [houses]);

  return <div ref={chartRef} className="h-[400px] w-full" />;
}
