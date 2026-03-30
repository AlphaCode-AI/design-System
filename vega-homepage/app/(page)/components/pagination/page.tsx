"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Pagination,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",    label: "Type" },
  { id: "anatomy", label: "Anatomy" },
  { id: "state",   label: "State" },
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
          <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{prop}</div>
          <div className={`px-3 py-2 font-mono text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{type}</div>
          <div className={`px-3 py-2 font-mono text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{def}</div>
          <div className={`px-3 py-2 text-xs text-foreground ${i < arr.length - 1 ? "border-b border-border" : ""}`}>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function PaginationPage() {
  const [activeTab, setActiveTab] = useState("docs");
  const [controlledPage, setControlledPage] = useState(1);

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Pagination</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            페이지네이션(Pagination)은 많은 양의 콘텐츠를 탐색하기 쉽도록 여러 화면에 나누고, 분할된 화면을 탐색하는 데 사용되는 요소입니다.
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
                페이지네이션은 <CodeBadge>simple</CodeBadge>과 <CodeBadge>default</CodeBadge> 두 가지 타입을 제공합니다.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Simple</h3>
                  <div className="rounded-lg border border-border p-8 flex items-center justify-center">
                    <Pagination type="simple" total={10} defaultPage={3} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">이전/다음 아이콘 버튼과 페이지 입력 필드로 구성됩니다. 좁은 공간이나 모바일 환경에 적합합니다.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Default</h3>
                  <div className="rounded-lg border border-border p-8 flex flex-col items-start gap-6">
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs text-muted-foreground">좁은 영역 (총 10페이지)</span>
                      <Pagination total={10} defaultPage={5} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs text-muted-foreground">넓은 영역 (총 120페이지, 말줄임표 포함)</span>
                      <Pagination total={120} defaultPage={5} />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">페이지 번호 목록을 표시합니다. 많은 페이지의 경우 말줄임표(…)로 생략합니다.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">PageSize / Jumper</h3>
                  <div className="rounded-lg border border-border p-8 flex flex-col items-start gap-6">
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs text-muted-foreground">PageSize</span>
                      <Pagination total={100} defaultPage={1} showPageSize />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs text-muted-foreground">PageSize + Jumper</span>
                      <Pagination total={100} defaultPage={1} showPageSize showJumper />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center min-h-[160px]">
                <img src="/pagination/pagination_anatomy.png" alt="pagination anatomy" className="max-w-full" />
              </div>
              <ul className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>이전/다음 버튼 : 목록을 앞/뒤로 탐색하는 버튼</li>
                <li>화면 목록 : 각 숫자 클릭 시 해당 화면으로 이동
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>현재 사용자가 탐색하고 있는 화면 식별자 (Active)</li>
                    <li>목록 hover 시 화면 식별자</li>
                    <li>각 목록 사이 생략된 숫자 표시 (…)</li>
                  </ol>
                </li>
              </ul>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                이전/다음 버튼과 페이지 번호 각각의 상태를 확인합니다.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">이전/다음 버튼</h3>
                  <div className="rounded-lg border border-border p-8 flex flex-col items-start gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">Default (중간 페이지)</span>
                      <Pagination total={10} defaultPage={5} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">이전 버튼 비활성 (첫 페이지)</span>
                      <Pagination total={10} defaultPage={1} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">다음 버튼 비활성 (마지막 페이지)</span>
                      <Pagination total={10} defaultPage={10} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">Disable (전체 비활성)</span>
                      <Pagination total={10} defaultPage={5} disabled />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">목록 식별자</h3>
                  <div className="rounded-lg border border-border p-8 flex flex-col items-start gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">Active (현재 페이지 강조)</span>
                      <Pagination total={10} defaultPage={3} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">생략 식별자 포함 (많은 페이지)</span>
                      <Pagination total={50} defaultPage={6} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="grid grid-cols-2 gap-6">
                <UsageCard
                  type="Do"
                  src="/pagination/usage_pagination_do_1.png"
                  description="좁은 영역에서 페이지네이션을 적용할 때 화면 목록이 많은 경우, 버튼에 텍스트를 생략하고 말줄임표를 포함하여 5개 이내의 항목을 표시합니다."
                />
                <UsageCard
                  type="Do"
                  src="/pagination/usage_pagination_do_2.png"
                  description="넓은 영역에서 페이지네이션을 적용할 때 화면 목록이 많은 경우, 화면 목록에는 말줄임표를 포함하여 최대 10개 이내의 항목을 표시합니다."
                />
                <UsageCard
                  type="Do"
                  src="/pagination/usage_pagination_do_3.png"
                  description="하나의 화면 목록만 있을 경우 페이지네이션을 사용합니다."
                />
                <UsageCard
                  type="Do"
                  src="/pagination/usage_pagination_do_4.png"
                  description="많은 목록 이동 시 첫 페이지의 우측과 마지막 페이지의 좌측에 생략 식별자를 둡니다."
                />
                <UsageCard
                  type="Do"
                  src="/pagination/usage_pagination_do_5.png"
                  description="PageSize가 함께 쓰일 경우 페이지당 항목 수를 선택할 수 있습니다."
                />
                <UsageCard
                  type="Do"
                  src="/pagination/usage_pagination_do_6.png"
                  description="PageSize와 Jumper가 함께 쓰일 경우 특정 페이지로 빠르게 이동할 수 있습니다."
                />
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
                  <CodeBadge>total</CodeBadge>은 필수 prop입니다. 기본 타입은 <CodeBadge>default</CodeBadge>이며 페이지 번호 목록을 표시합니다.
                </p>
                <CodeBlock code={`import { Pagination } from "@alphacode-ai/design-system";

<Pagination total={10} />
<Pagination total={10} defaultPage={3} />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Simple 타입</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>type="simple"</CodeBadge>은 이전/다음 아이콘 버튼과 페이지 입력 필드로 구성됩니다. 좁은 공간에 적합합니다.
                </p>
                <CodeBlock code={`<Pagination type="simple" total={10} />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. PageSize / Jumper</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>showPageSize</CodeBadge>로 페이지당 항목 수 선택을, <CodeBadge>showJumper</CodeBadge>로 페이지 직접 이동 입력을 활성화합니다.
                </p>
                <CodeBlock code={`// PageSize 선택
<Pagination total={100} showPageSize />

// PageSize + Jumper
<Pagination total={100} showPageSize showJumper />

// 페이지 크기 옵션 커스터마이즈
<Pagination
  total={100}
  showPageSize
  pageSizeOptions={[5, 10, 25, 50]}
  defaultPageSize={5}
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Controlled</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>page</CodeBadge>와 <CodeBadge>onPageChange</CodeBadge>로 외부에서 페이지를 제어합니다.
                </p>
                <CodeBlock code={`const [page, setPage] = useState(1);

<Pagination
  total={20}
  page={page}
  onPageChange={setPage}
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 비활성 / 색상</h3>
                <CodeBlock code={`// 전체 비활성
<Pagination total={10} disabled />

// 활성 페이지 색상 변경
<Pagination total={10} activeColorClass="bg-ac-blue-50" />`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Props</h2>
              <PropsTable rows={[
                ["total",           "number",                    "-",                   "전체 페이지 수 (필수)"],
                ["page",            "number",                    "-",                   "현재 페이지 (controlled)"],
                ["defaultPage",     "number",                    "1",                   "초기 페이지 (uncontrolled)"],
                ["onPageChange",    "(page: number) => void",    "-",                   "페이지 변경 핸들러"],
                ["type",            '"simple" | "default"',      '"default"',           "페이지네이션 타입"],
                ["disabled",        "boolean",                   "false",               "전체 비활성 상태"],
                ["activeColorClass", "string",                   '"bg-ac-primary-50"',  "활성 페이지 버튼 배경 색상 (Tailwind bg 클래스)"],
                ["showPageSize",    "boolean",                   "false",               "페이지당 항목 수 선택 표시"],
                ["pageSizeOptions", "number[]",                  "[10, 20, 40, 100]",   "페이지 크기 옵션 목록"],
                ["pageSize",        "number",                    "-",                   "현재 페이지 크기 (controlled)"],
                ["defaultPageSize", "number",                    "10",                  "초기 페이지 크기 (uncontrolled)"],
                ["onPageSizeChange","(size: number) => void",    "-",                   "페이지 크기 변경 핸들러"],
                ["showJumper",      "boolean",                   "false",               "특정 페이지로 직접 이동하는 입력 표시"],
              ]} />
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
