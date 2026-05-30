"use client";

import { House, climateColors } from "@/lib/data";

interface HouseDetailProps {
  house: House | null;
}

export function HouseDetail({ house }: HouseDetailProps) {
  if (!house) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 text-6xl opacity-30">🏠</div>
        <p className="text-muted-foreground">
          点击地图上的标记点
          <br />
          查看完整建筑智慧数据
        </p>
      </div>
    );
  }

  const metrics = [
    { icon: "🏗️", label: "墙体材料", value: house.wallMat },
    { icon: "🧱", label: "墙体厚度", value: `${house.wall} mm` },
    { icon: "📐", label: "屋顶坡度", value: `${house.pitch}°` },
    { icon: "🪟", label: "窗墙比", value: house.ratio.toString() },
    { icon: "🌡️", label: "年均温", value: `${house.temp}℃` },
    { icon: "💧", label: "年降水", value: `${house.precip} mm` },
  ];

  const adaptations = [
    { icon: "🧱", label: "隔热", value: house.insulation },
    { icon: "🔥", label: "保温", value: house.heatKeep },
    { icon: "🌬️", label: "通风", value: house.ventilation },
    { icon: "💧", label: "防潮", value: house.moisture },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-extrabold tracking-wide text-primary">
          {house.name}
        </h3>
        <span
          className="mt-2 inline-block rounded-full border px-4 py-1 text-xs font-bold"
          style={{
            backgroundColor: climateColors[house.climate] + "20",
            borderColor: climateColors[house.climate],
            color: climateColors[house.climate],
          }}
        >
          {house.climate}
        </span>
      </div>

      {/* Description */}
      <div className="rounded-2xl border-l-4 border-primary bg-muted/50 p-4">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold text-primary">简介：</span>
          {house.desc}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="rounded-2xl bg-muted/50 p-4">
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-baseline gap-2 border-b border-dashed border-border pb-2 text-sm"
            >
              <span className="text-lg">{metric.icon}</span>
              <span className="min-w-[60px] font-semibold text-muted-foreground">
                {metric.label}
              </span>
              <span className="font-medium text-foreground">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptations */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 font-bold text-primary">
          🏮 气候适应性智慧
        </h4>
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted p-4">
          {adaptations.map((item, index) => (
            <div
              key={index}
              className="border-l-2 border-accent pl-3 text-sm leading-relaxed"
            >
              <span className="font-bold text-primary">
                {item.icon} {item.label}
              </span>
              <br />
              <span className="text-muted-foreground">{item.value || "—"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Climate Range */}
      <div className="rounded-2xl bg-muted px-4 py-3">
        <p className="text-sm">
          <span className="font-bold text-primary">🌡️ 气候特征</span>
          <span className="mx-2 text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            年均温 {house.tempRange}
            {house.precipRange && ` | 降水 ${house.precipRange}`}
            {house.humidity && ` | 湿度 ${house.humidity}`}
          </span>
        </p>
      </div>
    </div>
  );
}
