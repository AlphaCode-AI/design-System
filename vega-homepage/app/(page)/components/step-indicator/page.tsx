"use client";

import React, { useState } from "react";
import {
  StepIndicator,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",     label: "Type" },
  { id: "anatomy",  label: "Anatomy" },
  { id: "size",     label: "Size" },
  { id: "step-count",label: "Step Count" },
  { id: "color",    label: "Color" },
  { id: "usage",    label: "사용 가이드" },
];

const STEPS_DEFAULT = [
  { title: "스텝타이틀", stepText: "1단계" },
  { title: "스텝타이틀", stepText: "2단계" },
  { title: "스텝타이틀", stepText: "3단계" },
];

const STEPS_SIMPLE = [
  { stepText: "1단계" },
  { stepText: "2단계" },
  { stepText: "3단계" },
];

const STEPS_7 = [
  { title: "스텝타이틀", stepText: "1단계" },
  { title: "스텝타이틀", stepText: "2단계" },
  { title: "스텝타이틀", stepText: "3단계" },
  { title: "스텝타이틀", stepText: "4단계" },
  { title: "스텝타이틀", stepText: "5단계" },
  { title: "스텝타이틀", stepText: "6단계" },
  { title: "스텝타이틀", stepText: "7단계" },
];


export default function StepIndicatorPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Step Indicator</h1>
          <p className="text-sm text-foreground leading-relaxed">
            단계별 진행 상태를 시각적으로 나타내는 컴포넌트입니다. 현재 단계, 완료된 단계, 남은 단계를 구분해 보여줍니다.
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
                <CodeBadge>type</CodeBadge> prop으로 가로(<CodeBadge>horizontal</CodeBadge>)/세로(<CodeBadge>vertical</CodeBadge>) 방향을 선택합니다. <CodeBadge>steps</CodeBadge> 배열에 <CodeBadge>title</CodeBadge>이 있으면 아이콘 아래에 텍스트가 표시되고, <CodeBadge>showStepText</CodeBadge>로 단계 텍스트를 추가로 표시합니다.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">type : Horizontal / style : Default / showStepText</p>
                  <StepIndicator steps={STEPS_DEFAULT} current={1} type="horizontal" showStepText />
                </div>
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">type : Horizontal / style : Default</p>
                  <StepIndicator steps={STEPS_DEFAULT} current={1} type="horizontal" />
                </div>
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">type : Horizontal / style : Simple</p>
                  <StepIndicator steps={STEPS_SIMPLE} current={1} style="simple" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">type : Vertical / style : Default / showStepText</p>
                  <StepIndicator steps={STEPS_DEFAULT} current={1} type="vertical" showStepText />
                </div>
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">type : Vertical / style : Default</p>
                  <StepIndicator steps={STEPS_DEFAULT} current={1} type="vertical" />
                </div>
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">type : Vertical / style : Simple</p>
                  <StepIndicator steps={STEPS_SIMPLE} current={1} type="vertical" />
                </div>
              </div>
            </section>

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center">
                <img src="/step-indicator/step_anatomy.png" alt="step indicator anatomy" className="max-w-full" />
              </div>
              <ul className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>단계 숫자 (선택) : 단계 레이블 위에 표시되는 작은 텍스트로 각 단계의 번호를 나타냄</li>
                <li>단계 레이블 (선택) : 각 단계에서 사용자가 수행해야 할 작업을 요약한 텍스트</li>
                <li>단계 식별자
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>완료된 단계 식별자 : 완료된 단계를 다른 단계와 구분하는 식별자</li>
                    <li>현재 단계 식별자 : 진행 중인 단계를 다른 단계와 구분하는 식별자</li>
                    <li>진행 전 단계 식별자 : 진행 전인 단계를 다른 단계와 구분하는 식별자</li>
                  </ol>
                </li>
                <li>연결선 : 단계와 단계 사이를 연결하는 선으로 프로세스의 선형성을 보여줌
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>진행 중 연결선</li>
                    <li>진행 전 연결선</li>
                  </ol>
                </li>
              </ul>
            </section>

            {/* ── Size ── */}
            <section id="size">
              <h2 className="text-lg font-semibold text-foreground mb-1">Size</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>size</CodeBadge> prop으로 세 가지 크기를 선택합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex flex-col gap-8">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size} className="flex items-center gap-6">
                    <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">{size}</span>
                    <StepIndicator steps={STEPS_DEFAULT} current={1} size={size} />
                  </div>
                ))}
              </div>
            </section>

            {/* ── Step Count ── */}
            <section id="step-count">
              <h2 className="text-lg font-semibold text-foreground mb-1">Step Count</h2>
              <p className="text-sm text-foreground mb-4">
                사용자의 인지적 부담을 줄이기 위해 단계의 수는 최소 3개에서 최대 7개로 제한할 것을 권장합니다.<br/>
                프로세스를 단계로 구분할 때 불필요한 단계나 사용자의 행동이 포함되지 않았는지 반복적으로 점검하고 논리적, 효율성 측면에서 문제가 없는 과업은 가능한 한 하나의 단계에서 처리될 수 있도록 해야 합니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">min : 3 step</p>
                  <StepIndicator steps={STEPS_DEFAULT} current={1} showStepText />
                </div>
                <div className="flex flex-col gap-2 bg-ac-gray-20 p-8 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">max : 7 step</p>
                  <StepIndicator steps={STEPS_7} current={3} showStepText />
                </div>
              </div>
            </section>

            {/* ── Color ── */}
            <section id="color">
              <h2 className="text-lg font-semibold text-foreground mb-1">Color</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>colorClassName</CodeBadge>에 Tailwind <CodeBadge>text-</CodeBadge> 클래스를 전달해 색상을 변경합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex flex-col gap-6">
                {[
                  { label: "text-ac-primary-50", colorClassName: "text-ac-primary-50" },
                  { label: "text-ac-blue-50",    colorClassName: "text-ac-blue-50" },
                  { label: "text-ac-green-50",   colorClassName: "text-ac-green-50" },
                  { label: "text-ac-red-50",     colorClassName: "text-ac-red-50" },
                  { label: "text-ac-orange-50",  colorClassName: "text-ac-orange-50" },
                  { label: "text-ac-purple-50",  colorClassName: "text-ac-purple-50" },
                ].map(({ label, colorClassName }) => (
                  <div key={label} className="flex items-center gap-6">
                    <span className="text-xs font-mono text-muted-foreground w-36 shrink-0">{label}</span>
                    <StepIndicator steps={STEPS_SIMPLE} current={2} style="simple" colorClassName={colorClassName} />
                  </div>
                ))}
              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage">
              <h2 className="text-lg font-semibold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">단계 레이블</h3>
                <p className="text-sm text-foreground mb-4">
                  레이블은 해당 단계/프로세스에서 사용자가 수행해야 하는 작업의 특성을 명확하게 보여줄 수 있는 내용으로 제공해야 합니다.<br/>
                  레이블로만 설명을 제공하기 어려운 경우, 보조 텍스트를 인접 영역에 제공할 수 있으나, 레이블 자체는 텍스트가 잘리거나 줄 바꿈이 발생하지 않도록 짧은 단어, 문구로 구성해야 합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/step-indicator/usage_level_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/step-indicator/usage_level_dont.png"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">단계 구분</h3>
                <p className="text-sm text-foreground mb-4">
                  사용자가 단계의 개요를 파악할 수 있는 명확한 단계로 사용해야합니다. 단계의 개요를 파악할 수 없는 경우에는 단계 표시기를 사용하지 않습니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/step-indicator/usage_step_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/step-indicator/usage_step_dont.png"
                  />
                </div>
              </div>
            </section>

          </TabContent>

          {/* ══════════════════════════════════════
              CODE
          ══════════════════════════════════════ */}
          <TabContent value="code" className="mt-6 space-y-10">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">기본 사용</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>steps</CodeBadge> 배열과 <CodeBadge>current</CodeBadge> 인덱스(0-based)를 전달합니다. <CodeBadge>title</CodeBadge>이 있으면 아이콘 아래에 텍스트가 표시되고, 없으면 아이콘만 표시됩니다.
              </p>
              <CodeBlock code={`// title 있음 → 아이콘 + 텍스트
const steps = [
  { title: "회원정보 입력" },
  { title: "약관 동의" },
  { title: "완료" },
];
<StepIndicator steps={steps} current={1} />

// title 없음 → 아이콘만
const steps = [
  {},
  {},
  {},
];
<StepIndicator steps={steps} current={1} />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Vertical</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>type="vertical"</CodeBadge>로 세로 방향으로 표시합니다. 기본값은 <CodeBadge>horizontal</CodeBadge>입니다.</p>
              <CodeBlock code={`<StepIndicator steps={steps} current={1} type="vertical" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Simple</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>style="simple"</CodeBadge>은 <CodeBadge>title</CodeBadge> 유무와 관계없이 아이콘만 표시합니다.</p>
              <CodeBlock code={`<StepIndicator steps={steps} current={1} style="simple" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Size</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>size</CodeBadge>로 아이콘과 텍스트 크기를 조절합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.</p>
              <CodeBlock code={`<StepIndicator steps={steps} current={1} size="sm" />
<StepIndicator steps={steps} current={1} size="md" />
<StepIndicator steps={steps} current={1} size="lg" />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Step Text</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>showStepText</CodeBadge>로 단계 텍스트 표시 여부를 제어합니다. <CodeBadge>steps</CodeBadge> 배열의 각 항목에 <CodeBadge>stepText</CodeBadge>가 없으면 <CodeBadge>1단계</CodeBadge>, <CodeBadge>2단계</CodeBadge>… 순으로 자동 표시됩니다.
              </p>
              <CodeBlock code={`// stepText 직접 지정
const steps = [
  { title: "회원정보 입력", stepText: "Step 1" },
  { title: "약관 동의",     stepText: "Step 2" },
  { title: "완료",          stepText: "Step 3" },
];
<StepIndicator steps={steps} current={1} showStepText />

// stepText 미지정 → "1단계", "2단계"... 자동 표시
const steps = [
  { title: "회원정보 입력" },
  { title: "약관 동의" },
  { title: "완료" },
];
<StepIndicator steps={steps} current={1} showStepText />`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Color</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>colorClassName</CodeBadge>에 <CodeBadge>text-</CodeBadge> 클래스를 전달하면 아이콘과 연결선 색상이 변경됩니다.
              </p>
              <CodeBlock code={`<StepIndicator steps={steps} current={1} colorClassName="text-ac-blue-50" />
<StepIndicator steps={steps} current={1} colorClassName="text-ac-green-50" />
<StepIndicator steps={steps} current={1} colorClassName="text-ac-purple-50" />`} />
            </section>

            {/* Props 테이블 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["steps",          "StepItem[]",                                     "—",                    "단계 배열. title, stepText 포함 가능"],
                  ["current",        "number",                                          "—",                    "현재 진행 중인 단계 인덱스 (0-based)"],
                  ["type",           '"horizontal" | "vertical"',                       '"horizontal"',         "방향"],
                  ["style",          '"default" | "simple"',                            '"default"',            "default: title 있으면 텍스트 표시 / simple: title 유무와 관계없이 아이콘만 표시"],
                  ["size",           '"sm" | "md" | "lg"',                              '"md"',                 "아이콘 및 텍스트 크기"],
                  ["showStepText",   "boolean",                                         "false",                "단계 텍스트 표시 여부. stepText 미지정 시 '1단계', '2단계'… 자동 표시"],
                  ["colorClassName", "string (Tailwind text- 클래스)",                 '"text-ac-primary-50"', "활성/완료 색상"],
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
