"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Textarea,
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

export default function TextareaPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Textarea</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            텍스트 영역(textarea)은 한 줄 이상, 즉 여러 줄 텍스트를 입력하기 위한 컴포넌트입니다. 텍스트양이 넘을 경우 줄 바꿈되어, 높이는 고정되고 커서가 필드 최하단에 도착 시 고정 높이에서 스크롤 됩니다.
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
                <img src="/input/textarea/textarea_anatomy.png" alt="textarea anatomy" className="max-w-full" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Label <span className="text-muted-foreground">(선택)</span></li>
                <li>Value (or Placeholder)</li>
                <li>Container : 입력 상태에 따라 border, bg color 변경</li>
                <li>Resize handle <span className="text-muted-foreground">(선택)</span></li>
                <li>Helper text <span className="text-muted-foreground">(선택)</span> : textarea 입력에 참고할 text 입력</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                Textarea 상태는 Default / Complete / Focus / Error / Disable 5가지로 사용합니다.<br />
                Focus 상태일 때, border color는 해당 솔루션의 primary color를 사용합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex flex-col gap-3">
                    <Textarea label="textarea label" placeholder="placeholder" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Default</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Textarea label="textarea label" state="complete" defaultValue="text" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Complete</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Textarea label="textarea label" state="focus" defaultValue="text" helperText="helper text here" autoFocus />
                    <span className="text-xs text-foreground text-center">Focus</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Textarea label="textarea label" state="error" defaultValue="text" errorMessage="error message" />
                    <span className="text-xs text-foreground text-center">Error</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Textarea label="textarea label" disabled defaultValue="text" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Disable</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-6">
                Textarea은 height를 사용자가 유동적으로 resize할 수 있으므로 min / max height를 정해놓습니다. min-height는 30px이며, max-height는 적용되는 영역에 맞춰 유동적으로 정합니다.<br />
                Default height는 적용되는 영역에 맞추어 지정합니다. 예를 들면 Textarea에 들어갈 내용을 예상하여 height를 정하거나 주변 input/select의 2.5배 정도로 적용합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-start gap-8">
                  <div className="flex flex-col gap-3 flex-1">
                    <Textarea
                      label="textarea label"
                      placeholder="placeholder"
                      helperText="helper text here"
                      style={{ minHeight: "30px", height: "30px" }}
                    />
                    <span className="text-xs text-foreground text-center">min-height : 30px</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <Textarea
                      label="textarea label"
                      placeholder="placeholder"
                      helperText="helper text here"
                      style={{ height: "120px" }}
                    />
                    <span className="text-xs text-foreground text-center">max-height : 유동적</span>
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
                    src="/input/textarea/usage_short_dont.png"
                    description="입력 값이 짧은 경우에는 textarea보다 input을 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/textarea/usage_duplicate_dont.png"
                    description="정보를 중복하지 않습니다. 에러 메세지를 표출해야할 경우 도움 메세지를 가려 사용 합니다."
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
                <CodeBlock code={`import { Textarea } from "@alphacode-ai/design-system";

// 기본
<Textarea placeholder="내용을 입력하세요" />

// 라벨 + 헬퍼 텍스트
<Textarea
  label="textarea label"
  placeholder="placeholder"
  helperText="helper text here"
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>state</CodeBadge> prop 또는 <CodeBadge>errorMessage</CodeBadge>로 상태를 지정합니다.
                </p>
                <CodeBlock code={`<Textarea state="complete" defaultValue="text" />
<Textarea state="error" errorMessage="error message" />
<Textarea errorMessage="필수 항목입니다." />
<Textarea disabled defaultValue="text" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 높이 제어</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>style</CodeBadge> 또는 <CodeBadge>className</CodeBadge>으로 height를 지정합니다. min-height 기본값은 30px입니다.
                </p>
                <CodeBlock code={`// 최소 높이
<Textarea style={{ height: "30px" }} placeholder="placeholder" />

// 고정 높이
<Textarea style={{ height: "120px" }} placeholder="placeholder" />`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Props</h2>
              <PropsTable rows={[
                ["state",         '"default" | "complete" | "focus" | "error" | "disable"', '"default"', "텍스트에리어 상태"],
                ["label",         "string",  "-",     "상단 라벨 텍스트"],
                ["helperText",    "string",  "-",     "하단 도움말 텍스트"],
                ["errorMessage",  "string",  "-",     "에러 메시지 (전달 시 자동으로 error 상태)"],
                ["disabled",      "boolean", "false", "비활성 상태"],
              ]} />
              <p className="mt-3 text-xs text-muted-foreground">
                그 외 <CodeBadge>HTMLTextAreaElement</CodeBadge>의 모든 속성 (value, onChange, rows, cols 등)을 지원합니다.
              </p>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
