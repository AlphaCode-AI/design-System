"use client";

import { useState } from "react";
import {
  Skeleton,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import PropsTable from "@/app/components/PropsTable";
import PageHeader from "@/app/components/PageHeader";
import PreviewBox from "@/app/components/PreviewBox";

const toc: TocItem[] = [
  { id: "preview",  label: "Preview" },
  { id: "radius",   label: "Radius" },
  { id: "stagger",  label: "Stagger" },
  { id: "props",    label: "Props" },
];

const RADIUS_VALUES = [
  { value: "none",    label: "none" },
  { value: 1,         label: "1" },
  { value: 2,         label: "2" },
  { value: 3,         label: "3" },
  { value: 4,         label: "4" },
  { value: "rounded", label: "rounded" },
] as const;

export default function SkeletonPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-8">

        <PageHeader
          title="Skeleton"
          description="콘텐츠가 로드되기 전 레이아웃 자리를 채우는 로딩 플레이스홀더입니다. animate-pulse 애니메이션과 stagger delay를 지원합니다."
        />

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ══════════════════════════════════════
              DOCS
          ══════════════════════════════════════ */}
          <TabContent value="docs" className="mt-6 space-y-14">

            {/* ── Preview ── */}
            <section id="preview">
              <h2 className="text-lg font-semibold text-foreground mb-1">Preview</h2>
              <p className="text-sm text-foreground mb-4">
                카드 레이아웃 로딩 상태 예시입니다.
              </p>
              <PreviewBox variant="gray" className="flex items-center justify-center p-10">
                <div className="w-72 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton width={40} height={40} radius="rounded" index={0} />
                    <div className="flex-1 space-y-2">
                      <Skeleton height={14} radius={3} index={1} />
                      <Skeleton width="60%" height={12} radius={3} index={2} />
                    </div>
                  </div>
                  <Skeleton height={12} radius={3} index={3} />
                  <Skeleton height={12} radius={3} index={4} />
                  <Skeleton width="75%" height={12} radius={3} index={5} />
                </div>
              </PreviewBox>
            </section>

            {/* ── Radius ── */}
            <section id="radius">
              <h2 className="text-lg font-semibold text-foreground mb-1">Radius</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>radius</CodeBadge> prop으로 모서리 반경을 조정합니다.{" "}
                <CodeBadge>rounded</CodeBadge>는 아바타, 아이콘 등 원형 요소에 사용합니다.
              </p>
              <PreviewBox variant="border" className="p-8">
                <div className="flex flex-wrap items-end justify-center gap-8">
                  {RADIUS_VALUES.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <Skeleton
                        width={value === "rounded" ? 60 : 80}
                        height={value === "rounded" ? 60 : 40}
                        radius={value}
                      />
                      <span className="text-xs text-muted-foreground font-mono">{label}</span>
                    </div>
                  ))}
                </div>
              </PreviewBox>
            </section>

            {/* ── Stagger ── */}
            <section id="stagger">
              <h2 className="text-lg font-semibold text-foreground mb-1">Stagger</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>index</CodeBadge>를 순서대로 전달하면 항목마다 80ms씩 딜레이가 추가되어
                순차적으로 애니메이션이 시작됩니다.
              </p>
              <PreviewBox variant="gray" className="flex items-center justify-center p-8">
                <div className="w-64 space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton width={32} height={32} radius="rounded" index={i} />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton height={12} radius={3} index={i} />
                        <Skeleton width="55%" height={10} radius={3} index={i} />
                      </div>
                    </div>
                  ))}
                </div>
              </PreviewBox>
            </section>

            {/* ── Props ── */}
            <section id="props">
              <h2 className="text-lg font-semibold text-foreground mb-4">Props</h2>
              <PropsTable
                rows={[
                  ["width",     "number | string",                         "'100%'", "너비. 숫자는 px, 문자열은 CSS 값으로 처리됩니다."],
                  ["height",    "number | string",                         "'100%'", "높이. 숫자는 px, 문자열은 CSS 값으로 처리됩니다."],
                  ["radius",    "'none' | 0 | 1 | 2 | 3 | 4 | 'rounded'", "3",      "모서리 반경. rounded는 원형 요소에 사용합니다."],
                  ["index",     "number",                                  "0",      "stagger 순서. n번째 요소는 100 + 80×n ms 딜레이로 시작합니다."],
                  ["className", "string",                                  "-",      "추가 Tailwind 클래스."],
                ]}
              />
            </section>

          </TabContent>

          {/* ══════════════════════════════════════
              CODE
          ══════════════════════════════════════ */}
          <TabContent value="code" className="mt-6 space-y-8">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Import</h2>
              <CodeBlock code={`import { Skeleton } from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`<Skeleton width={200} height={16} radius={3} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">카드형 레이아웃</h2>
              <CodeBlock code={`<div className="space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton width={40} height={40} radius="rounded" index={0} />
    <div className="flex-1 space-y-2">
      <Skeleton height={14} radius={3} index={1} />
      <Skeleton width="60%" height={12} radius={3} index={2} />
    </div>
  </div>
  <Skeleton height={12} radius={3} index={3} />
  <Skeleton height={12} radius={3} index={4} />
  <Skeleton width="75%" height={12} radius={3} index={5} />
</div>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Color</h2>
              <CodeBlock code={`{/* 기본값: bg-ac-gray-30 */}
<Skeleton width={200} height={16} />

{/* className으로 색상 오버라이드 */}
<Skeleton width={200} height={16} className="bg-ac-blue-20" />
<Skeleton width={200} height={16} className="bg-ac-primary-20" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Stagger 리스트</h2>
              <CodeBlock code={`{[0, 1, 2, 3].map((i) => (
  <div key={i} className="flex items-center gap-3">
    <Skeleton width={32} height={32} radius="rounded" index={i} />
    <div className="flex-1 space-y-1.5">
      <Skeleton height={12} radius={3} index={i} />
      <Skeleton width="55%" height={10} radius={3} index={i} />
    </div>
  </div>
))}`} />
            </section>

          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
