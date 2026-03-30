"use client";

import React, { useState } from "react";
import {
  cn,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Avatar,
  Divider,
  User,
  Landmark,
  Building2,
  Store,
  Headset,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

/**
 * Table of Contents 데이터
 */
const toc: TocItem[] = [
  { id: "type",  label: "Type" },
  { id: "size",  label: "Size" },
  { id: "icon",  label: "Icon" },
  { id: "image", label: "Image" },
  { id: "text",  label: "Text" },
  { id: "usage", label: "사용 가이드" },
];

export default function AvatarPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Avatar</h1>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            아바타(avatar)는 프로필 사진 또는 대체 이미지를 통해 사용자를 표현하는 요소입니다.
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
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-end justify-center gap-16">
                  {/* Shape */}
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-semibold text-foreground">Shape</p>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar size="xl" shape="circle" src="/avatar/img_1.jpg" />
                        <span className="text-xs text-muted-foreground">Circle</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Avatar size="xl" shape="square" src="/avatar/img_2.jpg" />
                        <span className="text-xs text-muted-foreground">Square</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <Divider orientation="vertical" className="h-24" />

                  {/* Type */}
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-semibold text-foreground">Type</p>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar size="xl" src="/avatar/img_3.jpg" />
                        <span className="text-xs text-muted-foreground">Image</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Avatar size="xl" icon={<User className="w-1/2 h-1/2" />} />
                        <span className="text-xs text-muted-foreground">Icon</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Avatar size="xl" name="MJ" className="bg-ac-orange-40 text-white" />
                        <span className="text-xs text-muted-foreground">Text</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Size */}
            <section id="size" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Size</h2>
              <p className="text-sm text-foreground mb-4">
                사이즈는 xs / sm / md / lg / xl / 2xl 6개의 사이즈를 사용합니다. Default는 md 입니다. 중요도와 시각적 균형에 맞게 사이즈를 사용합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex flex-col gap-6 items-center">
                  {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => {
                    const px = { xs: 16, sm: 20, md: 24, lg: 32, xl: 48, "2xl": 64 }[size];
                    return (
                      <div key={size} className="flex items-center gap-6">
                        <span className="text-sm text-foreground w-24 text-right shrink-0">
                          {size} ({px}px)
                        </span>
                        <div className="flex items-center gap-3">
                          <Avatar size={size} src="/avatar/img_4.jpg" />
                          <Avatar size={size} src="/avatar/img_5.jpg" />
                          <Avatar size={size} shape="square" className="bg-ac-gray-80" icon={<Landmark className="w-1/2 h-1/2 text-ac-white" />} />
                          <Avatar size={size} className="bg-ac-gray-80" icon={<Landmark className="w-1/2 h-1/2 text-ac-white" />} />
                          <Avatar size={size} name="K" className="bg-ac-blue-40 text-white" />
                          <Avatar size={size} name="HC" className="bg-ac-green-40 text-white" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Icon */}
            <section id="icon" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Icon</h2>
              <p className="text-sm text-foreground mb-4">
              아바타의 아이콘 타입은 사용자를 표현하는 아이콘으로 많이 사용됩니다. 사용자를 표현하는 아이콘으로 사용할 때 사용자를 표현하는 목적과 다른 아이콘의 사용을 지양합니다.<br/> 아이콘은 lucide-react 아이콘을 사용하며, <CodeBadge>lucide-react</CodeBadge>에서 직접 import하지 않고 반드시 <CodeBadge>@alphacode-ai/design-system</CodeBadge>에서 import하여 사용합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-center justify-center gap-10">
                  {[
                    { icon: <User className="w-1/2 h-1/2" />, label: "사용자" },
                    { icon: <Landmark className="w-1/2 h-1/2" />, label: "은행" },
                    { icon: <Building2 className="w-1/2 h-1/2" />, label: "회사" },
                    { icon: <Store className="w-1/2 h-1/2" />, label: "판매자" },
                    { icon: <Headset className="w-1/2 h-1/2" />, label: "고객센터" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <Avatar size="2xl" icon={icon} />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Image */}
            <section id="image" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Image</h2>
              <p className="text-sm text-foreground mb-4">
                아바타의 이미지 타입은 사용자가 지정한 이미지 또는 회사의 로고 이미지를 사용합니다. 기계의 이미지 또는 회사 전경 같은 이미지 사용은 지양합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-center justify-center gap-10">
                  {[
                    { src: "/avatar/img_symbol.png", label: "심볼" },
                    { src: "/avatar/img_logo.png", label: "로고" },
                    { src: "/avatar/img_1.jpg", label: "프로필" },
                    { src: "/avatar/img_2.jpg", label: "프로필" },
                  ].map(({ src, label }) => (
                    <div key={src} className="flex flex-col items-center gap-2">
                      <Avatar size="2xl" src={src} />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Text */}
            <section id="text" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Text</h2>
              <p className="text-sm text-foreground mb-4">
              아바타의 텍스트 타입은 사용자의 아이디 또는 닉네임의 영문 또는 숫자의 앞글자를 대문자로 변환해 생성합니다. xs-md 사이즈에서는 한글자만 표출하며 그 이후 사이즈에선 두글자를 표출합니다. 한글은 사용하지 않습니다. 색상 값은 아래와 같은 값을 먼저 사용하며 다른 색상 적용도 가능하나 가독성을 고려하여 지정하도록 합니다.
              </p>
              <div className="rounded-lg border border-border p-8">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <Avatar size="xs" name="S" />
                  <Avatar size="xs" name="S" className="bg-ac-blue-gray-30" />
                  <Avatar size="sm" name="Q" className="bg-ac-primary-30" />
                  <Avatar size="sm" name="Q" className="bg-ac-purple-30" />
                  <Avatar size="md" name="O" className="bg-ac-green-30" />
                  <Avatar size="lg" name="P1" className="bg-ac-blue-30" />
                  <Avatar size="xl" name="34" className="bg-ac-red-30" />
                  <Avatar size="2xl" name="WD" className="bg-ac-orange-50 text-white" />
                </div>
              </div>
            </section>

            {/* 사용 가이드 */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>
              <h3 className="text-lg font-semibold text-foreground mb-4">사용 관련</h3>
              <div className="grid grid-cols-2 gap-6">
                <UsageCard
                  type="Don't"
                  src="/avatar/usage_dont1.png"
                  description="사진을 보여주기 위한 용도로 아바타의 image타입을 사용하지 않도록 주의합니다."
                />
                <UsageCard
                  type="Don't"
                  src="/avatar/usage_dont2.png"
                  description="정해진 사이즈를 벗어나 변형하거나 목적에 맞지 않은 사용을 하지 않습니다."
                />
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
                  이미지, 아이콘, 텍스트 타입을 지정하여 사용합니다. 기본 사이즈는 md (24px)입니다.
                </p>
                <CodeBlock code={`import { Avatar, User, Building2, Store } from "@alphacode-ai/design-system";

// ⚠️ lucide-react에서 직접 import하지 않습니다.
// import { User } from "lucide-react"; // ❌
// import { User } from "@alphacode-ai/design-system"; // ✅
 
// Image 타입
<Avatar src="/profile.jpg" alt="사용자 이름" />
 
// Icon 타입
<Avatar icon={<User className="w-1/2 h-1/2 text-white" />} />
<Avatar icon={<Building2 className="w-1/2 h-1/2" />} />
<Avatar icon={<Store className="w-1/2 h-1/2" />} />
 
// Text 타입 — 이름으로 이니셜 자동 생성
<Avatar name="Kim Sunghoon" />`} />
              </div>

              {/* 사이즈 */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. 사이즈</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>size</CodeBadge> prop으로 사이즈를 지정합니다.
                </p>
                <CodeBlock code={`<Avatar src="/profile.jpg" size="xs" />  {/* 16px */}
<Avatar src="/profile.jpg" size="sm" />  {/* 20px */}
<Avatar src="/profile.jpg" size="md" />  {/* 24px — 기본값 */}
<Avatar src="/profile.jpg" size="lg" />  {/* 32px */}
<Avatar src="/profile.jpg" size="xl" />  {/* 48px */}
<Avatar src="/profile.jpg" size="2xl" /> {/* 64px */}`} />
              </div>

              {/* Shape */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Shape</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>shape</CodeBadge> prop으로 원형 또는 사각형을 지정합니다. 기본값은 circle입니다.
                </p>
                <CodeBlock code={`// Circle (기본값)
<Avatar src="/profile.jpg" />
<Avatar src="/profile.jpg" shape="circle" />

// Square
<Avatar src="/profile.jpg" shape="square" />`} />
              </div>

              {/* 배경색 */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. 배경색 지정</h3>
                <p className="text-sm text-foreground mb-4">
                  <CodeBadge>className</CodeBadge>으로 배경색을 지정합니다. 텍스트 가독성을 위해 <CodeBadge>text-white</CodeBadge>를 함께 사용합니다.
                </p>
                <CodeBlock code={`<Avatar name="KS" className="bg-ac-blue-50 text-white" />
<Avatar name="HC" className="bg-ac-green-50 text-white" />
<Avatar name="WD" className="bg-ac-orange-40 text-white" />
<Avatar icon={<User className="w-1/2 h-1/2 text-white" />} className="bg-ac-gray-80" />`} />
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
                  ["size", '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', '"md"', "아바타 크기 (16 / 20 / 24 / 32 / 48 / 64px)"],
                  ["shape", '"circle" | "square"', '"circle"', "아바타 모양"],
                  ["src", "string", "-", "이미지 URL (Image 타입)"],
                  ["alt", "string", "-", "이미지 대체 텍스트"],
                  ["name", "string", "-", "이니셜 자동 생성에 사용할 이름 (Text 타입)"],
                  ["icon", "ReactNode", "-", "아이콘 노드 (Icon 타입)"],
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