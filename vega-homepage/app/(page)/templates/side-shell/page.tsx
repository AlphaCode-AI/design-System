"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardTitle,
  CardDescription,
  Divider,
  ProgressIndicator,
  SideNavigation,
  Bell,
  CheckCircle2,
  FolderOpen,
  LayoutDashboard,
  Plus,
  Settings,
  Shield,
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

const STATS = [
  { label: "전체 멤버",     value: "24명",  sub: "이번 달 +3",   pct: 72 },
  { label: "진행 중 프로젝트", value: "8개",   sub: "마감 임박 2개", pct: 45 },
  { label: "완료된 태스크",  value: "134건", sub: "목표 대비 89%", pct: 89 },
];

const RECENT: { name: string; action: string; time: string; avatar: string }[] = [
  { name: "김민준", action: "프로젝트 VEGA UI 태스크 완료", time: "5분 전",   avatar: "김" },
  { name: "이서연", action: "디자인 리뷰 코멘트 추가",      time: "23분 전",  avatar: "이" },
  { name: "박지호", action: "API 서버 배포 완료",            time: "1시간 전", avatar: "박" },
  { name: "송민서", action: "디자인 토큰 업데이트",          time: "3시간 전", avatar: "송" },
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
        description="SideNavigation, Avatar, Badge, Card, ProgressIndicator를 조합한 앱 레이아웃 예시입니다."
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
              <Avatar size="sm" fallback="홍" />
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
            <div className="flex items-center gap-2">
              <button className="relative w-8 h-8 flex items-center justify-center rounded-md hover:bg-ac-gray-10 transition-colors text-muted-foreground">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-ac-primary-50" />
              </button>
              <Avatar size="sm" fallback="홍" />
            </div>
          </header>

          {/* 콘텐츠 */}
          <main className="flex-1 overflow-y-auto p-5 space-y-5">

            {activeId === "dashboard" && (
              <>
                {/* 스탯 카드 */}
                <div className="grid grid-cols-3 gap-3">
                  {STATS.map((s) => (
                    <Card key={s.label} variant="background" className="p-4 space-y-3 bg-ac-gray-20">
                      <div>
                        <CardDescription className="text-xs text-muted-foreground">{s.label}</CardDescription>
                        <CardTitle className="text-xl font-bold text-foreground mt-0.5">{s.value}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                      </div>
                      <ProgressIndicator value={s.pct} linearSize="sm" />
                    </Card>
                  ))}
                </div>

                <Divider />

                {/* 최근 활동 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">최근 활동</p>
                    <Button variant="tertiary" size="sm">전체 보기</Button>
                  </div>
                  <Card variant="line" className="bg-card divide-y divide-border">
                    {RECENT.map((r) => (
                      <div key={r.name + r.time} className="flex items-center gap-3 px-4 py-3">
                        <Avatar size="sm" fallback={r.avatar} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{r.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{r.action}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{r.time}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              </>
            )}

            {activeId === "members" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">멤버 목록</p>
                  <Button variant="primary" size="sm">
                    <Plus size={14} />
                    멤버 초대
                  </Button>
                </div>
                <Card variant="line" className="bg-card divide-y divide-border">
                  {RECENT.map((r) => (
                    <div key={r.name} className="flex items-center gap-3 px-4 py-3">
                      <Avatar size="sm" fallback={r.avatar} />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">{r.name}</p>
                      </div>
                      <Badge variant="success" size="sm">활성</Badge>
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {(activeId === "active" || activeId === "completed") && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  {activeId === "active" ? "진행 중인 프로젝트" : "완료된 프로젝트"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["VEGA UI", "디자인 시스템", "API 서버", "모바일 앱"].map((name, i) => (
                    <Card key={name} variant="line" className="p-4 space-y-3 bg-card">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-semibold text-foreground">{name}</CardTitle>
                        <Badge variant={activeId === "completed" ? "success" : "warning"} size="sm">
                          {activeId === "completed" ? "완료" : "진행 중"}
                        </Badge>
                      </div>
                      <ProgressIndicator value={activeId === "completed" ? 100 : [60, 45, 80, 30][i]} linearSize="sm" />
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {(activeId === "roles" || activeId === "settings" || activeId === "team" || activeId === "projects") && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
                <p>준비 중입니다.</p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
