"use client";

import { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  ToastProvider,
  useToast,
  Button,
  type ToastItem,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

/* ── 상수 / 타입 ──────────────────────────────────────────────── */

const toc: TocItem[] = [
  { id: "anatomy",        label: "Anatomy" },
  { id: "type",           label: "Type" },
  { id: "alignment",      label: "Alignment" },
  { id: "too-many-toast", label: "Too many toast" },
  { id: "usage",          label: "사용 가이드" },
];

const POSITIONS = [
  "top-left",    "top-center",    "top-right",
  "bottom-left", "bottom-center", "bottom-right",
] as const;

type ShowArgs = Omit<ToastItem, "id">;

const TYPE_ITEMS: Array<{ label: string; desc: string; showArgs: ShowArgs }> = [
  {
    label: "Default",
    desc: "레이블 텍스트만 표시하는 기본 타입입니다.",
    showArgs: { title: "Event Created" },
  },
  {
    label: "Full",
    desc: "아이콘, 레이블, 설명글, 기능 버튼을 모두 포함하는 타입입니다.",
    showArgs: {
      style: "full",
      title: "New Notification",
      description: "You have a new message waiting for you.",
      actionLabel: "확인",
    },
  },
  {
    label: "File Uploading",
    desc: "파일 업로드 진행 상황을 표시하는 타입입니다.",
    showArgs: {
      style: "uploading",
      title: "Uploading 6 Files",
      timeLabel: "11:34 AM",
      progress: 29,
      progressLabel: "29% Complete",
    },
  },
  {
    label: "File Uploading (Success)",
    desc: "업로드 완료 상태를 표시하는 타입입니다.",
    showArgs: {
      style: "uploading-success",
      title: "File Upload Success!",
      description: "6 File Complete",
      actionLabel: "확인",
    },
  },
  {
    label: "Message",
    desc: "메시지 알림을 표시하는 타입입니다. 아바타와 타임스탬프가 포함됩니다.",
    showArgs: {
      style: "message",
      title: "김영희",
      description: "안녕하세요, 확인 부탁드립니다.",
      timestamp: "오전 11:34",
      avatarFallback: "김영희",
      actionLabel: "읽기",
    },
  },
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

/* ── 섹션 컴포넌트 ─────────────────────────────────────────────── */

// ToastProvider 내부에서 useToast를 호출해야 하므로 Provider와 Inner를 분리
function PositionBox({ position }: { position: typeof POSITIONS[number] }) {
  return (
    <ToastProvider position={position} defaultDuration={2000}>
      <PositionBoxInner position={position} />
    </ToastProvider>
  );
}

function PositionBoxInner({ position }: { position: typeof POSITIONS[number] }) {
  const { show } = useToast();
  return (
    <Button
      variant="tertiary"
      size="sm"
      className="w-full"
      onClick={() => show({ title: "Event Created", description: position })}
    >
      {position}
    </Button>
  );
}

function StackDemo({ stackMode }: { stackMode: "list" | "nesting" }) {
  return (
    <ToastProvider position="bottom-right" stackMode={stackMode} defaultDuration={6000}>
      <StackDemoInner />
    </ToastProvider>
  );
}

function StackDemoInner() {
  const { show, dismissAll } = useToast();
  return (
    <div className="flex gap-2 w-full">
      <Button size="sm" variant="secondary" className="flex-1" onClick={() => show({ title: "Event Created" })}>
        토스트 추가
      </Button>
      <Button size="sm" variant="tertiary" className="flex-1" onClick={dismissAll}>
        모두 닫기
      </Button>
    </div>
  );
}

function TypeSection() {
  const { show } = useToast();
  return (
    <div className="rounded-lg bg-ac-gray-20 p-8 grid grid-cols-3 gap-6">
      {TYPE_ITEMS.map((item) => (
        <div key={item.label} className="flex flex-col items-center justify-between gap-2">
          <span className="text-sm text-foreground font-medium">{item.label}</span>
          <p className="text-xs text-foreground">{item.desc}</p>
          <Button size="sm" variant="secondary" className="shrink-0 w-full" onClick={() => show(item.showArgs)}>
            {item.label}
          </Button>
        </div>
      ))}
    </div>
  );
}

/* ── 페이지 ───────────────────────────────────────────────────── */

const TOAST_STYLE_TYPE = '"default" | "full" | "uploading" | "uploading-success" | "message"';

const TOAST_PROPS_ROWS: string[][] = [
  ["style",          TOAST_STYLE_TYPE,  '"default"', "토스트 타입"],
  ["title",          "string",          "-",         "레이블 텍스트 (필수)"],
  ["description",    "string",          "-",         "설명글 (선택)"],
  ["actionLabel",    "string",          "-",         "기능 버튼 레이블"],
  ["onAction",       "() => void",      "-",         "기능 버튼 클릭 핸들러"],
  ["progress",       "number",          "0",         "uploading 타입 진행률 (0-100)"],
  ["progressLabel",  "string",          "-",         "uploading 타입 진행률 텍스트"],
  ["timeLabel",      "string",          "-",         "uploading 타입 소요 시간 텍스트"],
  ["avatarSrc",      "string",          "-",         "message 타입 아바타 이미지 URL"],
  ["avatarFallback", "string",          "-",         "message 타입 아바타 대체 텍스트 (이니셜)"],
  ["timestamp",      "string",          "-",         "message 타입 시간 텍스트"],
  ["onClose",        "() => void",      "-",         "닫기 버튼 클릭 핸들러. 전달 시 닫기 버튼 표시"],
  ["className",      "string",          "-",         "추가 클래스명"],
];

const PROVIDER_PROPS_ROWS: string[][] = [
  ["position",        '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', '"bottom-right"', "토스트 표시 위치"],
  ["maxCount",        "number", "5",    "동시에 표시할 최대 토스트 수. 초과 시 가장 오래된 토스트부터 제거"],
  ["defaultDuration", "number", "4000", "자동 닫힘 시간 (ms). 0이면 자동 닫힘 없음"],
  ["stackMode",       '"list" | "nesting"', '"list"', "토스트 쌓임 방식. nesting은 카드 스택처럼 겹쳐 표시"],
];

const SHOW_EXTRA_ROWS: string[][] = [
  ["duration", "number", "-", "이 토스트의 자동 닫힘 시간 (ms). Provider defaultDuration 덮어씀"],
];

export default function ToastPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <ToastProvider position="bottom-right">
      <div className="flex w-full">
        <div className="flex-1 min-w-0 px-10 py-8">

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Toast</h1>
            <p className="mt-2 text-sm text-foreground leading-relaxed">
              토스트(Toast)는 사용자 동작에 대한 간단한 피드백 또는 알림을 화면 위에 일시적으로 표시하는 컴포넌트입니다.
              모달과 달리 사용자의 작업 흐름을 방해하지 않으며 자동으로 사라집니다.
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
                  <img src="/toast/toast_anatomy.png" alt="toast anatomy" className="max-w-full" />
                </div>
                <ul className="mt-6 space-y-1 text-sm text-foreground list-decimal list-inside">
                  <li>Container : 토스트의 배경 영역</li>
                  <li>아이콘 (선택) : 타입에 따른 아이콘 또는 아바타</li>
                  <li>레이블 : 토스트에 표시할 핵심 메시지 (필수)</li>
                  <li>설명글 (선택) : 레이블을 보완하는 추가 설명</li>
                  <li>닫기 버튼 (선택) : 토스트를 수동으로 닫는 버튼</li>
                  <li>기능 버튼 (선택) : 액션을 수행하는 버튼</li>
                </ul>
              </section>

              {/* Type */}
              <section id="type" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Type</h2>
                <p className="text-sm text-foreground mb-6">
                  <CodeBadge>style</CodeBadge> prop으로 토스트의 타입을 지정합니다. 기본값은 <CodeBadge>default</CodeBadge>입니다.
                </p>
                <TypeSection />
              </section>

              {/* Alignment */}
              <section id="alignment" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Alignment</h2>
                <p className="text-sm text-foreground mb-6">
                  <CodeBadge>ToastProvider</CodeBadge>의 <CodeBadge>position</CodeBadge> prop으로 토스트가 표시될 화면 위치를 지정합니다.
                  화면 가장자리로부터 <CodeBadge>16px</CodeBadge> 간격을 유지합니다.
                </p>
                <div className="rounded-lg border border-border p-6">
                  <p className="text-xs text-muted-foreground mb-3">위치를 클릭하면 해당 위치에 토스트가 표시됩니다.</p>
                  <div className="grid grid-cols-3 gap-3 text-sm text-center">
                    {POSITIONS.map((pos) => (
                      <PositionBox key={pos} position={pos} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Too many toast */}
              <section id="too-many-toast" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Too many toast</h2>
                <p className="text-sm text-foreground mb-6">
                  여러 토스트가 동시에 표시될 때 <CodeBadge>stackMode</CodeBadge>로 표시 방식을 선택합니다.<br/>
                  최대 <CodeBadge>maxCount</CodeBadge>개(기본 5개)까지 표시되며, 초과 시 가장 오래된 토스트부터 사라집니다.
                </p>
                <div className="flex flex-row gap-4">
                  <div className="rounded-lg border border-border p-6 flex flex-col gap-3 flex-1 items-center">
                    <span className="text-sm font-semibold text-foreground">List</span>
                    <p className="text-xs text-foreground">토스트를 세로로 나열합니다. (기본값)</p>
                    <StackDemo stackMode="list" />
                  </div>
                  <div className="rounded-lg border border-border p-6 flex flex-col gap-3 flex-1 items-center">
                    <span className="text-sm font-semibold text-foreground">Nesting</span>
                    <p className="text-xs text-muted-foreground">토스트를 카드 스택처럼 겹쳐 표시합니다. 스택에 마우스를 올리면 전체 목록이 펼쳐집니다.</p>
                    <StackDemo stackMode="nesting" />
                  </div>
                </div>
              </section>

              {/* 사용 가이드 */}
              <section id="usage" className="scroll-mt-8">
                <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">List 타입 너비</h3>
                  <p className="text-sm text-foreground mb-4">
                    여러 개의 토스트가 리스트 타입으로 표출될 때 토스트의 너비를 통일해야 합니다.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <UsageCard type="Do"    src="/toast/usage_list_do.png"   className="h-64" />
                    <UsageCard type="Don't" src="/toast/usage_list_dont.png" className="h-64" />
                  </div>
                </div>
              </section>

            </TabContent>

            {/* ── Code 탭 ── */}
            <TabContent value="code" className="pt-6 space-y-12">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-6">Usage Examples</h2>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">1. 직접 렌더 (Toast)</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>Toast</CodeBadge> 컴포넌트를 직접 렌더링합니다. 인라인으로 표시할 때 사용합니다.
                  </p>
                  <CodeBlock code={`import { Toast } from "@alphacode-ai/design-system";

// Default
<Toast title="Event Created" onClose={() => {}} />

// Full
<Toast
  style="full"
  title="New Notification"
  description="You have a new message waiting for you."
  actionLabel="확인"
  onAction={() => console.log("action")}
  onClose={() => {}}
/>

// Uploading
<Toast
  style="uploading"
  title="Uploading 6 Files"
  timeLabel="11:34 AM"
  progress={29}
  progressLabel="29% Complete"
  onClose={() => {}}
/>

// Uploading Success
<Toast
  style="uploading-success"
  title="File Upload Success!"
  description="6 File Complete"
  actionLabel="확인"
  onAction={() => {}}
  onClose={() => {}}
/>

// Message
<Toast
  style="message"
  title="김영희"
  description="안녕하세요, 확인 부탁드립니다."
  timestamp="오전 11:34"
  avatarSrc="/avatar.jpg"
  avatarFallback="김영희"
  actionLabel="읽기"
  onAction={() => {}}
  onClose={() => {}}
/>`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">2. ToastProvider + useToast</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>ToastProvider</CodeBadge>를 루트에 감싸고 <CodeBadge>useToast</CodeBadge>로 어디서든 토스트를 호출합니다.
                  </p>
                  <CodeBlock code={`// 1. 루트에 Provider 추가
import { ToastProvider } from "@alphacode-ai/design-system";

export default function RootLayout({ children }) {
  return (
    <ToastProvider position="bottom-right" defaultDuration={4000}>
      {children}
    </ToastProvider>
  );
}

// 2. 어디서든 useToast로 호출
import { useToast } from "@alphacode-ai/design-system";

function MyComponent() {
  const { show, dismiss, dismissAll } = useToast();

  return (
    <button onClick={() => show({ title: "저장되었습니다." })}>
      저장
    </button>
  );
}`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">3. position 옵션</h3>
                  <CodeBlock code={`// top-left, top-center, top-right
// bottom-left, bottom-center, bottom-right (기본값)
<ToastProvider position="top-right">
  {children}
</ToastProvider>`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">4. dismiss — 특정 토스트 닫기</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>show()</CodeBadge>는 토스트 id를 반환합니다. 이 id를 <CodeBadge>dismiss(id)</CodeBadge>에 전달하면 해당 토스트를 프로그래밍 방식으로 닫을 수 있습니다.
                  </p>
                  <CodeBlock code={`const { show, dismiss, dismissAll } = useToast();

// show()가 반환하는 id로 특정 토스트 닫기
const id = show({
  title: "업로드 중...",
  style: "uploading",
  progress: 0,
  duration: 0, // 자동 닫힘 없음
});

// 업로드 완료 후 닫기
await uploadFile();
dismiss(id);

// 모든 토스트 한 번에 닫기
dismissAll();`} />
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">5. duration 개별 지정</h3>
                  <p className="text-sm text-foreground mb-4">
                    <CodeBadge>duration</CodeBadge>으로 토스트마다 자동 닫힘 시간을 지정합니다. <CodeBadge>0</CodeBadge>이면 수동으로만 닫힙니다.
                  </p>
                  <CodeBlock code={`const { show } = useToast();

// 2초 후 자동 닫힘
show({ title: "잠깐 표시됩니다.", duration: 2000 });

// 수동으로만 닫힘 (duration: 0)
show({
  title: "직접 닫아야 합니다.",
  style: "full",
  description: "닫기 버튼을 눌러 주세요.",
  duration: 0,
});`} />
                </div>
              </section>

              {/* Props */}
              <section className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">Toast Props</h2>
                  <PropsTable rows={TOAST_PROPS_ROWS} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">ToastProvider Props</h2>
                  <PropsTable rows={PROVIDER_PROPS_ROWS} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">useToast — show() 옵션</h2>
                  <p className="text-sm text-foreground mb-3">
                    Toast Props와 동일한 옵션을 받으며(<CodeBadge>onClose</CodeBadge>, <CodeBadge>className</CodeBadge> 제외),
                    아래 옵션이 추가됩니다.
                  </p>
                  <PropsTable rows={SHOW_EXTRA_ROWS} />
                </div>
              </section>
            </TabContent>
          </Tabs>
        </div>

        {activeTab === "docs" && <TableOfContents items={toc} />}
      </div>
    </ToastProvider>
  );
}
