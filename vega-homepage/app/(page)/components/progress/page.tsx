"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  ProgressIndicator,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",    label: "Type" },
  { id: "anatomy", label: "Anatomy" },
  { id: "size",    label: "Size" },
  { id: "usage",   label: "사용 가이드" },
];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Progress Indicator</h1>
          <p className="text-sm text-foreground leading-relaxed">
            작업률 표시기(Progress Indicator)는 사용자에게 작업 완료까지 남은 진행률을 표시해주는 컴포넌트입니다.
            또는 작업이 진행 중임을 사용자에게 표출하는 로딩 요소로 사용될 수 있습니다.
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
                선형(Linear)과 원형(Circular) 두 가지 타입을 제공합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex items-center justify-center gap-16">

                {/* Linear */}
                <div className="flex flex-col items-center gap-5">
                  <p className="text-xs font-medium text-foreground">선형 (Linear)</p>
                  <div className="flex flex-col gap-6 w-[320px]">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs text-muted-foreground">Default</p>
                      <ProgressIndicator type="linear" value={60} linearSize="md" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs text-muted-foreground">Label & Percent</p>
                      <ProgressIndicator type="linear" value={60} linearSize="md" label="파일 업로드 중 ..." showValue />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs text-muted-foreground">Indeterminate</p>
                      <ProgressIndicator type="linear" linearSize="md" indeterminate />
                    </div>
                  </div>
                </div>

                {/* Circular */}
                <div className="flex flex-col items-center gap-5">
                  <p className="text-xs font-medium text-foreground">원형 (Circular)</p>
                  <div className="flex items-start gap-10">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-muted-foreground">Default</p>
                      <ProgressIndicator type="circular" value={60} circularSize="md" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-muted-foreground">Label & Percent</p>
                      <ProgressIndicator type="circular" value={60} circularSize="md" label="업로드 중" showValue />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-muted-foreground">Indeterminate</p>
                      <ProgressIndicator type="circular" circularSize="md" indeterminate />
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-1">Anatomy</h2>
              <p className="text-sm text-foreground mb-4">
                Progress Indicator는 현재 진행률과 전체 작업량으로 구성됩니다.
              </p>
              <div className="rounded-lg p-12 flex items-center justify-center bg-ac-gray-20">
                <img src="/progress/progress_anatomy.png" alt="progress indicator anatomy" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>현재 진행률 — 작업이 완료된 비율을 나타냅니다.</li>
                <li>전체 작업량 — 진행 바의 전체 트랙으로, 작업 전체 범위를 나타냅니다.</li>
              </ol>
            </section>

            {/* ── Size ── */}
            <section id="size">
              <h2 className="text-lg font-semibold text-foreground mb-1">Size</h2>
              <p className="text-sm text-foreground mb-4">
                선형 사이즈는 sm / md / lg / xl 4가지를 사용하고 원형 사이즈는 xs / sm / md / lg / xl 5가지를 사용합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex items-center justify-center gap-16">

                {/* Linear */}
                <div className="flex flex-col items-center gap-5">
                  <p className="text-xs font-medium text-foreground">선형 (Linear)</p>
                  <div className="flex flex-col gap-4 w-[320px]">
                    {(["sm", "md", "lg", "xl"] as const).map((size) => (
                      <div key={size} className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground font-mono w-4 shrink-0">{size}</span>
                        <ProgressIndicator type="linear" value={60} linearSize={size} className="flex-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Circular */}
                <div className="flex flex-col items-center gap-5">
                  <p className="text-xs font-medium text-foreground">원형 (Circular)</p>
                  <div className="flex items-end gap-6">
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                      <div key={size} className="flex flex-col items-center gap-2">
                        <ProgressIndicator type="circular" value={60} circularSize={size} />
                        <span className="text-xs text-muted-foreground font-mono">{size}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">레이블 적용</h3>
                <p className="text-sm text-foreground mb-4">
                  라벨과 함께 적용 시 다음과 같이 배치합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/progress/usage_label_linear_do.png" />
                  <UsageCard type="Do" src="/progress/usage_label_circular_do.png" />
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">선형 Full Width 적용</h3>
                <p className="text-sm text-foreground mb-4">
                  전체 화면에 선형 타입을 full width로 적용할 때 다음과 같이 사용합니다.
                </p>
                <div className="grid grid-cols-1 gap-6">
                  <UsageCard type="Do" src="/progress/usage_fullwidth_do.png" className="h-80" />
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
              <CodeBlock code={`import { ProgressIndicator } from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`{/* 선형 */}
<ProgressIndicator type="linear" value={60} />

{/* 원형 */}
<ProgressIndicator type="circular" value={60} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Size</h2>
              <CodeBlock code={`{/* 선형 — sm | md(기본값) | lg | xl */}
<ProgressIndicator type="linear" value={60} linearSize="sm" />
<ProgressIndicator type="linear" value={60} linearSize="md" />
<ProgressIndicator type="linear" value={60} linearSize="lg" />
<ProgressIndicator type="linear" value={60} linearSize="xl" />

{/* 원형 — xs | sm | md(기본값) | lg | xl */}
<ProgressIndicator type="circular" value={60} circularSize="xs" />
<ProgressIndicator type="circular" value={60} circularSize="sm" />
<ProgressIndicator type="circular" value={60} circularSize="md" />
<ProgressIndicator type="circular" value={60} circularSize="lg" />
<ProgressIndicator type="circular" value={60} circularSize="xl" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Label & Value</h2>
              <CodeBlock code={`{/* 라벨 + 퍼센트 표시 */}
<ProgressIndicator type="linear" value={71} label="파일 업로드 중 ..." showValue />

{/* 원형 — 중앙에 퍼센트 표시 */}
<ProgressIndicator type="circular" value={26} label="파일 업로드 중" showValue />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Indeterminate</h2>
              <CodeBlock code={`{/* 진행률을 알 수 없는 로딩 상태 */}
<ProgressIndicator type="linear" indeterminate />
<ProgressIndicator type="circular" indeterminate />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Color</h2>
              <CodeBlock code={`{/* hex 코드 */}
<ProgressIndicator type="linear" value={60} color="#3B82F6" />

{/* 디자인 토큰 (ac-xxx-xx 형식으로 입력하면 var(--ac-xxx-xx)로 자동 변환) */}
<ProgressIndicator type="linear" value={60} color="ac-blue-50" trackColor="ac-blue-10" />

{/* CSS 변수 직접 입력 */}
<ProgressIndicator type="circular" value={60} color="var(--ac-green-50)" trackColor="var(--ac-green-10)" />`} />
            </section>

            {/* ProgressIndicator Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">ProgressIndicator Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["type",          '"linear" | "circular"',                              '"linear"',  "선형 또는 원형 타입"],
                  ["value",         "number",                                              "0",         "현재 진행값 (0 ~ max)"],
                  ["max",           "number",                                              "100",       "최대값"],
                  ["linearSize",    '"sm" | "md" | "lg" | "xl"',                          '"md"',      "선형 높이 사이즈"],
                  ["circularSize",  '"xs" | "sm" | "md" | "lg" | "xl"',                   '"md"',      "원형 직경 사이즈"],
                  ["color",         "string",                                              '"#FF6300"', "진행 색상 (hex, rgb, CSS 변수)"],
                  ["trackColor",    "string",                                              '"#ECECEC"', "트랙 배경 색상"],
                  ["label",         "string",                                              "-",         "라벨 텍스트"],
                  ["showValue",     "boolean",                                             "false",     "퍼센트 값 표시 여부"],
                  ["indeterminate", "boolean",                                             "false",     "진행률 미확정 로딩 상태"],
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
