"use client";

import { useState } from "react";
import {
  TreeList,
  TreeListItemData,
  FileCode,
  FileText,
  Search,
  X,
  ChevronDown,
  cn,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

const FILE_TREE: TreeListItemData[] = [
  {
    id: "src", label: "src", isExpanded: true,
    children: [
      {
        id: "components", label: "components", isExpanded: true,
        children: [
          { id: "Counter.tsx", label: "Counter.tsx", icon: <FileCode size={13} /> },
          { id: "Header.tsx",  label: "Header.tsx",  icon: <FileCode size={13} /> },
          { id: "Layout.tsx",  label: "Layout.tsx",  icon: <FileCode size={13} /> },
        ],
      },
      {
        id: "pages", label: "pages", isExpanded: true,
        children: [
          { id: "index.tsx", label: "index.tsx", icon: <FileCode size={13} /> },
          { id: "about.tsx", label: "about.tsx", icon: <FileCode size={13} /> },
        ],
      },
      {
        id: "styles", label: "styles",
        children: [
          { id: "tokens.ts", label: "tokens.ts", icon: <FileCode size={13} /> },
          { id: "theme.ts",  label: "theme.ts",  icon: <FileCode size={13} /> },
        ],
      },
    ],
  },
  { id: "package.json",    label: "package.json",    icon: <FileText size={13} /> },
  { id: "tsconfig.json",   label: "tsconfig.json",   icon: <FileText size={13} /> },
  { id: "next.config.mjs", label: "next.config.mjs", icon: <FileCode size={13} /> },
];

const CODE_MAP: Record<string, string> = {
  "Counter.tsx":
`import { useState, useCallback } from 'react';
import { Button } from '@alphacode-ai/design-system';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 16,
};
const counterStyle = {
  fontSize: 48,
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
};

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div style={containerStyle}>
      <span style={counterStyle}>
        {count}
      </span>
      <Button onClick={increment}>증가</Button>
      <Button variant="secondary" onClick={reset}>
        초기화
      </Button>
    </div>
  );
}`,

  "Header.tsx":
`interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}`,

  "Layout.tsx":
`interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}`,

  "index.tsx":
`import Counter from '../components/Counter';
import Header from '../components/Header';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Header title="카운터 앱" />
      <main className="p-8">
        <Counter />
      </main>
    </Layout>
  );
}`,

  "about.tsx":
`export default function About() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">소개</h1>
      <p className="text-muted-foreground">
        AlphaCode 디자인 시스템을 활용한 예제 앱입니다.
      </p>
    </div>
  );
}`,

  "tokens.ts":
`export const colors = {
  primary: '#5B6EF5',
  gray: {
    10: '#F7F7F7',
    20: '#ECECEC',
    30: '#E0E0E0',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};`,

  "theme.ts":
`import { colors, spacing } from './tokens';

export const theme = {
  colors,
  spacing,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};`,

  "package.json":
`{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@alphacode-ai/design-system": "^1.0.0",
    "next": "15.5.15",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18"
  }
}`,

  "tsconfig.json":
`{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,

  "next.config.mjs":
`/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;`,
};

const TERMINAL_LINES = [
  { text: "$ yarn dev",                              color: "text-white" },
  { text: "yarn run v1.22.22",                       color: "text-white/60" },
  { text: "$ next dev",                              color: "text-white" },
  { text: "▲ Next.js 15.5.15",                      color: "text-white/80" },
  { text: "  - Local:   http://localhost:3000",      color: "text-white/60" },
  { text: "",                                        color: "" },
  { text: "✓ Ready in 2.4s",                        color: "text-green-400" },
  { text: "○ Compiling /counter ...",                color: "text-white/60" },
  { text: "✓ Compiled /counter in 1.2s (847 modules)", color: "text-green-400" },
  { text: "GET /counter 200 in 1340ms",             color: "text-white/60" },
  { text: "",                                        color: "" },
  { text: "$",                                       color: "text-white" },
];

export default function IDETemplatePage() {
  const [selectedId, setSelectedId] = useState("Counter.tsx");
  const [openTabs, setOpenTabs] = useState<string[]>(["Counter.tsx", "index.tsx"]);
  const [activeTab, setActiveTab] = useState("Counter.tsx");
  const [search, setSearch] = useState("");

  const handleFileSelect = (id: string) => {
    if (!CODE_MAP[id]) return;
    setSelectedId(id);
    setActiveTab(id);
    if (!openTabs.includes(id)) {
      setOpenTabs((prev) => [...prev, id]);
    }
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = openTabs.filter((t) => t !== id);
    setOpenTabs(next);
    if (activeTab === id && next.length > 0) {
      const fallback = next[next.length - 1];
      setActiveTab(fallback);
      setSelectedId(fallback);
    }
  };

  const code = CODE_MAP[activeTab] ?? "";
  const lines = code.split("\n");

  const filteredTree = search
    ? FILE_TREE // 검색 필터링은 생략 (UX 데모 목적)
    : FILE_TREE;

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[1100px] mx-auto">
      <PageHeader
        title="IDE"
        description="TreeList를 활용한 코드 에디터 스타일의 레이아웃 예시입니다."
        border
      />

      <div className="rounded-xl border border-border overflow-hidden flex" style={{ height: 600 }}>

        {/* ── 좌측 파일 트리 ── */}
        <div className="w-56 shrink-0 border-r border-border flex flex-col bg-ac-gray-10">
          <div className="px-2 py-2 border-b border-border shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background border border-border">
              <Search size={11} className="text-muted-foreground shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색..."
                className="flex-1 bg-transparent outline-none text-xs text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            <TreeList
              items={filteredTree}
              selectedId={selectedId}
              onSelect={handleFileSelect}
              density="compact"
            />
          </div>
        </div>

        {/* ── 우측 에디터 + 터미널 ── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* 탭 바 */}
          <div className="flex items-stretch border-b border-border bg-ac-gray-10 overflow-x-auto shrink-0">
            {openTabs.map((tab) => (
              <div
                key={tab}
                onClick={() => handleFileSelect(tab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-xs border-r border-border cursor-pointer shrink-0 select-none transition-colors",
                  activeTab === tab
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:bg-ac-gray-20 hover:text-foreground"
                )}
              >
                <FileCode size={12} className="shrink-0" />
                <span>{tab}</span>
                <button
                  onClick={(e) => closeTab(tab, e)}
                  className="ml-0.5 p-0.5 rounded hover:bg-ac-gray-30 text-muted-foreground hover:text-foreground"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 overflow-auto bg-background min-h-0">
            {openTabs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                파일을 선택하세요
              </div>
            ) : (
              <table className="w-full border-collapse font-mono text-xs leading-5">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i} className="hover:bg-ac-gray-10">
                      <td
                        className="select-none text-right pr-4 pl-4 text-muted-foreground w-10 shrink-0 align-top"
                        style={{ minWidth: 40 }}
                      >
                        {i + 1}
                      </td>
                      <td className="pr-4 text-foreground whitespace-pre align-top">
                        {line || " "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 터미널 */}
          <div className="shrink-0 border-t border-border bg-black flex flex-col" style={{ height: 176 }}>
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10 shrink-0">
              <span className="text-xs text-white/50">터미널</span>
              <ChevronDown size={11} className="text-white/30" />
            </div>
            <div className="flex-1 overflow-auto px-3 py-2">
              {TERMINAL_LINES.map((l, i) => (
                <div key={i} className={cn("font-mono text-xs leading-5", l.color || "text-white/40")}>
                  {l.text || " "}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
