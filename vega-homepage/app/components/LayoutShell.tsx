"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge, Github, Figma, Menu, X } from "@alphacode-ai/design-system";
import Sidebar from "@/app/components/Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        <div className="flex gap-2">
          <a
            href="https://www.figma.com/design/rRs5AH6WcwpVj95rYNZ3Mi/AlphaCode_DS_homepage?node-id=100-3696&t=ycnVmaZiomaJ6tkZ-1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background transition-opacity hover:opacity-80"
          >
            <Figma size={16} />
          </a>
          <a
            href="https://github.com/AlphaCode-AI/design-System"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background transition-opacity hover:opacity-80"
          >
            <Github size={16} />
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
