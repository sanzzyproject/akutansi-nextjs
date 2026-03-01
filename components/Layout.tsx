"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, FileText, Moon, Sun, BookOpen, Scale } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

// MENU BARU DITAMBAHKAN DI SINI
const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transaksi', label: 'Persamaan', icon: ArrowLeftRight },
  { path: '/analisis', label: 'Analisis D/K', icon: Scale }, // <-- INI MENU BARUNYA
  { path: '/laporan', label: 'Laporan', icon: FileText },
  { path: '/docs', label: 'Docs', icon: BookOpen },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('theme') === 'dark';
    setDark(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="touch-target">
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentTitle = navItems.find(n => n.path === pathname)?.label || 'Akuntansi LKS';

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {!isMobile && (
        <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col fixed h-full z-30">
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-primary">📊 Akuntansi LKS</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Sistem Perhitungan Modern</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors touch-target ${
                    active
                      ? 'bg-sidebar-accent text-sidebar-primary font-semibold'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-sidebar-border">
            <ThemeToggle />
          </div>
        </aside>
      )}

      <main className={`flex-1 ${!isMobile ? 'ml-64' : ''} ${isMobile ? 'pb-20' : ''}`}>
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border px-4 md:px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{currentTitle}</h2>
          {isMobile && <ThemeToggle />}
        </header>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-lg border-t border-border flex justify-around py-2 px-2 pb-safe">
          {navItems.map(item => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors touch-target ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
