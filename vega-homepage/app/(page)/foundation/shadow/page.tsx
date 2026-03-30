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
 * 디자인 시스템의 shadow 토큰 데이터
 */
const shadowList = [
  {
    name: "shadow-xs",
    className: "shadow-xs",
    value: "box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);",
  },
  {
    name: "shadow-sm",
    className: "shadow-sm",
    value:
      "box-shadow: 0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10);",
  },
  {
    name: "shadow-md",
    className: "shadow-md",
    value:
      "box-shadow: 0px 2px 4px -2px rgba(10, 13, 18, 0.06), 0px 4px 6px -1px rgba(10, 13, 18, 0.10);",
  },
  {
    name: "shadow-lg",
    className: "shadow-lg",
    value:
      "box-shadow: 0px 2px 2px -1px rgba(10, 13, 18, 0.04), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 12px 16px -4px rgba(10, 13, 18, 0.08);",
  },
  {
    name: "shadow-xl",
    className: "shadow-xl",
    value:
      "box-shadow: 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 20px 24px -4px rgba(10, 13, 18, 0.08);",
  },
  {
    name: "shadow-2xl",
    className: "shadow-2xl",
    value:
      "box-shadow: 0px 4px 4px -2px rgba(10, 13, 18, 0.04), 0px 12px 16px -4px rgba(10, 13, 18, 0.06), 0px 32px 48px -8px rgba(10, 13, 18, 0.14);",
  },
];

/**
 * 미리보기용 shadow 토큰 (시각화 상단 그리드)
 */
const previewItems = shadowList.map((s) => ({
  label: s.name.replace("--", ""),
  className: s.className,
}));

export default function ShadowPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Shadow</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            그림자 효과(shadow)는 요소에 적용하여 깊이와 현실감을 더하는 효과입니다. 현 디자인에선 text-shadow는 사용하지 않습니다.
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
                컴포넌트에 대한 구체적인 정의가 없을 경우, 8가지 box-shadow 값을 각 컴포넌트 크기에 따라 대응하여 사용합니다.
              </p>

              {/* 미리보기 그리드 */}
              <div className="rounded-lg bg-ac-gray-10 p-8 mb-6">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  {previewItems.map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-3">
                      <div
                        className={`w-20 h-20 bg-background border border-border rounded-md flex items-center justify-center ${item.className}`}
                      >
                        <span className="text-xs text-foreground font-medium text-center leading-tight px-1">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 테이블 */}
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="px-4 py-3 text-left font-bold text-foreground w-32">Name</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">Shadow</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground w-24">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shadowList.map((s) => (
                      <tr
                        key={s.name}
                        className="border-b border-border last:border-0 hover:bg-ac-gray-10/50 transition-colors"
                      >
                        <td className="px-4 py-4 align-middle">
                          <CodeBadge>{s.name}</CodeBadge>
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-foreground align-middle leading-relaxed">
                          {s.value}
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className={`w-14 h-14 bg-background border border-border rounded-sm ${s.className}`} />
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

              {/* 예시 1: 컴포넌트별 shadow 적용 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">컴포넌트별 shadow 적용</h3>
                <p className="text-sm text-foreground mb-4">
                  컴포넌트의 성격과 레이어 깊이에 맞는 shadow 클래스를 사용합니다.
                </p>
                <CodeBlock code={`// Tooltip, Tag — shadow-xs (가장 미세한 그림자)
<div className="shadow-xs rounded-md bg-background px-2 py-1 text-xs">
  툴팁
</div>
 
// Card, Panel — shadow-sm
<div className="shadow-sm rounded-lg border border-border bg-background p-4">
  카드 컨텐츠
</div>
 
// Dropdown, Popover — shadow-lg
<ul className="shadow-lg rounded-lg border border-border bg-background py-1">
  <li className="px-4 py-2 hover:bg-ac-gray-10">메뉴 아이템</li>
</ul>
 
// Modal, Dialog — shadow-2xl
<div className="shadow-2xl rounded-xl bg-background p-8 max-w-md w-full">
  모달 컨텐츠
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