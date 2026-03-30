"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  SideNavigation,
  LayoutGrid,
  Box,
  Globe,
  BookOpen,
  Folder,
} from "@alphacode-ai/design-system";
import type { SideNavItem } from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",    label: "Type" },
  { id: "anatomy", label: "Anatomy" },
  { id: "expand-icon", label: "Expand Icon" },
  { id: "usage",   label: "사용 가이드" },
];


/* ── 데모용 아이템 ── */
const depth1Items: SideNavItem[] = [
  { id: "d1-overview",    label: "Overview",    icon: <LayoutGrid width={16} height={16} /> },
  { id: "d1-components",  label: "Components",  icon: <Box width={16} height={16} /> },
  { id: "d1-foundation",  label: "Foundation",  icon: <Globe width={16} height={16} /> },
  { id: "d1-guidelines",  label: "Guidelines",  icon: <BookOpen width={16} height={16} /> },
  { id: "d1-resources",   label: "Resources",   icon: <Folder width={16} height={16} /> },
];

const depth1NoIconItems: SideNavItem[] = [
  { id: "ni1-overview",   label: "Overview" },
  { id: "ni1-components", label: "Components" },
  { id: "ni1-foundation", label: "Foundation" },
  { id: "ni1-guidelines", label: "Guidelines" },
  { id: "ni1-resources",  label: "Resources" },
];

const depth2Items: SideNavItem[] = [
  { id: "d2-overview",   label: "Overview",    icon: <LayoutGrid width={16} height={16} /> },
  {
    id: "d2-components",
    label: "Components",
    icon: <Box width={16} height={16} />,
    children: [
      { id: "d2-button",  label: "Button" },
      { id: "d2-input",   label: "Input" },
      { id: "d2-card",    label: "Card" },
      { id: "d2-dialog",  label: "Dialog" },
    ],
  },
  { id: "d2-foundation", label: "Foundation",  icon: <Globe width={16} height={16} />, divider: true },
  { id: "d2-guidelines", label: "Guidelines",  icon: <BookOpen width={16} height={16} /> },
];

const depth2NoIconItems: SideNavItem[] = [
  { id: "ni2-overview",   label: "Overview" },
  {
    id: "ni2-components",
    label: "Components",
    children: [
      { id: "ni2-button",  label: "Button" },
      { id: "ni2-input",   label: "Input" },
      { id: "ni2-card",    label: "Card" },
      { id: "ni2-dialog",  label: "Dialog" },
    ],
  },
  { id: "ni2-foundation", label: "Foundation", divider: true },
  { id: "ni2-guidelines", label: "Guidelines" },
];

const depth3Items: SideNavItem[] = [
  { id: "d3-overview",  label: "Overview",   icon: <LayoutGrid width={16} height={16} /> },
  {
    id: "d3-components",
    label: "Components",
    icon: <Box width={16} height={16} />,
    children: [
      {
        id: "d3-input",
        label: "Input",
        children: [
          { id: "d3-text-input", label: "Text Input" },
          { id: "d3-select",     label: "Select" },
          { id: "d3-checkbox",   label: "Checkbox" },
        ],
      },
      { id: "d3-button", label: "Button" },
      { id: "d3-card",   label: "Card" },
    ],
  },
  { id: "d3-foundation", label: "Foundation", icon: <Globe width={16} height={16} /> },
];

const depth3NoIconItems: SideNavItem[] = [
  { id: "ni3-overview",  label: "Overview" },
  {
    id: "ni3-components",
    label: "Components",
    children: [
      {
        id: "ni3-input",
        label: "Input",
        children: [
          { id: "ni3-text-input", label: "Text Input" },
          { id: "ni3-select",     label: "Select" },
          { id: "ni3-checkbox",   label: "Checkbox" },
        ],
      },
      { id: "ni3-button", label: "Button" },
      { id: "ni3-card",   label: "Card" },
    ],
  },
  { id: "ni3-foundation", label: "Foundation" },
];


export default function SideNavigationPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Side Navigation</h1>
          <p className="text-sm text-foreground leading-relaxed">
            사이드 메뉴(Side Navigation)는 화면 내에서의 이동을 위해 사용하는 메뉴입니다.
            일반적으로 본문 영역의 좌측에 사이드바 형태로 제공됩니다.
          </p>
        </div>

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ══════════════════════════════════════
              DOCS
          ══════════════════════════════════════ */}
          <TabContent value="docs" className="mt-6 space-y-14">

            {/* ── Type ── */}
            <section id="type">
              <h2 className="text-lg font-semibold text-foreground mb-1">Type</h2>
              <p className="text-sm text-foreground mb-4">
                1Depth, 2Depth, 3Depth 세 가지 계층 구조를 지원하며, 아이콘 유무를 선택할 수 있습니다.
              </p>
              <div className="rounded-lg p-8 bg-ac-gray-20 flex flex-col gap-8">

                {/* 아이콘 없음 */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">아이콘 없음</p>
                  <div className="flex gap-6 flex-wrap justify-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">1 Depth</p>
                      <div className="w-[200px] rounded-lg p-3 bg-card">
                        <SideNavigation
                          items={depth1NoIconItems}
                          defaultActiveId="ni1-components"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">2 Depth</p>
                      <div className="w-[200px] rounded-lg p-3 bg-card">
                        <SideNavigation
                          title="Menu"
                          items={depth2NoIconItems}
                          defaultActiveId="ni2-button"
                          defaultOpenIds={["ni2-components"]}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">3 Depth</p>
                      <div className="w-[200px] rounded-lg p-3 bg-card">
                        <SideNavigation
                          title="Menu"
                          items={depth3NoIconItems}
                          defaultActiveId="ni3-text-input"
                          defaultOpenIds={["ni3-components", "ni3-input"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 아이콘 있음 */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">아이콘 있음</p>
                  <div className="flex gap-6 flex-wrap justify-center">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">1 Depth</p>
                      <div className="w-[200px] rounded-lg p-3 bg-card">
                        <SideNavigation
                          items={depth1Items}
                          defaultActiveId="d1-components"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">2 Depth</p>
                      <div className="w-[200px] rounded-lg p-3 bg-card">
                        <SideNavigation
                          title="Menu"
                          items={depth2Items}
                          defaultActiveId="d2-button"
                          defaultOpenIds={["d2-components"]}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">3 Depth</p>
                      <div className="w-[200px] rounded-lg p-3 bg-card">
                        <SideNavigation
                          title="Menu"
                          items={depth3Items}
                          defaultActiveId="d3-text-input"
                          defaultOpenIds={["d3-components", "d3-input"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-1">Anatomy</h2>
              <p className="text-sm text-foreground mb-4">
                사이드 메뉴의 각 구성 요소입니다.
              </p>
              <div className="rounded-lg p-12 flex items-center justify-center bg-ac-gray-20">
                <img src="/side-navigation/side_anatomy.png" alt="side navigation anatomy" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>제목 — 메뉴 목록의 상위 수준 정보 구조를 알려줍니다.</li>
                <li>아이콘(선택) — 목록 아이템의 아이콘입니다.</li>
                <li>기본 화면 링크 목록 — 기본 탐색 링크 그룹입니다.</li>
                <li>열림/닫힘 Toggle — 하위 화면 링크 목록의 열림/닫힘 상태를 나타냅니다. 사용자는 Toggle 유무를 통해 하위에 추가 탐색 목록이 존재하는지 인지할 수 있습니다.</li>
                <li>하위 화면 링크 목록 — 기본 화면 링크 목록의 하위 수준에 속하는 링크 목록입니다.</li>
                <li>구분선(선택) — 링크 목록 내의 항목을 구분하기 위한 가로선입니다.</li>
              </ol>
            </section>

            {/* ── Expand Icon ── */}
            <section id="expand-icon">
              <h2 className="text-lg font-semibold text-foreground mb-1">Expand Icon</h2>
              <p className="text-sm text-foreground mb-4">
                아이콘의 확장 상태를 나타내는 Toggle 아이콘은 항상 일관된 위치에 제공합니다.
                <code className="mx-1 px-1 py-0.5 bg-ac-gray-20 rounded text-xs font-mono">expandIcon</code> prop으로
                열림/닫힘 상태를 반영하는 아이콘으로 변경할 수 있습니다.
              </p>
              <div className="rounded-lg p-8 bg-ac-gray-20 flex gap-8 justify-center flex-wrap">

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-foreground">Chevron (기본)</p>
                  <div className="w-[200px] bg-card rounded-lg p-3">
                    <SideNavigation
                      title="Menu"
                      items={depth2Items}
                      defaultOpenIds={["d2-components"]}
                      expandIcon="chevron"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-foreground">Plus / Minus</p>
                  <div className="w-[200px] bg-card rounded-lg p-3">
                    <SideNavigation
                      title="Menu"
                      items={depth2Items}
                      defaultOpenIds={["d2-components"]}
                      expandIcon="plusMinus"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-foreground">Arrow</p>
                  <div className="w-[200px] bg-card rounded-lg p-3">
                    <SideNavigation
                      title="Menu"
                      items={depth2Items}
                      defaultOpenIds={["d2-components"]}
                      expandIcon="arrow"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">계층 구분</h3>
                <p className="text-sm text-foreground mb-4">
                  사용자의 탐색을 방해하지 않도록 수직으로 나란히 배치된 링크 간 수준을 들여쓰기, 배경 구분 등의 방식을 활용하여 명확하게 구분해야 합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/side-navigation/usage_depth_do.png" />
                  <UsageCard type="Don't" src="/side-navigation/usage_depth_dont.png" />
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">계층 구조</h3>
                <p className="text-sm text-foreground mb-4">
                  사이드 메뉴 영역의 너비는 제한되어 있기 때문에 3개 이상의 수준을 한 번에 표시할 경우 인지와 탐색이 어려워질 수 있으므로 정해진 계층 구조까지만 사용합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/side-navigation/usage_3depth_do.png" />
                  <UsageCard type="Don't" src="/side-navigation/usage_3depth_dont.png" />
                </div>
              </div>

            </section>

          </TabContent>

          {/* ══════════════════════════════════════
              CODE
          ══════════════════════════════════════ */}
          <TabContent value="code" className="mt-6 space-y-8">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Import</h2>
              <CodeBlock code={`import { SideNavigation } from "@alphacode-ai/design-system";
import type { SideNavItem } from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`const items: SideNavItem[] = [
  { id: "overview",   label: "Overview" },
  { id: "components", label: "Components" },
  { id: "foundation", label: "Foundation" },
];

<SideNavigation
  title="Menu"
  items={items}
  defaultActiveId="overview"
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">2 Depth</h2>
              <CodeBlock code={`const items: SideNavItem[] = [
  { id: "overview", label: "Overview" },
  {
    id: "components",
    label: "Components",
    children: [
      { id: "button", label: "Button" },
      { id: "input",  label: "Input" },
      { id: "card",   label: "Card" },
    ],
  },
  { id: "foundation", label: "Foundation", divider: true },
];

<SideNavigation
  title="Menu"
  items={items}
  defaultActiveId="button"
  defaultOpenIds={["components"]}
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">3 Depth</h2>
              <CodeBlock code={`const items: SideNavItem[] = [
  { id: "overview", label: "Overview" },
  {
    id: "components",
    label: "Components",
    children: [
      {
        id: "input",
        label: "Input",
        children: [
          { id: "text-input", label: "Text Input" },
          { id: "select",     label: "Select" },
          { id: "checkbox",   label: "Checkbox" },
        ],
      },
      { id: "button", label: "Button" },
      { id: "card",   label: "Card" },
    ],
  },
  { id: "foundation", label: "Foundation" },
];

<SideNavigation
  title="Menu"
  items={items}
  defaultActiveId="text-input"
  defaultOpenIds={["components", "input"]}
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">아이템 아이콘</h2>
              <CodeBlock code={`import { LayoutGrid, Box, Globe } from "@alphacode-ai/design-system";

const items: SideNavItem[] = [
  { id: "overview",   label: "Overview",   icon: <LayoutGrid width={16} height={16} /> },
  { id: "components", label: "Components", icon: <Box width={16} height={16} /> },
  { id: "foundation", label: "Foundation", icon: <Globe width={16} height={16} /> },
];

<SideNavigation items={items} defaultActiveId="overview" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Divider</h2>
              <CodeBlock code={`const items: SideNavItem[] = [
  { id: "overview",   label: "Overview" },
  { id: "components", label: "Components" },
  { id: "foundation", label: "Foundation", divider: true }, // 이 아이템 위에 구분선
  { id: "settings",   label: "Settings" },
];`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Next.js Link 연동</h2>
              <CodeBlock code={`import Link from "next/link";

<SideNavigation
  title="Menu"
  items={items}
  activeId={activeId}
  renderLink={(item, children, className) => (
    <Link href={item.href!} className={className}>
      {children}
    </Link>
  )}
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Controlled</h2>
              <CodeBlock code={`const [activeId, setActiveId] = useState("overview");

<SideNavigation
  items={items}
  activeId={activeId}
  onActiveChange={setActiveId}
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Active Color</h2>
              <CodeBlock code={`{/* 기본값: text-ac-primary-50 */}
<SideNavigation items={items} activeClassName="text-ac-blue-50" />
<SideNavigation items={items} activeClassName="text-ac-green-50" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Expand Icon</h2>
              <CodeBlock code={`{/* 기본값: chevron */}
<SideNavigation items={items} expandIcon="chevron" />

{/* Plus / Minus 애니메이션 */}
<SideNavigation items={items} expandIcon="plusMinus" />

{/* Arrow 회전 애니메이션 */}
<SideNavigation items={items} expandIcon="arrow" />`} />
            </section>

            {/* SideNavigation Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">SideNavigation Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["items",           "SideNavItem[]",                   "-",                    "메뉴 아이템 목록"],
                  ["title",           "string",                          "-",                    "메뉴 섹션 제목"],
                  ["activeId",        "string",                          "-",                    "활성 아이템 ID (controlled)"],
                  ["defaultActiveId", "string",                          '""',                   "초기 활성 아이템 ID (uncontrolled)"],
                  ["onActiveChange",  "(id: string) => void",            "-",                    "활성 아이템 변경 콜백"],
                  ["defaultOpenIds",  "string[]",                        "[]",                   "초기 펼쳐진 아이템 ID 목록"],
                  ["activeClassName", "string",                          '"text-ac-primary-50"', "활성 상태 Tailwind 클래스"],
                  ["expandIcon",      '"chevron" | "plusMinus" | "arrow"', '"chevron"',           "열림/닫힘 토글 아이콘 타입"],
                  ["renderLink",      "(item, children, className) => ReactNode", "-",           "커스텀 링크 렌더러 (Next.js Link 등)"],
                ].map(([prop, type, def, desc], i, arr) => (
                  <React.Fragment key={i}>
                    <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50${i < arr.length - 1 ? " border-b border-border" : ""}`}>{prop}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{type}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{def}</div>
                    <div className={`px-3 py-2 text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{desc}</div>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* SideNavItem Type */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">SideNavItem</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Property", "Type", "Required", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["id",       "string",          "✓", "고유 식별자"],
                  ["label",    "string",          "✓", "표시 텍스트"],
                  ["href",     "string",          "-", "링크 URL (renderLink와 함께 사용)"],
                  ["icon",     "ReactNode",       "-", "아이템 아이콘"],
                  ["children", "SideNavItem[]",   "-", "하위 메뉴 아이템"],
                  ["divider",  "boolean",         "-", "아이템 위 구분선 표시"],
                ].map(([prop, type, req, desc], i, arr) => (
                  <React.Fragment key={i}>
                    <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50${i < arr.length - 1 ? " border-b border-border" : ""}`}>{prop}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{type}</div>
                    <div className={`px-3 py-2 text-xs text-foreground text-center${i < arr.length - 1 ? " border-b border-border" : ""}`}>{req}</div>
                    <div className={`px-3 py-2 text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{desc}</div>
                  </React.Fragment>
                ))}
              </div>
            </section>

          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
