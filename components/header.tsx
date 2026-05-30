"use client";

const navLinks = [
  { href: "#map", label: "分布地图", icon: "M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" },
  { href: "#charts", label: "数据图表", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "#timeline", label: "时间演变", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export function Header() {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/95 via-primary to-primary/90 p-6 shadow-xl md:rounded-3xl md:p-8">
      {/* Decorative background element */}
      <div className="absolute -right-8 -bottom-12 select-none font-serif text-[140px] opacity-[0.06]">
        鹿
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo and title */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-3xl backdrop-blur-sm">
              🏮
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-wider text-primary-foreground md:text-3xl">
                栖居之道
              </h1>
              <p className="mt-0.5 border-l-2 border-accent pl-3 text-sm text-amber-100/80">
                气候适应性智慧 · 数据大屏
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 rounded-full border border-accent/40 bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                </svg>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Intro quote */}
        <div className="mt-6 rounded-full border border-accent/30 bg-background/90 px-6 py-3 backdrop-blur-sm">
          <p className="text-sm text-foreground md:text-base">
            <span className="font-semibold text-primary">{'"'}天人合一，道法自然{'"'}</span>
            <span className="mx-2 text-muted-foreground">——</span>
            <span className="text-muted-foreground">传统民居顺应天时、地气、材美。</span>
          </p>
        </div>
      </div>
    </header>
  );
}
