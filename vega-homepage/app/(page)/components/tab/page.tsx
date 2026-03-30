"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",    label: "Type" },
  { id: "anatomy", label: "Anatomy" },
  { id: "state",   label: "State" },
  { id: "size",    label: "Size" },
  { id: "usage",   label: "사용 가이드" },
];

const DEMO_TABS = ["셔츠", "블라우스", "드레스"];

export default function TabPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Tab</h1>
          <p className="text-sm text-foreground leading-relaxed">
            탭(tab)은 버튼을 눌러 상호배타적인 여러 개의 콘텐츠 섹션을 전환할 수 있는 컴포넌트입니다.
            콘텐츠 섹션은 동일한 영역 내에서 전환되기 때문에 정보를 탐색하는 맥락을 유지할 수 있고
            작은 공간에 많은 양의 콘텐츠를 효과적으로 표현할 수 있습니다.
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
                탭의 너비 유형은 Fill과 Full 두 가지입니다.
              </p>
              <div className="rounded-lg p-8 border border-border flex gap-12 justify-center flex-col items-center">

                <div className="flex flex-col gap-3 w-full">
                  <p className="text-xs font-medium text-foreground">넓이 Fill</p>
                  <Tabs defaultValue="셔츠" variant="fill">
                    <TabList>
                      {DEMO_TABS.map((t) => (
                        <TabTrigger key={t} value={t}>{t}</TabTrigger>
                      ))}
                    </TabList>
                  </Tabs>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <p className="text-xs font-medium text-foreground">넓이 Full</p>
                  <Tabs defaultValue="셔츠" variant="full">
                    <TabList>
                      {DEMO_TABS.map((t) => (
                        <TabTrigger key={t} value={t}>{t}</TabTrigger>
                      ))}
                    </TabList>
                  </Tabs>
                </div>

              </div>
            </section>

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-1">Anatomy</h2>
              <p className="text-sm text-foreground mb-4">
                탭의 각 구성 요소입니다.
              </p>
              <div className="rounded-lg p-12 flex items-center justify-center bg-ac-gray-20">
                <img src="/tab/tab_anatomy.png" alt="tab anatomy" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>선택된 탭 레이블 — 현재 선택된 탭을 나타냅니다.</li>
                <li>탭 레이블 — 선택되지 않은 탭의 레이블입니다.</li>
                <li>선택된 인디케이터 — 탭이 선택된 상태임을 알려주는 시각적인 식별자입니다.</li>
                <li>구분선 — 탭 목록과 콘텐츠 영역을 구분합니다.</li>
              </ol>
            </section>

            {/* ── State ── */}
            <section id="state">
              <h2 className="text-lg font-semibold text-foreground mb-1">State</h2>
              <p className="text-sm text-foreground mb-4">
                탭 아이템의 각 상태를 나타냅니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex justify-center">
                <div className="flex gap-8">
                  {[
                    { label: "Unselect", active: "" },
                    { label: "Select",   active: "갤럭시 탭" },
                  ].map(({ label, active }) => (
                    <div key={label} className="flex flex-col gap-2">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <Tabs value={active} onValueChange={() => {}}>
                        <TabList>
                          <TabTrigger value="갤럭시 탭">갤럭시 탭</TabTrigger>
                        </TabList>
                      </Tabs>
                    </div>
                  ))}
                  {/* Hover: pseudo-class 강제 적용 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted-foreground">Hover</p>
                    <div className="relative flex border-b border-ac-gray-30">
                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center whitespace-nowrap font-medium h-10 px-4 text-sm text-foreground select-none"
                      >
                        갤럭시 탭
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted-foreground">Disable (Unselect)</p>
                    <Tabs value="">
                      <TabList>
                        <TabTrigger value="갤럭시 탭" disabled>갤럭시 탭</TabTrigger>
                      </TabList>
                    </Tabs>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted-foreground">Disable (Select)</p>
                    <Tabs value="갤럭시 탭">
                      <TabList>
                        <TabTrigger value="갤럭시 탭" disabled>갤럭시 탭</TabTrigger>
                      </TabList>
                    </Tabs>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Size ── */}
            <section id="size">
              <h2 className="text-lg font-semibold text-foreground mb-1">Size</h2>
              <p className="text-sm text-foreground mb-4">
                탭의 사이즈는 sm / md / lg 3가지를 사용합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex flex-col gap-6">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size} className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">{size}</p>
                    <Tabs defaultValue="tab1" size={size}>
                      <TabList>
                        <TabTrigger value="tab1">tab title 01</TabTrigger>
                        <TabTrigger value="tab2">tab title 02</TabTrigger>
                        <TabTrigger value="tab3">tab title 03</TabTrigger>
                      </TabList>
                    </Tabs>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">탭 사용</h3>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Don't" src="/tab/usage_nested_dont.png" description="탭은 콘텐츠를 숨겨둔 상태에서 사용자가 콘텐츠의 표시 여부를 선택해야 하기 때문에 사용자의 인지적 부담을 더욱 증가시킬 수 있어 여러 개의 탭을 중첩하는 것은 바람직하지 않습니다." />
                  <UsageCard type="Don't" src="/tab/usage_label_dont.png" description="탭 레이블에 너무 긴 텍스트를 사용하지 않습니다." />
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
              <CodeBlock code={`import { Tabs, TabList, TabTrigger, TabContent } from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`<Tabs defaultValue="tab1">
  <TabList>
    <TabTrigger value="tab1">Tab 1</TabTrigger>
    <TabTrigger value="tab2">Tab 2</TabTrigger>
    <TabTrigger value="tab3">Tab 3</TabTrigger>
  </TabList>
  <TabContent value="tab1">Tab 1 content</TabContent>
  <TabContent value="tab2">Tab 2 content</TabContent>
  <TabContent value="tab3">Tab 3 content</TabContent>
</Tabs>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Variant</h2>
              <CodeBlock code={`{/* 콘텐츠 너비 (기본값) */}
<Tabs defaultValue="tab1" variant="fill">...</Tabs>

{/* 균등 분할 */}
<Tabs defaultValue="tab1" variant="full">...</Tabs>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Size</h2>
              <CodeBlock code={`<Tabs defaultValue="tab1" size="sm">...</Tabs>
<Tabs defaultValue="tab1" size="md">...</Tabs>
<Tabs defaultValue="tab1" size="lg">...</Tabs>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Disabled</h2>
              <CodeBlock code={`<Tabs defaultValue="tab1">
  <TabList>
    <TabTrigger value="tab1">Tab 1</TabTrigger>
    <TabTrigger value="tab2" disabled>Tab 2</TabTrigger>
  </TabList>
</Tabs>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Controlled</h2>
              <CodeBlock code={`const [value, setValue] = useState("tab1");

<Tabs value={value} onValueChange={setValue}>
  <TabList>
    <TabTrigger value="tab1">Tab 1</TabTrigger>
    <TabTrigger value="tab2">Tab 2</TabTrigger>
  </TabList>
</Tabs>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Active Color</h2>
              <CodeBlock code={`{/* 토큰명 사용 (기본값: ac-primary-50) */}
<Tabs defaultValue="tab1" activeColor="ac-blue-50">...</Tabs>
<Tabs defaultValue="tab1" activeColor="ac-green-50">...</Tabs>

{/* hex 값 직접 사용도 가능 */}
<Tabs defaultValue="tab1" activeColor="#3B82F6">...</Tabs>`} />
            </section>

            {/* Tabs Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Tabs Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["value",          "string",                    "-",           "활성 탭 값 (controlled)"],
                  ["defaultValue",   "string",                    '""',          "초기 활성 탭 값 (uncontrolled)"],
                  ["onValueChange",  "(value: string) => void",   "-",           "탭 변경 콜백"],
                  ["variant",        '"fill" | "full"',           '"fill"',      "탭 너비 유형"],
                  ["size",           '"sm" | "md" | "lg"',        '"md"',        "탭 사이즈"],
                  ["activeColor",    "string",                    '"ac-primary-50"', "활성 탭 색상 (토큰명 또는 hex/rgb)"],
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

            {/* TabTrigger Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">TabTrigger Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["value",    "string",  "-",     "탭 고유 값"],
                  ["disabled", "boolean", "false", "비활성화 여부"],
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

            {/* TabContent Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">TabContent Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["value", "string", "-", "대응하는 TabTrigger의 value"],
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

          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
