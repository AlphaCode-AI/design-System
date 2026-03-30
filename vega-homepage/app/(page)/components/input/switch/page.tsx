"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Switch,
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

export default function SwitchPage() {
  const [activeTab, setActiveTab] = useState("docs");
  const [on, setOn] = useState(false);

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Switch</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            스위치(switch)는 특정 옵션을 켜고 끌 수 있는 컨트롤로 사용자가 단일 항목을 설정 또는 해제해야 하는 경우 이 선택 컨트롤을 사용합니다.
            사용자는 Switch의 상태를 보고 옵션의 설정 여부를 파악할 수 있습니다.
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
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center">
                <img src="/input/switch/switch_anatomy.png" alt="switch anatomy" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>Track : On / Off 상태 표시</li>
                <li>Thumb : Circle이 좌측에 있는 경우 Off, 우측에 있는 경우 On</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                상태는 On / Off에 따라 Default, Active, Disabled로 분류됩니다.
                Active 상태일 때, Circle color는 해당 솔루션의 primary color를 사용합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-8">
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-3">
                    <Switch />
                    <span className="text-sm text-foreground">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Switch defaultChecked />
                    <span className="text-sm text-foreground">Active</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Switch disabled />
                    <span className="text-sm text-foreground">Disable (Off)</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Switch checked disabled />
                    <span className="text-sm text-foreground">Disable (On)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-6">
                사이즈는 md / lg 2가지를 사용합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-center justify-around">
                  {/* lg */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                      <Switch size="lg" />
                      <Switch size="lg" defaultChecked />
                      <Switch size="lg" disabled />
                    </div>
                    <span className="text-sm text-foreground">lg (36 × 20px)</span>
                  </div>

                  {/* md */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                      <Switch size="md" />
                      <Switch size="md" defaultChecked />
                      <Switch size="md" disabled />
                    </div>
                    <span className="text-sm text-foreground">md (30 × 16px)</span>
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
                    src="/input/switch/usage_toggle_dont.png"
                    description="정의된 선택 값 중에 하나를 선택하기 위해 토글을 사용하지 않습니다. Radio를 사용합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/switch/usage_error_dont.png"
                    description="스위치는 활성화(예: 켜짐/꺼짐 상태)를 전달하는 데 가장 적합하고, 체크박스는 선택(예: 여러 테이블 행)을 전달하는 데 가장 적합합니다. 체크박스와 달리 스위치는 오류 상태를 가질 수 없습니다."
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
                  <CodeBadge>onCheckedChange</CodeBadge> prop으로 상태 변경을 처리합니다. <CodeBadge>label</CodeBadge>을 지정하면 텍스트가 우측에 표시됩니다.
                </p>
                <CodeBlock code={`import { Switch } from "@alphacode-ai/design-system";

const [on, setOn] = useState(false);

// 기본
<Switch checked={on} onCheckedChange={setOn} />

// 라벨 포함
<Switch checked={on} onCheckedChange={setOn} label="알림 받기" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 비제어 방식</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>defaultChecked</CodeBadge>로 초기값만 지정하고 내부 상태로 동작합니다.
                </p>
                <CodeBlock code={`// 초기값 Off (기본)
<Switch />

// 초기값 On
<Switch defaultChecked />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>disabled</CodeBadge> prop으로 비활성 상태를 지정합니다.
                </p>
                <CodeBlock code={`<Switch disabled />
<Switch disabled checked />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 크기를 지정합니다. 기본값은 <CodeBadge>lg</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<Switch size="lg" />  {/* 36 × 20px — 기본값 */}
<Switch size="md" />  {/* 30 × 16px */}`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 색상 커스터마이징</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>activeColor</CodeBadge> prop으로 활성 상태의 Track 색상을 변경합니다.
                </p>
                <CodeBlock code={`<Switch activeColor="#006FFF" defaultChecked />
<Switch activeColor="var(--ac-green-50)" defaultChecked />`} />
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
                  ["size",            '"md" | "lg"',           '"lg"',      "스위치 크기 (30×16 / 36×20px)"],
                  ["checked",         "boolean",               "-",         "On/Off 상태 (controlled)"],
                  ["defaultChecked",  "boolean",               "false",     "초기 On/Off 상태 (uncontrolled)"],
                  ["onCheckedChange", "(checked: boolean) => void", "-",    "상태 변경 핸들러"],
                  ["activeColor",     "string",                '"#FF6300"', "활성(On) 상태의 Track 색상"],
                  ["label",           "string",                "-",         "우측에 표시할 라벨 텍스트"],
                  ["disabled",        "boolean",               "false",     "비활성 상태"],
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
