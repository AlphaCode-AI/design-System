"use client";

import { useState } from "react";
import { 
  Tabs, 
  TabList, 
  TabTrigger, 
  TabContent, 
  colors 
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";

const toc: TocItem[] = [
  { id: "primary-color", label: "Primary Color" },
  { id: "semantic-color", label: "Semantic Color" },
  { id: "gray-color", label: "Gray Color" },
];

const blackWhiteTokens = {
    black: colors.black,
    white: colors.white,
  };

/**
 * 이미지의 상세 테이블 구조 재현
 */
function ColorTable({ prefix, colorTokens }: { prefix: string; colorTokens: Record<string, string> }) {
  const entries = Object.entries(colorTokens);
  const gridStyle = { gridTemplateColumns: `100px repeat(${entries.length}, 1fr)` };
  const headerClass = "px-4 py-3 font-bold text-foreground border-r border-border flex items-center text-xs bg-ac-gray-10";
  const cellClass = "px-2 py-3 font-mono text-foreground flex items-center text-xs border-r border-border last:border-r-0 truncate";
  const keyColors = ["primary", "green", "orange", "blue", "red", "purple", "blue-gray"];

  const getUseLabel = (key: string) => {
    if (prefix === "black-white") {
        return key === "black" ? "font default" : "background default";
    }
    if (key === "20" && keyColors.includes(prefix)) return "disable";
    if (key === "20" && prefix === "gray") return "background gray";
    if (key === "40" && prefix === "gray") return "border solid";
    if (key === "50" && keyColors.includes(prefix)) return "main";
    if (key === "50" && prefix === "gray") return "normal";
    if (key === "60" && keyColors.includes(prefix)) return "hover";
    if (key === "70" && keyColors.includes(prefix)) return "active";
    if (key === "80" && prefix === "gray") return "font gray";
    if (key === "90" && prefix === "gray") return "secondary";
    return "";
  };

  return (
    <div className="rounded-md border border-border overflow-x-auto mb-12">
      <div className="min-w-max">
      <div className="grid border-b border-border bg-ac-gray-10" style={gridStyle}>
        <div className={headerClass}>Name</div>
        {entries.map(([key]) => (
          <div key={key} className={cellClass}>
            {prefix === "black-white" ? `ac-${key}` : `ac-${prefix}-${key}`}
          </div>
        ))}
      </div>
      <div className="grid border-b border-border" style={gridStyle}>
        <div className={headerClass}>View</div>
        {entries.map(([key, hex]) => (
          <div key={key} className="h-14" style={{ backgroundColor: hex }} />
        ))}
      </div>
      <div className="grid border-b border-border" style={gridStyle}>
        <div className={headerClass}>Hex</div>
        {entries.map(([key, hex]) => (
          <div key={key} className={cellClass}>{hex.toUpperCase()}</div>
        ))}
      </div>
      <div className="grid" style={gridStyle}>
        <div className={headerClass}>Use</div>
        {entries.map(([key]) => (
          <div key={key} className="px-2 py-3 text-xs text-blue-600 font-medium border-r border-border last:border-r-0">
            {getUseLabel(key)}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default function ColorPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-8">
        
        {/* 헤더 섹션 */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Color</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            디자인시스템에서 사용되는 컬러는 정보 전달과 브랜드 정체성을 구축하는 요소입니다. 
            지속적인 동일 색상의 사용은 브랜드 아이덴티티에 중요한 역할을 하므로 반드시 색상 활용 기준을 준수해야 합니다.
          </p>
        </header>

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList className="border-b border-border">
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          <TabContent value="docs" className="pt-10">
            
            {/* 1. Primary Color */}
            <section id="primary-color" className="scroll-mt-10 mb-20">
                <h2 className="text-xl text-foreground font-bold mb-1">사용 가이드</h2>
                <ul className="text-sm text-foreground space-y-1 list-disc list-inside mb-8">
                <li>Color는 명확한 커뮤니케이션을 위해 Hex 또는 RGB Code보다는 컬러명을 사용합니다.</li>
                <li>색상 사용을 제한함으로써 사용자 경험에 통일성과 일관성을 고려하고자 합니다. 정의되지 않은 새로운 컬러는 재사용성이 높을 경우에만 담당자와 논의하여 컬러파레트에 추가하여 관리합니다.</li>
                </ul>
                <h2 className="text-xl font-bold text-foreground mb-1">Primary Color</h2>
                <p className="text-sm text-foreground mb-6">Primary Color는 버튼, 활성 상태와 같은 UI 전체의 주요 구성 요소에 사용됩니다.</p>
                <ColorTable prefix="primary" colorTokens={colors.primary} />
            </section>

            {/* 2. Semantic Color */}
            <section id="semantic-color" className="scroll-mt-10 mb-20">
              <h2 className="text-xl font-bold text-foreground mb-1">Semantic Color</h2>
              <p className="text-sm text-foreground mb-4 leading-relaxed max-w-4xl">
                Semantic Color는 UI요소들의 기능 또는 정보 유형에 따라 의미를 강조하여 전달하는 등의 목적으로 보조적으로 사용하는 컬러입니다.<br />
                사용되는 목적과 UI에 적용되는 상황에 따라 일관된 색상 사용은 인지 부하를 낮게 유지하고 통합된 사용자 경험을 제공합니다.<br />
                UI에 적용되는 상황에 맞는 의미를 담은 명칭으로 관리하며, 여러 상황에 대해서는 컬러 팔레트와 함께 사용합니다.
              </p>
              
              <div className="grid grid-cols-5 mb-12 border border-border rounded-sm overflow-hidden text-white text-center">
                <div style={{ backgroundColor: colors.green[50] }} className="h-20 flex flex-col justify-center font-bold text-xs">Complete</div>
                <div style={{ backgroundColor: colors.blue[50] }} className="h-20 flex flex-col justify-center font-bold text-xs">Success</div>
                <div style={{ backgroundColor: colors.red[50] }} className="h-20 flex flex-col justify-center font-bold text-xs">Danger</div>
                <div style={{ backgroundColor: colors.orange[50] }} className="h-20 flex flex-col justify-center font-bold text-xs">Warning</div>
                <div style={{ backgroundColor: colors.purple[50] }} className="h-20 flex flex-col justify-center font-bold text-xs">Pending</div>
              </div>

              <div className="space-y-16">
                <div><h3 className="text-sm font-bold text-foreground mb-3">Green : Complete</h3><ColorTable prefix="green" colorTokens={colors.green} /></div>
                <div><h3 className="text-sm font-bold text-foreground mb-3">Blue : Success</h3><ColorTable prefix="blue" colorTokens={colors.blue} /></div>
                <div><h3 className="text-sm font-bold text-foreground mb-3">Red : Danger</h3><ColorTable prefix="red" colorTokens={colors.red} /></div>
                <div><h3 className="text-sm font-bold text-foreground mb-3">Orange : Warning</h3><ColorTable prefix="orange" colorTokens={colors.orange} /></div>
                <div><h3 className="text-sm font-bold text-foreground mb-3">Purple : Pending</h3><ColorTable prefix="purple" colorTokens={colors.purple} /></div>
              </div>
            </section>

            {/* 3. Gray Color */}
            <section id="gray-color" className="scroll-mt-10 mb-20">
              <h2 className="text-xl font-bold text-foreground mb-1">Gray Color</h2>
              <p className="text-sm text-foreground mb-6 leading-relaxed">무채색 색상으로 Black에서부터 White까지 이루어지며 색상이 적용되는 UI의 특정 부분에 따라 구분하여 사용하는 컬러입니다.</p>
              
              <div className="space-y-16">
                {/* Black & White */}
                <div>
                  <h3 className="text-md font-bold text-foreground mb-3">Black & White</h3>
                  <ColorTable prefix="black-white" colorTokens={blackWhiteTokens} />
                </div>

                <div><h3 className="text-md font-bold text-foreground mb-3">Gray Scale</h3><ColorTable prefix="gray" colorTokens={colors.gray} /></div>
                <div><h3 className="text-md font-bold text-foreground mb-3">Blue-gray</h3><ColorTable prefix="blue-gray" colorTokens={colors["blue-gray"]} /></div>
              </div>
            </section>
          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-10 space-y-12">

            {/* 토큰 사용 방식 */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">토큰 사용 방식</h2>
              <p className="text-sm text-foreground mb-6">
                모든 컬러 토큰은 <CodeBadge>--ac-*</CodeBadge> CSS 변수로 정의되어 있으며,
                <CodeBadge>Tailwind 클래스</CodeBadge>와 <CodeBadge>var(--ac-*)</CodeBadge> 두 가지 방식으로 동일하게 사용할 수 있습니다.
              </p>
              <CodeBlock code={`{/* Tailwind 클래스 방식 — className에 사용 */}
<div className="bg-ac-blue-50 text-ac-white">파란 배경</div>

{/* CSS 변수 방식 — 인라인 스타일, 컴포넌트 props에 사용 */}
<div style={{ backgroundColor: "var(--ac-blue-50)", color: "var(--ac-white)" }}>파란 배경</div>

{/* 컴포넌트 props */}
<ProgressIndicator type="linear" value={60} color="var(--ac-primary-50)" />`} />
              <p className="text-sm text-foreground mt-4">
                두 방식 모두 동일한 값을 참조합니다.
                <CodeBadge>bg-ac-blue-50</CodeBadge>은 내부적으로 <CodeBadge>background-color: var(--color-ac-blue-50)</CodeBadge>를 생성하고,
                이는 다시 <CodeBadge>var(--ac-blue-50)</CodeBadge>로 연결됩니다.
              </p>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold mb-3">Background</h3>
                <CodeBlock code={`<div className="bg-ac-primary-50">브랜드 메인 배경</div>
<div className="bg-ac-green-10">성공 상태 소프트 배경</div>
<div className="bg-ac-gray-10">기본 레이아웃 서브 배경</div>`} />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-3">Text Color</h3>
                <CodeBlock code={`<h1 className="text-ac-black">기본 타이틀</h1>
<p className="text-ac-gray-80">보조 설명 텍스트</p>
<span className="text-ac-primary-50 font-bold">브랜드 강조 컬러</span>
<span className="text-ac-red-50">에러 안내 텍스트</span>`} />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-3">Interactive</h3>
                <CodeBlock code={`<button className="bg-ac-primary-50 hover:bg-ac-primary-60 active:bg-ac-primary-70 text-ac-white">
  확인 버튼
</button>`} />
              </div>
            </div>

            {/* 다크모드 토큰 사용법 */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">다크모드 토큰 사용법</h2>
              <p className="text-sm text-foreground mb-8">
                디자인 시스템의 색상 토큰은 CSS 변수 기반으로 정의되어 있습니다.
                Tailwind 클래스와 <CodeBadge>var()</CodeBadge> 두 가지 방식으로 사용할 수 있으며,
                두 방식 모두 다크모드 전환 시 토큰값이 자동으로 반영됩니다.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold mb-2">1. Tailwind 클래스 방식</h3>
                  <p className="text-sm text-foreground mb-3">
                    <CodeBadge>bg-ac-*</CodeBadge>, <CodeBadge>text-ac-*</CodeBadge> 등 Tailwind 유틸리티 클래스를 사용합니다.
                    내부적으로 CSS 변수를 참조하므로 다크모드에서 자동으로 전환됩니다.
                  </p>
                  <CodeBlock code={`{/* Gray 계열: 라이트/다크 모두 자동 전환 */}
<div className="bg-ac-gray-10 text-ac-gray-90">
  배경과 텍스트가 다크모드에서 자동 전환됩니다.
</div>

{/* Color -10 계열: 다크모드에서 어두운 배경으로 전환 */}
<div className="bg-ac-primary-10">
  primary-10은 다크모드에서 자동으로 어두운 배경색으로 바뀝니다.
</div>`} />
                </div>

                <div>
                  <h3 className="text-sm font-bold mb-2">2. CSS var() 방식</h3>
                  <p className="text-sm text-foreground mb-3">
                    인라인 스타일이나 컴포넌트 props에 색상 값을 직접 전달할 때 사용합니다.
                    다크모드 지원이 필요한 토큰은 <CodeBadge>var(--ac-gray-*)</CodeBadge>, <CodeBadge>var(--ac-primary-10)</CodeBadge> 등 <CodeBadge>--ac-*</CodeBadge> 형식을 사용합니다.
                  </p>
                  <CodeBlock code={`{/* Gray 계열 CSS 변수 */}
<div style={{ backgroundColor: "var(--ac-gray-20)", color: "var(--ac-gray-90)" }}>
  다크모드에서 자동 전환
</div>

{/* 컬러 -10 토큰 CSS 변수 */}
<div style={{ backgroundColor: "var(--ac-primary-10)" }}>
  다크모드에서 자동으로 어두운 배경
</div>

{/* 컴포넌트 props에 전달 */}
<ProgressIndicator
  type="linear"
  value={60}
  color="var(--ac-primary-50)"
  trackColor="var(--ac-gray-30)"
/>`} />
                </div>

                <div>
                  <h3 className="text-sm font-bold mb-2">3. Hex 고정 vs CSS 변수 비교</h3>
                  <p className="text-sm text-foreground mb-3">
                    Hex 코드는 라이트/다크 모드에 관계없이 고정 색상으로 렌더링됩니다.
                    다크모드 대응이 필요한 경우 반드시 CSS 변수 또는 Tailwind 토큰을 사용하세요.
                  </p>
                  <CodeBlock code={`{/* Hex 고정 — 다크모드 미대응 */}
<div style={{ backgroundColor: "#ECECEC" }}>
  라이트/다크 모드 모두 동일한 밝은 회색으로 표시됨
</div>

{/* CSS 변수 — 다크모드 자동 대응 */}
<div style={{ backgroundColor: "var(--ac-gray-30)" }}>
  다크모드에서는 어두운 회색으로 자동 전환됨
</div>

{/* Tailwind dark: 접두사 — 직접 지정 */}
<div className="bg-[#ECECEC] dark:bg-[#3D3D3D]">
  dark: 접두사로 다크모드 색상을 명시적으로 지정
</div>`} />
                </div>

                <div>
                  <h3 className="text-sm font-bold mb-2">다크모드 지원 토큰 목록</h3>
                  <p className="text-sm text-foreground mb-3">
                    아래 토큰들은 다크모드에서 자동으로 색상이 전환됩니다.
                  </p>
                  <div className="border border-border rounded-lg overflow-hidden text-sm">
                    <div className="grid grid-cols-3 bg-ac-gray-10 border-b border-border">
                      <div className="px-4 py-2 font-semibold text-foreground">토큰 계열</div>
                      <div className="px-4 py-2 font-semibold text-foreground">CSS 변수 형식</div>
                      <div className="px-4 py-2 font-semibold text-foreground">다크모드 지원</div>
                    </div>
                    {[
                      ["Gray Scale", "var(--ac-gray-*)", "전체 스케일 자동 전환"],
                      ["Color -10", "var(--ac-primary-10) 등", "다크모드에서 어두운 배경으로 전환"],
                      ["Semantic Color (20~90)", "var(--ac-primary-50) 등", "고정값 (라이트/다크 동일)"],
                      ["Blue-gray Scale", "var(--ac-blue-gray-*)", "고정값 (다크 오버라이드 없음)"],
                    ].map(([scale, format, support], i) => (
                      <div key={i} className="grid grid-cols-3 border-b border-border last:border-b-0">
                        <div className="px-4 py-2 text-foreground">{scale}</div>
                        <div className="px-4 py-2 font-mono text-xs text-foreground">{format}</div>
                        <div className="px-4 py-2 text-foreground">{support}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabContent>
        </Tabs>
      </div>
      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}