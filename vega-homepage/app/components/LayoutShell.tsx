"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Badge, Menu, Sun, Moon, ToggleGroup, ToggleGroupItem } from "@alphacode-ai/design-system";
import Sidebar from "@/app/components/Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <div className="flex h-screen flex-col bg-background font-sans text-foreground overflow-hidden">

      {/* ── Header ── */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="flex md:hidden items-center justify-center w-8 h-8 rounded-md hover:bg-ac-gray-10 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="메뉴 열기"
          >
            <Menu size={20} />
          </button>
          <Image src="/vega_logo.png" alt="VEGA UI" width={112} height={28} priority />
          <Badge variant="primary" size="sm">v0.3.0</Badge>
        </div>

        <div className="flex gap-1">
          <ToggleGroup
            value={theme}
            variant="primary"
            onValueChange={(v) => v && toggleTheme()}
            iconOnly
          >
            <ToggleGroupItem value="light" icon={<Moon />} aria-label="라이트 모드" />
            <ToggleGroupItem value="dark" icon={<Sun />} aria-label="다크 모드" />
          </ToggleGroup>
          <a
            href="https://www.figma.com/design/rRs5AH6WcwpVj95rYNZ3Mi/AlphaCode_DS_homepage?node-id=100-3696&t=ycnVmaZiomaJ6tkZ-1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background transition-opacity hover:opacity-80 ml-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/>
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
            </svg>
          </a>
          <a
            href="https://github.com/AlphaCode-AI/design-System"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background transition-opacity hover:opacity-80"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-overlay md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>

    </div>
  );
}
