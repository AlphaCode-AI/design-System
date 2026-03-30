"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Badge,
  Check,
  CircleCheck,
  TriangleAlert,
  CircleX,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "type",     label: "Type" },
  { id: "anatomy",  label: "Anatomy" },
  { id: "size",     label: "Size" },
  { id: "usage",    label: "사용 가이드" },
];

export default function BadgePage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Badge</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            배지(badge)는 컴포넌트의 분류 체계, 구조화된 정보, 상태 정보, 기타 메타 데이터를 표시할 수 있으며 사용자의 주의를 끌기 위해 색상을 활용할 수 있습니다.
          </p>
        </div>

        {/* 탭 시스템 */}
        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ── Docs 탭 ── */}
          <TabContent value="docs" className="pt-6 space-y-16">

            {/* Type */}
            <section id="type" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Type</h2>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-center justify-around">
                  {/* 상태 정보 배지 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex flex-col gap-2 items-center">
                      <Badge variant="complete" icon={<Check className="w-4 h-4" />}>Complete</Badge>
                      <Badge variant="success" icon={<CircleCheck className="w-4 h-4" />}>Success</Badge>
                      <Badge variant="warning" icon={<TriangleAlert className="w-4 h-4" />}>Warning</Badge>
                      <Badge variant="fail" icon={<CircleX className="w-4 h-4" />}>Fail</Badge>
                    </div>
                    <span className="text-sm text-foreground mt-2">상태 정보 배지</span>
                  </div>

                  {/* 분류 배지 */}
                  <div className="flex flex-col items-center gap-3">
                    <Badge variant="default">Badge</Badge>
                    <span className="text-sm text-foreground">분류 배지</span>
                  </div>

                  {/* 기타 메타 데이터 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex flex-col gap-2 items-center">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="default">Default</Badge>
                      <Badge variant="primary" size="sm">Primary small</Badge>
                      <Badge variant="default" size="sm">Default small</Badge>
                    </div>
                    <span className="text-sm text-foreground mt-2">기타 메타 데이터</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="flex items-center justify-center">
                  <img src="/badge/badge_anatomy.png" alt="badge anatomy" />
                </div>
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>텍스트 레이블: 배지를 통해 전달하고자 하는 메타 데이터</li>
                <li>컨테이너 <span className="text-muted-foreground">(선택)</span>: 배지를 배경과 구분하는 윤곽선</li>
                <li>아이콘 <span className="text-muted-foreground">(선택)</span>: 배지에 시각적인 상징으로 좌측 표현하여 사용</li>
              </ol>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-4">
                배지 사이즈는 높이 기준 2가지로 구분됩니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-end justify-center gap-12">
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="primary" size="lg">Size : lg</Badge>
                    <span className="text-sm text-foreground">height : 30px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="primary" size="md">Size : md</Badge>
                    <span className="text-sm text-foreground">height : 26px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="primary" size="sm">Size : sm</Badge>
                    <span className="text-sm text-foreground">height : 20px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="primary" size="xs">Size : xs</Badge>
                    <span className="text-sm text-foreground">height : 16px</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              {/* 명확한 레이블 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">명확한 레이블</h3>
                <p className="text-sm text-foreground mb-4">
                  Badge는 설명이 필요한 구성 요소 위 또는 근처에 배치하고 짧고 명확한 레이블을 노출하여 사용자가 빠르게 이해하고 탐색할 수 있도록 사용합니다. 레이블은 어떤 상태를 설명하는 한두 단어를 목표로 합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/badge/usage_label_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/badge/usage_label_dont.png"
                  />
                </div>
              </div>

              {/* 중복 사용 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">중복 사용</h3>
                <p className="text-sm text-foreground mb-4">
                  배지는 사용자가 빠르게 정보를 훑어 보는 과정을 돕기 위해 사용됩니다. 만약 한 항목에 여러 개의 배지가 사용된다면 지나치게 많은 정보가 강조되어 있어 배지의 사용 효과를 감소시킵니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/badge/usage_use_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/badge/usage_use_dont.png"
                  />
                </div>
              </div>
            </section>

          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              {/* 기본 사용 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. 기본 사용</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>variant</CodeBadge> prop으로 배지 유형을 지정합니다.
                </p>
                <CodeBlock code={`import { Badge } from "@alphacode-ai/design-system";

// 상태 정보 배지
<Badge variant="complete">Complete</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="fail">Fail</Badge>

// 기타 메타 배지
<Badge variant="primary">Primary</Badge>
<Badge variant="default">Default</Badge>`} />
              </div>

              {/* 아이콘 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 아이콘 사용</h3>
                <p className="text-sm text-foreground mb-4">
                  icon prop으로 좌측 아이콘을 추가합니다. 아이콘은 lucide-react 아이콘을 사용하며 <CodeBadge>@alphacode-ai/design-system</CodeBadge>에서 import합니다.
                </p>
                <CodeBlock code={`import { Badge, CheckCheck, CircleCheck, TriangleAlert, CircleX } from "@alphacode-ai/design-system";

// ⚠️ lucide-react에서 직접 import하지 않습니다.
// import { CheckCheck } from "lucide-react"; // ❌
// import { CheckCheck } from "@alphacode-ai/design-system"; // ✅

<Badge variant="complete" icon={<CheckCheck className="w-3 h-3" />}>Complete</Badge>
<Badge variant="success" icon={<CircleCheck className="w-3 h-3" />}>Success</Badge>
<Badge variant="warning" icon={<TriangleAlert className="w-3 h-3" />}>Warning</Badge>
<Badge variant="fail" icon={<CircleX className="w-3 h-3" />}>Fail</Badge>`} />
              </div>

              {/* 사이즈 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 사이즈를 지정합니다. 기본값은 md입니다.
                </p>
                <CodeBlock code={`<Badge variant="primary" size="lg">Primary</Badge>  {/* height: 30px */}
<Badge variant="primary" size="md">Primary</Badge>  {/* height: 26px — 기본값 */}
<Badge variant="primary" size="sm">Primary</Badge>  {/* height: 20px */}
<Badge variant="primary" size="xs">Primary</Badge>  {/* height: 16px */}`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["variant", '"default" | "primary" | "complete" | "success" | "warning" | "fail"', '"default"', "배지 스타일 변형"],
                  ["size", '"xs" | "sm" | "md" | "lg"', '"md"', "배지 크기 (16 / 20 / 26 / 30px)"],
                  ["icon", "ReactNode", "-", "좌측에 표시할 아이콘 노드"],
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

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}