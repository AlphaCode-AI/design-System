"use client";

import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownAvatarHeader,
  DropdownAvatarItem,
  DropdownSubMenu,
  Button,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  Edit,
  Copy,
  Share2,
  Trash2,
  Archive,
  Move,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  MoreHorizontal,
  Mail,
  Star,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";

const toc: TocItem[] = [
  { id: "type",       label: "Type" },
  { id: "state",      label: "State" },
  { id: "trigger",    label: "Trigger" },
  { id: "alignment",  label: "Responsive alignment" },
  { id: "submenu",    label: "Sub dropdown" },
];

/* ── Context menu 데모 ── */
function ContextMenuDemo() {
  return (
    <Dropdown trigger="contextmenu">
      <div className="border-2 border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground text-center select-none cursor-context-menu w-[200px]">
        여기에 오른쪽 마우스를 클릭하세요.
      </div>
      <DropdownContent>
        <DropdownItem icon={<Edit width={14} height={14} />}>Edit</DropdownItem>
        <DropdownItem icon={<Copy width={14} height={14} />}>Duplicate</DropdownItem>
        <DropdownItem icon={<Share2 width={14} height={14} />}>Share</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export default function DropdownPage() {
  const [activeTab, setActiveTab] = useState("docs");
  const [checkState, setCheckState] = useState({ statusBar: true, activityBar: false, panel: true });
  const [radioValue, setRadioValue] = useState("bottom");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-10 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Dropdown</h1>
          <p className="text-sm text-foreground leading-relaxed">
            드롭다운(dropdown)은 선택할 수 있는 옵션이 여러개인 경우 해당 옵션을 묶어 사용자에게
            표출되는 컴포넌트입니다. 트리거를 클릭하면 드롭다운이 표출됩니다.
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
                드롭다운 아이템은 Default, Checkbox, Radio, Small 4가지 타입을 지원합니다.
              </p>
              <div className="rounded-lg p-8 bg-ac-gray-20 flex gap-12 flex-wrap justify-center items-start">

                {/* Default */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">Default</p>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="secondary" size="sm">열기</Button>
                    </DropdownTrigger>
                    <DropdownContent minWidth={200}>
                      <DropdownLabel>Actions</DropdownLabel>
                      <DropdownItem shortcut="⌘E">Edit</DropdownItem>
                      <DropdownItem shortcut="⇧⌘D">Duplicate</DropdownItem>
                      <DropdownItem shortcut="⌥⌘A">Archive</DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem shortcut="⌘⌫" icon={<Trash2 width={14} height={14} />}>Delete</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </div>

                {/* Checkbox */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">Checkbox</p>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="secondary" size="sm">열기</Button>
                    </DropdownTrigger>
                    <DropdownContent minWidth={200}>
                      <DropdownLabel>Appearance</DropdownLabel>
                      <DropdownCheckboxItem
                        checked={checkState.statusBar}
                        onCheckedChange={(v) => setCheckState(s => ({ ...s, statusBar: v }))}
                      >Status Bar</DropdownCheckboxItem>
                      <DropdownCheckboxItem
                        checked={checkState.activityBar}
                        onCheckedChange={(v) => setCheckState(s => ({ ...s, activityBar: v }))}
                      >Activity Bar</DropdownCheckboxItem>
                      <DropdownCheckboxItem
                        checked={checkState.panel}
                        onCheckedChange={(v) => setCheckState(s => ({ ...s, panel: v }))}
                      >Panel</DropdownCheckboxItem>
                    </DropdownContent>
                  </Dropdown>
                </div>

                {/* Radio */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">Radio</p>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="secondary" size="sm">열기</Button>
                    </DropdownTrigger>
                    <DropdownContent minWidth={200}>
                      <DropdownLabel>Position</DropdownLabel>
                      <DropdownRadioGroup value={radioValue} onValueChange={setRadioValue}>
                        <DropdownRadioItem value="top">Top</DropdownRadioItem>
                        <DropdownRadioItem value="bottom">Bottom</DropdownRadioItem>
                        <DropdownRadioItem value="left">Left</DropdownRadioItem>
                        <DropdownRadioItem value="right">Right</DropdownRadioItem>
                      </DropdownRadioGroup>
                    </DropdownContent>
                  </Dropdown>
                </div>

                {/* Small */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">Small</p>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="secondary" size="sm">열기</Button>
                    </DropdownTrigger>
                    <DropdownContent minWidth={140}>
                      <DropdownItem small>Edit</DropdownItem>
                      <DropdownItem small>Duplicate</DropdownItem>
                      <DropdownItem small>Share</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">Email</p>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="secondary" size="sm">열기</Button>
                    </DropdownTrigger>
                    <DropdownContent minWidth={220}>
                      <DropdownAvatarHeader
                        name="alphacode"
                        label="Email"
                        description="alphacode@alphacode.co.kr"
                      />
                      <DropdownSeparator />
                      <DropdownItem icon={<Settings width={14} height={14} />}>Account settings</DropdownItem>
                      <DropdownItem icon={<HelpCircle width={14} height={14} />}>Support</DropdownItem>
                      <DropdownItem icon={<Star width={14} height={14} />}>License</DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem icon={<LogOut width={14} height={14} />}>Sign out</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </div>

                {/* User */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">User</p>
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="secondary" size="sm">열기</Button>
                    </DropdownTrigger>
                    <DropdownContent minWidth={220}>
                      <DropdownLabel>People</DropdownLabel>
                      <DropdownAvatarItem name="jsmoon" label="May" description="jsmoon@alphacode.co.kr" />
                      <DropdownAvatarItem name="moon" label="Moon" description="may@alphacode.co.kr" />
                      <DropdownSeparator />
                      <DropdownLabel>Options</DropdownLabel>
                      <DropdownItem icon={<Settings width={14} height={14} />}>Settings</DropdownItem>
                      <DropdownItem icon={<HelpCircle width={14} height={14} />}>Help</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </div>

              </div>
            </section>

            {/* ── Trigger ── */}
            <section id="trigger">
              <h2 className="text-lg font-semibold text-foreground mb-1">Trigger</h2>
              <p className="text-sm text-foreground mb-4">
                트리거는 버튼, 아이콘, 텍스트 또는 마우스 우클릭이 될 수 있으며, 클릭과 호버 두 가지 방식으로 열 수 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Click */}
                <div className="border border-border rounded-lg p-6 bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Click</p>
                  <div className="flex gap-8 flex-wrap">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">버튼</p>
                      <Dropdown trigger="click">
                        <DropdownTrigger asChild>
                          <Button variant="tertiary" size="sm">더보기</Button>
                        </DropdownTrigger>
                        <DropdownContent>
                          <DropdownItem icon={<Edit width={14} height={14} />}>Edit</DropdownItem>
                          <DropdownItem icon={<Copy width={14} height={14} />}>Duplicate</DropdownItem>
                          <DropdownItem icon={<Share2 width={14} height={14} />}>Share</DropdownItem>
                          <DropdownSeparator />
                          <DropdownItem icon={<Trash2 width={14} height={14} />} disabled>Delete</DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">아이콘</p>
                      <Dropdown trigger="click">
                        <DropdownTrigger asChild>
                          <button className="p-1.5 rounded-md hover:bg-ac-gray-20 transition-colors">
                            <MoreHorizontal width={16} height={16} />
                          </button>
                        </DropdownTrigger>
                        <DropdownContent>
                          <DropdownItem icon={<Edit width={14} height={14} />}>Edit</DropdownItem>
                          <DropdownItem icon={<Copy width={14} height={14} />}>Duplicate</DropdownItem>
                          <DropdownItem icon={<Share2 width={14} height={14} />}>Share</DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 min-w-[240px]">
                      <p className="text-xs font-medium text-foreground">우클릭 (Context menu)</p>
                      <ContextMenuDemo />
                    </div>
                  </div>
                </div>

                {/* Hover */}
                <div className="border border-border rounded-lg p-6 bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Hover</p>
                  <div className="flex gap-8 flex-wrap">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">버튼</p>
                      <Dropdown trigger="hover">
                        <DropdownTrigger asChild>
                          <Button variant="tertiary" size="sm">더보기</Button>
                        </DropdownTrigger>
                        <DropdownContent>
                          <DropdownItem icon={<Edit width={14} height={14} />}>Edit</DropdownItem>
                          <DropdownItem icon={<Copy width={14} height={14} />}>Duplicate</DropdownItem>
                          <DropdownItem icon={<Share2 width={14} height={14} />}>Share</DropdownItem>
                          <DropdownSeparator />
                          <DropdownItem icon={<Trash2 width={14} height={14} />} disabled>Delete</DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium text-foreground">아이콘</p>
                      <Dropdown trigger="hover">
                        <DropdownTrigger asChild>
                          <button className="p-1.5 rounded-md hover:bg-ac-gray-20 transition-colors">
                            <MoreHorizontal width={16} height={16} />
                          </button>
                        </DropdownTrigger>
                        <DropdownContent>
                          <DropdownItem icon={<Edit width={14} height={14} />}>Edit</DropdownItem>
                          <DropdownItem icon={<Copy width={14} height={14} />}>Duplicate</DropdownItem>
                          <DropdownItem icon={<Share2 width={14} height={14} />}>Share</DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Responsive alignment ── */}
            <section id="alignment">
              <h2 className="text-lg font-semibold text-foreground mb-1">Responsive alignment</h2>
              <p className="text-sm text-foreground mb-4">
                트리거 클릭 시 드롭다운 표출 위치는 <CodeBadge>side</CodeBadge>와 <CodeBadge>align</CodeBadge> prop으로 지정합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex flex-col gap-10">
                {(["top", "bottom"] as const).map((side) => (
                  <div key={side} className="flex flex-col gap-3 items-center">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{side}</p>
                    <div className="flex gap-10 flex-wrap justify-around w-full">
                      {(["start", "center", "end"] as const).map((align) => (
                        <div key={align} className="flex flex-col gap-2 items-center">
                          <p className="text-xs font-medium text-foreground">{side}, {align}</p>
                          <Dropdown side={side} align={align}>
                            <DropdownTrigger asChild>
                              <Button variant="tertiary" size="sm">더보기</Button>
                            </DropdownTrigger>
                            <DropdownContent>
                              <DropdownItem>Edit</DropdownItem>
                              <DropdownItem>Duplicate</DropdownItem>
                              <DropdownItem>Share</DropdownItem>
                            </DropdownContent>
                          </Dropdown>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Sub dropdown ── */}
            <section id="submenu">
              <h2 className="text-lg font-semibold text-foreground mb-1">Sub dropdown</h2>
              <p className="text-sm text-foreground mb-4">
                드롭다운 안에 드롭다운을 사용할 수 있습니다. Depth는 두 번째까지만 사용합니다.
              </p>
              <div className="border border-border rounded-lg p-8 bg-card flex justify-center">
                <Dropdown side="top" align="end">
                  <DropdownTrigger asChild>
                    <Button variant="tertiary" size="sm">Options</Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    <DropdownSubMenu id="people" trigger="People">
                      <DropdownItem icon={<Users width={14} height={14} />}>jsmoon@alphacode.co.kr</DropdownItem>
                      <DropdownItem icon={<Users width={14} height={14} />}>may@alphacode.co.kr</DropdownItem>
                      <DropdownItem icon={<Users width={14} height={14} />}>moon</DropdownItem>
                    </DropdownSubMenu>
                    <DropdownSubMenu id="email" trigger="Email">
                      <DropdownItem icon={<Mail width={14} height={14} />}>alphacode@alphacode.co.kr</DropdownItem>
                    </DropdownSubMenu>
                    <DropdownSeparator />
                    <DropdownItem icon={<Edit width={14} height={14} />}>Edit</DropdownItem>
                    <DropdownItem icon={<Trash2 width={14} height={14} />}>Delete</DropdownItem>
                  </DropdownContent>
                </Dropdown>
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
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownAvatarHeader,
  DropdownAvatarItem,
  DropdownSubMenu,
} from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Basic Usage</h2>
              <p className="text-sm text-foreground mb-4">기본 드롭다운 구조입니다. <CodeBadge>Dropdown</CodeBadge>으로 감싸고, <CodeBadge>DropdownTrigger</CodeBadge>에 트리거 요소를, <CodeBadge>DropdownContent</CodeBadge> 안에 아이템을 배치합니다.</p>
              <CodeBlock code={`<Dropdown>
  <DropdownTrigger asChild>
    <Button>더보기</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem shortcut="⌘D">Duplicate</DropdownItem>
    <DropdownSeparator />
    <DropdownItem disabled>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Label & Separator</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>DropdownLabel</CodeBadge>로 그룹 제목을, <CodeBadge>DropdownSeparator</CodeBadge>로 아이템 사이 구분선을 추가합니다. <CodeBadge>icon</CodeBadge> prop으로 아이템 좌측에 아이콘을 넣을 수 있습니다.</p>
              <CodeBlock code={`<DropdownContent>
  <DropdownLabel>Actions</DropdownLabel>
  <DropdownItem icon={<Edit />}>Edit</DropdownItem>
  <DropdownItem icon={<Copy />}>Duplicate</DropdownItem>
  <DropdownSeparator />
  <DropdownItem icon={<Trash2 />}>Delete</DropdownItem>
</DropdownContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Checkbox</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>DropdownCheckboxItem</CodeBadge>은 체크박스가 포함된 아이템입니다. <CodeBadge>checked</CodeBadge>와 <CodeBadge>onCheckedChange</CodeBadge>로 상태를 제어합니다.</p>
              <CodeBlock code={`const [checked, setChecked] = useState(true);

<DropdownContent>
  <DropdownLabel>Appearance</DropdownLabel>
  <DropdownCheckboxItem
    checked={checked}
    onCheckedChange={setChecked}
  >
    Status Bar
  </DropdownCheckboxItem>
</DropdownContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Radio</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>DropdownRadioGroup</CodeBadge>으로 라디오 그룹을 감싸고, <CodeBadge>DropdownRadioItem</CodeBadge>으로 각 항목을 구성합니다. 단일 선택이 필요한 옵션 목록에 사용합니다.</p>
              <CodeBlock code={`const [value, setValue] = useState("bottom");

<DropdownContent>
  <DropdownLabel>Position</DropdownLabel>
  <DropdownRadioGroup value={value} onValueChange={setValue}>
    <DropdownRadioItem value="top">Top</DropdownRadioItem>
    <DropdownRadioItem value="bottom">Bottom</DropdownRadioItem>
    <DropdownRadioItem value="left">Left</DropdownRadioItem>
    <DropdownRadioItem value="right">Right</DropdownRadioItem>
  </DropdownRadioGroup>
</DropdownContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Email (Avatar Header)</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>DropdownAvatarHeader</CodeBadge>는 클릭되지 않는 헤더 영역으로, 아바타와 이름·이메일을 함께 표시합니다. 계정 메뉴 상단 사용자 정보 표시에 사용합니다.</p>
              <CodeBlock code={`<DropdownContent>
  <DropdownAvatarHeader
    name="alphacode"
    label="Email"
    description="alphacode@alphacode.co.kr"
  />
  <DropdownSeparator />
  <DropdownItem icon={<Settings />}>Account settings</DropdownItem>
  <DropdownItem icon={<HelpCircle />}>Support</DropdownItem>
  <DropdownItem icon={<LogOut />}>Sign out</DropdownItem>
</DropdownContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">User (Avatar Item)</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>DropdownAvatarItem</CodeBadge>은 클릭 가능한 아이템으로, 아바타와 이름·부가 정보를 함께 표시합니다. 사용자 목록 선택 등에 사용합니다.</p>
              <CodeBlock code={`<DropdownContent>
  <DropdownLabel>People</DropdownLabel>
  <DropdownAvatarItem
    name="jsmoon"
    label="May"
    description="jsmoon@alphacode.co.kr"
  />
  <DropdownAvatarItem
    name="moon"
    label="Moon"
    description="may@alphacode.co.kr"
  />
  <DropdownSeparator />
  <DropdownLabel>Options</DropdownLabel>
  <DropdownItem icon={<Settings />}>Settings</DropdownItem>
  <DropdownItem icon={<HelpCircle />}>Help</DropdownItem>
</DropdownContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Sub dropdown</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>DropdownSubMenu</CodeBadge>로 드롭다운 안에 중첩 메뉴를 만듭니다. 호버 시 우측으로 열리며, depth는 2단계까지만 사용합니다.</p>
              <CodeBlock code={`<DropdownContent>
  <DropdownSubMenu id="people" trigger="People">
    <DropdownItem>jsmoon@alphacode.co.kr</DropdownItem>
    <DropdownItem>may@alphacode.co.kr</DropdownItem>
  </DropdownSubMenu>
  <DropdownSeparator />
  <DropdownItem>Edit</DropdownItem>
</DropdownContent>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Hover trigger</h2>
              <p className="text-sm text-foreground mb-4">기본값은 클릭으로 열리며, <CodeBadge>trigger="hover"</CodeBadge>로 마우스 호버 시 자동으로 열리게 할 수 있습니다.</p>
              <CodeBlock code={`{/* 기본값: "click" */}
<Dropdown trigger="hover">
  <DropdownTrigger asChild>
    <Button>더보기</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
  </DropdownContent>
</Dropdown>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Context menu (우클릭)</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>trigger="contextmenu"</CodeBadge>를 사용하면 우클릭 시 마우스 커서 위치에 드롭다운이 열립니다.</p>
              <CodeBlock code={`<Dropdown trigger="contextmenu">
  <div>우클릭 영역</div>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
  </DropdownContent>
</Dropdown>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-1">Alignment</h2>
              <p className="text-sm text-foreground mb-4"><CodeBadge>side</CodeBadge>로 드롭다운이 열리는 방향을, <CodeBadge>align</CodeBadge>으로 트리거 기준 정렬 위치를 지정합니다.</p>
              <CodeBlock code={`{/* side: "top" | "bottom" | "left" | "right"  (기본값: "bottom") */}
{/* align: "start" | "center" | "end"          (기본값: "start") */}
<Dropdown side="top" align="end">...</Dropdown>
<Dropdown side="bottom" align="center">...</Dropdown>`} />
            </section>

            {/* Dropdown Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Dropdown Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["open",          "boolean",                   "-",          "열림 여부 (controlled)"],
                  ["defaultOpen",   "boolean",                   "false",      "초기 열림 여부 (uncontrolled)"],
                  ["onOpenChange",  "(open: boolean) => void",   "-",          "열림 상태 변경 콜백"],
                  ["side",          '"top"|"bottom"|"left"|"right"', '"bottom"', "드롭다운 표출 방향"],
                  ["align",         '"start"|"center"|"end"',    '"start"',    "드롭다운 정렬 위치"],
                  ["trigger",       '"click" | "hover"',         '"click"',    "드롭다운 열림 방식"],
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

            {/* DropdownItem Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">DropdownItem Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["icon",      "ReactNode",  "-",     "좌측 아이콘"],
                  ["shortcut",  "string",     "-",     "우측 단축키 힌트"],
                  ["external",  "boolean",    "false", "외부 링크 아이콘 표시"],
                  ["small",     "boolean",    "false", "작은 사이즈"],
                  ["disabled",  "boolean",    "false", "비활성화 여부"],
                  ["onSelect",  "() => void", "-",     "아이템 선택 콜백"],
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

            {/* DropdownCheckboxItem Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">DropdownCheckboxItem Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["checked",          "boolean",                   "-",     "체크 여부 (controlled)"],
                  ["defaultChecked",   "boolean",                   "false", "초기 체크 여부"],
                  ["onCheckedChange",  "(checked: boolean) => void","-",     "체크 변경 콜백"],
                  ["disabled",         "boolean",                   "false", "비활성화 여부"],
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

            {/* DropdownRadioGroup / DropdownRadioItem Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">DropdownRadioGroup Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["value",          "string",                   "-",  "선택된 값 (controlled)"],
                  ["defaultValue",   "string",                   '""', "초기 선택 값"],
                  ["onValueChange",  "(value: string) => void",  "-",  "선택 변경 콜백"],
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

            {/* DropdownSubMenu Props */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">DropdownSubMenu Props</h2>
              <div
                style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr 1fr 2fr" }}
                className="border border-border rounded-lg overflow-hidden text-sm"
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
                ))}
                {[
                  ["id",       "string",    "-",     "서브메뉴 고유 식별자"],
                  ["trigger",  "ReactNode", "-",     "서브메뉴 트리거 레이블"],
                  ["disabled", "boolean",   "false", "비활성화 여부"],
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
