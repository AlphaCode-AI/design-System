"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Radio,
  RadioGroup,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",    label: "Type" },
  { id: "anatomy", label: "Anatomy" },
  { id: "state",   label: "State" },
  { id: "size",    label: "Size" },
  { id: "usage",   label: "사용 가이드" },
];

export default function RadioPage() {
  const [activeTab, setActiveTab] = useState("docs");
  const [groupVal, setGroupVal] = useState("a");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Radio</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            라디오(Radio)은 여러 항목 중에서 단일선택을 해야하는 곳에 사용합니다.
            한 번에 하나만 선택할 수 있으며 사용자가 새 항목을 선택하면 이전 선택 항목이 자동으로 선택 취소됩니다.
          </p>
        </div>

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
              <div className="flex items-att justify-around gap-4">
                {/* Single */}
                <div className="flex flex-col items-center gap-4 bg-ac-gray-20 rounded-lg flex-1 justify-center">
                  <div className="flex items-center justify-center p-6">
                    <Radio />
                  </div>
                  <span className="text-sm text-foreground pb-4">Single</span>
                </div>

                {/* Group */}
                <div className="flex flex-col items-center gap-1 bg-ac-gray-20 rounded-lg flex-1 p-6">
                  <div className="flex items-start justify-center mb-4">
                    <RadioGroup title="Group title">
                      <Radio
                        label="Option 1"
                        name="type-group"
                        value="a"
                        checked={groupVal === "a"}
                        onChange={() => setGroupVal("a")}
                      />
                      <Radio
                        label="Option 2"
                        name="type-group"
                        value="b"
                        checked={groupVal === "b"}
                        onChange={() => setGroupVal("b")}
                      />
                      <Radio
                        label="Option 3"
                        name="type-group"
                        value="c"
                        checked={groupVal === "c"}
                        onChange={() => setGroupVal("c")}
                      />
                    </RadioGroup>
                  </div>
                  <span className="text-sm text-foreground">Group</span>
                </div>
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center">
                <img src="/input/radio/radio_anatomy.png" alt="radio anatomy" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Radio</li>
                <li>Label <span className="text-muted-foreground">(선택)</span></li>
                <li>Description <span className="text-muted-foreground">(선택)</span></li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                상태는 Default / Check / Disable 3가지로 사용합니다.
                Check 상태일 때, Radio color는 해당 솔루션의 primary color를 사용합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-3">
                    <Radio />
                    <span className="text-sm text-foreground">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Radio checked readOnly />
                    <span className="text-sm text-foreground">Check</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Radio disabled />
                    <span className="text-sm text-foreground">Disable</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-6">
                사이즈는 md / lg / xl 3가지를 사용합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-end justify-around">
                  {/* xl */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                      <Radio size="xl" />
                      <Radio size="xl" checked readOnly />
                      <Radio size="xl" disabled />
                    </div>
                    <span className="text-sm text-foreground">xl (24px)</span>
                  </div>

                  {/* lg */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                      <Radio size="lg" />
                      <Radio size="lg" checked readOnly />
                      <Radio size="lg" disabled />
                    </div>
                    <span className="text-sm text-foreground">lg (18px)</span>
                  </div>

                  {/* md */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                      <Radio size="md" />
                      <Radio size="md" checked readOnly />
                      <Radio size="md" disabled />
                    </div>
                    <span className="text-sm text-foreground">md (12px)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">사용 관련</h3>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <UsageCard
                    type="Don't"
                    src="/input/radio/usage_dont_1.png"
                    description="Radio를 수평으로 배치하는 경우 버튼 간 간격을 충분히 제공한다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/radio/usage_dont_2.png"
                    description="Radio의 기본 값을 설정하여 하나의 값에 체크가 되어있게 설정합니다. (Default checked 필수)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Don't"
                    src="/input/radio/usage_dont_3.png"
                    description="중복 선택 항목에는 Radio 대신 Checkbox를 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/radio/usage_dont_4.png"
                    description="Radio 옵션의 개수가 7개를 초과하며, 사용자가 옵션 목록에 친숙한 경우에는 Select를 사용하면 사용자의 인지적 부담을 줄이고 활용할 수 있는 공간을 확보하는 데 도움이 됩니다."
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
                  <CodeBadge>label</CodeBadge>, <CodeBadge>description</CodeBadge> prop으로 텍스트를 지정합니다.
                </p>
                <CodeBlock code={`import { Radio } from "@alphacode-ai/design-system";

// 단독 라디오
<Radio />

// 라벨 포함
<Radio name="group" value="a" label="Option 1" />

// 라벨 + 설명
<Radio
  name="group"
  value="a"
  label="Option 1"
  description="이 옵션에 대한 추가 설명입니다."
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 그룹</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>RadioGroup</CodeBadge>으로 여러 라디오를 묶습니다. 같은 <CodeBadge>name</CodeBadge>으로 단일 선택을 보장합니다.
                </p>
                <CodeBlock code={`import { Radio, RadioGroup } from "@alphacode-ai/design-system";

const [val, setVal] = useState("a");

<RadioGroup title="Group title">
  <Radio name="group" value="a" label="Option 1" checked={val === "a"} onChange={() => setVal("a")} />
  <Radio name="group" value="b" label="Option 2" checked={val === "b"} onChange={() => setVal("b")} />
  <Radio name="group" value="c" label="Option 3" checked={val === "c"} onChange={() => setVal("c")} />
</RadioGroup>

// 수평 배치
<RadioGroup direction="horizontal">
  <Radio name="h-group" value="a" label="Option 1" />
  <Radio name="h-group" value="b" label="Option 2" />
</RadioGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>disabled</CodeBadge> prop으로 비활성 상태를 지정합니다.
                </p>
                <CodeBlock code={`// 비활성
<Radio disabled label="Disabled" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 크기를 지정합니다. 기본값은 <CodeBadge>lg</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<Radio size="xl" label="XL (24px)" />
<Radio size="lg" label="LG (18px)" />  {/* 기본값 */}
<Radio size="md" label="MD (12px)" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 색상 커스터마이징</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>checkedColor</CodeBadge> prop으로 선택 색상을 변경합니다.
                </p>
                <CodeBlock code={`<Radio checkedColor="#006FFF" label="Blue" checked />
<Radio checkedColor="var(--ac-green-50)" label="Green" checked />`} />
              </div>
            </section>

            {/* Radio Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Radio Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["size",         '"md" | "lg" | "xl"', '"lg"',      "라디오 크기 (12 / 18 / 24px)"],
                  ["label",        "string",              "-",         "라벨 텍스트 (선택)"],
                  ["description",  "string",              "-",         "설명 텍스트 (선택)"],
                  ["checked",      "boolean",             "-",         "선택 상태 (controlled)"],
                  ["disabled",     "boolean",             "false",     "비활성 상태"],
                  ["checkedColor", "string",              '"#FF6300"', "선택 시 색상"],
                  ["name",         "string",              "-",         "input name 속성. 같은 name끼리 단일 선택"],
                  ["value",        "string",              "-",         "input value 속성"],
                  ["onChange",     "(e) => void",         "-",         "상태 변경 핸들러"],
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

            {/* RadioGroup Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">RadioGroup Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["title",     "string",                    "-",          "그룹 제목 (선택)"],
                  ["direction", '"vertical" | "horizontal"', '"vertical"', "라디오 배치 방향"],
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
