"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Checkbox,
  CheckboxGroup,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",     label: "Type" },
  { id: "anatomy",  label: "Anatomy" },
  { id: "state",    label: "State" },
  { id: "size",     label: "Size" },
  { id: "usage",    label: "사용 가이드" },
];

export default function CheckboxPage() {
  const [activeTab, setActiveTab] = useState("docs");

  const [groupChecked, setGroupChecked] = useState([true, false, false]);

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Checkbox</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            체크박스(Checkbox)는 사용자가 여러 개의 옵션 중 한 개 이상의 값을 선택할 수 있도록 하는 경우에 사용합니다.
            즉, 체크박스의 선택은 상호 독립적이므로 한 개의 옵션을 선택하는 것은 다른 옵션의 선택에 영향을 미치지 않습니다.
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
                    <Checkbox />
                  </div>
                  <span className="text-sm text-foreground">Single</span>
                </div>

                {/* Group */}
                <div className="flex flex-col items-center gap-1 bg-ac-gray-20 rounded-lg flex-1 p-6">
                  <div className="flex items-start justify-center mb-4">
                    <CheckboxGroup title="Group title">
                      <Checkbox
                        label="Accept terms and condition"
                        description="You agree to our Terms"
                        checked={groupChecked[0]}
                        onChange={(e) =>
                          setGroupChecked([e.target.checked, groupChecked[1], groupChecked[2]])
                        }
                      />
                      <Checkbox
                        label="Accept terms and condition"
                        checked={groupChecked[1]}
                        onChange={(e) =>
                          setGroupChecked([groupChecked[0], e.target.checked, groupChecked[2]])
                        }
                      />
                      <Checkbox
                        label="Accept terms and condition"
                        checked={groupChecked[2]}
                        onChange={(e) =>
                          setGroupChecked([groupChecked[0], groupChecked[1], e.target.checked])
                        }
                      />
                    </CheckboxGroup>
                  </div>
                  <span className="text-sm text-foreground">Group</span>
                </div>
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center">
                <img src="/input/checkbox/checkbox_anatomy.png" alt="checkbox anatomy" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Checkbox</li>
                <li>Label <span className="text-muted-foreground">(선택)</span></li>
                <li>Description <span className="text-muted-foreground">(선택)</span></li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                상태는 Default / Check / Disable / Indeterminate 4가지로 사용합니다. Indeterminate는 하위 체크박스 요소가 Default와 Check 상태가 혼용되었을때 사용됩니다.
                Check 상태일 때, Checkbox BG color는 해당 솔루션의 primary color를 사용합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-3">
                    <Checkbox />
                    <span className="text-sm text-foreground">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Checkbox checked readOnly />
                    <span className="text-sm text-foreground">Check</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Checkbox disabled />
                    <span className="text-sm text-foreground">Disable</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Checkbox indeterminate />
                    <span className="text-sm text-foreground">Indeterminate</span>
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
                      <Checkbox size="xl" checked readOnly />
                      <Checkbox size="xl" indeterminate />
                    </div>
                    <span className="text-sm text-foreground">xl (24px)</span>
                  </div>

                  {/* lg */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                      <Checkbox size="lg" checked readOnly />
                      <Checkbox size="lg" indeterminate />
                    </div>
                    <span className="text-sm text-foreground">lg (18px)</span>
                  </div>

                  {/* md */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                      <Checkbox size="md" checked readOnly />
                      <Checkbox size="md" indeterminate />
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
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Don't"
                    src="/input/checkbox/usage_radio_dont.png"
                    description="단일 선택 항목에는 Checkbox 대신 Radio를 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/checkbox/usage_label_dont.png"
                    description="Checkbox의 라벨에 두 줄 이상의 긴 문장을 넣지마세요. 라벨은 짧게 지정하고 설명글을 사용합니다."
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
                  <CodeBadge>label</CodeBadge>, <CodeBadge>description</CodeBadge> prop으로 텍스트를 지정합니다.
                </p>
                <CodeBlock code={`import { Checkbox } from "@alphacode-ai/design-system";

// 단독 체크박스
<Checkbox />

// 라벨 포함
<Checkbox label="Accept terms and condition" />

// 라벨 + 설명
<Checkbox
  label="Accept terms and condition"
  description="You agree to our Terms of Service and Privacy Policy."
/>`} />
              </div>

              {/* 그룹 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 그룹</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>CheckboxGroup</CodeBadge>으로 여러 체크박스를 묶습니다.
                </p>
                <CodeBlock code={`import { Checkbox, CheckboxGroup } from "@alphacode-ai/design-system";

<CheckboxGroup title="Group title">
  <Checkbox label="Option 1" />
  <Checkbox label="Option 2" />
  <Checkbox label="Option 3" />
</CheckboxGroup>

// 수평 배치
<CheckboxGroup direction="horizontal">
  <Checkbox label="Option 1" />
  <Checkbox label="Option 2" />
</CheckboxGroup>`} />
              </div>

              {/* 상태 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>disabled</CodeBadge>, <CodeBadge>indeterminate</CodeBadge> prop으로 상태를 지정합니다.
                </p>
                <CodeBlock code={`// 비활성
<Checkbox disabled label="Disabled" />

// Indeterminate (부분 선택)
<Checkbox indeterminate label="Indeterminate" />`} />
              </div>

              {/* 사이즈 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 크기를 지정합니다. 기본값은 <CodeBadge>lg</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<Checkbox size="xl" label="XL (24px)" />
<Checkbox size="lg" label="LG (18px)" />  {/* 기본값 */}
<Checkbox size="md" label="MD (12px)" />`} />
              </div>

              {/* 색상 커스터마이징 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 색상 커스터마이징</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>checkedColor</CodeBadge> prop으로 체크 색상을 변경합니다.
                </p>
                <CodeBlock code={`<Checkbox checkedColor="#006FFF" label="Blue" checked />
<Checkbox checkedColor="var(--ac-green-50)" label="Green" checked />`} />
              </div>
            </section>

            {/* ── Checkbox Props ── */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Checkbox Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">
                    {h}
                  </div>
                ))}
                {[
                  ["size",          '"md" | "lg" | "xl"', '"lg"',      "체크박스 크기"],
                  ["label",         "string",              "-",         "라벨 텍스트 (선택)"],
                  ["description",   "string",              "-",         "설명 텍스트 (선택)"],
                  ["checked",       "boolean",             "-",         "체크 상태 (controlled)"],
                  ["indeterminate", "boolean",             "false",     "Indeterminate 상태"],
                  ["disabled",      "boolean",             "false",     "비활성 상태"],
                  ["checkedColor",  "string",              '"#FF6300"', "체크 시 배경 색상"],
                  ["onChange",      "(e) => void",         "-",         "상태 변경 핸들러"],
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

            {/* ── CheckboxGroup Props ── */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">CheckboxGroup Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">
                    {h}
                  </div>
                ))}
                {[
                  ["title",     "string",                    "-",          "그룹 제목 (선택)"],
                  ["direction", '"vertical" | "horizontal"', '"vertical"', "체크박스 배치 방향"],
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
