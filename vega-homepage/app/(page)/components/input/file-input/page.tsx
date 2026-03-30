"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  FileInput,
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


export default function FileInputPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">File input</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            파일 입력(file input)는 하나 이상의 디바이스의 로컬 파일을 선택하고 첨부하는데 사용하는 입력 컴포넌트입니다.
          </p>
        </div>

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ── Docs 탭 ── */}
          <TabContent value="docs" className="mt-6 space-y-16">

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center min-h-[160px]">
                <img src="/input/file-input/file_anatomy.png" alt="file input anatomy" className="max-w-full" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Label <span className="text-muted-foreground">(선택)</span></li>
                <li>Value (or Placeholder)</li>
                <li>File reset Button : 업로드한 파일 reset 버튼, 파일을 업로드 했을때 표출</li>
                <li>File Upload Button</li>
                <li>Container : 입력 상태에 따라 border, bg color 변경</li>
                <li>Helper text <span className="text-muted-foreground">(선택)</span> : text 입력에 참고할 text 입력</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                Text upload 상태는 Default / Complete / Error / Disable 4가지로 사용합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col gap-3">
                    <FileInput label="file label" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Default</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <FileInput label="file label" state="complete" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">Complete</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <FileInput label="file label" state="error" errorMessage="error message" />
                    <span className="text-xs text-foreground text-center">Error</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <FileInput label="file label" disabled helperText="helper text here" />
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
                    <FileInput size="lg" label="file label" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">lg (40px)</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <FileInput size="md" label="file label" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">md (36px)</span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <FileInput size="sm" label="file label" helperText="helper text here" />
                    <span className="text-xs text-foreground text-center">sm (30px)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">여러 건의 파일 업로드</h3>
                <p className="text-sm text-foreground mb-6">
                  2개 이상의 파일을 업로드했을 때는 value에 몇건의 파일을 업로드했는지 표출합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/input/file-input/usage_multiple_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/file-input/usage_multiple_dont.png"
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
                <CodeBlock code={`import { FileInput } from "@alphacode-ai/design-system";

// 기본
<FileInput />

// 라벨 + 헬퍼 텍스트
<FileInput
  label="첨부 파일"
  helperText="최대 10MB까지 업로드 가능합니다."
/>

// 버튼 텍스트 변경
<FileInput triggerLabel="업로드" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 다중 파일</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>multiple</CodeBadge> prop으로 여러 파일을 선택할 수 있습니다. 2개 이상 선택 시 파일 개수로 표시됩니다.
                </p>
                <CodeBlock code={`<FileInput
  multiple
  label="첨부 파일"
  helperText="여러 파일을 선택할 수 있습니다."
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>state</CodeBadge> prop 또는 <CodeBadge>errorMessage</CodeBadge>로 상태를 지정합니다.
                </p>
                <CodeBlock code={`<FileInput state="complete" />
<FileInput state="error" errorMessage="파일 형식이 올바르지 않습니다." />
<FileInput errorMessage="파일 크기가 초과되었습니다." />
<FileInput disabled />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 크기를 지정합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<FileInput size="lg" />
<FileInput size="md" />  {/* 기본값 */}
<FileInput size="sm" />`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Props</h2>
              <PropsTable rows={[
                ["size",         '"sm" | "md" | "lg"',                          '"md"',        "인풋 높이 크기 (30 / 36 / 40px)"],
                ["state",        '"default" | "complete" | "error" | "disable"', '"default"',  "인풋 상태"],
                ["label",        "string",                                       "-",           "상단 라벨 텍스트"],
                ["triggerLabel", "string",                                       '"파일 선택"', "파일 선택 버튼 텍스트"],
                ["helperText",   "string",                                       "-",           "하단 도움말 텍스트"],
                ["errorMessage", "string",                                       "-",           "에러 메시지 (전달 시 자동으로 error 상태)"],
                ["multiple",     "boolean",                                      "false",       "다중 파일 선택 허용"],
                ["disabled",     "boolean",                                      "false",       "비활성 상태"],
                ["accept",       "string",                                       "-",           "허용할 파일 형식 (예: image/*, .pdf)"],
                ["onChange",     "ChangeEventHandler",                           "-",           "파일 변경 핸들러"],
              ]} />
              <p className="mt-3 text-xs text-muted-foreground">
                그 외 <CodeBadge>HTMLInputElement</CodeBadge>의 모든 속성을 지원합니다.
              </p>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
