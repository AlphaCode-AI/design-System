"use client";

import { useState } from "react";
import {
  Avatar,
  Bell,
  Button,
  CheckCircle2,
  FolderOpen,
  LayoutDashboard,
  Settings,
  Shield,
  SideNavigation,
  Skeleton,
  User,
  Users,
} from "@alphacode-ai/design-system";
import type { SideNavItem } from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

const NAV_ITEMS: SideNavItem[] = [
  { id: "dashboard", label: "대시보드",  icon: <LayoutDashboard size={16} /> },
  {
    id: "team", label: "팀 관리", icon: <Users size={16} />,
    children: [
      { id: "members", label: "멤버",  icon: <User size={16} /> },
      { id: "roles",   label: "역할",  icon: <Shield size={16} /> },
    ],
  },
  {
    id: "projects", label: "프로젝트", icon: <FolderOpen size={16} />,
    children: [
      { id: "active",    label: "진행 중", icon: <LayoutDashboard size={16} /> },
      { id: "completed", label: "완료",    icon: <CheckCircle2 size={16} /> },
    ],
  },
  { id: "settings", label: "설정", icon: <Settings size={16} />, divider: true },
];


const PAGE_TITLE: Record<string, string> = {
  dashboard: "대시보드",
  members:   "멤버",
  roles:     "역할",
  active:    "진행 중 프로젝트",
  completed: "완료된 프로젝트",
  settings:  "설정",
};

export default function SideShellTemplatePage() {
  const [activeId, setActiveId] = useState("dashboard");

  const title = PAGE_TITLE[activeId] ?? "대시보드";

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="사이드 쉘"
        description="SideNavigation, Avatar를 조합한 사이드바 기반 앱 레이아웃 예시입니다."
        border
      />

      {/* Shell 컨테이너 */}
      <div className="rounded-xl border border-border overflow-hidden h-[600px] flex">

        {/* ── 사이드바 ─────────────────────────────── */}
        <aside className="w-56 shrink-0 border-r border-border flex flex-col bg-background">
          {/* 로고 영역 */}
          <div className="h-14 flex items-center gap-2.5 px-4 border-b border-border shrink-0">
            <div className="w-7 h-7 rounded-md bg-ac-primary-50 flex items-center justify-center">
              <span className="text-xs font-bold text-white">AC</span>
            </div>
            <span className="text-sm font-bold text-foreground">AlphaCode</span>
          </div>

          {/* 네비게이션 */}
          <div className="flex-1 overflow-y-auto py-3 px-2">
            <SideNavigation
              items={NAV_ITEMS}
              activeId={activeId}
              defaultOpenIds={["team", "projects"]}
              onActiveChange={setActiveId}
            />
          </div>

          {/* 하단 유저 정보 */}
          <div className="shrink-0 border-t border-border px-3 py-3">
            <div className="flex items-center gap-2.5">
              <Avatar size="lg" fallback="홍" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">홍길동</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── 메인 영역 ─────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col bg-background">

          {/* 헤더 */}
          <header className="h-14 shrink-0 border-b border-border flex items-center justify-between px-5">
            <h1 className="text-sm font-bold text-foreground">{title}</h1>
            <div className="relative">
              <Button variant="tertiary" size="sm" className="w-8 h-8 !p-0">
                <Bell size={16} />
              </Button>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ac-primary-50 pointer-events-none" />
            </div>
          </header>

          {/* 콘텐츠 */}
          <main className="flex-1 overflow-y-auto p-5 space-y-5">

            {/* 스탯 카드 스켈레톤 */}
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl bg-ac-gray-10 p-4 space-y-3">
                  <div className="space-y-1.5">
                    <Skeleton width={64} height={12} radius={3} index={i} />
                    <Skeleton width={48} height={24} radius={3} index={i} />
                    <Skeleton width={80} height={10} radius={3} index={i} />
                  </div>
                  <Skeleton height={6} radius={3} index={i} />
                </div>
              ))}
            </div>

            {/* 구분선 */}
            <Skeleton height={1} radius="none" index={3} />

            {/* 리스트 헤더 스켈레톤 */}
            <div className="flex items-center justify-between">
              <Skeleton width={80} height={16} radius={3} index={4} />
              <Skeleton width={64} height={28} radius={3} index={4} />
            </div>

            {/* 행 스켈레톤 */}
            <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <Skeleton width={28} height={28} radius="rounded" index={i + 5} />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton width={96} height={12} radius={3} index={i + 5} />
                    <Skeleton width={160} height={10} radius={3} index={i + 5} />
                  </div>
                  <Skeleton width={48} height={12} radius={3} index={i + 5} />
                </div>
              ))}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
