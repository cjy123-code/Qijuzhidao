"use client";

import { House } from "@/lib/data";

interface KPICardsProps {
  houses: House[];
}

export function KPICards({ houses }: KPICardsProps) {
  const total = houses.length;
  const avgWall = Math.round(houses.reduce((s, h) => s + h.wall, 0) / total);
  const avgInsulation = (houses.reduce((s, h) => s + h.scores.保温, 0) / total).toFixed(1);
  const climateCount = new Set(houses.map((h) => h.climate)).size;

  const cards = [
    { icon: "🏘️", label: "民居数量", value: total, unit: "处" },
    { icon: "🧱", label: "平均墙体厚度", value: avgWall, unit: "mm" },
    { icon: "🔥", label: "平均保温评分", value: avgInsulation, unit: "/10" },
    { icon: "🌍", label: "覆盖气候区", value: climateCount, unit: "个" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-md transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
        >
          <div className="absolute -right-2 -top-2 text-5xl opacity-10 transition-transform group-hover:scale-110">
            {card.icon}
          </div>
          <div className="relative">
            <div className="text-3xl">{card.icon}</div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold text-primary md:text-4xl">
              {card.value}
            </p>
            <p className="text-sm text-muted-foreground">{card.unit}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
