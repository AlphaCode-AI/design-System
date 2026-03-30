"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Tooltip,
  Button,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",   label: "Anatomy" },
  { id: "responsive-alignment", label: "Responsive alignment" },
  { id: "usage",     label: "사용 가이드" },
];

function PropsTable({ rows }: { rows: string[][] }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
      className="border border-border rounded-lg overflow-hidden text-sm"
    >
      {["Prop", "Type", "Default", "Description"].map((h) => (
        <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
      ))}
      {rows.map(([prop, type, def, desc], i, arr) => (
        <React.Fragment key={i}>
          <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{prop}</div>
          <div className={`px-3 py-2 font-mono text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{type}</div>
          <div className={`px-3 py-2 font-mono text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{def}</div>
          <div className={`px-3 py-2 text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

const PLACEMENTS = [
  "top-left", "top-center", "top-right",
  "bottom-left", "bottom-center", "bottom-right",
] as const;

export default function TooltipPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Tooltip</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
          툴팁(Tooltip)은 사용자 인터페이스 요소 또는 기능을 설명하는 데 사용됩니다. 직접적으로 인지하기 어려운 기능 또는 해당 페이지의 설명을 사용자에게 노출하여 도움을 주는 역할을 합니다.
          </p>
        </div>

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ── Docs 탭 ── */}
          <TabContent value="docs" className="pt-6 space-y-16">

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center min-h-[160px]">
                <img src="/tooltip/tooltip_anatomy.png" alt="tooltip anatomy" className="max-w-full" />
              </div>
              <ul className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>툴팁 버튼 : 툴팁을 트리거하는 요소</li>
                <li>툴팁 본문 : 설명 텍스트가 표시되는 말풍선 영역</li>
              </ul>
            </section>

            {/* Responsive alignment */}
            <section id="responsive-alignment" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Responsive alignment</h2>
              <p className="text-sm text-foreground mb-6">
                툴팁 버튼이 있는 위치와 화면에 맞춰 툴팁 본문을 표출합니다. <CodeBadge>placement</CodeBadge> prop으로 위치를 지정하며 기본값은 <CodeBadge>top-center</CodeBadge>입니다.
              </p>
              <div className="rounded-lg border border-border p-12">
                <div className="grid grid-cols-3 gap-x-8 gap-y-16 place-items-center">
                  {PLACEMENTS.map((p) => (
                    <div key={p} className="flex flex-col items-center gap-3">
                      <span className="text-xs text-muted-foreground">{p}</span>
                      <Tooltip content="툴팁 텍스트입니다." placement={p}>
                        <Button size="sm" variant="tertiary">{p}</Button>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">영역 관련</h3>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Don't"
                    src="/tooltip/usage_area_dont_1.png"
                    description="툴팁 본문 영역이 시각적으로 확인할 수 없는 화면 밖의 영역에 배치되어 가려지지 않도록 유의합니다."
                    className="h-80"
                  />
                  <UsageCard
                    type="Don't"
                    src="/tooltip/usage_area_dont_2.png"
                    description="툴팁 본문 영역이 맥락적으로 도움을 제공하고자 하는 중요 콘텐츠를 가리지 않도록 유의합니다."
                    className="h-80"
                  />
                </div>
              </div>
            </section>

          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. 기본 사용</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>Tooltip</CodeBadge>으로 트리거 요소를 감싸고 <CodeBadge>content</CodeBadge>에 표시할 텍스트를 넣습니다.
                </p>
                <CodeBlock code={`import { Tooltip, Button } from "@alphacode-ai/design-system";

<Tooltip content="저장합니다.">
  <Button>저장</Button>
</Tooltip>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Placement</h3>
                <p className="text-sm text-foreground mb-4">
                  6가지 위치를 지원합니다. 기본값은 <CodeBadge>top-center</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<Tooltip content="툴팁 텍스트" placement="top-left">
  <Button>top-left</Button>
</Tooltip>

<Tooltip content="툴팁 텍스트" placement="top-center">
  <Button>top-center</Button>
</Tooltip>

<Tooltip content="툴팁 텍스트" placement="top-right">
  <Button>top-right</Button>
</Tooltip>

<Tooltip content="툴팁 텍스트" placement="bottom-left">
  <Button>bottom-left</Button>
</Tooltip>

<Tooltip content="툴팁 텍스트" placement="bottom-center">
  <Button>bottom-center</Button>
</Tooltip>

<Tooltip content="툴팁 텍스트" placement="bottom-right">
  <Button>bottom-right</Button>
</Tooltip>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. ReactNode content</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>content</CodeBadge>에 문자열 외에도 ReactNode를 넣을 수 있습니다.
                </p>
                <CodeBlock code={`<Tooltip
  content={
    <span>
      단축키: <strong>Ctrl + S</strong>
    </span>
  }
  placement="top-center"
>
  <Button>저장</Button>
</Tooltip>`} />
              </div>

            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Tooltip Props</h2>
              <PropsTable rows={[
                ["content",   "React.ReactNode",                                                                                       "-",            "툴팁에 표시할 내용 (필수)"],
                ["placement", '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', '"top-center"', "툴팁 표시 위치"],
                ["children",  "React.ReactNode",                                                                                       "-",            "툴팁을 트리거하는 요소 (필수)"],
                ["className", "string",                                                                                                "-",            "툴팁 박스에 추가할 Tailwind 클래스"],
              ]} />
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
