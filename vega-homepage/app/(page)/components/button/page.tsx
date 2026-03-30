"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Button,
} from "@alphacode-ai/design-system";
import { Home, RefreshCw, User, Plus, ChevronRight } from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",   label: "Anatomy" },
  { id: "component", label: "Component" },
  { id: "size",      label: "Size" },
  { id: "state",     label: "State" },
  { id: "usage",     label: "사용 가이드" },
];

export default function ButtonPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Button</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            버튼(Buttons)은 작업을 수행하는데 사용되는 클릭 가능한 컴포넌트입니다. 사용자가 서비스를 이용하는 과정에서 어떤 행동이 중요한지에 따라 관련된 버튼이 다양한 스타일로 사용됩니다.
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

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg p-12 flex items-center justify-center gap-24 bg-ac-gray-20">
                <img src="/button/button_anatomy.png" alt="button anatomy img" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>텍스트 레이블: 버튼을 눌렀을 때 실행되는 기능에 대한 단어로 이루어진 설명으로 사용됩니다.</li>
                <li>컨테이너 <span className="text-muted-foreground">(선택)</span>: 버튼을 배경과 구분하는 시각적인 수단으로 면 또는 선으로 표현하여 사용됩니다.</li>
                <li>아이콘 <span className="text-muted-foreground">(선택)</span>: 버튼을 눌렀을 때 실행되는 기능을 텍스트 대신 시각적인 상징으로 표현하여 사용됩니다.</li>
              </ol>
            </section>

            {/* Component */}
            <section id="component" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Component</h2>
              <p className="text-sm text-foreground mb-4">버튼은 중요도와 쓰임새에 따라 세부 스타일을 분류하여 사용합니다.</p>

              <div className="rounded-lg border border-border p-8 mb-4">
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { node: <Button variant="primary" size="md">Primary</Button>, label: "Primary button" },
                    { node: <Button variant="secondary" size="md">Secondary</Button>, label: "Secondary button" },
                    { node: <Button variant="tertiary" size="md">Tertiary</Button>, label: "Tertiary" },
                    { node: <Button variant="link" size="md" rightIcon={<ChevronRight />}>Tertiary</Button>, label: "Link button" },
                    { node: <Button variant="icon" size="icon-md"><Plus /></Button>, label: "Icon button" },
                  ].map(({ node, label }) => (
                    <div key={label} className="flex flex-col items-center gap-3">
                      {node}
                      <span className="text-xs text-ac-gray-60">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-foreground list-disc list-inside">
                <li>Primary button : 주요 버튼(Primary Button)은 페이지 키 액션에 사용하는 Button으로 한 페이지에 한 번만 사용합니다.</li>
                <li>Secondary button : 이차 버튼(Secondary Button)은 Primary Button의 보조로 사용됩니다.</li>
                <li>Tertiary button : 제삼 버튼(tertiary button)은 사용자 판단에 영향을 주지 않는 흐름에서 사용됩니다.</li>
                <li>Link button : 링크 버튼(link button)은 링크가 있는 버튼에 사용됩니다.</li>
                <li>Icon button : 아이콘 버튼(icon button)은 아이콘만으로 버튼의 역할을 표현할 수 있을 때 사용합니다.</li>
              </ul>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-4">
                버튼 사이즈는 높이 기준 5가지로 구분됩니다. 사이즈에 따라 폰트 / 아이콘 / 패딩 값에 대한 차이가 있으므로 유의하여 사용하도록 합니다.
              </p>
              <div className="rounded-lg bg-ac-gray-20 p-10">
                <div className="flex flex-row items-end justify-center gap-6">
                  {(
                    [
                      { size: "xl", iconSize: "icon-xl", height: "54px" },
                      { size: "lg", iconSize: "icon-lg", height: "48px" },
                      { size: "md", iconSize: "icon-md", height: "40px" },
                      { size: "sm", iconSize: "icon-sm", height: "36px" },
                      { size: "xs", iconSize: "icon-xs", height: "30px" },
                    ] as const
                  ).map(({ size, iconSize, height }) => (
                    <div key={size} className="flex flex-col items-center gap-3">
                      <Button variant="icon" size={iconSize} colorClassName="bg-ac-primary-50 hover:bg-ac-primary-60 text-ac-white border-none">
                        <Home />
                      </Button>
                      <Button variant="primary" size={size} rightIcon={<Plus />}>
                        Size button : {size}
                      </Button>
                      <span className="text-xs text-ac-gray-60">height : {height}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-4">
                상태는 배경 색상 4가지로 구분됩니다. Default / Hover / Disable / Loading 로 구분되며 각 상태에 따라 적절히 사용됩니다.
                Semantic Color로 버튼을 생성할 경우, 상태에 따른 색상은 Foundation의 Color부분을 참고합니다.
              </p>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="text-left px-5 py-3 font-medium text-ac-gray-60 w-24">color</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground">Primary</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground">Secondary</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground">Tertiary</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground">Link</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground">Icon only</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-5 py-5 text-ac-gray-60 font-medium">Default</td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="primary" size="sm">Default</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="secondary" size="sm">Secondary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="tertiary" size="sm">Tertiary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="link" size="sm" rightIcon={<ChevronRight />}>Link</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center gap-2"><Button variant="icon" size="icon-sm"><User /></Button><Button variant="icon" size="icon-sm"><RefreshCw /></Button></div></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-5 py-5 text-ac-gray-60 font-medium">Hover</td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="primary" size="sm" className="bg-ac-primary-60">Default</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="secondary" size="sm" className="bg-ac-gray-80">Secondary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="tertiary" size="sm" className="bg-ac-gray-30">Tertiary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="link" size="sm" rightIcon={<ChevronRight />} className="text-ac-primary-50 underline">Link</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center gap-2"><Button variant="icon" size="icon-sm" className="bg-ac-gray-20"><User /></Button><Button variant="icon" size="icon-sm" className="bg-ac-gray-20"><RefreshCw /></Button></div></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-5 py-5 text-ac-gray-60 font-medium">Disable</td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="primary" size="sm" disabled>Default</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="secondary" size="sm" disabled>Secondary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="tertiary" size="sm" disabled>Tertiary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="link" size="sm" disabled rightIcon={<ChevronRight />}>Link</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center gap-2"><Button variant="icon" size="icon-sm" disabled><User /></Button><Button variant="icon" size="icon-sm" disabled><RefreshCw /></Button></div></td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 text-ac-gray-60 font-medium">Loading</td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="primary" size="sm" loading>Default</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="secondary" size="sm" loading>Secondary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="tertiary" size="sm" loading>Tertiary</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center"><Button variant="link" size="sm" loading>Link</Button></div></td>
                      <td className="px-4 py-5 text-center"><div className="flex justify-center gap-2"><Button variant="icon" size="icon-sm" loading><User /></Button><Button variant="icon" size="icon-sm" loading><RefreshCw /></Button></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">아이콘 사용</h3>
                <p className="text-sm text-foreground mb-4">
                  버튼 내에 아이콘을 사용할 때 우측 외엔 사용을 지양하며, 아이콘의 색상은 2가지 이상 사용하지 않도록 주의합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/button/usage_icon_do.png" />
                  <UsageCard type="Don't" src="/button/usage_icon_dont.png" />
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
                <CodeBlock code={`import { Button } from "@alphacode-ai/design-system";`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Variants</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>variant</CodeBadge> prop으로 버튼 스타일을 지정합니다. 기본값은 <CodeBadge>primary</CodeBadge>입니다.
                </p>
                <CodeBlock code={`// Primary (기본값)
<Button>Primary button</Button>

// Secondary
<Button variant="secondary">Secondary button</Button>

// Tertiary
<Button variant="tertiary">Tertiary</Button>

// Link
<Button variant="link" rightIcon={<ChevronRight />}>Tertiary</Button>

// Icon
<Button variant="icon" size="icon-md">
  <Plus />
</Button>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Size</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 버튼 사이즈를 지정합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
                </p>
                <CodeBlock code={`<Button size="xl" rightIcon={<Plus />}>Size button : xl</Button>
<Button size="lg" rightIcon={<Plus />}>Size button : lg</Button>
<Button size="md" rightIcon={<Plus />}>Size button : md</Button>
<Button size="sm" rightIcon={<Plus />}>Size button : sm</Button>
<Button size="xs" rightIcon={<Plus />}>Size button : xs</Button>

{/* Icon 전용 사이즈 */}
<Button variant="icon" size="icon-xl"><Plus /></Button>
<Button variant="icon" size="icon-lg"><Plus /></Button>
<Button variant="icon" size="icon-md"><Plus /></Button>
<Button variant="icon" size="icon-sm"><Plus /></Button>
<Button variant="icon" size="icon-xs"><Plus /></Button>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 아이콘</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>leftIcon</CodeBadge> / <CodeBadge>rightIcon</CodeBadge> prop으로 아이콘을 추가합니다. 아이콘은 우측(<CodeBadge>rightIcon</CodeBadge>) 사용을 권장합니다.
                </p>
                <CodeBlock code={`import { Phone } from "@alphacode-ai/design-system";

// ✅ Do — 아이콘을 우측에 배치
<Button rightIcon={<Phone />}>상담 시작하기</Button>

// ❌ Don't — 아이콘을 좌측에 배치
<Button leftIcon={<Phone />}>상담 시작하기</Button>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. asChild 패턴</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>asChild</CodeBadge> prop을 사용하면 버튼을 Next.js Link와 조합할 수 있습니다.
                </p>
                <CodeBlock code={`import Link from "next/link";

<Button asChild>
  <Link href="/path">링크 버튼</Link>
</Button>

{/* rightIcon 포함 */}
<Button asChild rightIcon={<ChevronRight />}>
  <Link href="/path">링크 버튼</Link>
</Button>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 전체 너비</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>fullWidth</CodeBadge> prop을 사용하면 버튼이 부모 너비에 맞게 확장됩니다.
                </p>
                <CodeBlock code={`// 부모 너비에 꽉 차게
<Button fullWidth>전체 너비 버튼</Button>

// 조건부 적용
<Button fullWidth={isMobile}>반응형 버튼</Button>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">6. 색상 변경</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>colorClassName</CodeBadge> prop으로 variant의 기본 색상을 override할 수 있습니다. 배경·텍스트·보더·hover 등 원하는 Tailwind 클래스를 자유롭게 조합하세요.
                </p>
                <CodeBlock code={`// 기본 primary 색상 변경
<Button colorClassName="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700">
  파란색 버튼
</Button>

// 디자인 시스템 토큰으로 변경
<Button colorClassName="bg-ac-success-50 text-white hover:bg-ac-success-60">
  성공
</Button>

<Button colorClassName="bg-ac-error-50 text-white hover:bg-ac-error-60">
  오류
</Button>

// secondary variant 색상 변경
<Button variant="secondary" colorClassName="bg-ac-primary-50 hover:bg-ac-primary-60">
  커스텀 secondary
</Button>`} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">7. 로딩 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>loading</CodeBadge> prop을 사용하면 스피너가 표시되며 버튼이 자동으로 비활성화됩니다.
                </p>
                <CodeBlock code={`<Button loading>로딩 중...</Button>
<Button variant="secondary" loading>로딩 중...</Button>`} />
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
                  ["variant", '"primary" | "secondary" | "tertiary" | "link" | "icon"', '"primary"', "버튼 스타일 변형"],
                  ["size", '"xs" | "sm" | "md" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg" | "icon-xl"', '"md"', "버튼 크기. icon 전용 사이즈는 variant=\"icon\"에서 사용"],
                  ["leftIcon", "ReactNode", "-", "버튼 텍스트 좌측에 표시할 아이콘"],
                  ["rightIcon", "ReactNode", "-", "버튼 텍스트 우측에 표시할 아이콘"],
                  ["loading", "boolean", "false", "로딩 상태 표시. true이면 스피너가 표시되고 버튼이 비활성화됨"],
                  ["fullWidth", "boolean", "false", "부모 너비에 맞게 버튼을 확장"],
                  ["asChild", "boolean", "false", "자식 요소로 렌더링. Next.js Link 등과 조합할 때 사용"],
                  ["colorClassName", "string", "-", "variant의 기본 색상을 override하는 Tailwind 클래스"],
                  ["disabled", "boolean", "false", "버튼 비활성화"],
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