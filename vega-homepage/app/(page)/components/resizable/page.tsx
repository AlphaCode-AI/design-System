"use client";

import { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@alphacode-ai/design-system";
import { UsageCard } from "@/app/components/UsageCard";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";

/* ── 상수 ─────────────────────────────────────────────────────── */

const toc: TocItem[] = [
  { id: "type",     label: "Type" },
  { id: "usage",    label: "사용 가이드" },
];

/* ── 공통 컴포넌트 ─────────────────────────────────────────────── */

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
        <div key={prop} className="contents">
          <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{prop}</div>
          <div className={`px-3 py-2 font-mono text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{type}</div>
          <div className={`px-3 py-2 font-mono text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{def}</div>
          <div className={`px-3 py-2 text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{desc}</div>
        </div>
      ))}
    </div>
  );
}

function DemoPanel({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-white text-sm text-ac-gray-60 ${className ?? ""}`}>
      {children}
    </div>
  );
}

/* ── 페이지 ───────────────────────────────────────────────────── */

const GROUP_PROPS: string[][] = [
  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "패널 크기 조절 방향"],
  ["defaultSizes", "number[]",                 "-",            "초기 패널 크기 배열 (%). 생략 시 균등 분할"],
  ["className",    "string",                   "-",            "추가 클래스명"],
];

const HANDLE_PROPS: string[][] = [
  ["variant",   '"margin" | "line"', '"margin"', "핸들 스타일. margin: 여백 구분 / line: 1px 선 구분"],
  ["className", "string",            "-",        "추가 클래스명"],
];

export default function ResizablePage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Resizable</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            크기 조절(resizable)은 콘텐츠를 감싸고 있는 컨테이너의 크기를 조절할 수 있는 기능입니다.
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
              <h2 className="text-xl font-bold text-foreground mb-2">Type</h2>
              <p className="text-sm text-foreground mb-6">
                <CodeBadge>orientation</CodeBadge>으로 크기 조절 방향을 지정합니다.
                핸들에 마우스를 올리면 방향에 맞는 커서로 변경됩니다.
              </p>

              <div className="space-y-8">
                {/* 여백 (Margin) */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">여백 (Margin)</h3>
                  <p className="text-xs text-ac-gray-60 mb-4">선 없이 여백으로 패널을 구분합니다.</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">가로형 (Horizontal) — cursor: col-resize</p>
                      <div className="rounded-lg bg-ac-gray-20 p-4 h-40">
                        <ResizablePanelGroup orientation="horizontal" className="rounded-xl overflow-hidden border border-border">
                          <ResizablePanel><DemoPanel>Panel A</DemoPanel></ResizablePanel>
                          <ResizableHandle variant="margin" />
                          <ResizablePanel><DemoPanel>Panel B</DemoPanel></ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">세로형 (Vertical) — cursor: row-resize</p>
                      <div className="rounded-lg bg-ac-gray-20 p-4 h-40">
                        <ResizablePanelGroup orientation="vertical" className="rounded-xl overflow-hidden border border-border">
                          <ResizablePanel><DemoPanel>Panel A</DemoPanel></ResizablePanel>
                          <ResizableHandle variant="margin" />
                          <ResizablePanel><DemoPanel>Panel B</DemoPanel></ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 선 (Line) */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">선 (Line)</h3>
                  <p className="text-xs text-ac-gray-60 mb-4">1px 구분선과 함께 핸들을 표시합니다.</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">가로형 (Horizontal) — cursor: col-resize</p>
                      <div className="rounded-lg bg-ac-gray-20 p-4 h-40">
                        <ResizablePanelGroup orientation="horizontal" className="rounded-xl overflow-hidden border border-border">
                          <ResizablePanel><DemoPanel>Panel A</DemoPanel></ResizablePanel>
                          <ResizableHandle variant="line" />
                          <ResizablePanel><DemoPanel>Panel B</DemoPanel></ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">세로형 (Vertical) — cursor: row-resize</p>
                      <div className="rounded-lg bg-ac-gray-20 p-4 h-40">
                        <ResizablePanelGroup orientation="vertical" className="rounded-xl overflow-hidden border border-border">
                          <ResizablePanel><DemoPanel>Panel A</DemoPanel></ResizablePanel>
                          <ResizableHandle variant="line" />
                          <ResizablePanel><DemoPanel>Panel B</DemoPanel></ResizablePanel>
                        </ResizablePanelGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">사용 관련</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <UsageCard type="Don't" src="/resizable/usage_narrow_dont.png" description="좁은 영역에서 크기 조절 기능을 사용하지 않습니다." />
                    <UsageCard type="Don't" src="/resizable/usage_mixed_dont.png" description="한 화면 내에서 가로형과 세로형을 중복하여 사용하지 않습니다." />
                  </div>
                </div>
              </section>
            

          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. 기본 (Horizontal)</h3>
                <CodeBlock code={`import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@alphacode-ai/design-system";

<ResizablePanelGroup orientation="horizontal" className="h-64">
  <ResizablePanel>
    <div>Left Panel</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
    <div>Right Panel</div>
  </ResizablePanel>
</ResizablePanelGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 세로형 (Vertical)</h3>
                <CodeBlock code={`<ResizablePanelGroup orientation="vertical" className="h-64">
  <ResizablePanel>Top</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Bottom</ResizablePanel>
</ResizablePanelGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 선 구분 핸들 (Line variant)</h3>
                <CodeBlock code={`<ResizablePanelGroup orientation="horizontal" className="h-64">
  <ResizablePanel>Left</ResizablePanel>
  <ResizableHandle variant="line" />
  <ResizablePanel>Right</ResizablePanel>
</ResizablePanelGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 초기 크기 지정 (defaultSizes)</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>defaultSizes</CodeBadge>로 각 패널의 초기 비율(%)을 지정합니다. 합산이 100이 되어야 합니다.
                </p>
                <CodeBlock code={`// 좌: 30%, 우: 70%
<ResizablePanelGroup
  orientation="horizontal"
  defaultSizes={[30, 70]}
  className="h-64"
>
  <ResizablePanel>Left (30%)</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Right (70%)</ResizablePanel>
</ResizablePanelGroup>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 3-panel 레이아웃</h3>
                <CodeBlock code={`<ResizablePanelGroup orientation="horizontal" className="h-64">
  <ResizablePanel>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Center</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Right</ResizablePanel>
</ResizablePanelGroup>`} />
              </div>
            </section>

            {/* Props */}
            <section className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">ResizablePanelGroup Props</h2>
                <PropsTable rows={GROUP_PROPS} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">ResizablePanel Props</h2>
                <p className="text-sm text-foreground mb-3">
                  <CodeBadge>div</CodeBadge>의 모든 HTML 속성을 그대로 전달받습니다.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">ResizableHandle Props</h2>
                <PropsTable rows={HANDLE_PROPS} />
              </div>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
