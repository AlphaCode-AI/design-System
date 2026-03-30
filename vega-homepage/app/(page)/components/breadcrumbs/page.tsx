"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Breadcrumbs,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "type",     label: "Type" },
  { id: "anatomy",  label: "Anatomy" },
  { id: "state",    label: "State" },
  { id: "icon",     label: "Icon" },
  { id: "usage",    label: "사용 가이드" },
];

export default function BreadcrumbsPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Breadcrumbs</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            브레드크럼(breadcrumbs)은 탐색 계층 구조를 표시하여 사용자가 현재 위치를 파악하고 계층 구조의 수준을 이동할 수 있게 해줍니다. 브레드크럼을 통해 사용자는 탐색 중인 화면의 상위 수준 화면으로 이동할 수 있습니다.
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
              <div className="rounded-lg border border-border p-8 flex flex-col gap-6">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Current page" },
                  ]}
                />
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Breadcrumb" },
                    { label: "Current page" },
                  ]}
                />
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Breadcrumb"},
                    { label: "Breadcrumb", href: "#" },
                    { label: "Current page" },
                  ]}
                />
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Breadcrumb"},
                    { label: "Breadcrumb", href: "#" },
                    { label: "Breadcrumb", href: "#" },
                    { label: "Current page" },
                  ]}
                />
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Breadcrumb", href: "#" },
                    { label: "Breadcrumb", href: "#" },
                    { label: "Breadcrumb", href: "#" },
                    { label: "Breadcrumb", href: "#" },
                    { label: "Breadcrumb", href: "#" },
                    { label: "Current page" },
                  ]}
                  maxItems={5}
                />
              </div>
            </section>

            {/* Anatomy */}
            <section id="anatomy" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Anatomy</h2>
              <div className="rounded-lg bg-ac-gray-20 p-8 flex justify-center">
                <img src="/breadcrumb/breadcrumb_anatomy.png" alt="Breadcrumb anatomy" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>홈 : 브레드크럼의 첫번째 항목으로 메인화면으로 이동하는 링크로 작동</li>
                <li>말줄임표 : 페이지 링크 표시 개수를 초과하거나 영역이 좁은 경우 축약된 경로가 있음을 안내하기 위해 제공. 홈 링크 다음 요소로 사용</li>
                <li>
                  상위 구조 : 탐색 중인 화면의 상위 수준의 정보 구조를 표시하는 텍스트로 연결 가능한 페이지가 존재하는 경우 유형 링크로 작동
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>연결 가능한 페이지가 없는 경우</li>
                    <li>연결 가능한 페이지가 있는 경우</li>
                  </ol>
                </li>
                <li>현재 탐색 중인 화면</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-4">브레드크럼 아이템의 각 상태를 나타냅니다.</p>
              <div className="rounded-lg border border-border p-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* 홈 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-foreground">홈</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Default</span>
                        <Breadcrumbs items={[{ label: "Home", href: "#" }]} />
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Hover</span>
                        <Breadcrumbs items={[{ label: "Home", href: "#" }]} className="[&_a]:underline" />
                      </div>
                    </div>
                  </div>

                  {/* 연결 가능한 페이지가 없는 경우 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-foreground">연결 가능한 페이지가 없는 경우</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Default</span>
                        <Breadcrumbs items={[{ label: "Breadcrumb" }]} showHomeIcon={false} />
                      </div>
                    </div>
                  </div>

                  {/* 연결 가능한 페이지가 있는 경우 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-foreground">연결 가능한 페이지가 있는 경우</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Default</span>
                        <Breadcrumbs items={[{ label: "Breadcrumb", href: "#" }]} showHomeIcon={false} />
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Hover</span>
                        <Breadcrumbs items={[{ label: "Breadcrumb", href: "#" }]} showHomeIcon={false} className="[&_a]:underline" />
                      </div>
                    </div>
                  </div>

                  {/* 현재 탐색 중인 화면 */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-foreground">현재 탐색 중인 화면</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Default</span>
                        <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Current page" }]} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Icon */}
            <section id="icon" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Icon</h2>
              <p className="text-sm text-foreground mb-4">
                브레드크럼 아이콘은 항상 일관된 위치에 제공됩니다. 아이콘 변경 가능하나 아래처럼 예시처럼 브레드크럼의 구조를 나타내기에 적절한 아이콘으로 변경합니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-6">
                  <Breadcrumbs
                    separator="slash"
                    items={[
                      { label: "Home", href: "#" },
                      { label: "Breadcrumb"},
                      { label: "Breadcrumb", href: "#" },
                      { label: "Current page" },
                    ]}
                  />
                </div>
                <div className="rounded-lg border border-border p-6">
                  <Breadcrumbs
                    separator="chevron"
                    items={[
                      { label: "Home", href: "#" },
                      { label: "Breadcrumb" },
                      { label: "Breadcrumb", href: "#" },
                      { label: "Current page" },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              {/* 영역 맞춤 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">영역 맞춤</h3>
                <p className="text-sm text-foreground mb-4">
                  화면 너비가 충분하지 않은 경우 화면 첫번째 경로와 마지막 경로만 표시하여 탐색 경로가 축약되어 있음을 사용자가 인지할 수 있도록 합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/breadcrumb/usage_fit_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/breadcrumb/usage_fit_dont.png"
                  />
                </div>
              </div>

              {/* 현재 화면 링크 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">현재 화면 링크</h3>
                <p className="text-sm text-foreground mb-4">
                  본문 상단에 명확한 본문 제목이 제공되고 있는 경우, 브레드크럼의 마지막 항목으로 현재 화면의 경로를 생략하고 상위 화면 경로를 제공할 수 있습니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/breadcrumb/usage_current_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/breadcrumb/usage_current_dont.png"
                  />
                </div>
              </div>

              {/* 경로 표출 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">경로 표출</h3>
                <p className="text-sm text-foreground mb-4">
                  작업 진행 상황을 보여주기 위해 브레드크럼을 사용하지 않습니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/breadcrumb/usage_path_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/breadcrumb/usage_path_dont.png"
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
                  <CodeBadge>items</CodeBadge> prop에 경로 배열을 전달합니다. 마지막 아이템이 현재 페이지로 표시됩니다.
                </p>
                <CodeBlock code={`import { Breadcrumbs } from "@alphacode-ai/design-system";

<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Breadcrumb", href: "/breadcrumb" },
    { label: "Current page" },
  ]}
/>`} />
              </div>

              {/* 구분자 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 구분자</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>separator</CodeBadge> prop으로 구분자를 변경합니다. 기본값은 slash(/)입니다.
                </p>
                <CodeBlock code={`// slash — "/" (기본값)
<Breadcrumbs separator="slash" items={[...]} />

// chevron — ">"
<Breadcrumbs separator="chevron" items={[...]} />`} />
              </div>

              {/* 경로 축약 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 경로 축약</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>maxItems</CodeBadge> prop으로 최대 표시 아이템 수를 지정합니다. 초과 시 중간 경로가 "..."으로 축약됩니다.
                </p>
                <CodeBlock code={`<Breadcrumbs
  maxItems={4}
  items={[
    { label: "Home", href: "/" },
    { label: "Depth 01", href: "/depth01" },
    { label: "Depth 02", href: "/depth02" },
    { label: "Depth 03", href: "/depth03" },
    { label: "Current page" },
  ]}
/>`} />
              </div>

              {/* 홈 아이콘 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 홈 아이콘</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>showHomeIcon</CodeBadge> prop으로 첫번째 항목의 홈 아이콘 표시 여부를 지정합니다. 기본값은 true입니다.
                </p>
                <CodeBlock code={`// 홈 아이콘 표시 (기본값)
<Breadcrumbs showHomeIcon={true} items={[...]} />

// 홈 아이콘 숨김
<Breadcrumbs showHomeIcon={false} items={[...]} />`} />
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
                  ["items", "{ label: string; href?: string }[]", "-", "브레드크럼 경로 배열. 마지막 아이템이 현재 페이지로 표시됨"],
                  ["separator", '"slash" | "chevron"', '"slash"', "경로 구분자 아이콘"],
                  ["maxItems", "number", "-", "최대 표시 아이템 수. 초과 시 중간 경로가 ...으로 축약됨"],
                  ["showHomeIcon", "boolean", "true", "첫번째 항목의 홈 아이콘 표시 여부"],
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