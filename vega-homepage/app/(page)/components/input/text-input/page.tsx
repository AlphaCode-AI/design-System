"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  TextInput,
  Search,
  DollarSign,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",          label: "Type" },
  { id: "anatomy",       label: "Anatomy" },
  { id: "state",         label: "State" },
  { id: "size",          label: "Size" },
  { id: "prefix-suffix", label: "Prefix / Suffix" },
  { id: "usage",         label: "사용 가이드" },
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

export default function TextInputPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Text input</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            텍스트 입력(text input)은 한 줄의 짧은 텍스트를 입력하는 경우에 사용되는 요소입니다.
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
              <div className="flex items-stretch justify-around gap-8">
                <div className="flex flex-col items-center gap-4 flex-1 p-8 bg-ac-gray-20 rounded-lg">
                  <TextInput
                    label="input label"
                    placeholder="placeholder"
                    helperText="helper text here"
                  />
                  <span className="text-sm text-foreground">Default</span>
                </div>
                <div className="flex flex-col items-center gap-4 flex-1 p-8 bg-ac-gray-20 rounded-lg justify-center">
                  <TextInput
                    label="label to the left"
                    labelLeft
                    placeholder="placeholder"
                    helperText="helper text here"
                  />
                  <span className="text-sm text-foreground">Label Left</span>
                </div>
                <div className="flex flex-col items-center gap-4 flex-1 p-8 bg-ac-gray-20 rounded-lg">
                  <TextInput
                    label="input label"
                    placeholder="placeholder"
                    helperText="helper text here"
                    buttonLabel="Submit"
                  />
                  <span className="text-sm text-foreground">With Button</span>
                </div>
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center min-h-[160px]">
                <img src="/input/text-input/text_anatomy.png" alt="text input anatomy" className="max-w-full" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Label <span className="text-muted-foreground">(선택)</span></li>
                <li>Value (or Placeholder)</li>
                <li>Suffix <span className="text-muted-foreground">(선택)</span></li>
                <li>Prefix <span className="text-muted-foreground">(선택)</span></li>
                <li>Container : 입력 상태에 따라 border, bg color 변경</li>
                <li>Helper text <span className="text-muted-foreground">(선택)</span> : text 입력에 참고할 text 입력</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                Text input 상태는 Default / Complete / Focus / Error / Disable 5가지로 사용합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex flex-col gap-3">
                    <TextInput placeholder="placeholder" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Default</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <TextInput state="complete" defaultValue="text" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Complete</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <TextInput state="focus" helperText="helper text here" autoFocus />
                    <span className="text-xs text-foreground text-center">Focus</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <TextInput state="error" defaultValue="Error text" errorMessage="error helper text here" />
                    <span className="text-xs text-foreground text-center">Error</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <TextInput disabled defaultValue="text" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Disable</span>
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
                    <TextInput size="lg" placeholder="placeholder" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">lg (40px)</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <TextInput size="md" placeholder="placeholder" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">md (36px)</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <TextInput size="sm" placeholder="placeholder" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">sm (30px)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Prefix / Suffix */}
            <section id="prefix-suffix" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Prefix / Suffix</h2>
              <p className="text-sm text-foreground mb-6">
                Prefix와 Suffix에는 텍스트와 버튼을 사용할 수 있습니다. 입력하는 내용과 컨텍스트에 따라 올바른 맥락으로 사용해야 합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col gap-3 flex-1">
                    <TextInput
                      label="주소"
                      placeholder="회사 주소"
                      helperText="helper text here"
                      suffix={<Search size={16} />}
                    />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <TextInput
                      label="환전 금액"
                      placeholder="환전하실 금액을 입력해주세요."
                      helperText="helper text here"
                      prefix={<DollarSign size={16} />}
                    />
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
                    src="/input/text-input/usage_use_dont_1.png"
                    description="텍스트 필드에 임의로 색상을 적용하지 않도록 주의합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/text-input/usage_use_dont_2.png"
                    description="placeholder를 label처럼 사용하지 않습니다."
                  />
                </div>
              </div>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">오류 메세지</h3>
                <p className="text-sm text-foreground mb-4">input의 오류 메세지를 팝업으로 표출하지 않습니다. helper text 영역에 표출합니다.</p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/input/text-input/usage_error_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/text-input/usage_error_dont.png"
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
                  <CodeBadge>label</CodeBadge>, <CodeBadge>helperText</CodeBadge>, <CodeBadge>errorMessage</CodeBadge> prop으로 텍스트를 구성합니다.
                </p>
                <CodeBlock code={`import { TextInput } from "@alphacode-ai/design-system";

// 기본
<TextInput placeholder="placeholder" />

// 라벨 + 헬퍼 텍스트
<TextInput
  label="input label"
  placeholder="placeholder"
  helperText="helper text here"
/>

// 라벨 왼쪽 배치
<TextInput label="label to the left" labelLeft placeholder="placeholder" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 버튼</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>buttonLabel</CodeBadge>로 인풋 우측에 버튼을 추가합니다. <CodeBadge>onButtonClick</CodeBadge>으로 클릭 이벤트를 처리합니다.
                </p>
                <CodeBlock code={`// 버튼 추가
<TextInput
  label="주소"
  placeholder="회사 주소"
  buttonLabel="Submit"
  onButtonClick={() => console.log("clicked")}
/>

// disabled 시 버튼도 자동으로 비활성
<TextInput disabled buttonLabel="Submit" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Prefix / Suffix</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>prefix</CodeBadge>, <CodeBadge>suffix</CodeBadge>에 아이콘이나 텍스트 등 ReactNode를 전달합니다.
                </p>
                <CodeBlock code={`import { Search } from "@alphacode-ai/design-system";

// Prefix — 아이콘
<TextInput prefix={<Search size={16} />} placeholder="검색어를 입력하세요" />

// Prefix — 텍스트
<TextInput prefix={<span>KRW</span>} placeholder="환전하실 원화를 입력해주세요." />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>state</CodeBadge> prop 또는 <CodeBadge>errorMessage</CodeBadge>로 상태를 지정합니다.
                </p>
                <CodeBlock code={`<TextInput state="complete" defaultValue="text" />
<TextInput state="error" errorMessage="error helper text here" />
<TextInput errorMessage="이메일 주소가 올바르지 않습니다." />
<TextInput disabled defaultValue="text" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 크기를 지정합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<TextInput size="lg" placeholder="Large (40px)" />
<TextInput size="md" placeholder="Medium (36px)" />  {/* 기본값 */}
<TextInput size="sm" placeholder="Small (30px)" />`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Props</h2>
              <PropsTable rows={[
                ["size",           '"sm" | "md" | "lg"',                                     '"md"',      "인풋 높이 크기 (30 / 36 / 40px)"],
                ["state",          '"default" | "complete" | "focus" | "error" | "disable"', '"default"', "인풋 상태"],
                ["label",          "string",                                                  "-",         "상단 또는 좌측 라벨 텍스트"],
                ["labelLeft",      "boolean",                                                 "false",     "true 시 라벨을 왼쪽에 배치"],
                ["placeholder",    "string",                                                  "-",         "플레이스홀더 텍스트"],
                ["helperText",     "string",                                                  "-",         "하단 도움말 텍스트"],
                ["errorMessage",   "string",                                                  "-",         "에러 메시지 (전달 시 자동으로 error 상태)"],
                ["buttonLabel",    "string",                                                  "-",         "인풋 우측 버튼 텍스트 (선택)"],
                ["onButtonClick",  "MouseEventHandler",                                       "-",         "버튼 클릭 핸들러"],
                ["prefix",         "React.ReactNode",                                         "-",         "인풋 좌측 요소 (텍스트, 아이콘 등)"],
                ["suffix",         "React.ReactNode",                                         "-",         "인풋 우측 요소 (아이콘 등)"],
                ["disabled",       "boolean",                                                 "false",     "비활성 상태 (버튼도 함께 비활성)"],
              ]} />
              <p className="mt-3 text-xs text-muted-foreground">
                그 외 <CodeBadge>HTMLInputElement</CodeBadge>의 모든 속성 (value, onChange, type 등)을 지원합니다.
              </p>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
