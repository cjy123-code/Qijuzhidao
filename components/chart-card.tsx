"use client";

import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  icon: string;
  children: ReactNode;
}

export function ChartCard({ title, icon, children }: ChartCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-2 bg-primary px-5 py-3.5 text-primary-foreground">
        <span className="text-lg">{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
