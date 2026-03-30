"use client";

import { useState } from "react";
import { 
  Tabs, 
  TabList, 
  TabTrigger, 
  TabContent, 
  breakpoints as dsBreakpoints 
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBadge from "@/app/components/CodeBadge";
import CodeBlock from "@/app/components/CodeBlock";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "variables", label: "Variables" },
  { id: "implementation", label: "규격 안내" },
];

/**
 * 디자인 시스템의 breakpoints 토큰을 가이드용 데이터로 변환합니다.
 * 큰 화면부터 작은 화면 순서로 정렬하여 시각화합니다.
 */
const breakpointList = Object.entries(dsBreakpoints)
  .sort(([, a], [, b]) => parseInt(b) - parseInt(a))
  .map(([name, value]) => ({
    name,
    viewport: `${value} 이상`,
    query: `min-width: ${value}`,
  }));

export default function BreakpointsPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Breakpoints</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            알파코드 디자인 시스템의 브레이크포인트는 다양한 디바이스 환경에서 최적화된 화면을 제공하기 위한 규격입니다. 모든 반응형 스타일은 시스템에서 정의한 브레이크포인트를 준수하여 구현되어야 합니다.
          </p>
        </div>

        {/* 탭 시스템 */}
        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ── Docs 탭 ── */}
          <TabContent value="docs" className="pt-6">
            <section id="variables" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-1">Variables</h2>
              <p className="text-sm text-foreground mb-4">
                시스템에서 정의한 공식 브레이크포인트 명칭과 수치입니다.
              </p>
              
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="px-4 py-3 text-left font-bold text-foreground">Name</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">Breakpoint</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">CSS Media Query</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakpointList.map((bp) => (
                      <tr key={bp.name} className="border-b border-border last:border-0 hover:bg-ac-gray-10/50 transition-colors">
                        <td className="px-4 py-3">
                          <CodeBadge>{bp.name}</CodeBadge>
                        </td>
                        <td className="px-4 py-3 text-foreground font-semibold">
                          {bp.viewport}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                          {bp.query}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="implementation" className="mt-12 scroll-mt-8 border-t border-border pt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">규격 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
                <div className="bg-ac-gray-10 p-5 rounded-lg border border-border">
                  <h3 className="text-sm font-bold mb-2">시스템 프리픽스 준수</h3>
                  <p className="text-sm leading-relaxed">
                    모든 반응형 스타일은 시스템에서 정의한 브레이크포인트 프리픽스(<CodeBadge>md:</CodeBadge>, <CodeBadge>lg:</CodeBadge> 등)만을 사용하여 구현해야 합니다. 임의의 수치를 사용하는 미디어 쿼리 작성을 지양해 주세요.
                  </p>
                </div>
                <div className="bg-ac-gray-10 p-5 rounded-lg border border-border">
                  <h3 className="text-sm font-bold mb-2">유연한 레이아웃</h3>
                  <p className="text-sm leading-relaxed">
                    고정된 너비보다는 비율(%)과 시스템 브레이크포인트를 조합하여 다양한 화면에 능동적으로 대응할 것을 권장합니다.
                  </p>
                </div>
              </div>
            </section>
          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            
            <section id="usage-examples">
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              {/* 예시 1: 레이아웃 전환 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. 화면 너비에 따른 레이아웃 전환</h3>
                <p className="text-sm text-foreground mb-4">
                  좁은 화면에서는 세로로 나열되던 요소들이 특정 브레이크포인트 이상에서 가로 배열로 전환되는 일반적인 케이스입니다.
                </p>
                <CodeBlock code={`// 1. Flex 레이아웃 전환
// 기본(세로 나열) -> md 이상(가로 나열)
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1 bg-ac-gray-10 p-4 border border-border rounded-lg">콘텐츠 1</div>
  <div className="flex-1 bg-ac-gray-10 p-4 border border-border rounded-lg">콘텐츠 2</div>
</div>

// 2. 그리드 컬럼 변경
// 기본(1열) -> md 이상(2열) -> xl 이상(4열)
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <div className="bg-ac-gray-10 p-4 border border-border rounded-lg">카드 1</div>
  <div className="bg-ac-gray-10 p-4 border border-border rounded-lg">카드 2</div>
  <div className="bg-ac-gray-10 p-4 border border-border rounded-lg">카드 3</div>
  <div className="bg-ac-gray-10 p-4 border border-border rounded-lg">카드 4</div>
</div>`} />
              </div>

              {/* 예시 2: 가시성 제어 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 특정 환경에서의 요소 가시성 제어</h3>
                <p className="text-sm text-foreground mb-4">
                  화면 크기에 따라 불필요한 요소를 숨기거나, 반대로 데스크톱 전용 요소를 노출해야 할 때 사용합니다.
                </p>
                <CodeBlock code={`// 1. 데스크톱 전용 요소 (md 미만에서 숨김)
<aside className="hidden md:block w-64 border-r border-border p-4 text-foreground">
  데스크톱 사이드바 메뉴
</aside>

// 2. 모바일 전용 요소 (md 이상에서 숨김)
<button className="block md:hidden bg-brand-500 text-white p-3 rounded-lg w-full text-center">
  모바일 메뉴 펼치기
</button>`} />
              </div>

              {/* 예시 3: 컴포넌트 크기 조정 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 반응형 컴포넌트 크기 조정</h3>
                <p className="text-sm text-foreground mb-4">
                  이미지나 버튼 등 개별 컴포넌트의 크기를 브레이크포인트에 따라 유연하게 변경합니다.
                </p>
                <CodeBlock code={`// 1. 이미지 너비 조정
<img 
  class="w-16 md:w-32 lg:w-48 h-auto object-cover rounded-md" 
  src="/path/to/your/image.jpg" 
  alt="Responsive Image" 
/>

// 2. 버튼 폰트 및 여백 조정
<button className="text-xs md:text-sm lg:text-base px-3 py-1.5 md:px-5 md:py-2.5 bg-brand-500 text-white rounded-md">
  확인
</button>`} />
              </div>
            </section>

          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}