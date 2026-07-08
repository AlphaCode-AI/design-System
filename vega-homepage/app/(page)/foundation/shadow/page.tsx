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
import PageHeader from "@/app/components/PageHeader";

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
    light: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
    dark:  "0px 1px 2px 0px rgba(10, 13, 18, 0.50)",
  },
  {
    name: "shadow-sm",
    className: "shadow-sm",
    light: "0px 1px 3px 0px rgba(10, 13, 18, 0.10),\n0px 1px 2px -1px rgba(10, 13, 18, 0.10)",
    dark:  "0px 1px 3px 0px rgba(10, 13, 18, 0.55),\n0px 1px 2px -1px rgba(10, 13, 18, 0.55)",
  },
  {
    name: "shadow-md",
    className: "shadow-md",
    light: "0px 2px 4px -2px rgba(10, 13, 18, 0.06),\n0px 4px 6px -1px rgba(10, 13, 18, 0.10)",
    dark:  "0px 2px 4px -2px rgba(10, 13, 18, 0.52),\n0px 4px 6px -1px rgba(10, 13, 18, 0.58)",
  },
  {
    name: "shadow-lg",
    className: "shadow-lg",
    light: "0px 2px 2px -1px rgba(10, 13, 18, 0.04),\n0px 4px 6px -2px rgba(10, 13, 18, 0.03),\n0px 12px 16px -4px rgba(10, 13, 18, 0.08)",
    dark:  "0px 2px 2px -1px rgba(10, 13, 18, 0.50),\n0px 4px 6px -2px rgba(10, 13, 18, 0.50),\n0px 12px 16px -4px rgba(10, 13, 18, 0.58)",
  },
  {
    name: "shadow-xl",
    className: "shadow-xl",
    light: "0px 3px 3px -1.5px rgba(10, 13, 18, 0.04),\n0px 8px 8px -4px rgba(10, 13, 18, 0.03),\n0px 20px 24px -4px rgba(10, 13, 18, 0.08)",
    dark:  "0px 3px 3px -1.5px rgba(10, 13, 18, 0.50),\n0px 8px 8px -4px rgba(10, 13, 18, 0.50),\n0px 20px 24px -4px rgba(10, 13, 18, 0.58)",
  },
  {
    name: "shadow-2xl",
    className: "shadow-2xl",
    light: "0px 4px 4px -2px rgba(10, 13, 18, 0.04),\n0px 12px 16px -4px rgba(10, 13, 18, 0.06),\n0px 32px 48px -8px rgba(10, 13, 18, 0.14)",
    dark:  "0px 4px 4px -2px rgba(10, 13, 18, 0.50),\n0px 12px 16px -4px rgba(10, 13, 18, 0.55),\n0px 32px 48px -8px rgba(10, 13, 18, 0.65)",
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
      <div className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-8">

        {/* 페이지 헤더 */}
        <PageHeader title="Shadow" description="그림자 효과(shadow)는 요소에 적용하여 깊이와 현실감을 더하는 효과입니다. 현 디자인에선 text-shadow는 사용하지 않습니다." />

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
              <p className="text-sm text-foreground mb-2 font-medium">
                컴포넌트에 대한 구체적인 정의가 없을 경우, 8가지 box-shadow 값을 각 컴포넌트 크기에 따라 대응하여 사용합니다.
              </p>
              <p className="text-sm text-foreground mb-6">
                다크모드에서는 어두운 배경과의 대비를 확보하기 위해 opacity가 자동으로 강화됩니다. 별도 처리 없이 <CodeBadge>shadow-*</CodeBadge> 클래스를 그대로 사용하면 됩니다.
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
                      <th className="px-4 py-3 text-left font-bold text-foreground w-34">Name</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">Light</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">Dark</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground w-20">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shadowList.map((s) => (
                      <tr
                        key={s.name}
                        className="border-b border-border last:border-0 hover:bg-ac-gray-10/50 transition-colors"
                      >
                        <td className="px-4 py-4 align-top">
                          <CodeBadge>{s.name}</CodeBadge>
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-foreground align-top leading-relaxed whitespace-pre-line">
                          {s.light}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-muted-foreground align-top leading-relaxed whitespace-pre-line">
                          {s.dark}
                        </td>
                        <td className="px-4 py-4 align-top">
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

              {/* 예시 2: 다크모드 shadow 구현 방식 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">다크모드 shadow 구현 방식</h3>
                <p className="text-sm text-foreground mb-4">
                  Tailwind는 shadow 색상을 컴파일 타임에 <CodeBadge>--tw-shadow-color</CodeBadge> fallback으로 고정합니다.
                  때문에 CSS 변수 override만으로는 다크모드 shadow를 크기별로 조정할 수 없습니다.
                  이 디자인 시스템은 <CodeBadge>.dark .shadow-*</CodeBadge> 선택자로 <CodeBadge>--tw-shadow</CodeBadge>를 직접 덮어써서 크기별 opacity를 적용합니다.
                </p>
                <CodeBlock code={`/* styles.css — 다크모드 shadow 정의 */
.dark .shadow-xs {
  --tw-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.50);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000),
              var(--tw-shadow);
}

.dark .shadow-sm {
  --tw-shadow: 0px 1px 3px 0px rgba(10, 13, 18, 0.55),
               0px 1px 2px -1px rgba(10, 13, 18, 0.55);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000),
              var(--tw-shadow);
}

/* shadow-md ~ shadow-2xl 동일한 패턴으로 정의 */`} />
                <p className="text-sm text-foreground mt-4">
                  컴포넌트에서 별도 처리 없이 <CodeBadge>shadow-*</CodeBadge> 클래스를 그대로 사용하면 다크모드에서 자동으로 강화된 opacity가 적용됩니다.
                </p>
              </div>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}