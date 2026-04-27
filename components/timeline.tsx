"use client";

import { periodLabels } from "@/lib/data";

interface TimelineProps {
  currentPeriod: string;
  onPeriodChange: (period: string) => void;
}

const periods = ["pre_qin", "qin_han", "wei_jin_tang", "song_yuan", "ming_qing", "all"];

export function Timeline({ currentPeriod, onPeriodChange }: TimelineProps) {
  const current = periodLabels[currentPeriod];

  return (
    <section id="timeline" className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <h2 className="flex items-center gap-3 border-l-4 border-accent pl-4 text-lg font-bold text-primary">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        民居智慧演变 · 时间轴
      </h2>
      
      <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
        {periods.map((period) => {
          const info = periodLabels[period];
          const isActive = currentPeriod === period;
          
          return (
            <button
              key={period}
              onClick={() => onPeriodChange(period)}
              className={`flex-1 min-w-[90px] rounded-full border px-3 py-2.5 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-muted text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className="mr-1">{info.icon}</span>
              <span className="hidden sm:inline">{info.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 rounded-full border-l-4 border-accent bg-muted px-5 py-3">
        <p className="text-sm">
          <span className="font-bold text-primary">{current.icon} 当前：{current.label}</span>
          <span className="mx-2 text-muted-foreground">—</span>
          <span className="text-muted-foreground">{current.note}</span>
        </p>
      </div>
    </section>
  );
}
