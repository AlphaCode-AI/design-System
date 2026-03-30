"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselCounter,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",    label: "Anatomy" },
  { id: "list-items", label: "List Items" },
  { id: "type",       label: "Type" },
  { id: "multi",      label: "Multi Carousel" },
  { id: "usage",      label: "사용 가이드" },
];

const SLIDES = [
  { label: "Slide 1" },
  { label: "Slide 2" },
  { label: "Slide 3" },
  { label: "Slide 4" },
  { label: "Slide 5" },
];

function SlideBox({ label, height = "h-32", bg = "bg-ac-gray-30" }: { label: string; height?: string; bg?: string }) {
  return (
    <div className={`${bg} ${height} rounded-lg flex items-center justify-center`}>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}

export default function CarouselPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Carousel</h1>
          <p className="text-sm text-foreground leading-relaxed">
            하나의 콘텐츠 영역 내에 여러 개의 콘텐츠를 표시할 수 있는 컴포넌트입니다.
            탐색 버튼 클릭, 인디케이터 클릭, 드래그/스와이프(40px 이상)로 슬라이드를 전환할 수 있습니다.
          </p>
        </div>

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ══════════════════════════════════════
              DOCS
          ══════════════════════════════════════ */}
          <TabContent value="docs" className="mt-6 space-y-14">

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-1">Anatomy</h2>
              <p className="text-sm text-foreground mb-4">
                캐러셀은 컨테이너, 탐색 버튼, 항목 탐색 식별자, 현재 항목, 가려진 항목으로 구성됩니다.
              </p>
              <div className="rounded-lg p-12 flex items-center justify-center bg-ac-gray-20">
                <img src="/carousel/carousel_anatomy.png" alt="carousel anatomy img" />
              </div>
              <ul className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>컨테이너 : 캐러셀 항목과 관련 컨트롤이 시각적으로 표시되는 영역</li>
                <li>탐색 버튼 : 캐러셀 항목의 이전/다음 요소를 탐색하는데 사용되는 버튼</li>
                <li>
                  항목 탐색 식별자 : 캐러셀을 구성하고 있는 전체 항목 수와 활성화된 항목의 순서 정보 표시
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>현재 항목 : 컨테이너에서 현재 표시되고 있는 항목</li>
                    <li>가려진 항목 : 컨테이너에 표출되지 않는 가려진 항목</li>
                  </ol>
                </li>
                <li>현재 탐색 중인 화면</li>
              </ul>
            </section>

            {/* ── List Items ── */}
            <section id="list-items">
              <h2 className="text-lg font-semibold text-foreground mb-1">List Items</h2>
              <p className="text-sm text-foreground mb-4">
                항목 탐색 식별자는 전체 항목 수와 현재 활성화된 항목의 순서를 표시하며, 클릭으로 원하는 항목으로 직접 이동할 수 있습니다.
                <CodeBadge>CarouselDots</CodeBadge>와 <CodeBadge>CarouselCounter</CodeBadge> 두 가지 타입을 제공합니다.
              </p>
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="grid grid-cols-2 gap-6">

                  {/* Rounded */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium text-foreground">Rounded</p>
                    <Carousel loop className="w-full">
                      <CarouselContent>
                        {SLIDES.slice(0, 4).map((s, i) => (
                          <CarouselItem key={i}>
                            <SlideBox label={s.label} height="h-24" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselDots type="rounded" className="mt-3" />
                    </Carousel>
                    <p className="text-xs text-muted-foreground font-mono">{'<CarouselDots type="rounded" />'}</p>
                  </div>

                  {/* Line */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium text-foreground">Line</p>
                    <Carousel loop className="w-full">
                      <CarouselContent>
                        {SLIDES.slice(0, 4).map((s, i) => (
                          <CarouselItem key={i}>
                            <SlideBox label={s.label} height="h-24" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselDots type="line" className="mt-3" />
                    </Carousel>
                    <p className="text-xs text-muted-foreground font-mono">{'<CarouselDots type="line" />'}</p>
                  </div>

                  {/* Border */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium text-foreground">Round with Border</p>
                    <Carousel loop className="w-full">
                      <CarouselContent>
                        {SLIDES.slice(0, 4).map((s, i) => (
                          <CarouselItem key={i}>
                            <SlideBox label={s.label} height="h-24" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselDots type="border" className="mt-3" />
                    </Carousel>
                    <p className="text-xs text-muted-foreground font-mono">{'<CarouselDots type="border" />'}</p>
                  </div>

                  {/* Counter */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium text-foreground">Counter</p>
                    <Carousel loop className="w-full">
                      <CarouselContent>
                        {SLIDES.slice(0, 4).map((s, i) => (
                          <CarouselItem key={i}>
                            <SlideBox label={s.label} height="h-24" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <CarouselPrevious navStyle="text" />
                        <CarouselCounter />
                        <CarouselNext navStyle="text" />
                      </div>
                    </Carousel>
                    <p className="text-xs text-muted-foreground font-mono">CarouselCounter</p>
                  </div>

                </div>
              </div>
            </section>

            {/* ── Type ── */}
            <section id="type">
              <h2 className="text-lg font-semibold text-foreground mb-1">Type</h2>
              <p className="text-sm text-foreground mb-4">
                이전/다음 버튼 클릭으로 슬라이드를 이동합니다. 탐색 버튼의 배치 방식에 따라 4가지 타입으로 구분되며,
                <CodeBadge>CarouselPrevious</CodeBadge> / <CodeBadge>CarouselNext</CodeBadge>의{" "}
                <CodeBadge>navStyle</CodeBadge> prop으로 버튼 스타일을 지정합니다.
                <CodeBadge>orientation="vertical"</CodeBadge>을 사용하면 세로 방향으로도 구성할 수 있습니다.
              </p>
              <div className="flex flex-col gap-4">

                {/* Absolute Button */}
                <div className="border border-border rounded-lg p-6 bg-card flex flex-col gap-4">
                  <p className="text-xs font-semibold text-foreground">Absolute Button</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Horizontal</p>
                      <Carousel loop className="w-full">
                        <div className="relative">
                          <CarouselContent>
                            {SLIDES.slice(0, 3).map((s, i) => (
                              <CarouselItem key={i}>
                                <SlideBox label={s.label} />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious navStyle="default" className="absolute left-2 top-1/2 -translate-y-1/2" />
                          <CarouselNext navStyle="default" className="absolute right-2 top-1/2 -translate-y-1/2" />
                        </div>
                        <CarouselDots className="mt-3" />
                      </Carousel>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Vertical</p>
                      <Carousel loop orientation="vertical" className="w-full">
                        <div className="flex gap-3 items-stretch">
                          <CarouselDots className="justify-center" />
                          <div className="relative flex-1">
                            <CarouselContent className="h-32">
                              {SLIDES.slice(0, 3).map((s, i) => (
                                <CarouselItem key={i}>
                                  <SlideBox label={s.label} height="h-32" />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious navStyle="default" className="absolute top-2 left-1/2 -translate-x-1/2" />
                            <CarouselNext navStyle="default" className="absolute bottom-2 left-1/2 -translate-x-1/2" />
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">navStyle="default"</p>
                </div>

                {/* List with Button */}
                <div className="border border-border rounded-lg p-6 bg-card flex flex-col gap-4">
                  <p className="text-xs font-semibold text-foreground">List with Button</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Horizontal</p>
                      <Carousel loop className="w-full">
                        <CarouselContent>
                          {SLIDES.slice(0, 3).map((s, i) => (
                            <CarouselItem key={i}>
                              <SlideBox label={s.label} />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex items-center justify-center gap-3 mt-3">
                          <CarouselPrevious navStyle="text" />
                          <CarouselDots />
                          <CarouselNext navStyle="text" />
                        </div>
                      </Carousel>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Vertical</p>
                      <Carousel loop orientation="vertical" className="w-full">
                        <div className="flex gap-3 items-stretch">
                          <div className="flex flex-col items-center justify-between">
                            <CarouselPrevious navStyle="text" />
                            <CarouselDots />
                            <CarouselNext navStyle="text" />
                          </div>
                          <CarouselContent className="h-32 flex-1">
                            {SLIDES.slice(0, 3).map((s, i) => (
                              <CarouselItem key={i}>
                                <SlideBox label={s.label} height="h-32" />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">navStyle="text" + CarouselDots</p>
                </div>

                {/* Button Only */}
                <div className="border border-border rounded-lg p-6 bg-card flex flex-col gap-4">
                  <p className="text-xs font-semibold text-foreground">Button Only</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Horizontal</p>
                      <Carousel loop className="w-full">
                        <CarouselContent>
                          {SLIDES.slice(0, 3).map((s, i) => (
                            <CarouselItem key={i}>
                              <SlideBox label={s.label} />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex items-center justify-center gap-3 mt-3">
                          <CarouselPrevious navStyle="text" />
                          <CarouselNext navStyle="text" />
                        </div>
                      </Carousel>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Vertical</p>
                      <Carousel loop orientation="vertical" className="w-full">
                        <div className="flex gap-3 items-stretch">
                          <CarouselContent className="h-32 flex-1">
                            {SLIDES.slice(0, 3).map((s, i) => (
                              <CarouselItem key={i}>
                                <SlideBox label={s.label} height="h-32" />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <div className="flex flex-col items-center justify-center gap-2">
                            <CarouselPrevious navStyle="text" />
                            <CarouselNext navStyle="text" />
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">navStyle="text"</p>
                </div>

                {/* Text */}
                <div className="border border-border rounded-lg p-6 bg-card flex flex-col gap-4">
                  <p className="text-xs font-semibold text-foreground">Text</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Horizontal</p>
                      <Carousel loop className="w-full">
                        <CarouselContent>
                          {SLIDES.slice(0, 3).map((s, i) => (
                            <CarouselItem key={i}>
                              <SlideBox label={s.label} />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <CarouselPrevious navStyle="text" />
                          <CarouselCounter />
                          <CarouselNext navStyle="text" />
                        </div>
                      </Carousel>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground">Vertical</p>
                      <Carousel loop orientation="vertical" className="w-full">
                        <div className="flex gap-3 items-stretch">
                          <div className="flex flex-col items-center justify-between">
                            <CarouselPrevious navStyle="text" />
                            <CarouselCounter />
                            <CarouselNext navStyle="text" />
                          </div>
                          <CarouselContent className="h-32 flex-1">
                            {SLIDES.slice(0, 3).map((s, i) => (
                              <CarouselItem key={i}>
                                <SlideBox label={s.label} height="h-32" />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">CarouselCounter + navStyle="text"</p>
                </div>

              </div>
            </section>

            {/* ── Multi Carousel ── */}
            <section id="multi">
              <h2 className="text-lg font-semibold text-foreground mb-1">Multi Carousel</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>itemsPerView</CodeBadge> prop으로 한 번에 보이는 항목 수를 지정할 수 있습니다.
                인지 부하 증가 방지를 위해 최대 5개 이내로 사용하는 것을 권장합니다.
              </p>
              <div className="flex flex-col gap-4">

                {/* itemsPerView=2 */}
                <div className="border border-border rounded-lg p-6 bg-card flex flex-col gap-6">
                  <p className="text-xs font-semibold text-foreground">itemsPerView=2</p>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground">Horizontal</p>
                    <Carousel loop itemsPerView={2} className="w-full">
                      <CarouselContent>
                        {SLIDES.map((s, i) => (
                          <CarouselItem key={i} className="px-1">
                            <SlideBox label={s.label} height="h-24" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <CarouselPrevious navStyle="text" />
                        <CarouselDots />
                        <CarouselNext navStyle="text" />
                      </div>
                    </Carousel>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground">Vertical</p>
                    <Carousel loop orientation="vertical" itemsPerView={2} className="w-full">
                      <div className="flex gap-3 items-stretch">
                        <div className="flex flex-col items-center justify-between">
                          <CarouselPrevious navStyle="text" />
                          <CarouselDots />
                          <CarouselNext navStyle="text" />
                        </div>
                        <CarouselContent className="h-48 flex-1">
                          {SLIDES.map((s, i) => (
                            <CarouselItem key={i} className="py-1">
                              <SlideBox label={s.label} height="h-full" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </div>
                    </Carousel>
                  </div>
                </div>

                {/* itemsPerView=3 */}
                <div className="border border-border rounded-lg p-6 bg-card flex flex-col gap-6">
                  <p className="text-xs font-semibold text-foreground">itemsPerView=3</p>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground">Horizontal</p>
                    <Carousel loop itemsPerView={3} className="w-full">
                      <CarouselContent>
                        {SLIDES.map((s, i) => (
                          <CarouselItem key={i} className="px-1">
                            <SlideBox label={s.label} height="h-24" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <CarouselPrevious navStyle="text" />
                        <CarouselDots />
                        <CarouselNext navStyle="text" />
                      </div>
                    </Carousel>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground">Vertical</p>
                    <Carousel loop orientation="vertical" itemsPerView={3} className="w-full">
                      <div className="flex gap-3 items-stretch">
                        <div className="flex flex-col items-center justify-between">
                          <CarouselPrevious navStyle="text" />
                          <CarouselDots />
                          <CarouselNext navStyle="text" />
                        </div>
                        <CarouselContent className="h-56 flex-1">
                          {SLIDES.map((s, i) => (
                            <CarouselItem key={i} className="py-1">
                              <SlideBox label={s.label} height="h-full" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </div>
                    </Carousel>
                  </div>
                </div>

              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">사용 예시</h3>
                <p className="text-sm text-foreground mb-4">캐러셀 관련 컨트롤, 항목 탐색 식별자가 캐러셀 컨테이너와 중첩되지 않도록 합니다.</p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/carousel/usage_do.png" />
                  <UsageCard type="Don't" src="/carousel/usage_dont.png" />
                </div>
              </div>
            </section>

          </TabContent>

          {/* ══════════════════════════════════════
              CODE
          ══════════════════════════════════════ */}
          <TabContent value="code" className="mt-6 space-y-8">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Import</h2>
              <CodeBlock code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselCounter,
} from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`<Carousel loop>
  <CarouselContent>
    <CarouselItem>슬라이드 1</CarouselItem>
    <CarouselItem>슬라이드 2</CarouselItem>
    <CarouselItem>슬라이드 3</CarouselItem>
  </CarouselContent>
  <div className="flex items-center justify-center gap-3 mt-3">
    <CarouselPrevious navStyle="text" />
    <CarouselDots />
    <CarouselNext navStyle="text" />
  </div>
</Carousel>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Absolute Button</h2>
              <CodeBlock code={`<Carousel loop>
  <div className="relative">
    <CarouselContent>
      <CarouselItem>슬라이드 1</CarouselItem>
      <CarouselItem>슬라이드 2</CarouselItem>
    </CarouselContent>
    <CarouselPrevious
      navStyle="default"
      className="absolute left-2 top-1/2 -translate-y-1/2"
    />
    <CarouselNext
      navStyle="default"
      className="absolute right-2 top-1/2 -translate-y-1/2"
    />
  </div>
  <CarouselDots className="mt-3" />
</Carousel>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Counter (Text Type)</h2>
              <CodeBlock code={`<Carousel loop>
  <CarouselContent>
    <CarouselItem>슬라이드 1</CarouselItem>
    <CarouselItem>슬라이드 2</CarouselItem>
  </CarouselContent>
  <div className="flex items-center justify-center gap-2 mt-3">
    <CarouselPrevious navStyle="text" />
    <CarouselCounter />
    <CarouselNext navStyle="text" />
  </div>
</Carousel>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Vertical</h2>
              <CodeBlock code={`{/* Absolute Button — dots 왼쪽, 버튼 슬라이드 상/하 absolute */}
<Carousel loop orientation="vertical">
  <div className="flex gap-3 items-stretch">
    <CarouselDots className="justify-center" />
    <div className="relative flex-1">
      <CarouselContent className="h-40">
        <CarouselItem>슬라이드 1</CarouselItem>
        <CarouselItem>슬라이드 2</CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        navStyle="default"
        className="absolute top-2 left-1/2 -translate-x-1/2"
      />
      <CarouselNext
        navStyle="default"
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
      />
    </div>
  </div>
</Carousel>

{/* List with Button — 왼쪽 컬럼: 위버튼 → dots → 아래버튼 */}
<Carousel loop orientation="vertical">
  <div className="flex gap-3 items-stretch">
    <div className="flex flex-col items-center justify-between">
      <CarouselPrevious navStyle="text" />
      <CarouselDots />
      <CarouselNext navStyle="text" />
    </div>
    <CarouselContent className="h-40 flex-1">
      <CarouselItem>슬라이드 1</CarouselItem>
      <CarouselItem>슬라이드 2</CarouselItem>
    </CarouselContent>
  </div>
</Carousel>

{/* Button Only — 슬라이드 왼쪽, 버튼 오른쪽 컬럼 */}
<Carousel loop orientation="vertical">
  <div className="flex gap-3 items-stretch">
    <CarouselContent className="h-40 flex-1">
      <CarouselItem>슬라이드 1</CarouselItem>
      <CarouselItem>슬라이드 2</CarouselItem>
    </CarouselContent>
    <div className="flex flex-col items-center justify-center gap-2">
      <CarouselPrevious navStyle="text" />
      <CarouselNext navStyle="text" />
    </div>
  </div>
</Carousel>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Multi Carousel</h2>
              <CodeBlock code={`<Carousel loop itemsPerView={2}>
  <CarouselContent>
    <CarouselItem className="px-1">슬라이드 1</CarouselItem>
    <CarouselItem className="px-1">슬라이드 2</CarouselItem>
    <CarouselItem className="px-1">슬라이드 3</CarouselItem>
  </CarouselContent>
  <div className="flex items-center justify-center gap-3 mt-3">
    <CarouselPrevious navStyle="text" />
    <CarouselDots />
    <CarouselNext navStyle="text" />
  </div>
</Carousel>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">CarouselDots Color</h2>
              <CodeBlock code={`{/* 디자인 토큰명으로 지정 */}
<CarouselDots activeColor="ac-blue-50" />

{/* hex 코드로 지정 */}
<CarouselDots activeColor="#3B82F6" />

{/* CSS 변수로 직접 지정 */}
<CarouselDots activeColor="var(--ac-blue-50)" />`} />
            </section>

            {/* Carousel Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Carousel Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["orientation",   '"horizontal" | "vertical"', '"horizontal"', "슬라이드 방향"],
                  ["loop",          "boolean",                    "false",        "무한 루프 여부"],
                  ["itemsPerView",  "number",                     "1",            "한 번에 보이는 항목 수"],
                  ["defaultIndex",  "number",                     "0",            "초기 슬라이드 인덱스"],
                  ["index",         "number",                     "-",            "현재 인덱스 (controlled)"],
                  ["onIndexChange", "(index: number) => void",    "-",            "인덱스 변경 콜백"],
                ].map(([prop, type, def, desc], i, arr) => (
                  <React.Fragment key={i}>
                    <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50${i < arr.length - 1 ? " border-b border-border" : ""}`}>{prop}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{type}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{def}</div>
                    <div className={`px-3 py-2 text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{desc}</div>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* CarouselDots Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">CarouselDots Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["type",        '"rounded" | "line" | "border"', '"rounded"', "인디케이터 스타일"],
                  ["activeColor", "string",                        '"#FF6300"', "활성 인디케이터 색상. hex·rgb 또는 토큰명(예: ac-blue-50) 사용 가능"],
                ].map(([prop, type, def, desc], i, arr) => (
                  <React.Fragment key={i}>
                    <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50${i < arr.length - 1 ? " border-b border-border" : ""}`}>{prop}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{type}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{def}</div>
                    <div className={`px-3 py-2 text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{desc}</div>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* CarouselPrevious / CarouselNext Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">CarouselPrevious / CarouselNext Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["navStyle", '"default" | "line" | "border" | "text"', '"default"', "버튼 스타일"],
                ].map(([prop, type, def, desc], i, arr) => (
                  <React.Fragment key={i}>
                    <div className={`px-3 py-2 font-mono text-xs text-ac-primary-50${i < arr.length - 1 ? " border-b border-border" : ""}`}>{prop}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{type}</div>
                    <div className={`px-3 py-2 font-mono text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{def}</div>
                    <div className={`px-3 py-2 text-xs text-foreground${i < arr.length - 1 ? " border-b border-border" : ""}`}>{desc}</div>
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
