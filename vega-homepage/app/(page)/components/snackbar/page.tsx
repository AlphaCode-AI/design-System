"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Snackbar,
  SnackbarVariant,
  SnackbarProvider,
  useSnackbar,
  Button,
  Avatar,
} from "@alphacode-ai/design-system";
import { AlertCircle, CheckCircle2, XCircle, Info } from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "anatomy",   label: "Anatomy" },
  { id: "container", label: "Container" },
  { id: "size",      label: "Size" },
  { id: "items",     label: "Items" },
  { id: "usage",     label: "사용 가이드" },
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

/* ── 토스트 동작 시연용 내부 컴포넌트 ── */
const TOAST_ITEMS: { label: string; variant: SnackbarVariant; message: string; leftItem?: React.JSX.Element }[] = [
  { label: "Default", variant: "default", message: "시스템 업데이트가 완료되었습니다." },
  { label: "Error",   variant: "error",   message: "오류가 발생했습니다.",               leftItem: <XCircle className="w-5 h-5" /> },
  { label: "Success", variant: "success", message: "요청이 완료되었습니다.",              leftItem: <CheckCircle2 className="w-5 h-5" /> },
  { label: "Info",    variant: "info",    message: "확인이 필요한 정보입니다.",           leftItem: <Info className="w-5 h-5" /> },
  { label: "Warning", variant: "warning", message: "주의가 필요합니다.",                 leftItem: <AlertCircle className="w-5 h-5" /> },
];

function SnackbarDemo() {
  const { show, dismissAll } = useSnackbar();

  return (
    <div className="flex flex-wrap gap-2">
      {TOAST_ITEMS.map((item) => (
        <Button
          key={item.variant}
          size="sm"
          variant="tertiary"
          onClick={() => show({ message: item.message, variant: item.variant, leftItem: item.leftItem, rightItem: "close" })}
        >
          {item.label}
        </Button>
      ))}
      <Button size="sm" variant="tertiary" onClick={dismissAll}>
        모두 닫기
      </Button>
    </div>
  );
}

export default function SnackbarPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <SnackbarProvider position="bottom">
      <div className="flex w-full">
        <div className="flex-1 min-w-0 px-10 py-8">

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Snackbar</h1>
            <p className="mt-2 text-sm text-foreground leading-relaxed">
              스낵바(Snackbar)는 본문 외 정보 또는 주의, 강조형 정보로 필요 시 사용합니다. 모달에 비해 주의가 덜 필요한 피드백으로도 사용됩니다.
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
                  <img src="/snackbar/snackbar_anatomy.png" alt="snackbar anatomy" className="max-w-full" />
                </div>
                <ul className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                  <li>Left item (선택) : 아이콘, 아바타, 이미지 등</li>
                  <li>텍스트 레이블 : 스낵바에 표시할 메시지</li>
                  <li>Container : 스낵바의 배경 영역</li>
                  <li>Right item (선택) : 닫기 아이콘, 액션 아이콘, 텍스트 버튼 등</li>
                </ul>
              </section>

              {/* Container */}
              <section id="container" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Container</h2>
                <p className="text-sm text-foreground mb-6">
                  컨테이너는 보여지는 정보에 따라 색상을 변경하여 사용할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border p-8 flex flex-col items-center">
                  <div className="w-[480px] flex gap-4 flex-col">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground mb-1">Default</span>
                      <Snackbar variant="default" message="시스템 업데이트가 완료되어 정상적으로 서비스 이용 가능합니다." />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground mb-1">Error</span>
                      <Snackbar variant="error"   message="오류입니다. 주소를 수정하여 다시 등록 바랍니다." leftItem={<XCircle className="w-5 h-5" />} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground mb-1">Success</span>
                      <Snackbar variant="success" message="요청하신 사항이 적용 완료 되었습니다. 감사합니다." leftItem={<CheckCircle2 className="w-5 h-5" />} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground mb-1">Info</span>
                      <Snackbar variant="info"    message="확인이 필요한 정보가 있습니다." leftItem={<Info className="w-5 h-5" />} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground mb-1">Warning</span>
                      <Snackbar variant="warning" message="주의가 필요한 항목이 있습니다." leftItem={<AlertCircle className="w-5 h-5" />} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Size */}
              <section id="size" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
                <p className="text-sm text-foreground mb-6">
                  <CodeBadge>size</CodeBadge> prop으로 스낵바의 크기를 조절합니다. 기본값은 <CodeBadge>md</CodeBadge>입니다.
                </p>
                <div className="rounded-lg border border-border p-8 flex flex-row gap-4 items-end justify-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground mb-2">sm</span>
                    <Snackbar size="sm" variant="info" message="확인이 필요한 정보가 있습니다." leftItem={<Info className="w-5 h-5" />} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground mb-2">md (기본)</span>
                    <Snackbar size="md" variant="info" message="확인이 필요한 정보가 있습니다." leftItem={<Info className="w-5 h-5" />} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground mb-2">lg</span>
                    <Snackbar size="lg" variant="info" message="확인이 필요한 정보가 있습니다." leftItem={<Info className="w-5 h-5" />} />
                  </div>
                </div>
              </section>

              {/* Items */}
              <section id="items" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Items</h2>
                <p className="text-sm text-foreground mb-6">
                  왼쪽 아이템은 아이콘, 아바타 등을 사용할 수 있으며, 오른쪽 아이템은 아이콘 또는 버튼으로 사용합니다.
                </p>
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Left item</h3>
                    <div className="rounded-lg border border-border p-8 flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground mb-2">아이콘</span>
                        <Snackbar
                          variant="error"
                          message="200MB가 초과되어 등록할 수 없습니다."
                          leftItem={<XCircle className="w-5 h-5" />}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground mb-2">아바타</span>
                        <Snackbar
                          variant="success"
                          message="김영희님의 사용자 등록이 완료되었습니다."
                          leftItem={<Avatar size="sm" name="김영희" shape="circle" />}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground mb-2">없음</span>
                        <Snackbar
                          variant="default"
                          message="시스템 업데이트가 완료되어 정상적으로 서비스 이용 가능합니다."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Right item</h3>
                    <div className="rounded-lg border border-border p-8 flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground mb-2">이동 (chevron)</span>
                        <Snackbar variant="default" message="지금 바로 확인해보세요!" rightItem="chevron" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground mb-2">완료 (check)</span>
                        <Snackbar variant="success" message="완료 되었습니다." rightItem="check" leftItem={<CheckCircle2 className="w-5 h-5" />} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground mb-2">Button 컴포넌트</span>
                        <Snackbar
                          variant="warning"
                          message="등록하신 사용자 정보에 수정이 필요합니다."
                          rightItem={<Button size="xs" variant="link">수정하기</Button>}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Close</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    <CodeBadge>rightItem=&quot;close&quot;</CodeBadge>일 때 <CodeBadge>closeMode</CodeBadge>로 닫기 동작을 지정합니다.
                  </p>
                  <div className="rounded-lg border border-border p-8 flex flex-col items-center">
                    <div className="flex w-[480px] items-start flex-col gap-4 justify-center">
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-xs text-muted-foreground mb-2">dismiss — 스낵바 전체 사라짐 (기본값)</span>
                        <Snackbar
                          variant="warning"
                          message="시스템 업데이트가 완료되어 정상적으로 서비스 이용 가능합니다."
                          leftItem={<AlertCircle className="w-5 h-5" />}
                          rightItem="close"
                          closeMode="dismiss"
                          />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-xs text-muted-foreground mb-2">hide-right — 아이콘만 남기고 원형으로 축소, 클릭 시 다시 펼침</span>
                        <Snackbar
                          variant="info"
                          message="확인이 필요한 정보가 있습니다."
                          leftItem={<Info className="w-5 h-5" />}
                          rightItem="close"
                          closeMode="hide-right"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 사용 가이드 */}
              <section id="usage" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">중복 사용</h3>
                  <p className="text-sm text-foreground mb-4">
                  동시에 두개 이상의 스낵바를 사용하지 않습니다. 필요한 경우 첫번째 스낵바가 사라진 후 두번째 스낵바가 표출되게 사용합니다.
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    <UsageCard
                      type="Don't"
                      src="/snackbar/usage_2_dont.png"
                      className="h-80"
                    />
                  </div>
                </div>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">위치 선정</h3>
                  <p className="text-sm text-foreground mb-4">
                  스낵바의 위치가 중요한 정보를 가리지 않도록 주의합니다.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <UsageCard
                      type="Do"
                      src="/snackbar/usage_location_do.png"
                      className="h-80"
                    />
                    <UsageCard
                      type="Don't"
                      src="/snackbar/usage_location_dont.png"
                      className="h-80"
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
                  <h3 className="text-lg font-semibold text-foreground mb-2">1. 직접 렌더 (Snackbar)</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>Snackbar</CodeBadge> 컴포넌트를 직접 렌더링합니다. 토스트 큐 없이 인라인으로 표시할 때 사용합니다.
                  </p>
                  <CodeBlock code={`import { Snackbar } from "@alphacode-ai/design-system";

<Snackbar message="시스템 업데이트가 완료되었습니다." />
<Snackbar variant="error"   message="오류가 발생했습니다." />
<Snackbar variant="success" message="요청이 완료되었습니다." />
<Snackbar variant="info"    message="확인이 필요한 정보입니다." />
<Snackbar variant="warning" message="주의가 필요합니다." />`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">2. Left / Right item</h3>
                  <CodeBlock code={`import { Snackbar, Avatar, XCircle, CheckCircle2 } from "@alphacode-ai/design-system";

// 아이콘 (variant별 기본 색상 자동 적용)
<Snackbar
  variant="error"
  message="오류가 발생했습니다."
  leftItem={<XCircle className="w-5 h-5" />}
/>

// 아이콘 색상 override
<Snackbar
  variant="error"
  message="오류가 발생했습니다."
  leftItem={<XCircle className="w-5 h-5" />}
  iconColorClass="text-ac-primary-50"
/>

// 아바타
<Snackbar
  variant="success"
  message="김영희님의 사용자 등록이 완료되었습니다."
  leftItem={<Avatar size="sm" name="김영희" shape="circle" />}
/>

// 아이콘 + 닫기
<Snackbar
  variant="error"
  message="오류가 발생했습니다."
  leftItem={<XCircle className="w-5 h-5" />}
  rightItem="close"
  onClose={() => console.log("closed")}
/>

// chevron / check
<Snackbar variant="default" message="확인해보세요!" rightItem="chevron" />
<Snackbar variant="success" message="완료되었습니다." rightItem="check" />

// Button 컴포넌트를 rightItem에 직접 삽입
<Snackbar
  variant="warning"
  message="등록하신 사용자 정보에 수정이 필요합니다."
  rightItem={<Button size="xs" variant="link">수정하기</Button>}
/>`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">3. 색상 커스터마이징</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>bgColorClass</CodeBadge>, <CodeBadge>textColorClass</CodeBadge>, <CodeBadge>iconColorClass</CodeBadge>로 각각 배경·텍스트·아이콘 색상을 override합니다.
                  </p>
                  <CodeBlock code={`// 배경색 변경
<Snackbar message="커스텀 배경색" bgColorClass="bg-ac-purple-10" />

// 텍스트 색상 변경
<Snackbar message="커스텀 텍스트" textColorClass="text-ac-blue-70" />

// 아이콘 색상 변경 (variant 기본색 override)
<Snackbar
  variant="error"
  message="아이콘 색상 변경"
  leftItem={<XCircle className="w-5 h-5" />}
  iconColorClass="text-ac-primary-50"
/>

// 전체 커스터마이징
<Snackbar
  message="전체 커스텀"
  leftItem={<Info className="w-5 h-5" />}
  bgColorClass="bg-ac-purple-10"
  textColorClass="text-ac-purple-80"
  iconColorClass="text-ac-purple-50"
/>`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">4. SnackbarProvider + useSnackbar</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>SnackbarProvider</CodeBadge>를 루트에 감싸고 <CodeBadge>useSnackbar</CodeBadge>로 어디서든 스낵바를 호출합니다.
                  </p>
                  <CodeBlock code={`// 1. 루트에 Provider 추가
import { SnackbarProvider } from "@alphacode-ai/design-system";

export default function RootLayout({ children }) {
  return (
    <SnackbarProvider position="bottom" defaultDuration={4000}>
      {children}
    </SnackbarProvider>
  );
}

// 2. 어디서든 useSnackbar로 호출
import { useSnackbar } from "@alphacode-ai/design-system";

function MyComponent() {
  const { show, dismiss, dismissAll } = useSnackbar();

  return (
    <button onClick={() => show({ message: "저장되었습니다.", variant: "success" })}>
      저장
    </button>
  );
}`} />
                  <div className="mt-4 rounded-lg border border-border p-6">
                    <p className="text-xs text-muted-foreground mb-3">라이브 예시 — 버튼 클릭 시 스낵바 호출</p>
                    <SnackbarDemo />
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">5. dismiss / dismissAll</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>show()</CodeBadge>는 스낵바 id를 반환합니다. 이를 이용해 특정 스낵바를 수동으로 닫거나 전체를 닫을 수 있습니다.
                  </p>
                  <CodeBlock code={`import { useSnackbar } from "@alphacode-ai/design-system";

function MyComponent() {
  const { show, dismiss, dismissAll } = useSnackbar();

  const handleSave = async () => {
    const id = show({ message: "저장 중...", variant: "info", duration: 0 });
    await saveData();
    dismiss(id); // 저장 완료 후 수동으로 닫기
    show({ message: "저장되었습니다.", variant: "success" });
  };

  return (
    <>
      <button onClick={handleSave}>저장</button>
      <button onClick={dismissAll}>모두 닫기</button>
    </>
  );
}`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">6. duration 개별 지정</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>duration</CodeBadge>으로 스낵바마다 자동 닫힘 시간을 지정합니다. <CodeBadge>0</CodeBadge>이면 수동으로만 닫힙니다.
                  </p>
                  <CodeBlock code={`const { show } = useSnackbar();

// 2초 후 자동 닫힘 (Provider defaultDuration 무시)
show({ message: "잠깐 표시됩니다.", variant: "info", duration: 2000 });

// 수동으로만 닫힘 (duration: 0)
show({
  message: "직접 닫아야 합니다.",
  variant: "warning",
  duration: 0,
  rightItem: "close",
});`} />
                </div>

              </section>

              {/* Props */}
              <section className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">Snackbar Props</h2>
                  <PropsTable rows={[
                    ["message",     "React.ReactNode",                                    "-",         "표시할 메시지 (필수)"],
                    ["variant",     '"default" | "error" | "success" | "info" | "warning"', '"default"', "스낵바 색상 타입"],
                    ["size",        '"sm" | "md" | "lg"',                                 '"md"',      "스낵바 크기"],
                    ["leftItem",       "React.ReactNode",                                    "-",         "좌측 아이콘, 아바타 등"],
                    ["rightItem",      '"close" | "chevron" | "check" | React.ReactNode',    "-",         "우측 아이콘, Button 컴포넌트 등 ReactNode"],
                    ["bgColorClass",   "string",                                             "-",         "배경색 override — Tailwind bg 클래스 (예: \"bg-ac-purple-10\")"],
                    ["textColorClass", "string",                                             "-",         "텍스트 색상 override — Tailwind text 클래스 (예: \"text-ac-white\")"],
                    ["iconColorClass", "string",                                             "-",         "아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용"],
                    ["closeMode",      '"dismiss" | "hide-right"',                           '"dismiss"',  "close 버튼 동작: 전체 제거 또는 오른쪽 아이템만 제거"],
                    ["onClose",        "() => void",                                         "-",         "닫기 버튼 클릭 핸들러"],
                    ["onAction",       "() => void",                                         "-",         "chevron 클릭 핸들러"],
                  ]} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">SnackbarProvider Props</h2>
                  <PropsTable rows={[
                    ["position",        '"top" | "bottom"', '"bottom"', "스낵바 표시 위치"],
                    ["maxCount",        "number",           "3",        "동시에 표시할 최대 스낵바 수"],
                    ["defaultDuration", "number",           "4000",     "자동 닫힘 시간 (ms), 0이면 자동 닫힘 없음"],
                  ]} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">useSnackbar — show() 옵션</h2>
                  <PropsTable rows={[
                    ["message",     "React.ReactNode",                                    "-",         "표시할 메시지"],
                    ["variant",     '"default" | "error" | "success" | "info" | "warning"', '"default"', "스낵바 색상 타입"],
                    ["leftItem",       "React.ReactNode",                                    "-",         "좌측 아이콘, 아바타 등"],
                    ["rightItem",      '"close" | "chevron" | "check" | React.ReactNode',    "-",         "우측 아이콘, Button 컴포넌트 등 ReactNode"],
                    ["bgColorClass",   "string",                                             "-",         "배경색 override — Tailwind bg 클래스"],
                    ["textColorClass", "string",                                             "-",         "텍스트 색상 override — Tailwind text 클래스"],
                    ["iconColorClass", "string",                                             "-",         "아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용"],
                    ["onAction",       "() => void",                                         "-",         "chevron 클릭 핸들러"],
                    ["duration",       "number",                                             "-",         "이 스낵바의 자동 닫힘 시간 (ms), Provider defaultDuration 덮어씀"],
                  ]} />
                </div>
              </section>
            </TabContent>
          </Tabs>
        </div>

        {activeTab === "docs" && <TableOfContents items={toc} />}
      </div>
    </SnackbarProvider>
  );
}
