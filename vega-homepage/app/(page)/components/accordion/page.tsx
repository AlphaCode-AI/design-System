"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "type",       label: "Type" },
  { id: "anatomy",    label: "Anatomy" },
  { id: "icon",       label: "Icon" },
  { id: "usage",      label: "사용 가이드" },
];

export default function AccordionPage() {
  const [activeTab, setActiveTab] = useState("docs");
  const [bgColor, setBgColor] = useState("#FBFBFB");

  const colorPalette = [
    { label: "ac-gray-10",    value: "#FBFBFB" },
    { label: "ac-gray-20",    value: "#F7F7F7" },
    { label: "ac-primary-10", value: "#FFE7D8" },
    { label: "ac-blue-10",    value: "#E5F1FF" },
    { label: "ac-green-10",   value: "#E5F9EC" },
    { label: "ac-purple-10",  value: "#F8F7FF" },
  ];

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Accordion</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            아코디언(Accordion)은 한 페이지에서 관련 있는 여러 콘텐츠 섹션을 확인할 수 있도록 하는 컴포넌트로 콘텐츠 섹션의 헤더 목록을 수직으로 쌓여 있는 형태로 표현합니다.<br />
            일반적으로 헤더 목록은 컨트롤 요소로 활용되는 사용자는 필요에 따라 헤더를 선택하여 하위 콘텐츠 섹션을 표시하거나 숨길 수 있다.
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

            {/* Type */}
            <section id="type" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Type</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* 배경 색상이 있는 경우 */}
                <div className="rounded-lg border border-border p-6">
                  <Accordion type="single" variant="filled" backgroundColor={bgColor}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>source-page-1</AccordionTrigger>
                      <AccordionContent>첫번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>source-page-2</AccordionTrigger>
                      <AccordionContent>두번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>source-page-3</AccordionTrigger>
                      <AccordionContent>세번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">배경 색상이 있는 경우</p>
                    <div className="flex gap-1.5">
                      {colorPalette.map((color) => (
                        <button
                          key={color.value}
                          title={color.label}
                          onClick={() => setBgColor(color.value)}
                          className="w-5 h-5 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: color.value,
                            borderColor: bgColor === color.value ? "#FF6300" : "#D9D9D9",
                            transform: bgColor === color.value ? "scale(1.2)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* 배경 색상이 없는 경우 (Default) */}
                <div className="rounded-lg border border-border p-6">
                  <Accordion type="single" variant="default" contentClassName="bg-ac-gray-20">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>source-page-1</AccordionTrigger>
                      <AccordionContent>첫번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>source-page-2</AccordionTrigger>
                      <AccordionContent>두번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>source-page-3</AccordionTrigger>
                      <AccordionContent>세번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <p className="mt-4 text-xs text-muted-foreground text-center">배경 색상이 없는 경우 (Default)</p>
                </div>
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center flex-col justify-center bg-ac-gray-20 rounded-lg p-6">
                  <p className="text-sm font-semibold text-foreground mb-2">아코디언 닫힘</p>
                  <img
                    src="/accordion/anatomy-closed.png"
                    alt="아코디언 닫힘"
                    className="w-[340px]"
                  />
                </div>
                <div className="flex items-center flex-col justify-center bg-ac-gray-20 rounded-lg p-6 gap-4">
                  <p className="text-sm font-semibold text-foreground mb-2">아코디언 닫힘(last)</p>
                  <img
                    src="/accordion/anatomy-closed-last.png"
                    alt="아코디언 닫힘(last)"
                    className="w-[340px]"
                  />
                </div>
                <div className="flex items-center flex-col justify-center bg-ac-gray-20 rounded-lg p-6 gap-4">
                  <p className="text-sm font-semibold text-foreground mb-2">아코디언 열림</p>
                  <img
                    src="/accordion/anatomy-open.png"
                    alt="아코디언 열림"
                    className="w-[340px]"
                  />
                </div>
                <div className="flex items-center flex-col justify-center bg-ac-gray-20 rounded-lg p-6 gap-4">
                  <p className="text-sm font-semibold text-foreground mb-2">아코디언 열림(last)</p>
                  <img
                    src="/accordion/anatomy-open-last.png"
                    alt="아코디언 열림(last)"
                    className="w-[340px]"
                  />
                </div>
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>아코디언 헤더 제목</li>
                <li>아코디언 아이콘 : 접힘/닫힘 상태를 나타냄</li>
                <li>
                  아코디언 헤더 컨테이너 : 닫힘 상태에서 목록의 마지막일때 3b로 적용
                </li>
                <li>
                  아코디언 콘텐츠 패널 : 열림 상태에서 목록의 마지막일때 4b로 적용
                </li>
              </ol>
            </section>

            {/* Icon */}
            <section id="icon" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Icon</h2>
              <p className="text-sm text-foreground mb-4">
                아이콘의 확장 상태를 나타내는 아이콘은 항상 일관된 위치에 제공됩니다. 아이콘은 변경 가능하지만 변경된 패널의 열림/닫힘 상태를 정확하게 반영되도록 제공합니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Plus/Minus (Default) */}
                <div className="rounded-lg p-6 bg-ac-gray-20">
                    <Accordion 
                        type="multiple" 
                        variant="filled" 
                        backgroundColor="#FFFFFF" 
                        defaultValue={["item-2"]} 
                        className="rounded-md border border-border"
                        contentClassName="bg-ac-white"
                    >
                        <AccordionItem value="item-1">
                        <AccordionTrigger iconType="plus">source-page-1</AccordionTrigger>
                        <AccordionContent>첫번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                        <AccordionTrigger iconType="plus">source-page-2</AccordionTrigger>
                        <AccordionContent>두번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                        <AccordionTrigger iconType="plus">source-page-3</AccordionTrigger>
                        <AccordionContent>세번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <p className="mt-4 text-xs text-muted-foreground text-center">Plus / Minus (Default)</p>
                </div>
                {/* Chevron */}
                <div className="rounded-lg p-6 bg-ac-gray-20">
                    <Accordion 
                        type="multiple" 
                        variant="filled" 
                        backgroundColor="#FFFFFF" 
                        defaultValue={["item-2"]} 
                        className="rounded-md border border-border"
                        contentClassName="bg-ac-white"
                    >
                    <AccordionItem value="item-1">
                      <AccordionTrigger iconType="chevron">source-page-1</AccordionTrigger>
                      <AccordionContent>첫번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger iconType="chevron">source-page-2</AccordionTrigger>
                      <AccordionContent>두번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger iconType="chevron">source-page-3</AccordionTrigger>
                      <AccordionContent>세번째 아코디언 콘텐츠 내용입니다.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <p className="mt-4 text-xs text-muted-foreground text-center">Chevron</p>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              {/* 패널 내용 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">패널 내용</h3>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/accordion/usage-do.png"
                    description="패널 영역에 콘텐츠가 길어져 화면의 영역 밖으로 넘어가는 경우, 페이지 스크롤을 활용하도록 합니다. 패널 영역에 별도의 세로 또는 가로의 스크롤이 생성되지 않도록 유의합니다."
                  />
                  <UsageCard
                    type="Don't"
                    src="/accordion/usage-dont.png"
                    description="패널 내부 콘텐츠의 내용이 양이 많거나 복잡할땐 페이지를 분할하여 제공하고, 너무 단순한 경우에는 하나의 페이지로 제공합니다. 아코디언 컴포넌트를 사용할땐 콘텐츠 내용에 기반하여 적절히 사용하도록 합니다."
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
                  기본 아코디언은 하나의 패널만 열리는 단일 확장 모드로 동작합니다.
                </p>
                <CodeBlock code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@alphacode-ai/design-system";

<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>아코디언 헤더 1</AccordionTrigger>
    <AccordionContent>
      아코디언 콘텐츠 내용입니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>아코디언 헤더 2</AccordionTrigger>
    <AccordionContent>
      아코디언 콘텐츠 내용입니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>`} />
              </div>

              {/* 다중 확장 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 다중 확장</h3>
                <p className="text-sm text-foreground mb-4">
                  여러 패널을 동시에 열어야 하는 경우 <CodeBadge>type="multiple"</CodeBadge>을 사용합니다.
                </p>
                <CodeBlock code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>아코디언 헤더 1</AccordionTrigger>
    <AccordionContent>콘텐츠 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>아코디언 헤더 2</AccordionTrigger>
    <AccordionContent>콘텐츠 2</AccordionContent>
  </AccordionItem>
</Accordion>`} />
              </div>

              {/* 커스텀 아이콘 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 아이콘 변경</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>iconType</CodeBadge> prop으로 아이콘을 변경할 수 있습니다. 열림/닫힘 상태는 자동으로 반영됩니다.
                </p>
                <CodeBlock code={`// iconType="plus" — +/- 토글 (기본값)
<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger iconType="plus">아코디언 헤더</AccordionTrigger>
    <AccordionContent>콘텐츠</AccordionContent>
  </AccordionItem>
</Accordion>
 
// iconType="chevron" — 화살표 아이콘
<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger iconType="chevron">아코디언 헤더</AccordionTrigger>
    <AccordionContent>콘텐츠</AccordionContent>
  </AccordionItem>
</Accordion>`} />
              </div>

 
              {/* 커스텀 스타일 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. className으로 스타일 커스텀</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>Accordion</CodeBadge>에 className을 넘겨 border, rounded 등을 자유롭게 추가할 수 있습니다.
                </p>
                <CodeBlock code={`// border + rounded 적용
<Accordion className="border border-border rounded-xl" type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>아코디언 헤더 1</AccordionTrigger>
    <AccordionContent>콘텐츠</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>아코디언 헤더 2</AccordionTrigger>
    <AccordionContent>콘텐츠</AccordionContent>
  </AccordionItem>
</Accordion>
 
// filled variant + 배경색 + rounded
<Accordion
  className="rounded-lg overflow-hidden"
  variant="filled"
  backgroundColor="#E5F1FF"
  type="single"
>
  <AccordionItem value="item-1">
    <AccordionTrigger>아코디언 헤더</AccordionTrigger>
    <AccordionContent>콘텐츠</AccordionContent>
  </AccordionItem>
</Accordion>`} />
              </div>
              {/* 콘텐츠 배경색 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 콘텐츠 배경색 지정</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>contentClassName</CodeBadge>으로 모든 콘텐츠 패널에 배경색을 일괄 적용할 수 있습니다. 개별 <CodeBadge>AccordionContent</CodeBadge>에 className을 직접 넘기면 개별 오버라이드도 가능합니다.
                </p>
                <CodeBlock code={`// contentClassName — 모든 콘텐츠에 일괄 적용
<Accordion type="single" contentClassName="bg-ac-gray-20">
  <AccordionItem value="item-1">
    <AccordionTrigger>아코디언 헤더 1</AccordionTrigger>
    <AccordionContent>콘텐츠 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>아코디언 헤더 2</AccordionTrigger>
    <AccordionContent>콘텐츠 2</AccordionContent>
  </AccordionItem>
</Accordion>

// 개별 AccordionContent에 직접 지정 (contentClassName보다 우선 적용)
<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>아코디언 헤더 1</AccordionTrigger>
    <AccordionContent className="bg-ac-blue-10">콘텐츠 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>아코디언 헤더 2</AccordionTrigger>
    <AccordionContent className="bg-ac-primary-10">콘텐츠 2</AccordionContent>
  </AccordionItem>
</Accordion>`} />
              </div>
            </section>

            {/* Accordion Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Accordion Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["type", '"single" | "multiple"', '"single"', "단일/다중 확장 모드 설정"],
                  ["variant", '"default" | "filled"', '"default"', "아코디언 스타일 변형"],
                  ["backgroundColor", "string", "-", "filled variant의 헤더 배경색 (CSS color 값)"],
                  ["contentClassName", "string", "-", "모든 콘텐츠 패널에 일괄 적용할 클래스명"],
                  ["defaultValue", "string | string[]", "-", "초기 열림 상태의 아이템 value"],
                  ["value", "string | string[]", "-", "제어 컴포넌트로 사용 시 현재 열린 아이템 value"],
                  ["onValueChange", "(value: string | string[]) => void", "-", "열림 상태 변경 시 호출되는 콜백"],
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

            {/* AccordionTrigger Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">AccordionTrigger Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["iconType", '"plus" | "chevron"', '"plus"', "트리거 아이콘 스타일 (plus: +/-, chevron: 화살표)"],
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