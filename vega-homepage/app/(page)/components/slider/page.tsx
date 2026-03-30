"use client";

import React, { useState } from "react";
import {
  Slider,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Volume2,
  VolumeX,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";

const toc: TocItem[] = [
  { id: "type",  label: "Type" },
  { id: "color", label: "Color" },
  { id: "state", label: "State" },
];

export default function SliderPage() {
  const [singleValue, setSingleValue] = useState(40);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 70]);
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Slider</h1>
          <p className="text-sm text-foreground leading-relaxed">
            슬라이더(Slider)는 사용자가 주어진 범위 내에서 값을 드래그하여 직접 선택하는 컴포넌트입니다.
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
                <CodeBadge>type</CodeBadge> prop으로 5가지 형태를 지원합니다.
              </p>
              <div className="bg-card flex flex-col gap-4">
                {/* default + input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                    <p className="text-xs font-medium text-foreground">Default</p>
                    <Slider type="default" showMinMax defaultValue={40} />
                  </div>
                  <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                    <p className="text-xs font-medium text-foreground">Input</p>
                    <Slider type="input" defaultValue={60} />
                  </div>
                </div>

                {/* with-icon + range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                    <p className="text-xs font-medium text-foreground">With Icon</p>
                    <Slider
                      type="with-icon"
                      defaultValue={50}
                      leftIcon={<VolumeX width={12} height={12} />}
                      rightIcon={<Volume2 width={24} height={24} />}
                    />
                  </div>
                  <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                    <p className="text-xs font-medium text-foreground">Range</p>
                    <Slider type="range" showMinMax defaultValue={[20, 70]} />
                  </div>
                </div>

                {/* range-input: 전체 너비 */}
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground">Range Input</p>
                  <Slider type="range-input" defaultValue={[20, 70]} />
                </div>

              </div>
            </section>

            {/* ── Color ── */}
            <section id="color">
              <h2 className="text-lg font-semibold text-foreground mb-1">Color</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>color</CodeBadge> prop으로 슬라이더 색상을 변경할 수 있습니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex flex-col gap-6">
                {[
                  { label: "bg-ac-primary-50", colorClassName: "bg-ac-primary-50" },
                  { label: "bg-ac-blue-50",    colorClassName: "bg-ac-blue-50" },
                  { label: "bg-ac-green-50",   colorClassName: "bg-ac-green-50" },
                  { label: "bg-ac-red-50",     colorClassName: "bg-ac-red-50" },
                  { label: "bg-ac-orange-50",  colorClassName: "bg-ac-orange-50" },
                  { label: "bg-ac-purple-50",  colorClassName: "bg-ac-purple-50" },
                ].map(({ label, colorClassName }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted-foreground w-36 shrink-0">{label}</span>
                    <Slider colorClassName={colorClassName} defaultValue={50} />
                  </div>
                ))}
              </div>
            </section>

            {/* ── State ── */}
            <section id="state">
              <h2 className="text-lg font-semibold text-foreground mb-1">State</h2>
              <p className="text-sm text-foreground mb-4">
                슬라이더는 <CodeBadge>default</CodeBadge>, <CodeBadge>active</CodeBadge>(드래그 중), <CodeBadge>disabled</CodeBadge> 상태를 지원합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex flex-row gap-8">

                {/* default */}
                <div className="flex flex-col gap-2 flex-1 items-center">
                  <p className="text-xs font-medium text-foreground">Default</p>
                  <div className="w-[400px]">
                    <Slider defaultValue={50} />
                  </div>
                </div>

                {/* disabled */}
                <div className="flex flex-col gap-2 flex-1 items-center">
                  <p className="text-xs font-medium text-foreground">Disabled</p>
                  <div className="w-[400px]">
                    <Slider defaultValue={50} disabled />
                  </div>
                </div>

              </div>
            </section>

          </TabContent>

          {/* ══════════════════════════════════════
              CODE
          ══════════════════════════════════════ */}
          <TabContent value="code" className="mt-6 space-y-10">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Default</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>showMinMax</CodeBadge>로 최솟값/최댓값 레이블을 표시합니다.</p>
              <CodeBlock code={`<Slider type="default" showMinMax defaultValue={40} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Input</h2>
              <p className="text-sm text-foreground mb-4">우측에 숫자 입력 필드가 함께 표시됩니다.</p>
              <CodeBlock code={`<Slider type="input" defaultValue={60} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Color</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>colorClassName</CodeBadge>에 Tailwind 배경색 클래스를 전달합니다.</p>
              <CodeBlock code={`<Slider colorClassName="bg-ac-blue-50"   defaultValue={50} />
<Slider colorClassName="bg-ac-green-50"  defaultValue={50} />
<Slider colorClassName="bg-ac-red-50"    defaultValue={50} />
<Slider colorClassName="bg-ac-purple-50" defaultValue={50} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">With Icon</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>leftIcon</CodeBadge> / <CodeBadge>rightIcon</CodeBadge>으로 양쪽 아이콘을 지정합니다.</p>
              <CodeBlock code={`<Slider
  type="with-icon"
  defaultValue={50}
  leftIcon={<VolumeX width={12} height={12} />}
  rightIcon={<Volume2 width={24} height={24} />}
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Range</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>defaultValue</CodeBadge>에 배열을 전달하면 두 개의 thumb이 생성됩니다.</p>
              <CodeBlock code={`<Slider type="range" showMinMax defaultValue={[20, 70]} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Range Input</h2>
              <CodeBlock code={`<Slider type="range-input" defaultValue={[20, 70]} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Controlled</h2>
              <CodeBlock code={`const [value, setValue] = useState(40);

<Slider value={value} onValueChange={(v) => setValue(v as number)} />

// range
const [range, setRange] = useState<[number, number]>([20, 70]);

<Slider type="range" value={range} onValueChange={(v) => setRange(v as [number, number])} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Disabled</h2>
              <CodeBlock code={`<Slider defaultValue={50} disabled />`} />
            </section>

            {/* Props 테이블 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Slider Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["type",          '"default" | "input" | "with-icon" | "range" | "range-input"', '"default"', "슬라이더 타입"],
                  ["colorClassName", "string (Tailwind 클래스)",                                    '"bg-ac-primary-50"', "슬라이더 색상. Tailwind 배경색 클래스 전달"],
                  ["min",           "number",                    "0",          "최솟값"],
                  ["max",           "number",                    "100",        "최댓값"],
                  ["step",          "number",                    "1",          "단계 값"],
                  ["value",         "number | [number, number]", "—",          "제어 값 (single 또는 range)"],
                  ["defaultValue",  "number | [number, number]", "—",          "초기값 (비제어)"],
                  ["onValueChange", "(value) => void",           "—",          "값 변경 콜백"],
                  ["disabled",      "boolean",                   "false",      "비활성화 여부"],
                  ["showMinMax",    "boolean",                   "false",      "min/max 레이블 표시 (default, range 타입)"],
                  ["leftIcon",      "ReactNode",                 "—",          "좌측 아이콘 (with-icon 타입)"],
                  ["rightIcon",     "ReactNode",                 "—",          "우측 아이콘 (with-icon 타입)"],
                ].map(([prop, type, def, desc]) => (
                  <React.Fragment key={prop}>
                    <div className="px-3 py-2 border-b border-border font-mono text-xs text-ac-primary-60">{prop}</div>
                    <div className="px-3 py-2 border-b border-border font-mono text-xs text-muted-foreground">{type}</div>
                    <div className="px-3 py-2 border-b border-border font-mono text-xs">{def}</div>
                    <div className="px-3 py-2 border-b border-border text-xs text-foreground">{desc}</div>
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
