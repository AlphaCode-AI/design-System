"use client";

import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardDescription,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  ArrowUp,
  AtSign,
  Check,
  ChevronDown,
  Code2,
  Lightbulb,
  Mic,
  PenLine,
  Search,
  Settings,
  Globe,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Zap,
  X,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

interface FileChip {
  id: string;
  name: string;
}

const INITIAL_FILES: FileChip[] = [
  { id: "1", name: "project_brief.pdf" },
  { id: "2", name: "api_spec.yaml" },
  { id: "3", name: "user_research.csv" },
  { id: "4", name: "brand_guidelines.pdf" },
];

const QUICK_ACTIONS = [
  { label: "글쓰기",  icon: <PenLine size={14} /> },
  { label: "코딩",    icon: <Code2 size={14} /> },
  { label: "리서치",  icon: <Search size={14} /> },
  { label: "창작",    icon: <Lightbulb size={14} /> },
];

const SUGGESTIONS: Record<string, { title: string; description: string; prompt: string }[]> = {
  "글쓰기": [
    { title: "전문적인 이메일 작성",   description: "어떤 독자를 위한 명확하고 세련된 이메일을 작성하세요",   prompt: "전문적인 이메일 작성을 도와줘" },
    { title: "내 글 개선하기",         description: "텍스트의 명확성, 어조, 흐름을 향상시키세요",            prompt: "아래 글의 명확성과 흐름을 개선해줘" },
    { title: "프로젝트 제안서 작성",   description: "목표, 일정, 결과물이 포함된 제안서를 작성하세요",       prompt: "목표, 일정, 결과물이 포함된 프로젝트 제안서를 작성해줘" },
    { title: "문서 요약",              description: "긴 문서를 핵심 내용으로 압축하세요",                    prompt: "아래 문서를 핵심 내용 위주로 요약해줘" },
  ],
  "창작": [
    { title: "아이디어 브레인스토밍",  description: "프로젝트를 위한 창의적인 아이디어를 생성하세요",        prompt: "이 프로젝트를 위한 창의적인 아이디어를 브레인스토밍해줘" },
    { title: "스토리 작성",            description: "캐릭터가 있는 매력적인 이야기를 만드세요",              prompt: "캐릭터와 서사가 있는 흥미로운 이야기를 작성해줘" },
    { title: "컨셉 디자인",            description: "제품 또는 비주얼 디자인 아이디어를 탐색하세요",         prompt: "이 제품의 컨셉과 비주얼 디자인 아이디어를 제안해줘" },
    { title: "태그라인 만들기",        description: "브랜드나 제품을 위한 기억에 남는 문구를 작성하세요",    prompt: "이 브랜드에 어울리는 기억에 남는 태그라인을 만들어줘" },
  ],
  "리서치": [
    { title: "옵션 비교",              description: "다양한 접근 방식의 장단점을 분석하세요",                 prompt: "아래 옵션들의 장단점을 비교 분석해줘" },
    { title: "개념 설명",              description: "복잡한 주제를 쉬운 말로 풀어드립니다",                  prompt: "아래 개념을 쉽고 간단하게 설명해줘" },
    { title: "모범 사례 찾기",         description: "표준 및 권장 접근 방식을 조사하세요",                   prompt: "이 주제에 대한 업계 표준과 모범 사례를 알려줘" },
    { title: "리서치 요약",            description: "조사 내용을 구조화된 개요로 정리하세요",                prompt: "아래 리서치 내용을 구조화된 형식으로 요약해줘" },
  ],
  "코딩": [
    { title: "코드 디버깅",            description: "코드 스니펫에서 문제를 찾아 수정하세요",                prompt: "아래 코드의 문제를 찾아서 수정해줘" },
    { title: "함수 작성",              description: "타입이 잘 정의된 함수를 에러 처리와 함께 생성하세요",   prompt: "타입과 에러 처리가 포함된 함수를 작성해줘" },
    { title: "코드 설명",              description: "복잡한 코드를 이해하기 쉽게 분석해드립니다",            prompt: "아래 코드를 단계별로 이해하기 쉽게 설명해줘" },
    { title: "PR 리뷰",                description: "버그, 성능, 모범 사례 관점에서 코드를 검토하세요",      prompt: "아래 코드를 버그, 성능, 모범 사례 관점에서 리뷰해줘" },
  ],
};

const MODES = [
  { label: "자동",    icon: <Sparkles size={14} /> },
  { label: "글쓰기",  icon: <PenLine size={14} /> },
  { label: "코딩",    icon: <Code2 size={14} /> },
  { label: "리서치",  icon: <Search size={14} /> },
  { label: "창작",    icon: <Lightbulb size={14} /> },
  { label: "민감",    icon: <Shield size={14} /> },
  { label: "딥 모드", icon: <Zap size={14} /> },
];

export default function AiChatTemplatePage() {
  const [files, setFiles] = useState<FileChip[]>(INITIAL_FILES);
  const [input, setInput] = useState("");
  const [selectedMode, setSelectedMode] = useState("자동");
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [textareaFocused, setTextareaFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const handleQuickAction = (label: string) => {
    setActiveAction((prev) => prev === label ? null : label);
  };

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="AI Chat"
        description="Sparkles, Badge, Button, Textarea를 조합한 AI 채팅 시작 화면 예시입니다."
        border
      />

      {/* 채팅 컨테이너 */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex flex-col items-center px-6 py-12 gap-8">

          {/* 인사말 */}
          <div className="text-center space-y-2">
            <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Sparkles size={14} className="text-ac-primary-50" />
              안녕하세요, 홍길동님
            </p>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              무엇을 도와드릴까요?
            </h1>
          </div>

          {/* 입력 영역 */}
          <div className="w-full max-w-[640px] space-y-3">

            {/* 첨부 파일 칩 */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => removeFile(file.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground hover:bg-ac-gray-10 transition-colors group"
                  >
                    <span className="max-w-[120px] truncate">{file.name}</span>
                    <X size={12} className="opacity-30 group-hover:opacity-70 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* 텍스트 입력 박스 */}
            <div className={`rounded-xl border bg-background shadow-lg transition-colors ${textareaFocused ? "border-ac-primary-40" : "border-border"}`}>
              {/* @ 아이콘 */}
              <div className="px-4 pt-4">
                <Button variant="tertiary" size="sm" className="!p-0 w-7 h-7">
                  <AtSign size={16} />
                </Button>
              </div>

              {/* textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onFocus={() => setTextareaFocused(true)}
                onBlur={() => setTextareaFocused(false)}
                placeholder="무엇이든 물어보세요"
                rows={3}
                className="w-full px-4 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none leading-relaxed"
              />

              {/* 하단 바 */}
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-1">
                  <Dropdown align="start" side="top">
                    <DropdownTrigger asChild>
                      <Button variant="tertiary" size="sm" className="gap-1 px-2.5 h-7 text-xs font-normal">
                        <Sparkles size={13} className="text-ac-primary-50" />
                        {selectedMode}
                        <ChevronDown size={12} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      {MODES.map(({ label, icon }) => (
                        <DropdownItem
                          key={label}
                          icon={icon}
                          onSelect={() => setSelectedMode(label)}
                          shortcut={selectedMode === label ? "✓" : undefined}
                        >
                          {label}
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>

                  <Dropdown align="start" side="top">
                    <DropdownTrigger asChild>
                      <Button variant="tertiary" size="sm" className="gap-1 px-2.5 h-7 text-xs font-normal">
                        <Settings size={13} />
                        설정
                        <ChevronDown size={12} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      <DropdownItem icon={<Globe size={14} />}>언어 설정</DropdownItem>
                      <DropdownItem icon={<SlidersHorizontal size={14} />}>응답 스타일</DropdownItem>
                      <DropdownItem icon={<Trash2 size={14} />}>히스토리 삭제</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="tertiary" size="sm" className="!p-0 w-8 h-8 rounded-full">
                    <Mic size={15} />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!input.trim()}
                    className="w-8 h-8 !p-0 rounded-full"
                  >
                    <ArrowUp size={15} />
                  </Button>
                </div>
              </div>
            </div>

            {/* 빠른 액션 */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {QUICK_ACTIONS.map(({ label, icon }) => (
                <Button
                  key={label}
                  variant="link"
                  size="sm"
                  className={activeAction === label ? "text-ac-primary-50" : undefined}
                  onClick={() => handleQuickAction(label)}
                >
                  {icon}
                  {label}
                </Button>
              ))}
            </div>

            {/* 제안 카드 */}
            {activeAction && SUGGESTIONS[activeAction] && (
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTIONS[activeAction].map(({ title, description, prompt }) => (
                  <Card
                    key={title}
                    variant="background"
                    className="p-4 space-y-1 bg-ac-gray-20 cursor-pointer hover:border-ac-primary-40 hover:bg-ac-primary-10 transition-colors"
                    onClick={() => setInput(prompt)}
                  >
                    <CardTitle className="text-xs font-semibold text-foreground">{title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-relaxed">{description}</CardDescription>
                  </Card>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
