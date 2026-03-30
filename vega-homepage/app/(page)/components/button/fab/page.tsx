"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@alphacode-ai/design-system";
import {
  Plus, Star, Share2, ArrowRight, MessageCircle,
  Bot, Send, Heart, Pencil, Navigation, FAB,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",   label: "Anatomy" },
  { id: "component", label: "Component" },
  { id: "size",      label: "Size" },
  { id: "action",    label: "Action" },
  { id: "state",     label: "State" },
  { id: "alignment", label: "Alignment" },
  { id: "usage",     label: "사용 가이드" },
];

/* ── Action 데이터 ─────────────────────────────────────────── */
const fabActions = [
  { label: "Create",          icon: <Plus />,         extLabel: "추가" },
  { label: "Favorite",        icon: <Star />,         extLabel: "북마크" },
  { label: "Share",           icon: <Share2 />,       extLabel: "공유" },
  { label: "Start a process", icon: <ArrowRight />,   extLabel: "시작" },
  { label: "Chat",            icon: <MessageCircle />, extLabel: "문의" },
  { label: "Chatbot",         icon: <Bot />,          extLabel: "챗봇" },
  { label: "location",        icon: <Navigation />,   extLabel: "내 위치" },
  { label: "Send",            icon: <Send />,         extLabel: "전송" },
];

export default function FABPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">FAB (Floating Action Button)</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            FAB는 화면 계층 최상위에 고정되어 띠 있는 액션 버튼 컴포넌트입니다. 아이콘 전용(FAB)과 라벨이 포함된 확장형(Extended FAB) 두 가지 형태로 사용할 수 있습니다.
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
              <div className="rounded-lg  bg-ac-gray-20 p-12">
                <div className="grid grid-cols-2 gap-12">
                  {/* FAB */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-medium text-ac-gray-60 self-start">FAB</p>
                    <div className="relative flex items-center justify-center">
                      <img src="/button/fab/fab_anatomy.png" alt="FAB Anatomy img" />
                    </div>
                  </div>
                  {/* Extended FAB */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-medium text-ac-gray-60 self-start">Extended FAB</p>
                    <div className="relative flex items-center justify-center">
                        <img src="/button/fab/ex_fab_anatomy.png" alt="FAB Anatomy img" />
                    </div>
                  </div>
                </div>
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>컨테이너 : 컴포넌트를 감싸는 컨테이너 영역</li>
                <li>아이콘 : 버튼에 대한 정보 전달 아이콘</li>
                <li>레이블 (Extended FAB 전용)</li>
              </ol>
            </section>

            {/* Component */}
            <section id="component" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Component</h2>
              <p className="text-sm text-foreground mb-4">버튼은 중요도와 쓰임새에 따라 세부 스타일을 분류하여 사용합니다.</p>
              <div className="rounded-lg border border-border p-8">
                <div className="grid grid-cols-2 gap-12">
                  {/* FAB */}
                  <div>
                    <p className="text-xs font-medium text-ac-gray-60 mb-6">FAB</p>
                    <div className="grid grid-cols-3 gap-6">
                      {(["primary", "secondary", "tertiary"] as const).map((variant) => (
                        <div key={variant} className="flex flex-col items-center gap-3">
                          <div className="flex gap-2">
                            <FAB variant={variant} size="lg" tooltip="추가하기"><Plus /></FAB>
                            <FAB variant={variant} size="md" tooltip="추가하기"><Plus /></FAB>
                          </div>
                          <span className="text-xs text-ac-gray-60 capitalize">{variant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Extended FAB */}
                  <div>
                    <p className="text-xs font-medium text-ac-gray-60 mb-6">Extended FAB</p>
                    <div className="grid grid-cols-3 gap-6">
                      {(["primary", "secondary", "tertiary"] as const).map((variant) => (
                        <div key={variant} className="flex flex-col items-center gap-3">
                          <FAB variant={variant} size="lg" label="ADD"><Plus /></FAB>
                          <span className="text-xs text-ac-gray-60 capitalize">{variant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-4">
                FAB 사이즈는 높이 기준 md / lg 2가지로 구분됩니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="grid grid-cols-2 gap-12">
                  {/* FAB */}
                  <div className="space-y-6">
                    <p className="text-xs font-medium text-ac-gray-60">FAB</p>
                    {(["lg", "md"] as const).map((size) => (
                      <div key={size} className="flex items-center gap-6">
                        <span className="text-xs text-ac-gray-60 w-32 shrink-0">
                          {size} (height : {size === "lg" ? "48px" : "40px"})
                        </span>
                        <div className="flex gap-3">
                          {(["primary", "secondary", "tertiary"] as const).map((v) => (
                            <FAB key={v} variant={v} size={size} tooltip="추가하기"><Plus /></FAB>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Extended FAB */}
                  <div className="space-y-6">
                    <p className="text-xs font-medium text-ac-gray-60">Extended FAB</p>
                    {(["lg", "md"] as const).map((size) => (
                      <div key={size} className="flex items-center gap-6">
                        <span className="text-xs text-ac-gray-60 w-32 shrink-0">
                          {size} (height : {size === "lg" ? "48px" : "40px"})
                        </span>
                        <div className="flex gap-3">
                          {(["primary", "secondary", "tertiary"] as const).map((v) => (
                            <FAB key={v} variant={v} size={size} label="ADD"><Plus /></FAB>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Action */}
            <section id="action" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Action</h2>
              <p className="text-sm text-foreground mb-1">
                FAB는 현재 화면에서 작업을 트리거할 수 있고, 새 화면에 대한 작업을 수행할 수 있습니다. 다음과 같은 작업들에 FAB를 사용하도록 합니다.
              </p>
              <p className="text-sm text-foreground mb-6">
                FAB에 hover시 tooltip으로 해당하는 기능을 제공하여 사용자가 정확한 기능을 인지할 수 있도록 합니다.
              </p>

              <div className="rounded-lg border border-border p-8 space-y-8">
                {/* FAB Actions */}
                <div>
                  <p className="text-xs font-medium text-ac-gray-60 mb-4">FAB</p>
                  <div className="flex flex-wrap gap-6">
                    {fabActions.map(({ label, icon, extLabel }) => (
                      <div key={label} className="flex flex-col items-center gap-2">
                        <FAB variant="secondary" size="lg" tooltip={extLabel}>{icon}</FAB>
                        <span className="text-xs text-ac-gray-60">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Extended FAB Actions */}
                <div>
                  <p className="text-xs font-medium text-ac-gray-60 mb-4">Extended FAB</p>
                  <div className="flex flex-wrap gap-4">
                    {fabActions.map(({ label, icon, extLabel }) => (
                      <div key={label} className="flex flex-col items-center gap-2">
                        <FAB variant="secondary" size="lg" label={extLabel}>{icon}</FAB>
                        <span className="text-xs text-ac-gray-60">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-4">
                상태는 배경 색상 2가지로 구분됩니다. Default / Hover 로 구분되며 각 상태에 따라 적절히 사용됩니다.
                Semantic Color로 버튼을 생성할 경우, 상태에 따른 색상은 Foundation의 Color부분을 참고합니다.
              </p>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="text-left px-5 py-3 font-medium text-ac-gray-60 w-24">color</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground" colSpan={2}>Primary</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground" colSpan={2}>Secondary</th>
                      <th className="text-center px-4 py-3 font-medium text-foreground" colSpan={2}>Tertiary</th>
                    </tr>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="px-5 py-2" />
                      <th className="text-center px-3 py-2 text-xs font-normal text-ac-gray-60">FAB</th>
                      <th className="text-center px-3 py-2 text-xs font-normal text-ac-gray-60">Extended</th>
                      <th className="text-center px-3 py-2 text-xs font-normal text-ac-gray-60">FAB</th>
                      <th className="text-center px-3 py-2 text-xs font-normal text-ac-gray-60">Extended</th>
                      <th className="text-center px-3 py-2 text-xs font-normal text-ac-gray-60">FAB</th>
                      <th className="text-center px-3 py-2 text-xs font-normal text-ac-gray-60">Extended</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-5 py-5 text-ac-gray-60 font-medium">Default</td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="primary" size="md"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="primary" size="md" label="ADD"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="secondary" size="md"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="secondary" size="md" label="ADD"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="tertiary" size="md"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="tertiary" size="md" label="ADD"><Plus /></FAB></div></td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 text-ac-gray-60 font-medium">Hover</td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="primary" size="md" className="bg-ac-primary-60"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="primary" size="md" label="ADD" className="bg-ac-primary-60"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="secondary" size="md" className="bg-ac-gray-80"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="secondary" size="md" label="ADD" className="bg-ac-gray-80"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="tertiary" size="md" className="bg-ac-gray-30"><Plus /></FAB></div></td>
                      <td className="px-3 py-5 text-center"><div className="flex justify-center"><FAB variant="tertiary" size="md" label="ADD" className="bg-ac-gray-30"><Plus /></FAB></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Alignment */}
            <section id="alignment" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Alignment</h2>
              <p className="text-sm text-foreground mb-4">
                화면 상에 표출하는 예시 입니다. 모서리에서 간격은 24px을 기본으로 합니다. 경우에 따라 간격을 조정합니다.
              </p>

              {/* 기본 배치 예시 */}
              <p className="text-sm text-foreground mb-3">FAB</p>
              <div className="rounded-lg bg-ac-gray-20 mb-6" style={{ height: 100 }}>
                <div className="relative w-full h-full">
                  <div className="absolute bottom-6 left-6">
                    <FAB variant="secondary" size="lg" tooltip="Share"><Share2 /></FAB>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <FAB variant="primary" size="lg" tooltip="Like"><Heart /></FAB>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <FAB variant="tertiary" size="lg" tooltip="Send"><Send /></FAB>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground mb-3">ExpandFAB</p>
              <div className="rounded-lg bg-ac-gray-20 mb-6" style={{ height: 100 }}>
                <div className="relative w-full h-full">
                  <div className="absolute bottom-6 left-6">
                    <FAB variant="secondary" size="lg" label="Share"><Share2 /></FAB>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <FAB variant="primary" size="lg" label="Like"><Heart /></FAB>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <FAB variant="tertiary" size="lg" label="Send"><Send /></FAB>
                  </div>
                </div>
              </div>

              {/* expandOnHover 인터랙션 데모 */}
              <p className="text-sm text-foreground mb-3">
               ExpandOnHover: FAB에 마우스를 올리면 라벨이 펼쳐집니다. 배치 위치에 따라 펼침 방향을 선택하세요.
              </p>
              <div className="rounded-lg bg-ac-gray-20" style={{ height: 100 }}>
                <div className="relative w-full h-full">
                  <div className="absolute bottom-6 left-6">
                    <FAB variant="secondary" size="lg" label="Share" expandOnHover="right">
                      <Share2 />
                    </FAB>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <FAB variant="primary" size="lg" label="Like" expandOnHover="right">
                      <Heart />
                    </FAB>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <FAB variant="tertiary" size="lg" label="Send" expandOnHover="left">
                      <Send />
                    </FAB>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-ac-gray-60">
                좌측 배치 시 <CodeBadge>expandOnHover="right"</CodeBadge> / 우측 배치 시 <CodeBadge>expandOnHover="left"</CodeBadge> 사용을 권장합니다.
              </p>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              {/* Extended FAB 효과 사용 */}
              <div className="mb-10">
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/button/fab/usage_hover_do.png" description="FAB에 마우스 오버를 하면 Extended FAB 표출하여 사용 가능합니다." />
                  <UsageCard type="Don't" src="/button/fab/usage_icon_dont.png" description="FAB에 다음과 같은 기능을 사용하는데 유의하여 사용합니다. 해당 기능은 다른 컴포넌트를 이용하여 표출하도록 합니다." />
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
                <CodeBlock code={`import { FAB } from "@/app/components/FAB";`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. FAB (아이콘 전용)</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>label</CodeBadge> 없이 사용하면 아이콘 전용 FAB로 렌더링됩니다.
                </p>
                <CodeBlock code={`import { Plus } from "@alphacode-ai/design-system";

<FAB><Plus /></FAB>
<FAB variant="secondary"><Plus /></FAB>
<FAB variant="tertiary" size="md"><Plus /></FAB>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Extended FAB (라벨 포함)</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>label</CodeBadge> prop을 추가하면 Extended FAB로 렌더링됩니다.
                </p>
                <CodeBlock code={`<FAB label="추가하기"><Plus /></FAB>
<FAB variant="secondary" label="공유"><Share2 /></FAB>
<FAB variant="tertiary" size="md" label="저장"><Heart /></FAB>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 호버 시 라벨 펼침</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>expandOnHover</CodeBadge> prop으로 호버 시 라벨이 펼쳐지는 방향을 지정합니다.
                </p>
                <CodeBlock code={`// 우측으로 펼침
<FAB label="추가하기" expandOnHover="right">
  <Plus />
</FAB>

// 좌측으로 펼침 (화면 우하단 고정 시 권장)
<FAB label="추가하기" expandOnHover="left">
  <Plus />
</FAB>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 화면 고정</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>fixed</CodeBadge> prop을 사용하면 화면 우하단에 고정됩니다. <CodeBadge>position</CodeBadge>으로 위치를 커스텀할 수 있습니다.
                </p>
                <CodeBlock code={`// 기본 위치 (bottom-6 right-6)
<FAB fixed label="추가하기"><Plus /></FAB>

// 위치 커스텀
<FAB fixed position="bottom-10 right-10" label="추가하기">
  <Plus />
</FAB>`} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 색상 변경</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>colorClassName</CodeBadge> prop으로 variant 기본 색상을 override할 수 있습니다.
                </p>
                <CodeBlock code={`<FAB colorClassName="bg-blue-500 text-white hover:bg-blue-600">
  <Plus />
</FAB>

<FAB colorClassName="bg-ac-success-50 text-white hover:bg-ac-success-60" label="저장">
  <Heart />
</FAB>`} />
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
                  ["variant", '"primary" | "secondary" | "tertiary"', '"primary"', "FAB 스타일 변형"],
                  ["size", '"sm" | "md" | "lg"', '"lg"', "FAB 크기"],
                  ["label", "string", "-", "Extended FAB 텍스트 레이블. 지정 시 Extended FAB으로 렌더링됨"],
                  ["expandOnHover", '"left" | "right"', "-", "호버 시 라벨이 펼쳐지는 방향"],
                  ["tooltip", "string", "-", "아이콘 전용 FAB에 표시할 툴팁 텍스트"],
                  ["tooltipPlacement", '"top" | "bottom" | "left" | "right"', '"top"', "툴팁 표시 위치"],
                  ["fixed", "boolean", "false", "화면 우하단 고정 여부"],
                  ["position", "string", '"bottom-6 right-6"', "fixed 사용 시 커스텀 위치 클래스"],
                  ["colorClassName", "string", "-", "variant 기본 색상을 override하는 Tailwind 클래스"],
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