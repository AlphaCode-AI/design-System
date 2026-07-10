"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardTitle,
  CardDescription,
  Divider,
  ProgressIndicator,
  Search,
  TextInput,
  ToggleGroup,
  ToggleGroupItem,
  X,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

type Team = "all" | "Product" | "Design" | "Platform" | "Engineering";
type Status = "active" | "away" | "offline";

interface Member {
  name: string;
  role: string;
  team: Exclude<Team, "all">;
  status: Status;
  tasks: number;
  completedTasks: number;
  avatar: string;
  skills: string[];
}

const MEMBERS: Member[] = [
  { name: "김민준", role: "프론트엔드 개발자",  team: "Product",     status: "active",  tasks: 12, completedTasks: 8,  avatar: "김", skills: ["React", "TypeScript"] },
  { name: "이서연", role: "UI/UX 디자이너",     team: "Design",      status: "active",  tasks: 8,  completedTasks: 6,  avatar: "이", skills: ["Figma", "Prototyping"] },
  { name: "박지호", role: "백엔드 개발자",       team: "Platform",    status: "away",    tasks: 5,  completedTasks: 3,  avatar: "박", skills: ["Node.js", "AWS"] },
  { name: "최유진", role: "프로덕트 매니저",     team: "Product",     status: "offline", tasks: 3,  completedTasks: 3,  avatar: "최", skills: ["로드맵", "스프린트"] },
  { name: "정하은", role: "데이터 분석가",       team: "Platform",    status: "active",  tasks: 7,  completedTasks: 4,  avatar: "정", skills: ["Python", "BigQuery"] },
  { name: "강도현", role: "모바일 개발자",       team: "Engineering", status: "active",  tasks: 9,  completedTasks: 7,  avatar: "강", skills: ["Swift", "Kotlin"] },
  { name: "윤채원", role: "QA 엔지니어",         team: "Engineering", status: "away",    tasks: 6,  completedTasks: 5,  avatar: "윤", skills: ["Selenium", "Cypress"] },
  { name: "송민서", role: "디자인 시스템 개발자", team: "Design",      status: "active",  tasks: 10, completedTasks: 9,  avatar: "송", skills: ["Tokens", "CVA"] },
];

const STATUS_MAP: Record<Status, { label: string; variant: "success" | "warning" | "default" }> = {
  active:  { label: "활성",     variant: "success" },
  away:    { label: "자리비움", variant: "warning" },
  offline: { label: "오프라인", variant: "default" },
};

const TEAMS: { value: Team; label: string }[] = [
  { value: "all",         label: "전체" },
  { value: "Product",     label: "Product" },
  { value: "Design",      label: "Design" },
  { value: "Platform",    label: "Platform" },
  { value: "Engineering", label: "Engineering" },
];

export default function CardListTemplatePage() {
  const [selectedTeam, setSelectedTeam] = useState<Team>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      MEMBERS.filter((m) => {
        const matchTeam = selectedTeam === "all" || m.team === selectedTeam;
        const q = search.trim();
        const matchSearch = !q || m.name.includes(q) || m.role.includes(q);
        return matchTeam && matchSearch;
      }),
    [selectedTeam, search]
  );

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="팀 멤버 디렉토리"
        description="Avatar, Badge, Button, ProgressIndicator, ToggleGroup, TextInput을 조합한 팀 멤버 카드 리스트입니다."
        border
      />

      {/* 필터 바 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <ToggleGroup
          value={selectedTeam}
          variant="primary"
          onValueChange={(v) => v && setSelectedTeam(v as Team)}
        >
          {TEAMS.map((t) => (
            <ToggleGroupItem key={t.value} value={t.value}>
              {t.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="sm:ml-auto w-full sm:w-56">
          <TextInput
            placeholder="이름 또는 직무 검색"
            size="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<Search size={14} />}
            suffix={
              search ? (
                <button onClick={() => setSearch("")} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </button>
              ) : undefined
            }
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        {filtered.length}명
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((member) => {
            const status = STATUS_MAP[member.status];
            const pct = Math.round((member.completedTasks / member.tasks) * 100);
            return (
              <Card key={member.name} variant="line" className="p-5 space-y-4 bg-card">
                {/* 헤더 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar size="md" fallback={member.avatar} />
                    <div>
                      <CardTitle className="text-sm font-semibold text-foreground">{member.name}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">{member.role}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={status.variant} size="sm">{status.label}</Badge>
                </div>

                {/* 팀 + 스킬 태그 */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant="primary" size="sm">{member.team}</Badge>
                  {member.skills.map((s) => (
                    <Badge key={s} variant="default" size="sm">{s}</Badge>
                  ))}
                </div>

                <Divider />

                {/* 태스크 진행률 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">태스크 진행률</span>
                    <span className="font-medium text-foreground">{member.completedTasks} / {member.tasks}</span>
                  </div>
                  <ProgressIndicator value={pct} linearSize="sm" />
                </div>

                {/* 버튼 */}
                <div className="flex gap-2">
                  <Button variant="tertiary" size="sm" className="flex-1">메시지</Button>
                  <Button variant="primary" size="sm" className="flex-1">프로필 보기</Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-muted-foreground">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
