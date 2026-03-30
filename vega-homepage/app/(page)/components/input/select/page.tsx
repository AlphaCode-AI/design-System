"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Select,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy", label: "Anatomy" },
  { id: "state",   label: "State" },
  { id: "size",    label: "Size" },
  { id: "usage",   label: "사용 가이드" },
];

const BASIC_OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const GROUP_OPTIONS = [
  {
    title: "Option 1",
    options: [
      { value: "test1", label: "test 1" },
      { value: "test2", label: "test 2" },
      { value: "test3", label: "test 3" },
    ],
  },
  {
    title: "Option 2",
    options: [
      { value: "token1", label: "token 1" },
      { value: "token2", label: "token 2" },
      { value: "token3", label: "token 3", disabled: true },
    ],
  },
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
          <div className={cn("px-3 py-2 font-mono text-xs text-ac-primary-50", i < arr.length - 1 && "border-b border-border")}>{prop}</div>
          <div className={cn("px-3 py-2 font-mono text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{type}</div>
          <div className={cn("px-3 py-2 font-mono text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{def}</div>
          <div className={cn("px-3 py-2 text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function SelectPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Select</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            셀렉트(select)는 사용자에게 여러개의 옵션 목록을 팝업으로 제공하여 그 중 한 개의 값을 선택할 수 있도록 하는 경우에 사용합니다.
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
                <img src="/input/select/select_anatomy.png" alt="select anatomy" className="max-w-full" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Container : select와 배경을 구분</li>
                <li>Placeholder : select 선택을 유도하는 문구</li>
                <li>ICON : select의 열고 닫는 상태를 나타냄</li>
                <li>Option List : select 클릭 시 표출되는 option 목록</li>
                <li>Option title <span className="text-muted-foreground">(선택)</span> : 옵션의 분류가 필요할 때 타이틀 사용</li>
                <li>Option : 사용자 선택할 수 있는 값</li>
                <li>선택된 Option : 선택된 옵션의 값</li>
                <li>구분선 <span className="text-muted-foreground">(선택)</span> : 옵션 목록과의 구분이 필요할 때 사용</li>
                <li>Disable Option <span className="text-muted-foreground">(선택)</span> : 비활성화된 옵션 값</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                Select 상태는 Default / Complete / Focus / Error / Disable 5가지로 사용합니다.<br />
                Select Option 상태는 Default / Hover / Checked / Disable
              </p>

              <div className="space-y-6">
                <div className="rounded-lg bg-ac-gray-20 p-8">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col gap-3">
                      <Select groups={GROUP_OPTIONS} placeholder="Select the option" />
                      <span className="text-xs text-foreground text-center">Default</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Select groups={GROUP_OPTIONS} state="complete" defaultValue="test1" />
                      <span className="text-xs text-foreground text-center">Complete</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Select groups={GROUP_OPTIONS} state="focus" placeholder="Select the option" />
                      <span className="text-xs text-foreground text-center">Focus</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Select groups={GROUP_OPTIONS} state="error" errorMessage="error message" placeholder="Select the option" />
                      <span className="text-xs text-foreground text-center">Error</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Select groups={GROUP_OPTIONS} disabled placeholder="Select the option" />
                      <span className="text-xs text-foreground text-center">Disable</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-6">
                사이즈는 높이를 기준으로 sm / md / lg 3가지를 사용합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col gap-3 flex-1">
                    <Select size="lg" options={BASIC_OPTIONS} placeholder="Select the option" />
                    <span className="text-xs text-foreground text-center">lg (40px)</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <Select size="md" options={BASIC_OPTIONS} placeholder="Select the option" />
                    <span className="text-xs text-foreground text-center">md (36px)</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <Select size="sm" options={BASIC_OPTIONS} placeholder="Select the option" />
                    <span className="text-xs text-foreground text-center">sm (30px)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">사용 관련</h3>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Don't"
                    src="/input/select/usage_radio_dont.png"
                    description="사용자가 목록에서 옵션 선택이 중요한 사안일 경우 Select보단 Radio를 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/select/usage_datepicker_dont.png"
                    description="날짜 선택 시 불필요한 Select를 반복하는 것 보다 Date picker를 활용합니다."
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
                  <CodeBadge>options</CodeBadge> prop으로 옵션 목록을 전달합니다. <CodeBadge>label</CodeBadge>, <CodeBadge>helperText</CodeBadge>로 텍스트를 구성합니다.
                </p>
                <CodeBlock code={`import { Select } from "@alphacode-ai/design-system";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

// 기본
<Select options={options} placeholder="Select the option" />

// 라벨 + 헬퍼 텍스트
<Select
  options={options}
  label="항목 선택"
  placeholder="Select the option"
  helperText="helper text here"
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 그룹 옵션</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>groups</CodeBadge> prop으로 옵션을 그룹으로 묶을 수 있습니다. 그룹 간에는 구분선이 자동으로 추가됩니다.
                </p>
                <CodeBlock code={`const groups = [
  {
    title: "Option 1",
    options: [
      { value: "test1", label: "test 1" },
      { value: "test2", label: "test 2" },
      { value: "test3", label: "test 3" },
    ],
  },
  {
    title: "Option 2",
    options: [
      { value: "token1", label: "token 1" },
      { value: "token2", label: "token 2" },
      { value: "token3", label: "token 3", disabled: true },
    ],
  },
];

<Select groups={groups} placeholder="Select the option" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>state</CodeBadge> prop 또는 <CodeBadge>errorMessage</CodeBadge>로 상태를 지정합니다.
                </p>
                <CodeBlock code={`<Select options={options} state="complete" defaultValue="option1" />
<Select options={options} state="error" errorMessage="필수 항목입니다." />
<Select options={options} errorMessage="올바른 값을 선택해주세요." />
<Select options={options} disabled />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 크기를 지정합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<Select size="lg" options={options} />
<Select size="md" options={options} />  {/* 기본값 */}
<Select size="sm" options={options} />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Controlled</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>value</CodeBadge>와 <CodeBadge>onValueChange</CodeBadge>로 외부에서 값을 제어합니다.
                </p>
                <CodeBlock code={`const [value, setValue] = useState("");

<Select
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Select the option"
/>`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Props</h2>
              <PropsTable rows={[
                ["size",          '"sm" | "md" | "lg"',                                     '"md"',              "트리거 높이 크기 (30 / 36 / 40px)"],
                ["state",         '"default" | "complete" | "focus" | "error" | "disable"', '"default"',         "셀렉트 상태"],
                ["options",       "SelectOption[]",                                          "[]",                "플랫 옵션 목록"],
                ["groups",        "SelectOptionGroup[]",                                     "[]",                "그룹 옵션 목록 (구분선 자동 추가)"],
                ["placeholder",   "string",                                                  '"Select the option"', "미선택 시 표시 문구"],
                ["value",         "string",                                                  "-",                 "현재 선택값 (controlled)"],
                ["defaultValue",  "string",                                                  "-",                 "초기 선택값 (uncontrolled)"],
                ["onValueChange", "(value: string) => void",                                 "-",                 "값 변경 핸들러"],
                ["label",         "string",                                                  "-",                 "상단 라벨 텍스트"],
                ["helperText",    "string",                                                  "-",                 "하단 도움말 텍스트"],
                ["errorMessage",  "string",                                                  "-",                 "에러 메시지 (전달 시 자동으로 error 상태)"],
                ["disabled",      "boolean",                                                 "false",             "비활성 상태"],
              ]} />
              <p className="mt-4 text-xs font-semibold text-foreground mb-2">SelectOption</p>
              <PropsTable rows={[
                ["value",    "string",  "-",     "옵션 값"],
                ["label",    "string",  "-",     "옵션 표시 텍스트"],
                ["disabled", "boolean", "false", "옵션 비활성화"],
              ]} />
              <p className="mt-4 text-xs font-semibold text-foreground mb-2">SelectOptionGroup</p>
              <PropsTable rows={[
                ["title",   "string",         "-", "그룹 타이틀"],
                ["options", "SelectOption[]", "-", "그룹 내 옵션 목록"],
              ]} />
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
