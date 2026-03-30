"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Button,
  ButtonGroup,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "layout",  label: "배치" },
  { id: "usage",   label: "사용 가이드" },
];

export default function ButtonGroupPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Button Group</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            버튼 그룹(Button Group)은 다수의 버튼이 필요할 경우를 위해 작성되었습니다.
          </p>
        </div>

        {/* 탭 시스템 */}
        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ── Docs 탭 ── */}
          <TabContent value="docs" className="pt-6 space-y-16">

            {/* 배치 */}
            <section id="layout" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">배치</h2>

              <div className="rounded-lg border border-border p-8 mb-6">
                <div className="flex flex-row items-start justify-center gap-12">
                  {/* 수평 — 2개 */}
                  <div className="flex gap-4 flex-col">
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-foreground font-medium">수평 · 2개</p>
                        <ButtonGroup direction="horizontal">
                        <Button variant="tertiary">취소</Button>
                        <Button variant="primary">확인</Button>
                        </ButtonGroup>
                    </div>

                    {/* 수직 */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-foreground font-medium">수직</p>
                        <ButtonGroup direction="vertical">
                        <Button variant="primary">확인</Button>
                        <Button variant="tertiary">취소</Button>
                        </ButtonGroup>
                    </div>
                  </div>
                    {/* 수평 — 3개 이상 */}
                  <div className="flex gap-4 flex-col">
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-foreground font-medium">수평 · 3개 이상</p>
                        <ButtonGroup direction="horizontal">
                        <Button variant="tertiary">취소</Button>
                        <Button variant="tertiary">이전</Button>
                        <Button variant="primary">확인</Button>
                        </ButtonGroup>
                    </div>

                    {/* 수직 — 3개 이상 */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-foreground font-medium">수직 · 3개 이상</p>
                        <ButtonGroup direction="vertical">
                        <Button variant="primary">확인</Button>
                        <Button variant="tertiary">이전</Button>
                        <Button variant="tertiary">취소</Button>
                        </ButtonGroup>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-1.5 text-sm text-foreground list-disc list-inside">
                <li>버튼 그룹을 2개를 동일한 수평 정렬 시 Button 폭은 가변이되, 패딩은 8로 고정하여 사용합니다. Button 2개 이상을 수직 정렬 시 패딩은 12로 고정하여 사용합니다.</li>
                <li>버튼이 그룹으로 제공할 때 모든 버튼의 크기를 동일하게 제공해야 합니다.</li>
                <li>버튼 그룹을 수평으로 정렬 시 최상위 수준의 강조 버튼은 좌측에 배치합니다. 수직으로 배열할 땐, 최상위 수준의 강조 버튼을 첫 번째로 배치합니다.</li>
              </ul>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">아이콘 사용</h3>
                <div className="grid grid-cols-4 gap-6">
                  <UsageCard type="Don't" src="/button/buttonGroup/usage_tab_dont.png" description="탭처럼 사용하지 마세요!" />
                  <UsageCard type="Don't" src="/button/buttonGroup/usage_duli_dont.png" description="Primary 버튼을 그룹내에서 두번 이상 사용하지 않도록 주의합니다." />
                  <UsageCard type="Don't" src="/button/buttonGroup/usage_icon_dont.png" description="아이콘은 전체적으로 사용하거나 사용하지 않습니다." />
                  <UsageCard type="Don't" src="/button/buttonGroup/usage_text_dont.png" description="버튼 그룹의 텍스트 레이블은 버튼을 통해 실행되는 기능을 예측할 수 있는 명확한 내용을 동사형을 제공해야합니다." />
                </div>
              </div>
            </section>

          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">Import</h3>
                <CodeBlock code={`import { ButtonGroup } from "@/app/components/ButtonGroup";
import { Button } from "@alphacode-ai/design-system";`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. 수평 배치</h3>
                <p className="text-sm text-foreground mb-4">
                  기본값은 <CodeBadge>horizontal</CodeBadge>입니다. 버튼 2개일 때 gap-2(8px), 3개 이상일 때 gap-3(12px)이 자동 적용됩니다.
                </p>
                <CodeBlock code={`// 2개 — gap 8px 자동 적용
<ButtonGroup>
  <Button variant="tertiary">취소</Button>
  <Button variant="primary">확인</Button>
</ButtonGroup>

// 3개 이상 — gap 12px 자동 적용
<ButtonGroup>
  <Button variant="tertiary">취소</Button>
  <Button variant="tertiary">이전</Button>
  <Button variant="primary">확인</Button>
</ButtonGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 수직 배치</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>direction="vertical"</CodeBadge>을 사용하면 버튼이 수직으로 배치되며, 모든 버튼의 너비가 부모에 맞게 확장됩니다.
                </p>
                <CodeBlock code={`<ButtonGroup direction="vertical">
  <Button variant="primary">확인</Button>
  <Button variant="tertiary">취소</Button>
</ButtonGroup>`} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. fullWidth 조합</h3>
                <p className="text-sm text-foreground mb-4">
                  수평 배치에서 버튼을 전체 너비로 확장하려면 <CodeBadge>className="w-full"</CodeBadge> 또는 Button의 <CodeBadge>fullWidth</CodeBadge> prop을 사용하세요.
                </p>
                <CodeBlock code={`<ButtonGroup className="w-full">
  <Button variant="tertiary" fullWidth>취소</Button>
  <Button variant="primary" fullWidth>확인</Button>
</ButtonGroup>`} />
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
                  ["direction", '"horizontal" | "vertical"', '"horizontal"', "버튼 배치 방향. vertical 사용 시 모든 버튼의 너비가 부모에 맞게 확장됨"],
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