"use client";

import { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBadge from "@/app/components/CodeBadge";
import CodeBlock from "@/app/components/CodeBlock";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "variables", label: "Variables" },
];

/**
 * 정의된 모든 spacing 토큰
 */
const spacingList = [
  { key: "0",   px: "0",   rem: "0"    },
  { key: "0.5", px: "2",   rem: "0.125" },
  { key: "1",   px: "4",   rem: "0.25" },
  { key: "1.5", px: "6",   rem: "0.375" },
  { key: "2",   px: "8",   rem: "0.5"  },
  { key: "2.5", px: "10",  rem: "0.625" },
  { key: "3",   px: "12",  rem: "0.75" },
  { key: "3.5", px: "14",  rem: "0.875" },
  { key: "4",   px: "16",  rem: "1"    },
  { key: "5",   px: "20",  rem: "1.25" },
  { key: "6",   px: "24",  rem: "1.5"  },
  { key: "7",   px: "28",  rem: "1.75" },
  { key: "8",   px: "32",  rem: "2"    },
  { key: "9",   px: "36",  rem: "2.25" },
  { key: "10",  px: "40",  rem: "2.5"  },
  { key: "11",  px: "44",  rem: "2.75" },
  { key: "12",  px: "48",  rem: "3"    },
  { key: "14",  px: "56",  rem: "3.5"  },
  { key: "16",  px: "64",  rem: "4"    },
  { key: "20",  px: "80",  rem: "5"    },
  { key: "24",  px: "96",  rem: "6"    },
  { key: "28",  px: "112", rem: "7"    },
  { key: "32",  px: "128", rem: "8"    },
  { key: "36",  px: "144", rem: "9"    },
  { key: "40",  px: "160", rem: "10"   },
  { key: "44",  px: "176", rem: "11"   },
  { key: "48",  px: "192", rem: "12"   },
  { key: "52",  px: "208", rem: "13"   },
  { key: "56",  px: "224", rem: "14"   },
  { key: "60",  px: "240", rem: "15"   },
  { key: "64",  px: "256", rem: "16"   },
  { key: "72",  px: "288", rem: "18"   },
  { key: "80",  px: "320", rem: "20"   },
  { key: "96",  px: "384", rem: "24"   },
];

export default function SpacingPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Spacing</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            간격(Spacing)은 알파코드 서비스 전반에 걸쳐 일관성을 유지하고 사용자 경험을 향상시키기 위해 정의됩니다.<br />
            4단위 기반의 배수를 사용하여 설계 및 개발 과정에서 효율성을 높이고, 일관된 레이아웃을 통해 사용자에게 보다 직관적이고 편리한 인터페이스를 제공합니다.
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
              <p className="text-sm text-foreground mb-6 font-medium">
                4의 배수에 기반한 10개의 간격 규칙이 사용됩니다. 간격 규칙은 구성 요소 사이의 공간에 적용해야 합니다.
              </p>

              {/* 테이블 */}
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-ac-gray-10">
                      <th className="px-4 py-3 text-left font-bold text-foreground">Name</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">px</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground">rem</th>

                    </tr>
                  </thead>
                  <tbody>
                    {spacingList.map((s) => (
                      <tr
                        key={s.key}
                        className="border-b border-border last:border-0 hover:bg-ac-gray-10/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <CodeBadge>{s.key}</CodeBadge>
                        </td>
                        <td className="px-4 py-3 text-foreground font-semibold">{s.px}</td>
                        <td className="px-4 py-3 text-foreground font-semibold">{s.rem}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section id="usage-examples">
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              {/* 예시 1: padding */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Padding</h3>
                <p className="text-sm text-foreground mb-4">
                  컴포넌트 내부 여백에 사용합니다.
                </p>
                <CodeBlock code={`// p-{key} — 상하좌우 동일
<div className="p-4">padding: 16px</div>

// px-{key} py-{key} — 가로 / 세로 개별 지정
<button className="px-4 py-2">padding: 8px 16px</button>

// pt- pr- pb- pl- — 단방향 지정
<div className="pt-6 pb-4">padding-top: 24px, padding-bottom: 16px</div>`} />
              </div>

              {/* 예시 2: margin */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Margin</h3>
                <p className="text-sm text-foreground mb-4">
                  요소 외부 여백에 사용합니다.
                </p>
                <CodeBlock code={`// m-{key} — 상하좌우 동일
<div className="m-4">margin: 16px</div>

// mx-{key} my-{key} — 가로 / 세로 개별 지정
<div className="mx-6 my-4">margin: 16px 24px</div>

// mt- mr- mb- ml- — 단방향 지정
<div className="mt-9 mb-6">margin-top: 36px, margin-bottom: 24px</div>`} />
              </div>

              {/* 예시 3: gap */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Gap</h3>
                <p className="text-sm text-foreground mb-4">
                  flex, grid 레이아웃에서 요소 사이 간격에 사용합니다.
                </p>
                <CodeBlock code={`// gap-{key} — 행/열 동일
<div className="flex gap-4">
  <div>item 1</div>
  <div>item 2</div>
</div>

// gap-x-{key} gap-y-{key} — 가로 / 세로 개별 지정
<div className="grid grid-cols-3 gap-x-6 gap-y-4">
  <div>item 1</div>
  <div>item 2</div>
  <div>item 3</div>
</div>`} />
              </div>
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}