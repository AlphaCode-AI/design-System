"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  DatePicker,
  DateRangePicker,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",        label: "Anatomy" },
  { id: "state",          label: "State" },
  { id: "size",           label: "Size" },
  { id: "date-limit",     label: "Date Limit" },
  { id: "usage",          label: "사용 가이드" },
];

const COMPLETE_DATE = new Date("2024-12-31");
const COMPLETE_RANGE = { from: new Date("2024-12-31"), to: new Date("2025-01-05") };

// 2026년 대한민국 공휴일 (공공데이터 API 또는 라이브러리로 대체 가능)
const HOLIDAYS_2026: Date[] = [
  new Date("2026-01-01"), // 신정
  new Date("2026-02-16"), // 설날 연휴
  new Date("2026-02-17"), // 설날
  new Date("2026-02-18"), // 설날 연휴
  new Date("2026-03-01"), // 삼일절
  new Date("2026-03-02"), // 삼일절 대체공휴일
  new Date("2026-05-05"), // 어린이날
  new Date("2026-05-24"), // 부처님오신날
  new Date("2026-05-25"), // 부처님오신날 대체공휴일
  new Date("2026-06-06"), // 현충일
  new Date("2026-08-15"), // 광복절
  new Date("2026-09-23"), // 추석 연휴
  new Date("2026-09-24"), // 추석
  new Date("2026-09-25"), // 추석 연휴
  new Date("2026-10-03"), // 개천절
  new Date("2026-10-05"), // 개천절 대체공휴일
  new Date("2026-10-09"), // 한글날
  new Date("2026-12-25"), // 크리스마스
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
          <div className={cn("px-3 py-2 font-mono text-xs text-ac-primary-50", i < arr.length - 1 && "border-b border-border")}>{prop}</div>
          <div className={cn("px-3 py-2 font-mono text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{type}</div>
          <div className={cn("px-3 py-2 font-mono text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{def}</div>
          <div className={cn("px-3 py-2 text-xs text-foreground", i < arr.length - 1 && "border-b border-border")}>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function DatePickerPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Date Picker</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            날짜 선택(date picker)은 날짜와 관련된 정보와 기능을 제공하는데 사용됩니다.
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
              <div className="rounded-lg bg-ac-gray-20 p-8 flex items-center justify-center min-h-[160px]">
                <img src="/input/date-picker/datepicker_anatomy.png" alt="date picker anatomy" className="max-w-full" />
              </div>
              <ol className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                <li>날짜 입력
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>기본</li>
                    <li>기간 선택</li>
                  </ol>
                </li>
                <li>달력 헤더
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>이전/다음 버튼 : 달력의 연, 월을 앞뒤로 컨트롤하는 버튼, 달력 상태에 따라 버튼이 년도 단위 또는 월 단위로 움직일 수 있음</li>
                    <li>연도 버튼 : 현재의 연도를 표출하며, 클릭 시 연도 단위를 선택하는 컨텐츠로 변경</li>
                    <li>월 버튼 : 현재의 월을 표출하며, 클릭 시 월 단위를 선택하는 컨텐츠로 변경</li>
                  </ol>
                </li>
                <li>달력 컨테이너 : 해당하는 달력의 요소를 표출</li>
                <li>요일 : 한 주의 요일 정보로 시작 요일은 주사용자의 지역/언어에 따라 달라질 수 있음</li>
                <li>일자
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>기본 일자 : 가장 기본적인 상태의 일자, 클릭 시 선택됨</li>
                    <li>비활성화 일자 : 현재 월에 해당되지 않는 이전/다음 월의 일자</li>
                    <li>오늘 일자 : 현재 일자로 별도의 식별자와 함께 사용됨</li>
                    <li>선택된 일자 : 사용자가 선택한 일자</li>
                    <li>선택할 수 없는 일자 : 사용자가 선택할 수 없는 일자</li>
                  </ol>
                </li>
                <li>기간 선택
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>시작 일자 : 기간 선택 시 시작 일자</li>
                    <li>중간 일자 : 시작 일자와 종료 일자 사이의 일자</li>
                    <li>종료 일자 : 기간 선택 시 종료 일자</li>
                  </ol>
                </li>
                <li>연도 : 연도 버튼 클릭 시 표출
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>기본 연도 : 연도의 기본적인 상태, 클릭 시 선택됨</li>
                    <li>선택된 연도 : 사용자가 선택한 연도로 다른 상태의 연도와 구분하기 위한 별도의 식별자와 함께 사용됨</li>
                    <li>선택할 수 없는 연도 : 사용자가 선택할 수 없는 연도</li>
                  </ol>
                </li>
                <li>월 : 월 버튼 클릭 시 표출
                  <ol className="mt-1 ml-6 space-y-1 list-[lower-alpha] text-muted-foreground">
                    <li>기본 월 : 월의 기본적인 상태, 클릭 시 선택됨</li>
                    <li>선택된 월 : 사용자가 선택한 월로 다른 상태의 월과 구분하기 위한 별도의 식별자와 함께 사용됨</li>
                    <li>선택할 수 없는 월 : 사용자가 선택할 수 없는 월</li>
                  </ol>
                </li>
                <li>푸터 버튼 <span className="text-muted-foreground">(선택)</span> : 기간 선택과 같이 별도 버튼이 필요한 경우 사용</li>
              </ol>
            </section>

            {/* State */}
            <section id="state" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">State</h2>
              <p className="text-sm text-foreground mb-6">
                Calendar input 상태는 Default / Complete / Focus / Error / Disable 5가지로 사용합니다.<br />
                Focus 상태에는 달력 선택 컨텐츠가 표출되며 해당 상태는 Complete 상태를 사용하여 캘린더에서 선택된 값을 바로 표출해줍니다.
              </p>

              <div className="space-y-8">
                {/* 기본 */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">기본</h3>
                  <div className="rounded-lg bg-ac-gray-20 p-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col gap-3">
                        <DatePicker
                          label="날짜 선택"
                          placeholder="날짜를 선택해주세요"
                          helperText="현재일 기준 180일 이내 선택 가능합니다."
                          dateFormat="yyyy-MM-dd"
                        />
                        <span className="text-xs text-foreground text-center">Default</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <DatePicker
                          label="날짜 선택"
                          state="complete"
                          defaultValue={COMPLETE_DATE}
                          helperText="현재일 기준 180일 이내 선택 가능합니다."
                          dateFormat="yyyy-MM-dd"
                        />
                        <span className="text-xs text-foreground text-center">Complete</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <DatePicker
                          label="날짜 선택"
                          state="error"
                          defaultValue={COMPLETE_DATE}
                          errorMessage="현재일 기준 180일 이내 선택 가능합니다."
                          dateFormat="yyyy-MM-dd"
                        />
                        <span className="text-xs text-foreground text-center">Error</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <DatePicker
                          label="날짜 선택"
                          disabled
                          defaultValue={COMPLETE_DATE}
                          helperText="현재일 기준 180일 이내 선택 가능합니다."
                          dateFormat="yyyy-MM-dd"
                        />
                        <span className="text-xs text-foreground text-center">Disable</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 기간 선택 */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">기간 선택</h3>
                  <div className="rounded-lg bg-ac-gray-20 p-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col gap-3">
                        <DateRangePicker
                          twoMonths
                          label="날짜 선택"
                          helperText="최대 선택 가능 기간은 180일입니다."
                        />
                        <span className="text-xs text-foreground text-center">Default</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <DateRangePicker
                          label="날짜 선택"
                          state="complete"
                          defaultValue={COMPLETE_RANGE}
                          helperText="최대 선택 가능 기간은 180일입니다."
                        />
                        <span className="text-xs text-foreground text-center">Complete</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <DateRangePicker
                          label="날짜 선택"
                          state="error"
                          defaultValue={COMPLETE_RANGE}
                          errorMessage="최대 선택 가능 기간은 180일입니다."
                        />
                        <span className="text-xs text-foreground text-center">Error</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <DateRangePicker
                          label="날짜 선택"
                          disabled
                          defaultValue={COMPLETE_RANGE}
                          helperText="최대 선택 가능 기간은 180일입니다."
                        />
                        <span className="text-xs text-foreground text-center">Disable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-6">
                Calendar input size는 다른 input 타입과 동일하게 높이를 기준으로 3가지 sm / md / lg 사이즈를 사용합니다.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">기본</h3>
                  <div className="rounded-lg border border-border p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker size="lg" label="날짜 선택" placeholder="날짜를 선택해주세요" helperText="현재일 기준 180일 이내 선택 가능합니다." dateFormat="yyyy-MM-dd" />
                        <span className="text-xs text-foreground text-center">lg (40px)</span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker size="md" label="날짜 선택" placeholder="날짜를 선택해주세요" helperText="현재일 기준 180일 이내 선택 가능합니다." dateFormat="yyyy-MM-dd" />
                        <span className="text-xs text-foreground text-center">md (36px)</span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker size="sm" label="날짜 선택" placeholder="날짜를 선택해주세요" helperText="현재일 기준 180일 이내 선택 가능합니다." dateFormat="yyyy-MM-dd" />
                        <span className="text-xs text-foreground text-center">sm (30px)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">기간 선택</h3>
                  <div className="rounded-lg border border-border p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker size="lg" label="날짜 선택" helperText="최대 선택 가능 기간은 180일입니다." />
                        <span className="text-xs text-foreground text-center">lg (40px)</span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker size="md" label="날짜 선택" helperText="최대 선택 가능 기간은 180일입니다." />
                        <span className="text-xs text-foreground text-center">md (36px)</span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker size="sm" label="날짜 선택" helperText="최대 선택 가능 기간은 180일입니다." />
                        <span className="text-xs text-foreground text-center">sm (30px)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Date Limit */}
            <section id="date-limit" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Date Limit</h2>
              <p className="text-sm text-foreground mb-6">
                선택 가능한 날짜 범위를 제한합니다. <CodeBadge>offsetMonths</CodeBadge>로 현재 날짜 기준 ±N개월을 지정하거나, <CodeBadge>minDate</CodeBadge> / <CodeBadge>maxDate</CodeBadge>로 날짜를 직접 지정할 수 있습니다. <CodeBadge>disabledDates</CodeBadge>로 특정 날짜(공휴일 등)를 개별 선택 불가 처리할 수 있습니다.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">offsetMonths (현재 기준 ±2개월)</h3>
                  <div className="rounded-lg border border-border p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker
                          label="날짜 선택"
                          placeholder="날짜를 선택해주세요"
                          dateFormat="yyyy-MM-dd"
                          offsetMonths={2}
                          helperText="현재 날짜 기준 앞뒤 2개월만 선택 가능합니다."
                        />
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker
                          label="날짜 선택"
                          offsetMonths={2}
                          helperText="현재 날짜 기준 앞뒤 2개월만 선택 가능합니다."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">minDate / maxDate (직접 지정)</h3>
                  <div className="rounded-lg border border-border p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker
                          label="날짜 선택"
                          placeholder="날짜를 선택해주세요"
                          dateFormat="yyyy-MM-dd"
                          minDate={new Date("2025-01-01")}
                          maxDate={new Date("2025-12-31")}
                          helperText="2025년 내 날짜만 선택 가능합니다."
                        />
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker
                          label="날짜 선택"
                          minDate={new Date("2025-01-01")}
                          maxDate={new Date("2025-12-31")}
                          helperText="2025년 내 날짜만 선택 가능합니다."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">disabledDates (특정 날짜 선택 불가)</h3>
                  <div className="rounded-lg border border-border p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker
                          label="날짜 선택"
                          placeholder="날짜를 선택해주세요"
                          dateFormat="yyyy-MM-dd"
                          disabledDates={HOLIDAYS_2026}
                          helperText="2026년 공휴일은 선택할 수 없습니다."
                        />
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker
                          label="날짜 선택"
                          disabledDates={HOLIDAYS_2026}
                          helperText="2026년 공휴일은 선택할 수 없습니다."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">weekendColor (주말 색상)</h3>
                  <div className="rounded-lg border border-border p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col gap-3 flex-1">
                        <DatePicker
                          label="날짜 선택"
                          placeholder="날짜를 선택해주세요"
                          dateFormat="yyyy-MM-dd"
                          weekendColor
                          helperText="일요일은 빨간색, 토요일은 파란색으로 표시됩니다."
                        />
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <DateRangePicker
                          label="날짜 선택"
                          weekendColor
                          helperText="일요일은 빨간색, 토요일은 파란색으로 표시됩니다."
                        />
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
                <h3 className="text-lg font-semibold text-foreground mb-2">주말 색상 설정</h3>
                <p className="text-sm text-foreground mb-6">
                일자 달력에서 주말을 표시하고 싶은 경우 Sementic color의 red-60 / blue-60 색상을 활용하여 표시합니다. 그 외에 다른 색상은 사용하지 않습니다. 휴일과 주말 색상이 겹칠 경우 휴일의 underline 스타일만 적용합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard
                    type="Do"
                    src="/input/date-picker/usage_holiday_do.png"
                  />
                  <UsageCard
                    type="Don't"
                    src="/input/date-picker/usage_holiday_dont.png"
                  />
                </div>
              </div>
            </section>

          </TabContent>

          {/* ── Code 탭 ── */}
          <TabContent value="code" className="pt-6 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. 기본 날짜 선택</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>DatePicker</CodeBadge>는 단일 날짜를 선택합니다.
                </p>
                <CodeBlock code={`import { DatePicker } from "@alphacode-ai/design-system";

// 기본
<DatePicker placeholder="날짜를 선택해주세요" />

// 라벨 + 헬퍼 텍스트
<DatePicker
  label="날짜 선택"
  placeholder="날짜를 선택해주세요"
  helperText="현재일 기준 180일 이내 선택 가능합니다."
/>

// 날짜 포맷 변경 (기본값: "yyyy년 MM월 dd일")
<DatePicker dateFormat="yyyy-MM-dd" />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 기간 선택</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>DateRangePicker</CodeBadge>는 시작일~종료일 범위를 선택합니다. 확인 버튼 클릭 시 값이 확정됩니다. <CodeBadge>twoMonths</CodeBadge> prop을 추가하면 달력 두 개를 나란히 표시합니다.
                </p>
                <CodeBlock code={`import { DateRangePicker } from "@alphacode-ai/design-system";

// 달력 1개 (기본)
<DateRangePicker
  label="날짜 선택"
  helperText="최대 선택 가능 기간은 180일입니다."
/>

// 달력 2개 나란히
<DateRangePicker
  twoMonths
  label="날짜 선택"
  helperText="최대 선택 가능 기간은 180일입니다."
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. 상태</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>state</CodeBadge> prop 또는 <CodeBadge>errorMessage</CodeBadge>로 상태를 지정합니다.
                </p>
                <CodeBlock code={`// DatePicker
<DatePicker state="complete" defaultValue={new Date("2024-12-31")} />
<DatePicker state="error" errorMessage="선택 가능한 날짜 범위를 초과했습니다." />
<DatePicker disabled />

// DateRangePicker
<DateRangePicker state="complete" defaultValue={{ from: new Date("2024-12-31"), to: new Date("2025-01-05") }} />
<DateRangePicker state="error" errorMessage="최대 선택 가능 기간은 180일입니다." />
<DateRangePicker disabled />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 날짜 범위 제한</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>offsetMonths</CodeBadge>로 현재 날짜 기준 ±N개월을 지정하거나, <CodeBadge>minDate</CodeBadge> / <CodeBadge>maxDate</CodeBadge>로 날짜를 직접 지정합니다. 범위 밖 날짜는 선택 불가로 처리되며 달력 네비게이션도 제한됩니다.
                </p>
                <CodeBlock code={`
// 단일 날짜 선택 — 현재 날짜 기준 앞뒤 2개월만 선택 가능
<DatePicker offsetMonths={2} />

// 기간 선택 — 현재 날짜 기준 앞뒤 2개월만 선택 가능
<DateRangePicker offsetMonths={2} />

// 단일 날짜 선택 — 직접 날짜 지정
<DatePicker
  minDate={new Date("2025-01-01")}
  maxDate={new Date("2025-12-31")}
/>

// 기간 선택 — 직접 날짜 지정
<DateRangePicker
  minDate={new Date("2025-01-01")}
  maxDate={new Date("2025-12-31")}
/>`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">5. 특정 날짜 선택 불가</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>disabledDates</CodeBadge>에 <CodeBadge>Date[]</CodeBadge>를 전달하면 해당 날짜들을 선택 불가 처리합니다. 공공데이터 API나 <CodeBadge>holidays-kr</CodeBadge> 같은 라이브러리로 공휴일 목록을 가져와 전달하면 됩니다.
                </p>
                <CodeBlock code={`// 공휴일 등 특정 날짜 선택 불가
const holidays = [
  new Date("2025-01-01"), // 신정
  new Date("2025-03-01"), // 삼일절
  // ... 공공데이터 API 또는 라이브러리로 대체 가능
];

// 단일 날짜 선택
<DatePicker disabledDates={holidays} />

// 기간 선택
<DateRangePicker disabledDates={holidays} />`} />
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">6. Controlled</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>value</CodeBadge>와 <CodeBadge>onChange</CodeBadge>로 외부에서 값을 제어합니다.
                </p>
                <CodeBlock code={`const [date, setDate] = useState<Date>();

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="날짜를 선택해주세요"
/>

// 기간 선택 Controlled
const [range, setRange] = useState<DateRange>();

<DateRangePicker
  value={range}
  onChange={setRange}
/>`} />
              </div>
            </section>

            {/* Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">DatePicker Props</h2>
              <PropsTable rows={[
                ["size",        '"sm" | "md" | "lg"',                               '"md"',                    "인풋 높이 크기 (30 / 36 / 40px)"],
                ["state",       '"default" | "complete" | "error" | "disable"',     '"default"',               "인풋 상태"],
                ["value",       "Date",                                              "-",                       "선택된 날짜 (controlled)"],
                ["defaultValue","Date",                                              "-",                       "초기 선택 날짜 (uncontrolled)"],
                ["onChange",    "(date?: Date) => void",                             "-",                       "날짜 변경 핸들러"],
                ["placeholder", "string",                                            '"날짜를 선택해주세요."', "미선택 시 표시 문구"],
                ["dateFormat",  "string",                                            '"yyyy년 MM월 dd일"',      "날짜 표시 포맷 (date-fns)"],
                ["label",       "string",                                            "-",                       "상단 라벨 텍스트"],
                ["helperText",  "string",                                            "-",                       "하단 도움말 텍스트"],
                ["errorMessage","string",                                            "-",                       "에러 메시지 (전달 시 자동으로 error 상태)"],
                ["disabled",      "boolean",                                           "false",                   "비활성 상태"],
                ["minDate",       "Date",                                              "-",                       "선택 가능한 최소 날짜"],
                ["maxDate",       "Date",                                              "-",                       "선택 가능한 최대 날짜"],
                ["offsetMonths",  "number",                                            "-",                       "현재 날짜 기준 ±N개월 제한 (minDate/maxDate 없을 때 적용)"],
                ["disabledDates", "Date[]",                                            "-",                       "선택 불가 날짜 목록 (공휴일 등)"],
                ["weekendColor",  "boolean",                                           "false",                   "주말 색상 표시 (일요일: 빨간색, 토요일: 파란색)"],
              ]} />

              <h2 className="text-xl font-bold text-foreground mt-10 mb-4">DateRangePicker Props</h2>
              <PropsTable rows={[
                ["size",             '"sm" | "md" | "lg"',                           '"md"',       "인풋 높이 크기"],
                ["state",            '"default" | "complete" | "error" | "disable"', '"default"',  "인풋 상태"],
                ["value",            "DateRange",                                     "-",          "선택된 기간 (controlled)"],
                ["defaultValue",     "DateRange",                                     "-",          "초기 선택 기간 (uncontrolled)"],
                ["onChange",         "(range?: DateRange) => void",                   "-",          "기간 변경 핸들러 (확인 버튼 클릭 시 호출)"],
                ["startPlaceholder", "string",                                        '"시작일"',   "시작일 placeholder"],
                ["endPlaceholder",   "string",                                        '"종료일"',   "종료일 placeholder"],
                ["dateFormat",       "string",                                        '"yyyy-MM-dd"',"날짜 표시 포맷"],
                ["label",            "string",                                        "-",          "상단 라벨 텍스트"],
                ["helperText",       "string",                                        "-",          "하단 도움말 텍스트"],
                ["errorMessage",     "string",                                        "-",          "에러 메시지"],
                ["disabled",         "boolean",                                       "false",      "비활성 상태"],
                ["twoMonths",        "boolean",                                       "false",      "달력 두 개를 나란히 표시"],
                ["minDate",          "Date",                                          "-",          "선택 가능한 최소 날짜"],
                ["maxDate",          "Date",                                          "-",          "선택 가능한 최대 날짜"],
                ["offsetMonths",     "number",                                        "-",          "현재 날짜 기준 ±N개월 제한 (minDate/maxDate 없을 때 적용)"],
                ["disabledDates",    "Date[]",                                        "-",          "선택 불가 날짜 목록 (공휴일 등)"],
                ["weekendColor",     "boolean",                                       "false",      "주말 색상 표시 (일요일: 빨간색, 토요일: 파란색)"],
              ]} />
            </section>
          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
