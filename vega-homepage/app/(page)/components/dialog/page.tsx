"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  TextInput,
  Textarea,
  Select,
  Switch,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import { UsageCard } from "@/app/components/UsageCard";

const toc: TocItem[] = [
  { id: "type",    label: "Type" },
  { id: "anatomy", label: "Anatomy" },
  { id: "size",    label: "Size" },
  { id: "scrim",   label: "Scrim" },
  { id: "usage",   label: "사용 가이드" },
];

export default function DialogPage() {
  const [activeTab, setActiveTab] = useState("docs");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Dialog</h1>
          <p className="text-sm text-foreground leading-relaxed">
            다이얼로그(Dialog)는 기본 페이지 위에 오버레이 되어 뜨는 모달로, 사용자의 특정 동작에 대한 중요한 피드백을 제공하거나
            사용자 확인을 받는 데 사용되는 구성 요소입니다.
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

            {/* ── Type ── */}
            <section id="type">
              <h2 className="text-lg font-semibold text-foreground mb-1">Type</h2>
              <p className="text-sm text-foreground mb-4">
                사용자는 다이얼로그가 닫힐 때까지 페이지와 상호작용할 수 없으므로
                사용자의 흐름을 방해하지 않기 위해 신중하게 사용해야 합니다.
              </p>
              <div className="border border-border rounded-lg p-6 bg-card flex flex-col items-center gap-4">
                <p className="text-xs font-medium text-foreground">기본 모달</p>
                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm">기본 모달 열기</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader title="Dialog main title" />
                      <DialogBody>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="tertiary" size="sm">취소</Button>
                        </DialogClose>
                        <Button variant="primary" size="sm">수정</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>

            {/* ── Anatomy ── */}
            <section id="anatomy">
              <h2 className="text-lg font-semibold text-foreground mb-1">Anatomy</h2>
              <p className="text-sm text-foreground mb-4">
                다이얼로그는 Header, Body, Footer 영역으로 구성됩니다. Footer는 선택 사항으로,
                단순 내용 전달 모달에는 상단 닫기 버튼만 사용합니다.
              </p>
              <div className="rounded-lg p-12 flex items-center justify-center bg-ac-gray-20">
                <img src="/dialog/dialog_anatomy.png" alt="dialog anatomy img" />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>Header — 제목(필수), 서브 제목(선택)</li>
                <li>닫기 버튼</li>
                <li>Body — Form, Text 등 다양한 콘텐츠가 들어갈 수 있습니다.</li>
                <li>Footer(선택) — 단순 내용 전달 모달엔 상단 닫기 버튼만 사용합니다.</li>
              </ol>
            </section>

            {/* ── Size ── */}
            <section id="size">
              <h2 className="text-lg font-semibold text-foreground mb-1">Size</h2>
              <p className="text-sm text-foreground mb-4">
                다이얼로그 사이즈는 width를 기준으로 3가지로 구분됩니다.
              </p>
              <div className="border border-border rounded-lg p-6 bg-card flex flex-col items-center gap-6">

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-medium text-foreground">Small</p>
                    <p className="text-xs text-muted-foreground font-mono">max-width: 500px</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm">Small 열기</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader title="비밀번호 변경" />
                      <DialogBody>
                        <div className="flex flex-col gap-4">
                          <TextInput label="현재 비밀번호" type="password" placeholder="현재 비밀번호를 입력해주세요" />
                          <TextInput label="새 비밀번호" type="password" placeholder="새 비밀번호를 입력해주세요" />
                          <TextInput label="새 비밀번호 확인" type="password" placeholder="새 비밀번호를 다시 입력해주세요" />
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="tertiary" size="sm">취소</Button>
                        </DialogClose>
                        <Button variant="primary" size="sm">변경</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-medium text-foreground">Medium</p>
                    <p className="text-xs text-muted-foreground font-mono">max-width: 800px</p>
                  </div>
                  <Dialog size="md">
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm">Medium 열기</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader title="프로필 수정" subtitle="프로필 정보를 수정합니다." />
                      <DialogBody>
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <TextInput label="이름" placeholder="이름을 입력해주세요" />
                            <TextInput label="닉네임" placeholder="닉네임을 입력해주세요" />
                          </div>
                          <TextInput label="이메일" type="email" placeholder="이메일을 입력해주세요" />
                          <Select
                            label="직군"
                            placeholder="직군을 선택해주세요"
                            options={[
                              { value: "design", label: "디자인" },
                              { value: "frontend", label: "프론트엔드" },
                              { value: "backend", label: "백엔드" },
                              { value: "pm", label: "기획" },
                            ]}
                          />
                          <Textarea label="자기 소개" placeholder="자기 소개를 입력해주세요" rows={3} />
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="tertiary" size="sm">취소</Button>
                        </DialogClose>
                        <Button variant="primary" size="sm">저장</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-medium text-foreground">Large</p>
                    <p className="text-xs text-muted-foreground font-mono">max-width: 1000px</p>
                  </div>
                  <Dialog size="lg">
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm">Large 열기</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader title="프로젝트 생성" subtitle="새 프로젝트의 기본 정보를 입력해주세요." />
                      <DialogBody>
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <TextInput label="프로젝트명" placeholder="프로젝트명을 입력해주세요" />
                            <Select
                              label="카테고리"
                              placeholder="카테고리를 선택해주세요"
                              options={[
                                { value: "web", label: "웹" },
                                { value: "mobile", label: "모바일" },
                                { value: "design", label: "디자인 시스템" },
                                { value: "other", label: "기타" },
                              ]}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Select
                              label="팀"
                              placeholder="팀을 선택해주세요"
                              options={[
                                { value: "team-a", label: "Team A" },
                                { value: "team-b", label: "Team B" },
                                { value: "team-c", label: "Team C" },
                              ]}
                            />
                            <Select
                              label="공개 여부"
                              placeholder="공개 여부를 선택해주세요"
                              options={[
                                { value: "public", label: "공개" },
                                { value: "private", label: "비공개" },
                              ]}
                            />
                          </div>
                          <Textarea label="프로젝트 설명" placeholder="프로젝트에 대한 설명을 입력해주세요" rows={4} />
                          <div className="flex flex-col gap-3 pt-1">
                            <p className="text-sm font-medium text-foreground">알림 설정</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-foreground">이메일 알림</p>
                                <p className="text-xs text-muted-foreground">프로젝트 업데이트를 이메일로 받습니다.</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-foreground">슬랙 알림</p>
                                <p className="text-xs text-muted-foreground">프로젝트 업데이트를 슬랙으로 받습니다.</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="tertiary" size="sm">취소</Button>
                        </DialogClose>
                        <Button variant="primary" size="sm">생성</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

              </div>
            </section>

            {/* ── Scrim ── */}
            <section id="scrim">
              <h2 className="text-lg font-semibold text-foreground mb-1">Scrim</h2>
              <p className="text-sm text-foreground mb-4">
                적용되는 화면에 따라 다이얼로그가 나올 때 스크림 사용 여부를 결정합니다.
              </p>
              <div className="border border-border rounded-lg divide-y divide-border text-sm">
                <div className="flex gap-4 px-5 py-4">
                  <span className="font-semibold text-foreground shrink-0 w-24">background</span>
                  <span className="text-muted-foreground font-mono">rgba(0, 0, 0, 0.5)</span>
                </div>
                <div className="flex gap-4 px-5 py-4">
                  <span className="font-semibold text-foreground shrink-0 w-24">closeOnScrim</span>
                  <span className="text-muted-foreground">스크림 클릭 시 다이얼로그를 닫습니다. 기본값 <CodeBadge>true</CodeBadge></span>
                </div>
              </div>
            </section>

            {/* ── 사용 가이드 ── */}
            <section id="usage" className="scroll-mt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">사용 가이드</h2>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">이중 모달</h3>
                <p className="text-sm text-foreground mb-4">
                  모달 위에 이중 모달 사용을 지양합니다. 상황에 따라 일련의 과정이 필요한 경우 다른 디자인 패턴을 고려하세요.
                  종료 시 확인 모달은 본 가이드에서 제외 대상입니다.
                </p>
                <div className="grid grid-cols-1 gap-6">
                  <UsageCard type="Don't" variant="fill" src="/dialog/usage_double_dont.png" />
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">Header 타이틀</h3>
                <p className="text-sm text-foreground mb-4">
                  Header에 타이틀을 필수로 사용해야 합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" variant="fill" src="/dialog/usage_title_do.png" />
                  <UsageCard type="Don't" variant="fill" src="/dialog/usage_title_dont.png" />
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">Footer 버튼 그룹</h3>
                <p className="text-sm text-foreground mb-4">
                  Footer에 3개의 버튼이 필요할 때 한 쪽에 몰아 넣지 말고 적절히 분배하여 사용합니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <UsageCard type="Do" variant="fill" src="/dialog/usage_footer_do.png" />
                  <UsageCard type="Don't" variant="fill" src="/dialog/usage_footer_dont.png" />
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Usage</h2>
              <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader title="제목" subtitle="서브 제목(선택)" />
    <DialogBody>
      <p>본문 내용이 들어갑니다.</p>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="tertiary" size="sm">취소</Button>
      </DialogClose>
      <Button variant="primary" size="sm">확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Size</h2>
              <CodeBlock code={`{/* Small (기본값) — max-width: 500px */}
<Dialog size="sm">...</Dialog>

{/* Medium — max-width: 800px */}
<Dialog size="md">...</Dialog>

{/* Large — max-width: 1000px */}
<Dialog size="lg">...</Dialog>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Footer 없는 모달</h2>
              <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader title="안내" />
    <DialogBody>
      <p>단순 내용 전달 모달은 Footer 없이 헤더의 닫기 버튼만 사용합니다.</p>
    </DialogBody>
  </DialogContent>
</Dialog>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Divider</h2>
              <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader title="제목" divider />
    <DialogBody>
      <p>헤더와 푸터에 구분선을 표시합니다.</p>
    </DialogBody>
    <DialogFooter divider>
      <DialogClose asChild>
        <Button variant="tertiary" size="sm">취소</Button>
      </DialogClose>
      <Button variant="primary" size="sm">확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">닫기 비활성화</h2>
              <CodeBlock code={`{/* 스크림 클릭 및 ESC 키로 닫기 비활성화 — 폼 작성 중 실수 방지 */}
<Dialog closeOnScrim={false} closeOnEsc={false}>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader title="제목" />
    <DialogBody>
      <p>스크림 클릭이나 ESC 키로 닫히지 않습니다.</p>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="tertiary" size="sm">취소</Button>
      </DialogClose>
      <Button variant="primary" size="sm">확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">닫기 버튼 숨기기</h2>
              <CodeBlock code={`{/* showClose={false} — 헤더 닫기 버튼 미표시, Footer 버튼으로만 닫기 */}
<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader title="제목" showClose={false} />
    <DialogBody>
      <p>헤더의 닫기 버튼이 표시되지 않습니다.</p>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="tertiary" size="sm">취소</Button>
      </DialogClose>
      <Button variant="primary" size="sm">확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Controlled</h2>
              <CodeBlock code={`const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader title="제목" />
    <DialogBody>본문</DialogBody>
    <DialogFooter>
      <Button variant="primary" size="sm" onClick={() => setOpen(false)}>확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
            </section>

            {/* Dialog Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Dialog Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["size",          '"sm" | "md" | "lg"',      '"sm"',  "다이얼로그 너비 (500 / 800 / 1000px)"],
                  ["open",          "boolean",                  "-",     "열림 상태 (controlled)"],
                  ["defaultOpen",   "boolean",                  "false", "초기 열림 상태 (uncontrolled)"],
                  ["onOpenChange",  "(open: boolean) => void",  "-",     "열림 상태 변경 콜백"],
                  ["closeOnScrim",  "boolean",                  "true",  "스크림 클릭 시 닫기 여부"],
                  ["closeOnEsc",    "boolean",                  "true",  "ESC 키로 닫기 여부"],
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

            {/* DialogHeader Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">DialogHeader Props</h2>

              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["title",      "ReactNode", "-",     "헤더 제목"],
                  ["subtitle",   "ReactNode", "-",     "헤더 서브 제목 (선택)"],
                  ["showClose",  "boolean",   "true",  "닫기 버튼 표시 여부"],
                  ["divider",    "boolean",   "false", "헤더 하단 구분선 표시 여부"],
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

            {/* DialogFooter Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">DialogFooter Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["divider", "boolean", "false", "푸터 상단 구분선 표시 여부"],
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
