"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { House, climateColors } from "@/lib/data";

interface BarChartProps {
  houses: House[];
  onHouseClick: (house: House) => void;
}

export function BarChart({ houses, onHouseClick }: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["墙体厚度 (mm)", "窗墙比", "屋顶坡度 (°)"],
        top: 0,
        textStyle: {
          fontSize: 11,
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "12%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: houses.map((h) => h.name),
        axisLabel: {
          rotate: 45,
          interval: 0,
          fontSize: 9,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "墙体/坡度",
          nameTextStyle: {
            fontSize: 10,
          },
        },
        {
          type: "value",
          name: "窗墙比",
          min: 0,
          max: 0.5,
          nameTextStyle: {
            fontSize: 10,
          },
        },
      ],
      series: [
        {
          name: "墙体厚度 (mm)",
          type: "bar",
          data: houses.map((h) => ({
            value: h.wall,
            itemStyle: { color: climateColors[h.climate] },
          })),
          barMaxWidth: 20,
        },
        {
          name: "窗墙比",
          type: "line",
          yAxisIndex: 1,
          data: houses.map((h) => h.ratio),
          lineStyle: {
            color: "#d4af37",
            width: 2,
          },
          itemStyle: {
            color: "#d4af37",
          },
          symbol: "circle",
          symbolSize: 6,
        },
        {
          name: "屋顶坡度 (°)",
          type: "bar",
          data: houses.map((h) => ({
            value: h.pitch,
            itemStyle: { 
              color: climateColors[h.climate],
              opacity: 0.6,
            },
          })),
          barMaxWidth: 20,
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Click handler
    chartInstance.current.on("click", (params: { dataIndex?: number }) => {
      if (typeof params.dataIndex === "number") {
        onHouseClick(houses[params.dataIndex]);
      }
    });

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [houses, onHouseClick]);

  return <div ref={chartRef} className="h-[400px] w-full" />;
}
