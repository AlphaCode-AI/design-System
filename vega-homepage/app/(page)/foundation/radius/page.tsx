"use client";

import { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBadge from "@/app/components/CodeBadge";
import CodeBlock from "@/app/components/CodeBlock";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "variables", label: "Variables" },
];

/**
 * 디자인 시스템의 radius 토큰 데이터
 */
const radiusList = [
  { name: "rounded-none", px: "0", rem: "0", className: "rounded-none" },
  { name: "rounded-xs", px: "4", rem: "0.25", className: "rounded-xs" },
  { name: "rounded-sm", px: "6", rem: "0.375", className: "rounded-sm" },
  { name: "rounded-md", px: "8", rem: "0.5", className: "rounded-md" },
  { name: "rounded-lg", px: "12", rem: "0.75", className: "rounded-lg" },
  { name: "rounded-xl", px: "20", rem: "1.25", className: "rounded-xl" },
  { name: "rounded-2xl", px: "24", rem: "1.5", className: "rounded-2xl" },
  { name: "rounded-circle", px: "50%", rem: "50%", className: "rounded-full" },
];

/**
 * 미리보기용 radius 토큰 (시각화 상단 그리드)
 */
const previewItems = [
  { label: "rounded-none", className: "rounded-none" },
  { label: "rounded-xs", className: "rounded-xs" },
  { label: "rounded-sm", className: "rounded-sm" },
  { label: "rounded-md", className: "rounded-md" },
  { label: "rounded-lg", className: "rounded-lg" },
  { label: "rounded-xl", className: "rounded-xl" },
  { label: "rounded-2xl", className: "rounded-2xl" },
  { label: "rounded-circle", className: "rounded-full" },
];

export default function RadiusPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Radius</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            시각적으로 보기 좋은 디자인을 위해 Radius는 대부분의 컴포넌트에 적용됩니다. 정해진 값을 사용해 일관성을 유지하기 위해 정의됩니다.
          </p>
        </div>

        {/* 탭 시스템 */}
        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ── Docs 탭 ── */}
          <TabContent value="docs" className="pt-6">
            <section id="variables" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-1">Variables</h2>
              <p className="text-sm text-foreground mb-6 font-medium">
                컴포넌트에 대한 구체적인 정의가 없을 경우, 8가지 radius 값을 각 컴포넌트 크기에 따라 대응하여 사용합니다.
              </p>

              {/* 미리보기 그리드 */}
              <div className="rounded-lg bg-ac-gray-10 p-6 mb-6">
                <div className="flex items-end justify-center gap-6 flex-wrap">
                  {previewItems.map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-3">
                      <span className="text-xs text-foreground font-medium text-center whitespace-pre-line leading-tight">
                        {item.label}
                      </span>
                      <div
                        className={`w-16 h-16 border-2 border-ac-primary-400 bg-background ${item.className}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 테이블 */}
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="px-4 py-3 text-left font-bold text-foreground">Name</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">px</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">rem</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {radiusList.map((r) => (
                      <tr
                        key={r.name}
                        className="border-b border-border last:border-0 hover:bg-ac-gray-10/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <CodeBadge>{r.name}</CodeBadge>
                        </td>
                        <td className="px-4 py-3 text-foreground font-semibold">{r.px}</td>
                        <td className="px-4 py-3 text-foreground font-semibold">{r.rem}</td>
                        <td className="px-4 py-3">
                          <div className={`w-14 h-14 bg-ac-gray-200 border border-border ${r.className}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section id="usage-examples">
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              {/* 예시 1: 컴포넌트별 radius 사용 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">컴포넌트별 radius 적용</h3>
                <p className="text-sm text-foreground mb-4">
                  각 컴포넌트의 크기와 성격에 맞는 radius 클래스를 사용합니다.
                </p>
                <CodeBlock code={`// Tag, Badge — rounded-xs (4px)
<span className="rounded-xs px-2 py-0.5 text-xs bg-ac-primary-10 text-ac-primary-50">
  태그
</span>
 
// Button, Input — rounded-md (8px)
<button className="rounded-md px-4 py-2 bg-primary text-primary-foreground">
  버튼
</button>
<input className="rounded-md border border-border px-3 py-2 w-full" />
 
// Card, Dialog — rounded-lg (12px)
<div className="rounded-lg border border-border bg-background p-6 shadow-md">
  카드 컨텐츠
</div>
 
// Avatar, Icon Button — rounded-full (50%)
<div className="rounded-full w-10 h-10 bg-ac-gray-20 overflow-hidden">
  <img src="/avatar.png" alt="avatar" />
</div>`} />
              </div>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}