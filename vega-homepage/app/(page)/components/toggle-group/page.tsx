"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  ToggleGroup,
  ToggleGroupItem,
} from "@alphacode-ai/design-system";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",   label: "Anatomy" },
  { id: "type",      label: "Type" },
  { id: "state",     label: "State" },
  { id: "size",      label: "Size" },
  { id: "icon-only", label: "Icon only" },
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

export default function ToggleGroupPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Toggle Group</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            토글 그룹(Toggle Group)은 서로 관련된 옵션들을 그룹으로 묶어 하나의 선택지를 선택하거나 해제할 수 있는 컴포넌트입니다. 뷰 전환, 정렬 방식 선택 등에 활용됩니다.
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
                <img src="/toggle-group/toggle_anatomy.png" alt="toggle group anatomy" className="max-w-full" />
              </div>
              <ul className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>컨테이너 : 토글 그룹 전체를 감싸는 영역</li>
                <li>토글 그룹 아이템 : 개별 선택 가능한 버튼 요소</li>
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>아이템(선택) : 현재 활성화된 토글 아이템</li>
                    <li>레이블 : 각 아이템의 텍스트 또는 아이콘</li>
                  </ol>
                <li>선택된 토글</li>
                <li>기본 토글</li>
                <li>선택할 수 없는 토글 - disable</li>
              </ul>
            </section>

            {/* Type */}
            <section id="type" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Type</h2>
              <p className="text-sm text-foreground mb-6">
                <CodeBadge>variant</CodeBadge> prop으로 스타일을 지정합니다. <CodeBadge>default</CodeBadge>는 그레이 계열, <CodeBadge>primary</CodeBadge>는 브랜드 컬러를 사용합니다. 텍스트 레이블과 아이콘+레이블 타입을 지원합니다.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-4 items-center bg-ac-gray-20 rounded-lg p-6">
                  <span className="text-xs font-semibold text-muted-foreground">Default / Style: Default</span>
                  <ToggleGroup defaultValue="option1" variant="default">
                    <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                    <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="flex flex-col gap-4 items-center bg-ac-gray-20 rounded-lg p-6">
                  <span className="text-xs font-semibold text-muted-foreground">Default / Style: Primary</span>
                  <ToggleGroup defaultValue="option1" variant="primary">
                    <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                    <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                    <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="flex flex-col gap-4 items-center bg-ac-gray-20 rounded-lg p-6">
                  <span className="text-xs font-semibold text-muted-foreground">Icon + Label / Style: Default</span>
                  <ToggleGroup defaultValue="bold" variant="default">
                    <ToggleGroupItem value="bold" icon={<Bold className="w-4 h-4" />}>Bold</ToggleGroupItem>
                    <ToggleGroupItem value="italic" icon={<Italic className="w-4 h-4" />}>Italic</ToggleGroupItem>
                    <ToggleGroupItem value="underline" icon={<Underline className="w-4 h-4" />}>Underline</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="flex flex-col gap-4 items-center bg-ac-gray-20 rounded-lg p-6">
                  <span className="text-xs font-semibold text-muted-foreground">Icon + Label / Style: Primary</span>
                  <ToggleGroup defaultValue="bold" variant="primary">
                    <ToggleGroupItem value="bold" icon={<Bold className="w-4 h-4" />}>Bold</ToggleGroupItem>
                    <ToggleGroupItem value="italic" icon={<Italic className="w-4 h-4" />}>Italic</ToggleGroupItem>
                    <ToggleGroupItem value="underline" icon={<Underline className="w-4 h-4" />}>Underline</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                토글 그룹 아이템의 각 상태를 나타냅니다.
              </p>
              <div className="rounded-lg border border-border p-8 grid grid-cols-2 gap-8 items-start justify-items-center">
                {(["default", "primary"] as const).map((variant) => (
                  <div key={variant}>
                    <span className="text-xs font-semibold text-muted-foreground mb-4 block">
                      Style: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </span>
                    <div className="flex flex-wrap gap-8">
                      {/* 텍스트 타입 */}
                      <div className="flex flex-col gap-3">
                        <span className="text-xs text-muted-foreground font-medium">Text</span>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-xs text-muted-foreground">Default</span>
                            <ToggleGroup value="" variant={variant}>
                              <ToggleGroupItem value="x">Option</ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-xs text-muted-foreground">Active</span>
                            <ToggleGroup value="active" variant={variant}>
                              <ToggleGroupItem value="active">Option</ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-xs text-muted-foreground">Disabled</span>
                            <ToggleGroup value="" variant={variant}>
                              <ToggleGroupItem value="x" disabled>Option</ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                        </div>
                      </div>
                      {/* 아이콘 타입 */}
                      <div className="flex flex-col gap-3">
                        <span className="text-xs text-muted-foreground font-medium">Icon only</span>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-xs text-muted-foreground">Default</span>
                            <ToggleGroup value="" variant={variant} iconOnly>
                              <ToggleGroupItem value="x" icon={<Bold className="w-4 h-4" />} tooltip="Bold" />
                            </ToggleGroup>
                          </div>
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-xs text-muted-foreground">Active</span>
                            <ToggleGroup value="active" variant={variant} iconOnly>
                              <ToggleGroupItem value="active" icon={<Bold className="w-4 h-4" />} tooltip="Bold" />
                            </ToggleGroup>
                          </div>
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-xs text-muted-foreground">Disabled</span>
                            <ToggleGroup value="" variant={variant} iconOnly>
                              <ToggleGroupItem value="x" icon={<Bold className="w-4 h-4" />} tooltip="Bold" disabled />
                            </ToggleGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-6">
                토글 그룹의 사이즈는 <CodeBadge>sm</CodeBadge> / <CodeBadge>md</CodeBadge> / <CodeBadge>lg</CodeBadge> 3가지를 사용합니다.
              </p>
              <div className="rounded-lg border border-border p-8 flex flex-col gap-6 items-center">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size} className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground text-center">{size}{size === "md" ? " (기본)" : ""}</span>
                    <div className="flex gap-4 flex-wrap items-center">
                      <ToggleGroup defaultValue="option1" variant="default" size={size}>
                        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                      </ToggleGroup>
                      <ToggleGroup defaultValue="option1" variant="primary" size={size}>
                        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                      </ToggleGroup>
                      <ToggleGroup defaultValue="left" variant="default" size={size} iconOnly>
                        <ToggleGroupItem value="left" icon={<AlignLeft className="w-4 h-4" />} tooltip="왼쪽 정렬" />
                        <ToggleGroupItem value="center" icon={<AlignCenter className="w-4 h-4" />} tooltip="가운데 정렬" />
                        <ToggleGroupItem value="right" icon={<AlignRight className="w-4 h-4" />} tooltip="오른쪽 정렬" />
                        <ToggleGroupItem value="justify" icon={<AlignJustify className="w-4 h-4" />} tooltip="양쪽 정렬" />
                      </ToggleGroup>
                      <ToggleGroup defaultValue="left" variant="primary" size={size} iconOnly>
                        <ToggleGroupItem value="left" icon={<AlignLeft className="w-4 h-4" />} tooltip="왼쪽 정렬" />
                        <ToggleGroupItem value="center" icon={<AlignCenter className="w-4 h-4" />} tooltip="가운데 정렬" />
                        <ToggleGroupItem value="right" icon={<AlignRight className="w-4 h-4" />} tooltip="오른쪽 정렬" />
                        <ToggleGroupItem value="justify" icon={<AlignJustify className="w-4 h-4" />} tooltip="양쪽 정렬" />
                      </ToggleGroup>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Icon only */}
            <section id="icon-only" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Icon only</h2>
              <p className="text-sm text-foreground mb-6">
                <CodeBadge>iconOnly</CodeBadge> prop을 사용하면 아이콘만으로 구성된 토글 그룹을 만들 수 있습니다. 각 아이템에 <CodeBadge>tooltip</CodeBadge>을 설정하면 hover 시 레이블이 표출됩니다.
              </p>
              <div className="rounded-lg border border-border p-8 grid grid-cols-2 gap-8 items-start justify-items-center">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Style: Default</span>
                  <ToggleGroup defaultValue="left" iconOnly variant="default">
                    <ToggleGroupItem value="left" icon={<AlignLeft className="w-4 h-4" />} tooltip="왼쪽 정렬" />
                    <ToggleGroupItem value="center" icon={<AlignCenter className="w-4 h-4" />} tooltip="가운데 정렬" />
                    <ToggleGroupItem value="right" icon={<AlignRight className="w-4 h-4" />} tooltip="오른쪽 정렬" />
                    <ToggleGroupItem value="justify" icon={<AlignJustify className="w-4 h-4" />} tooltip="양쪽 정렬" />
                  </ToggleGroup>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Style: Primary</span>
                  <ToggleGroup defaultValue="left" iconOnly variant="primary">
                    <ToggleGroupItem value="left" icon={<AlignLeft className="w-4 h-4" />} tooltip="왼쪽 정렬" />
                    <ToggleGroupItem value="center" icon={<AlignCenter className="w-4 h-4" />} tooltip="가운데 정렬" />
                    <ToggleGroupItem value="right" icon={<AlignRight className="w-4 h-4" />} tooltip="오른쪽 정렬" />
                    <ToggleGroupItem value="justify" icon={<AlignJustify className="w-4 h-4" />} tooltip="양쪽 정렬" />
                  </ToggleGroup>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">일관적인 아이콘 사용</h3>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/toggle-group/usage_icon_do.png"
                    className="h-80"
                    description="아이콘을 사용할때 선택하는 요소를 명확히 지칭하는 아이콘을 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/toggle-group/usage_icon_dont.png"
                    className="h-80"
                    description="상태를 표현하기 위해 아이콘을 유동적으로 변경하지 않습니다. 선택 전/선택 후 아이콘이 동일해야 합니다."
                  />
                </div>
              </div>
              <div className="mb-10">
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/toggle-group/usage_type_do.png"
                    className="h-80"
                    description="토글 그룹 안에 아이템은 모두 동일한 타입을 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/toggle-group/usage_type_dont.png"
                    className="h-80"
                    description="토글 그룹안에 아이템마다 타입을 따로 사용하지 않습니다."
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
                  <CodeBadge>ToggleGroup</CodeBadge>으로 <CodeBadge>ToggleGroupItem</CodeBadge>을 감싸고, <CodeBadge>defaultValue</CodeBadge>로 초기 선택값을 지정합니다.
                </p>
                <CodeBlock code={`import { ToggleGroup, ToggleGroupItem } from "@alphacode-ai/design-system";

<ToggleGroup defaultValue="option1">
  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Variant (스타일)</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>variant</CodeBadge>로 스타일을 지정합니다. 기본값은 <CodeBadge>default</CodeBadge>입니다.
                </p>
                <CodeBlock code={`// default (그레이 계열)
<ToggleGroup defaultValue="a" variant="default">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>

// primary (브랜드 컬러)
<ToggleGroup defaultValue="a" variant="primary">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Size</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge>로 크기를 지정합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<ToggleGroup defaultValue="a" size="sm">
  <ToggleGroupItem value="a">Small</ToggleGroupItem>
  <ToggleGroupItem value="b">Small</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup defaultValue="a" size="md">
  <ToggleGroupItem value="a">Medium</ToggleGroupItem>
  <ToggleGroupItem value="b">Medium</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup defaultValue="a" size="lg">
  <ToggleGroupItem value="a">Large</ToggleGroupItem>
  <ToggleGroupItem value="b">Large</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 아이콘 + 레이블</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>icon</CodeBadge> prop으로 아이콘을 추가합니다.
                </p>
                <CodeBlock code={`import { ToggleGroup, ToggleGroupItem, Bold, Italic, Underline } from "@alphacode-ai/design-system";

<ToggleGroup defaultValue="bold">
  <ToggleGroupItem value="bold" icon={<Bold className="w-4 h-4" />}>Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic" icon={<Italic className="w-4 h-4" />}>Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline" icon={<Underline className="w-4 h-4" />}>Underline</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Icon only</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>iconOnly</CodeBadge>를 사용하면 아이콘만 표시됩니다. <CodeBadge>tooltip</CodeBadge> prop에 문자열을 넘기면 내부적으로 <CodeBadge>Tooltip</CodeBadge> 컴포넌트를 사용해 hover 시 레이블을 표출합니다.
                </p>
                <CodeBlock code={`import { ToggleGroup, ToggleGroupItem, AlignLeft, AlignCenter, AlignRight } from "@alphacode-ai/design-system";

// tooltip prop에 문자열을 넘기면 Tooltip 컴포넌트가 자동 적용됩니다.
<ToggleGroup defaultValue="left" iconOnly>
  <ToggleGroupItem value="left" icon={<AlignLeft />} tooltip="왼쪽 정렬" />
  <ToggleGroupItem value="center" icon={<AlignCenter />} tooltip="가운데 정렬" />
  <ToggleGroupItem value="right" icon={<AlignRight />} tooltip="오른쪽 정렬" />
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">6. Controlled</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>value</CodeBadge>와 <CodeBadge>onValueChange</CodeBadge>로 외부 상태와 연결합니다.
                </p>
                <CodeBlock code={`const [view, setView] = useState("list");

<ToggleGroup value={view} onValueChange={setView}>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">7. Disabled</h3>
                <p className="text-sm text-foreground mb-4">
                  개별 <CodeBadge>ToggleGroupItem</CodeBadge>에 <CodeBadge>disabled</CodeBadge>를 적용합니다.
                </p>
                <CodeBlock code={`<ToggleGroup defaultValue="a">
  <ToggleGroupItem value="a">Active</ToggleGroupItem>
  <ToggleGroupItem value="b" disabled>Disabled</ToggleGroupItem>
  <ToggleGroupItem value="c">Normal</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">8. 커스텀 색상</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>activeClassName</CodeBadge>으로 active 아이템의 border·텍스트·아이콘 색상을 지정합니다.
                  컨테이너 배경은 <CodeBadge>className</CodeBadge>으로 override합니다.
                  <CodeBadge>bg-white</CodeBadge>와 <CodeBadge>font-medium</CodeBadge>은 자동 적용됩니다.
                </p>
                <CodeBlock code={`// Blue
<ToggleGroup
  defaultValue="a"
  className="bg-ac-blue-10"
  activeClassName="border border-ac-blue-50 text-ac-blue-50"
>
  <ToggleGroupItem value="a">Option A</ToggleGroupItem>
  <ToggleGroupItem value="b">Option B</ToggleGroupItem>
</ToggleGroup>

// Green
<ToggleGroup
  defaultValue="a"
  className="bg-ac-green-10"
  activeClassName="border border-ac-green-50 text-ac-green-50"
>
  <ToggleGroupItem value="a">Option A</ToggleGroupItem>
  <ToggleGroupItem value="b">Option B</ToggleGroupItem>
</ToggleGroup>

// Red
<ToggleGroup
  defaultValue="a"
  className="bg-ac-red-10"
  activeClassName="border border-ac-red-50 text-ac-red-50"
>
  <ToggleGroupItem value="a">Option A</ToggleGroupItem>
  <ToggleGroupItem value="b">Option B</ToggleGroupItem>
</ToggleGroup>`} />
              </div>

            </section>

            {/* Props */}
            <section className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">ToggleGroup Props</h2>
                <PropsTable rows={[
                  ["value",           "string",                       "-",         "현재 선택된 값 (controlled)"],
                  ["defaultValue",    "string",                       '""',        "초기 선택값 (uncontrolled)"],
                  ["onValueChange",   "(value: string) => void",      "-",         "선택값 변경 시 호출되는 콜백"],
                  ["variant",         '"default" | "primary"',        '"default"', "토글 그룹 스타일"],
                  ["size",            '"sm" | "md" | "lg"',           '"md"',      "토글 그룹 크기"],
                  ["iconOnly",        "boolean",                      "false",     "아이콘만 표시 모드"],
                  ["activeClassName", "string",                       "-",         "active 아이템의 border·텍스트·아이콘 색상 override — bg-white, font-medium은 자동 적용"],
                  ["className",       "string",                       "-",         "컨테이너 추가 CSS 클래스 (배경색 override 등)"],
                ]} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">ToggleGroupItem Props</h2>
                <PropsTable rows={[
                  ["value",    "string",          "-",     "이 아이템의 고유 값 (필수)"],
                  ["icon",     "React.ReactNode", "-",     "아이콘 요소"],
                  ["tooltip",  "string",          "-",     "iconOnly 모드에서 hover 시 표시할 레이블"],
                  ["disabled", "boolean",         "false", "아이템 비활성화"],
                  ["className", "string",         "-",     "추가 CSS 클래스"],
                ]} />
              </div>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
