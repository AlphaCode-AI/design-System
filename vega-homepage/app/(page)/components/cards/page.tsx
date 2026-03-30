"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Button,
  Badge,
  Avatar,
  Card,
  CardMenu,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardFooterUser,
  CardFooterInfo,
  CardFooterButtons,
  MoreVertical,
  Heart,
  MessageCircle,
  Download,
  Calendar,
  User,
  ChevronRight,
  FileText,
  Bell,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

/* ─────────────────────────────────────────
   TOC
───────────────────────────────────────── */
const toc: TocItem[] = [
  { id: "style",    label: "Style" },
  { id: "anatomy",  label: "Anatomy" },
  { id: "variants", label: "Variants" },
  { id: "usage",    label: "사용 가이드" },
];

/* ─────────────────────────────────────────
   Shared helpers
───────────────────────────────────────── */
const SampleCard = ({
  variant,
  className,
}: {
  variant: "background" | "line" | "shadow";
  className?: string;
}) => (
  <Card variant={variant} shadowSize="md" interactive className={`w-full max-w-[240px] ${className ?? ""}`}>
    <CardMenu onClick={() => {}} />
    <CardContent>
      <CardTitle>Title text</CardTitle>
      <CardDescription>
        Lorem ipsum dolor sit amet consectetur. Sed arcu praesent at sed
        interdum. Adipiscing lectus nunc vel ut imperdiet.
      </CardDescription>
    </CardContent>
    <CardFooter className="justify-end">
      <Button variant="tertiary" size="sm">Tertiary</Button>
      <Button variant="secondary" size="sm">Secondary</Button>
    </CardFooter>
  </Card>
);

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function CardPage() {
  const [activeTab, setActiveTab] = useState("docs");

  const [cbChecked, setCbChecked] = useState(false);
  const [radioVal, setRadioVal]   = useState("a");
  const [switchOn, setSwitchOn]   = useState(false);

  return (
    <div className="flex w-full">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Cards</h1>
          <p className="text-sm text-foreground leading-relaxed">
            카드는 관련 콘텐츠를 하나의 컨테이너로 묶어 정보를 시각적으로 구조화합니다.
            이미지, 텍스트, 링크 등 다양한 유형의 미디어를 함께 표시할 수 있으며,
            Header / Content / Footer 세 영역을 독립적으로 조합해서 활용합니다.
          </p>
        </div>

        {/* Docs / Code Tabs */}
        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ══════════════════════════════════════
              DOCS
          ══════════════════════════════════════ */}
          <TabContent value="docs" className="mt-6 space-y-14">

            {/* ── Style ── */}
            <section id="style">
              <h2 className="text-lg font-semibold text-foreground mb-1">Style</h2>
              <p className="text-sm text-foreground mb-1">
                카드는 세 가지 스타일 변형을 제공합니다.{" "}
                <CodeBadge>variant</CodeBadge> prop으로 선택하며,
                각각 background, line(테두리), shadow(그림자)로 구분됩니다.
              </p>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>interactive</CodeBadge> prop을 추가하면 hover / active 인터랙션이 활성화됩니다. 이 prop이 없으면 hover 및 active 효과가 나타나지 않습니다.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["background", "line", "shadow"] as const).map((v) => (
                  <div key={v} className="flex flex-col items-center gap-3 p-8 bg-ac-gray-20 rounded-lg">
                    <p className="text-xs text-muted-foreground font-mono">{v}</p>
                    <SampleCard variant={v} className={v === "background" ? "bg-ac-gray-30" : ""} />
                  </div>
                ))}
              </div>
            </section>

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-1">Anatomy</h2>
              <p className="text-sm text-foreground mb-4">
                카드는 Header, Content, Footer 세 영역으로 구성되며, 세 영역 모두 선택 사항입니다.
                필요한 영역만 골라 자유롭게 조합해 활용할 수 있습니다. 다양한 조합 예시는 아래 <a href="#variants" className="text-ac-primary-50 underline underline-offset-2">Variants</a> 섹션을 참고하세요.
              </p>
              <div className="rounded-lg p-12 flex items-center justify-center bg-ac-gray-20">
                <img src="/card/card_anatomy.png" alt="card anatomy img" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>헤더 : 카드의 헤더 영역</li>
                <li>컨텐츠 : 카드의 콘텐츠 영역</li>
                <li>푸터 : 카드의 푸터 영역</li>
              </ol>
            </section>

            {/* ── Variants ── */}
            <section id="variants">
              <h2 className="text-lg font-semibold text-foreground mb-1">Variants</h2>
              <p className="text-sm text-foreground mb-4">
                Header / Content / Footer 각 영역과 control, divider 등의 prop을 조합해 다양한 카드 유형을 구성할 수 있습니다.
              </p>
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="grid grid-cols-3 gap-6">

                  {/* 1. 이미지 + info 푸터 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">이미지 + 정보 푸터</p>
                    <Card variant="line" className="w-full">
                      <CardHeader
                        imageSrc="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=200&fit=crop"
                        imageAlt="sample"
                      />
                      <CardContent>
                        <CardTitle>콘텐츠 제목</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <CardFooterInfo
                          items={[
                            { icon: <Heart className="h-3 w-3" />, label: "128" },
                            { icon: <MessageCircle className="h-3 w-3" />, label: "24" },
                            { icon: <Calendar className="h-3 w-3" />, label: "2024/02/20" },
                          ]}
                        />
                      </CardFooter>
                    </Card>
                  </div>

                  {/* 2. 이미지 + badge + user 푸터 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">이미지 + 뱃지 + 사용자 푸터</p>
                    <Card variant="line" className="w-full">
                      <CardHeader
                        imageSrc="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop"
                        imageAlt="sample"
                        badge={<Badge variant="primary">New</Badge>}
                      />
                      <CardContent>
                        <CardTitle>Title text</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                      </CardContent>
                      <CardFooter divider>
                        <CardFooterUser
                          avatar={{ src: "https://i.pravatar.cc/28", fallback: "UN", size: "lg" }}
                          name="User Name"
                          sub="2024/03/22"
                          action={<ChevronRight className="h-4 w-4 text-foreground" />}
                        />
                      </CardFooter>
                    </Card>
                  </div>

                  {/* 3. 아바타 헤더(menu) + 콘텐츠 + user 푸터 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">아바타 헤더 + 사용자 푸터</p>
                    <Card variant="line" className="w-full">
                      <CardHeader
                        avatar={<Avatar src="https://i.pravatar.cc/32" fallback="AB" size="lg" />}
                        title="Title text"
                        subtitle="User Name"
                        control="menu"
                        onMenuClick={() => {}}
                      />
                      <CardContent>
                        <CardDescription>
                          Lorem ipsum dolor sit amet consectetur. Phasellus arcu consectetuer.
                        </CardDescription>
                      </CardContent>
                      <CardFooter divider>
                        <CardFooterUser
                          avatar={{ fallback: "AB", size: "lg" }}
                          name="User Name"
                          sub="User information"
                        />
                      </CardFooter>
                    </Card>
                  </div>

                  {/* 4. 텍스트 헤더(badge) + 콘텐츠 + info 푸터 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">텍스트 헤더 + 뱃지 + 정보 푸터</p>
                    <Card variant="line" className="w-full">
                      <CardHeader
                        title="공지사항"
                        subtitle="2024/03/22"
                        badge={<Badge>긴급</Badge>}
                      />
                      <CardContent>
                        <CardDescription>
                          Lorem ipsum dolor sit amet consectetur. Phasellus arcu consectetuer.
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <CardFooterInfo
                          items={[
                            { icon: <User className="h-3 w-3" />, label: "1,234" },
                            { icon: <Download className="h-3 w-3" />, label: "56" },
                          ]}
                          action={<MoreVertical className="h-4 w-4" />}
                        />
                      </CardFooter>
                    </Card>
                  </div>

                  {/* 5. 스위치 헤더 + 콘텐츠 + 버튼 푸터 (horizontal) */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">스위치 헤더 + 버튼 푸터</p>
                    <Card variant="line" className="w-full">
                      <CardHeader
                        title="Title text"
                        subtitle="Subtitle"
                        control="switch"
                        checked={switchOn}
                        onCheckedChange={setSwitchOn}
                      />
                      <CardContent>
                        <CardDescription>
                          Lorem ipsum dolor sit amet consectetur. Phasellus arcu consectetuer.
                        </CardDescription>
                      </CardContent>
                      <CardFooterButtons
                        primaryLabel="확인"
                        secondaryLabel="취소"
                        divider
                      />
                    </Card>
                  </div>

                  {/* 6. 아바타 헤더 + 콘텐츠 + 세로 버튼 푸터 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">아바타 헤더 + 세로 버튼 푸터</p>
                    <Card variant="line" className="w-full">
                      <CardHeader
                        avatar={
                          <div className="h-8 w-8 bg-ac-gray-20 rounded-md flex items-center justify-center">
                            <Bell className="h-4 w-4 text-foreground" />
                          </div>
                        }
                        title="Title text"
                        subtitle="Subtitle"
                      />
                      <CardContent>
                        <CardDescription>
                          Lorem ipsum dolor sit amet consectetur.
                        </CardDescription>
                      </CardContent>
                      <CardFooterButtons
                        direction="vertical"
                        primaryLabel="확인"
                        secondaryLabel="취소"
                        divider
                      />
                    </Card>
                  </div>

                  {/* 7. 리스트 카드 (divider) */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">리스트 카드</p>
                    <Card variant="line" className="w-full">
                      <CardHeader title="문서 목록" subtitle="3개 항목" />
                      <CardContent divider>
                        <div className="py-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm text-foreground flex-1">문서 항목 1</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div className="py-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm text-foreground flex-1">문서 항목 2</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div className="py-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm text-foreground flex-1">문서 항목 3</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 8. 체크박스 선택 카드 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">체크박스 선택 카드</p>
                    <Card
                      variant="line"
                      className={`w-full transition-all ${cbChecked ? "border-ac-primary-50" : ""}`}
                    >
                      <CardHeader
                        avatar={<Avatar fallback="AB" size="lg" />}
                        title="Title text"
                        subtitle="Subtitle"
                        control="checkbox"
                        checked={cbChecked}
                        onCheckedChange={setCbChecked}
                      />
                      <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 9. 라디오 선택 카드 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">라디오 선택 카드</p>
                    <div className="flex flex-col gap-2">
                      {(["a", "b"] as const).map((v) => (
                        <Card
                          key={v}
                          variant="line"
                          className={`w-full pb-2 transition-all ${radioVal === v ? "border-ac-primary-50" : ""}`}
                        >
                          <CardHeader
                            title={`Option ${v.toUpperCase()}`}
                            subtitle="Subtitle"
                            control="radio"
                            name="card-radio"
                            value={v}
                            checked={radioVal === v}
                            onChange={() => setRadioVal(v)}
                          />
                        </Card>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </section>


            {/* ── 사용 가이드 ── */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">사용 예시</h3>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" src="/card/usage_do_1.png" />
                  <UsageCard type="Do" src="/card/usage_do_2.png" />
                  <UsageCard type="Do" src="/card/usage_do_3.png" />
                  <UsageCard type="Do" src="/card/usage_do_4.png" />
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
  Card,
  CardMenu,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardFooterUser,
  CardFooterInfo,
  CardFooterButtons,
  Button,
} from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`{/* 기본 카드 */}
<Card variant="line">
  <CardMenu onClick={handleMenu} />
  <CardContent>
    <CardTitle>Title text</CardTitle>
    <CardDescription>
      Lorem ipsum dolor sit amet consectetur.
    </CardDescription>
  </CardContent>
  <CardFooter>
    <Button variant="tertiary" size="sm">취소</Button>
    <Button variant="primary" size="sm">확인</Button>
  </CardFooter>
</Card>

{/* interactive 카드 — hover / active 효과 활성화 */}
<Card variant="shadow" interactive>
  <CardContent>
    <CardTitle>Title text</CardTitle>
    <CardDescription>
      Lorem ipsum dolor sit amet consectetur.
    </CardDescription>
  </CardContent>
</Card>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Header Control</h2>
              <CodeBlock code={`{/* 더보기 버튼 */}
<CardHeader title="Title" control="menu" onMenuClick={handleMenu} />

{/* 체크박스 */}
<CardHeader
  title="Title"
  control="checkbox"
  checked={checked}
  onCheckedChange={setChecked}
/>

{/* 라디오 */}
<CardHeader
  title="Title"
  control="radio"
  name="group"
  value="a"
  checked={selected === "a"}
  onChange={() => setSelected("a")}
/>

{/* 스위치 */}
<CardHeader
  title="Title"
  control="switch"
  checked={on}
  onCheckedChange={setOn}
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Content with Divider</h2>
              <CodeBlock code={`{/* children 사이에 Divider 자동 삽입 */}
<CardContent divider>
  <div className="py-2">항목 1</div>
  <div className="py-2">항목 2</div>
  <div className="py-2">항목 3</div>
</CardContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Footer Variants</h2>
              <CodeBlock code={`{/* 사용자 타입 */}
<CardFooter>
  <CardFooterUser
    avatar={{ fallback: "UN" }}
    name="User Name"
    sub="2024/03/22"
    action={<ChevronRight className="h-4 w-4" />}
  />
</CardFooter>

{/* 버튼 타입 — CardFooterButtons */}
<CardFooterButtons
  primaryLabel="확인"
  secondaryLabel="취소"
  direction="horizontal"
  onPrimary={handleConfirm}
  onSecondary={handleCancel}
/>

{/* 정보 타입 */}
<CardFooter>
  <CardFooterInfo
    items={[
      { icon: <User className="h-3 w-3" />, label: "1,234" },
      { icon: <Calendar className="h-3 w-3" />, label: "2024/03/22" },
    ]}
    action={<MoreVertical className="h-4 w-4" />}
  />
</CardFooter>`} />
            </section>

            {/* Card Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Card Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["variant",     '"background" | "line" | "shadow"',         '"line"', "카드 스타일"],
                  ["interactive", "boolean",                                    "false",  "호버·클릭 인터랙션"],
                  ["shadowSize",  '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', '"md"',   'variant="shadow"일 때 그림자 크기'],
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

            {/* CardHeader Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">CardHeader Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["imageSrc",        "string",                                               "-",      "이미지 URL (이미지 타입)"],
                  ["avatar",          "ReactNode",                                            "-",      "아바타 요소 (아바타 타입)"],
                  ["title",           "ReactNode",                                            "-",      "제목"],
                  ["subtitle",        "ReactNode",                                            "-",      "부제목"],
                  ["badge",           "ReactNode",                                            "-",      "뱃지 (이미지 타입 우측 상단 / avatar·text 타입 우측)"],
                  ["control",         '"none" | "menu" | "checkbox" | "radio" | "switch"',   '"none"', "우측 상단 컨트롤 타입"],
                  ["onMenuClick",     "() => void",                                           "-",      'control="menu"일 때 클릭 콜백'],
                  ["onCheckedChange", "(checked: boolean) => void",                           "-",      'control="checkbox" | "switch"일 때'],
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

            {/* CardContent Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">CardContent Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["divider", "boolean", "false", "children 사이에 Divider 자동 삽입"],
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

            {/* CardFooterButtons Props */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">CardFooterButtons Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["direction",      '"horizontal" | "vertical"', '"horizontal"', "버튼 배치 방향"],
                  ["primaryLabel",   "string",                    '"확인"',        "주요 액션 버튼 텍스트"],
                  ["secondaryLabel", "string",                    "-",            "보조 액션 버튼 텍스트"],
                  ["onPrimary",      "() => void",                "-",            "주요 액션 콜백"],
                  ["onSecondary",    "() => void",                "-",            "보조 액션 콜백"],
                  ["divider",        "boolean",                   "false",        "상단 구분선 표시 여부"],
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

      {/* ── TOC ── */}
      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
