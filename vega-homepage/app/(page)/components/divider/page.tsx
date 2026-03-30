"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Divider,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import { UsageCard } from "@/app/components/UsageCard";
import CodeBadge from "@/app/components/CodeBadge";

/* ─────────────────────────────────────────
   TOC
───────────────────────────────────────── */
const toc: TocItem[] = [
  { id: "type",  label: "Type" },
  { id: "style", label: "Style" },
  { id: "usage", label: "사용 가이드" },
];

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function DividerPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Divider</h1>
          <p className="text-sm text-foreground leading-relaxed">
            구분선(divider)은 목록이나 컨테이너의 콘텐츠를 그룹화 하는 얇은 가로 또는 세로선 입니다.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ══════════ DOCS ══════════ */}
          <TabContent value="docs" className="mt-6 space-y-12">

            {/* ── Type ── */}
            <section id="type">
              <h2 className="text-lg font-semibold text-foreground mb-4">Type</h2>

              <div className="grid grid-cols-2 gap-4">

                {/* Horizontal */}
                <div className="border border-border rounded-lg p-6 bg-card">
                  <p className="text-xs font-medium text-foreground mb-6 text-center">Horizontal</p>
                  <div className="flex flex-col gap-8">

                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-foreground">Full width</p>
                      <div className="flex flex-col gap-3">
                        <div className="h-8 bg-ac-gray-20 rounded" />
                        <Divider orientation="horizontal" />
                        <div className="h-8 bg-ac-gray-20 rounded" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-foreground">Inset</p>
                      <div className="flex flex-col gap-3">
                        <div className="h-8 bg-ac-gray-20 rounded" />
                        <Divider orientation="horizontal" inset />
                        <div className="h-8 bg-ac-gray-20 rounded" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Vertical */}
                <div className="border border-border rounded-lg p-6 bg-card">
                  <p className="text-xs font-medium text-foreground mb-6 text-center">Vertical</p>
                  <div className="flex gap-10 justify-center">

                    <div className="flex flex-col gap-3 items-center">
                      <p className="text-xs text-foreground">Full height</p>
                      <div className="flex items-stretch gap-3 h-40">
                        <div className="w-8 bg-ac-gray-20 rounded" />
                        <Divider orientation="vertical" />
                        <div className="w-8 bg-ac-gray-20 rounded" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 items-center">
                      <p className="text-xs text-foreground">Inset</p>
                      <div className="flex items-stretch gap-3 h-40">
                        <div className="w-8 bg-ac-gray-20 rounded" />
                        <Divider orientation="vertical" inset />
                        <div className="w-8 bg-ac-gray-20 rounded" />
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* ── Style ── */}
            <section id="style">
              <h2 className="text-lg font-semibold text-foreground mb-4">Style</h2>

              <div className="bg-ac-gray-20 rounded-lg overflow-hidden">
                <div className="px-8 py-7 flex flex-col items-center gap-2">
                  <p className="text-xs text-foreground self-center">Solid</p>
                  <Divider variant="solid" />
                </div>
                <div className="px-8 py-7 flex flex-col items-center gap-2">
                  <p className="text-xs text-foreground self-center">Dashed</p>
                  <Divider variant="dashed" />
                </div>
              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              {/* 적용 구분 */}
              <h3 className="text-lg font-semibold text-foreground mb-2">적용 구분</h3>
              <p className="text-sm text-foreground mb-4">
                구분선은 레이아웃에 명확성과 구조를 부여하는 데 사용해야 합니다. 주로 구분선은 관련 요소 그룹을 분리하거나 밀집한 콘텐츠를 분해하는 데 도움이 됩니다.
                그러나 소스에 공백을 사용해 구분할 수 있는 경우에는 구분선 사용을 지양하도록 합니다.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <UsageCard
                  type="Do"
                  src="/divider/usage_divider_do.png"
                  description="공백은 주로 관련 콘텐츠 그룹을 구분하는 데 사용합니다."
                />
                <UsageCard
                  type="Don't"
                  src="/divider/usage_divider_dont.png"
                  description="구분선을 과도하게 사용하면 화면의 복잡성이 가독성이나 사용자의 인식이 복잡한 화면처럼 보일 수 있으므로 적절히 사용합니다."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <UsageCard
                  type="Do"
                  src="/divider/usage_content_do.png"
                  description="구분선을 사용하여 콘텐츠를 구분합니다."
                />
                <UsageCard
                  type="Don't"
                  src="/divider/usage_content_dont.png"
                  description="그룹화한 내용에 구분선을 사용하여 영역을 나누지 않도록 주의하여 사용합니다."
                />
              </div>
            </section>

          </TabContent>

          {/* ══════════ CODE ══════════ */}
          <TabContent value="code" className="mt-6 space-y-8">
 
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Import</h2>
              <CodeBlock code={`import { Divider } from "@alphacode-ai/design-system";`} />
            </section>
 
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`{/* Horizontal — 기본 */}
<Divider />
 
{/* Vertical */}
<Divider orientation="vertical" />
 
{/* Inset */}
<Divider inset />
 
{/* Dashed */}
<Divider variant="dashed" />
 
{/* Dashed + Vertical */}
<Divider orientation="vertical" variant="dashed" />`} />
            </section>
 
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Customization</h2>
              <p className="text-sm text-muted-foreground mb-4">
                두께와 색상은 별도 prop이 없으며, <CodeBadge>className</CodeBadge>을 추가해 오버라이드할 수 있습니다.
              </p>
              <CodeBlock code={`{/* 두께 — solid는 height로 조정 */}
<Divider className="h-0.5" />  {/* 2px */}
<Divider className="h-1" />    {/* 4px */}
 
{/* 색상 */}
<Divider className="bg-ac-primary-50" />
<Divider className="bg-ac-red-50" />
<Divider className="bg-ac-blue-50" />
 
{/* 두께 + 색상 조합 */}
<Divider className="h-0.5 bg-ac-primary-50" />`} />
            </section>
 
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">
                    {h}
                  </div>
                ))}
                {[
                  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "구분선 방향"],
                  ["variant",     '"solid" | "dashed"',        '"solid"',      "구분선 스타일"],
                  ["inset",       "boolean",                   "false",        "양끝 여백을 두는 inset 스타일"],
                ].map(([prop, type, def, desc], i, arr) => (
                  <React.Fragment key={i}>
                    <div className={cn("px-3 py-2 font-mono text-xs text-ac-primary-50", i < arr.length - 1 && "border-b border-border")}>{prop}</div>
                    <div className={cn("px-3 py-2 font-mono text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{type}</div>
                    <div className={cn("px-3 py-2 font-mono text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{def}</div>
                    <div className={cn("px-3 py-2 text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{desc}</div>
                  </React.Fragment>
                ))}
              </div>
            </section>
 
          </TabContent>
        </Tabs>
      </div>

      {/* ── TOC ── */}
      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}