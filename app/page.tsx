"use client";

import { useState, useMemo, useCallback } from "react";
import { Header } from "@/components/header";
import { KPICards } from "@/components/kpi-cards";
import { Timeline } from "@/components/timeline";
import { ChinaMap } from "@/components/china-map";
import { HouseDetail } from "@/components/house-detail";
import { BarChart } from "@/components/bar-chart";
import { RadarChart } from "@/components/radar-chart";
import { CompareChart } from "@/components/compare-chart";
import { ChartCard } from "@/components/chart-card";
import { Footer } from "@/components/footer";
import { allHouses, House, climateColors } from "@/lib/data";

export default function HomePage() {
  const [currentPeriod, setCurrentPeriod] = useState("all");
  const [climateFilter, setClimateFilter] = useState("all");
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  // Filter houses based on period and climate
  const filteredHouses = useMemo(() => {
    let houses = [...allHouses];
    
    if (currentPeriod !== "all") {
      houses = houses.filter((h) => h.period === currentPeriod);
    }
    
    if (climateFilter !== "all") {
      houses = houses.filter((h) => h.climate === climateFilter);
    }
    
    return houses;
  }, [currentPeriod, climateFilter]);

  const handleHouseClick = useCallback((house: House) => {
    setSelectedHouse(house);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedHouse(null);
  }, []);

  const handleResetFilters = useCallback(() => {
    setCurrentPeriod("all");
    setClimateFilter("all");
    setSelectedHouse(null);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6 lg:px-8">
        {/* Header */}
        <Header />

        {/* Timeline Section */}
        <div className="mt-6">
          <Timeline
            currentPeriod={currentPeriod}
            onPeriodChange={setCurrentPeriod}
          />
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <select
            value={climateFilter}
            onChange={(e) => setClimateFilter(e.target.value)}
            className="rounded-full border border-accent bg-card px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">🌍 全部气候区</option>
            {Object.keys(climateColors).map((climate) => (
              <option key={climate} value={climate}>
                {climate}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleClearSelection}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
          >
            ✨ 清除选中
          </button>
          
          <button
            onClick={handleResetFilters}
            className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            🔄 重置筛选
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mt-6">
          <KPICards houses={filteredHouses} />
        </div>

        {/* Map and Detail Panel */}
        <div id="map" className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Map Card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <div className="border-b border-border bg-muted/50 px-6 py-4">
              <h2 className="flex items-center gap-2 font-bold text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                民居地理分布 · 气候区划
              </h2>
            </div>
            <div className="p-4">
              <div className="h-[480px]">
                <ChinaMap
                  houses={filteredHouses}
                  onHouseClick={handleHouseClick}
                />
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <div className="border-b border-border bg-muted/50 px-6 py-4">
              <h2 className="flex items-center gap-2 font-bold text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                民居智慧详情
              </h2>
            </div>
            <div className="max-h-[520px] overflow-y-auto p-5">
              <HouseDetail house={selectedHouse} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div id="charts" className="mt-8 grid gap-6 lg:grid-cols-2">
          <ChartCard title="建筑特征对比 · 墙体/窗墙/坡度" icon="📊">
            <BarChart houses={filteredHouses} onHouseClick={handleHouseClick} />
          </ChartCard>

          <ChartCard title="南北民居对比" icon="✨">
            <CompareChart houses={filteredHouses} />
          </ChartCard>

          <ChartCard title="气候适应性评分 · 五维雷达" icon="⭐">
            <RadarChart houses={filteredHouses} />
          </ChartCard>

          {/* Stats Summary Card */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            <div className="flex items-center gap-2 bg-primary px-5 py-3.5 text-primary-foreground">
              <span className="text-lg">📈</span>
              <h3 className="font-semibold">数据统计摘要</h3>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <StatItem
                  label="最厚墙体"
                  value={Math.max(...filteredHouses.map((h) => h.wall))}
                  unit="mm"
                  house={filteredHouses.find(
                    (h) => h.wall === Math.max(...filteredHouses.map((x) => x.wall))
                  )?.name}
                />
                <StatItem
                  label="最陡坡度"
                  value={Math.max(...filteredHouses.map((h) => h.pitch))}
                  unit="°"
                  house={filteredHouses.find(
                    (h) => h.pitch === Math.max(...filteredHouses.map((x) => x.pitch))
                  )?.name}
                />
                <StatItem
                  label="最高保温"
                  value={Math.max(...filteredHouses.map((h) => h.scores.保温))}
                  unit="分"
                  house={filteredHouses.find(
                    (h) => h.scores.保温 === Math.max(...filteredHouses.map((x) => x.scores.保温))
                  )?.name}
                />
                <StatItem
                  label="最佳通风"
                  value={Math.max(...filteredHouses.map((h) => h.scores.通风))}
                  unit="分"
                  house={filteredHouses.find(
                    (h) => h.scores.通风 === Math.max(...filteredHouses.map((x) => x.scores.通风))
                  )?.name}
                />
              </div>
              
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">当前筛选：</span>
                  共 {filteredHouses.length} 种民居
                  {selectedHouse && (
                    <>
                      <span className="mx-2">|</span>
                      <span className="font-medium text-primary">
                        选中：{selectedHouse.name}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  unit,
  house,
}: {
  label: string;
  value: number;
  unit: string;
  house?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-accent hover:shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-primary">
        {value}
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          {unit}
        </span>
      </p>
      {house && (
        <p className="mt-1 truncate text-xs text-muted-foreground">{house}</p>
      )}
    </div>
  );
}
