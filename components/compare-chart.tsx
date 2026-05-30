"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { House } from "@/lib/data";

interface CompareChartProps {
  houses: House[];
}

export function CompareChart({ houses }: CompareChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    // Calculate north/south averages
    const north = houses.filter(
      (h) => h.climate === "严寒区" || h.climate === "寒冷区"
    );
    const south = houses.filter((h) =>
      ["夏热冬冷区", "夏热冬暖区", "温和区"].includes(h.climate)
    );

    const northAvg = {
      wall: north.length ? north.reduce((a, b) => a + b.wall, 0) / north.length : 0,
      ratio: north.length ? north.reduce((a, b) => a + b.ratio, 0) / north.length : 0,
      pitch: north.length ? north.reduce((a, b) => a + b.pitch, 0) / north.length : 0,
    };

    const southAvg = {
      wall: south.length ? south.reduce((a, b) => a + b.wall, 0) / south.length : 0,
      ratio: south.length ? south.reduce((a, b) => a + b.ratio, 0) / south.length : 0,
      pitch: south.length ? south.reduce((a, b) => a + b.pitch, 0) / south.length : 0,
    };

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["北方民居", "南方民居"],
        top: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["墙体厚度 (mm)", "窗墙比 (x100)", "屋顶坡度 (°)"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "北方民居",
          type: "bar",
          data: [
            Math.round(northAvg.wall),
            Math.round(northAvg.ratio * 100),
            Math.round(northAvg.pitch),
          ],
          itemStyle: {
            color: "#4a6fa5",
            borderRadius: [4, 4, 0, 0],
          },
          barMaxWidth: 60,
        },
        {
          name: "南方民居",
          type: "bar",
          data: [
            Math.round(southAvg.wall),
            Math.round(southAvg.ratio * 100),
            Math.round(southAvg.pitch),
          ],
          itemStyle: {
            color: "#e28a55",
            borderRadius: [4, 4, 0, 0],
          },
          barMaxWidth: 60,
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
