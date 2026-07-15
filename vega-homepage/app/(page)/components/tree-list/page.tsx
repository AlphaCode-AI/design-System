"use client";

import { useState } from "react";
import {
  TreeList,
  TreeListItemData,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  FileCode,
  FileImage,
  FileText,
} from "@alphacode-ai/design-system";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import PropsTable from "@/app/components/PropsTable";
import PageHeader from "@/app/components/PageHeader";
import PreviewBox from "@/app/components/PreviewBox";

const toc: TocItem[] = [
  { id: "preview", label: "Preview" },
  { id: "icon",    label: "아이콘" },
  { id: "density", label: "간격" },
  { id: "header",  label: "Header" },
];

const SAMPLE_TREE: TreeListItemData[] = [
  {
    id: "src", label: "src", isExpanded: true,
    children: [
      {
        id: "components", label: "components", isExpanded: true,
        children: [
          { id: "button", label: "Button.tsx" },
          { id: "input",  label: "Input.tsx" },
        ],
      },
      {
        id: "assets", label: "assets",
        children: [
          { id: "logo",   label: "logo.svg" },
          { id: "banner", label: "banner.png" },
        ],
      },
      { id: "index", label: "index.ts" },
    ],
  },
  { id: "readme",  label: "README.md" },
  { id: "package", label: "package.json" },
];

const ICON_TREE: TreeListItemData[] = [
  {
    id: "src2", label: "src", isExpanded: true,
    children: [
      {
        id: "components2", label: "components", isExpanded: true,
        children: [
          { id: "button2", label: "Button.tsx",  icon: <FileCode size={13} /> },
          { id: "input2",  label: "Input.tsx",   icon: <FileCode size={13} /> },
        ],
      },
      {
        id: "assets2", label: "assets",
        children: [
          { id: "logo2",   label: "logo.svg",   icon: <FileImage size={13} /> },
          { id: "banner2", label: "banner.png", icon: <FileImage size={13} /> },
        ],
      },
      { id: "index2", label: "index.ts", icon: <FileCode size={13} /> },
    ],
  },
  { id: "readme2",  label: "README.md",    icon: <FileText size={13} /> },
  { id: "package2", label: "package.json", icon: <FileText size={13} /> },
];

const DENSITY_TREE: TreeListItemData[] = [
  {
    id: "documents", label: "Documents", isExpanded: true,
    children: [
      { id: "doc1", label: "report.pdf" },
      { id: "doc2", label: "notes.txt" },
    ],
  },
  { id: "readme3", label: "README.md" },
];

export default function TreeListPage() {
  const [activeTab, setActiveTab] = useState("docs");
  const [selectedId, setSelectedId] = useState("button");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-8">

        <PageHeader
          title="Tree List"
          description="파일 시스템이나 계층 구조 데이터를 표현하는 트리 컴포넌트입니다. 폴더 열기/닫기, 아이템 선택, 밀도 조절을 지원합니다."
        />

        <Tabs defaultValue="docs" onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="docs">Docs</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>

          {/* ═══════════ DOCS ═══════════ */}
          <TabContent value="docs" className="mt-6 space-y-14">

            {/* ── Preview ── */}
            <section id="preview">
              <h2 className="text-lg font-semibold text-foreground mb-1">Preview</h2>
              <p className="text-sm text-foreground mb-4">
                폴더는 클릭 시 열리고 닫힙니다. 아이템을 선택하면 하이라이트됩니다.
              </p>
              <PreviewBox variant="border" className="flex items-start justify-center p-8">
                <div className="w-56">
                  <TreeList
                    items={SAMPLE_TREE}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
              </PreviewBox>
            </section>

            {/* ── 아이콘 ── */}
            <section id="icon">
              <h2 className="text-lg font-semibold text-foreground mb-1">아이콘</h2>
              <p className="text-sm text-foreground mb-4">
                각 노드에 <CodeBadge>icon</CodeBadge> prop으로 아이콘을 추가할 수 있습니다.
              </p>
              <PreviewBox variant="border" className="flex items-start justify-center p-8">
                <div className="w-56">
                  <TreeList
                    items={ICON_TREE}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
              </PreviewBox>
            </section>

            {/* ── Density ── */}
            <section id="density">
              <h2 className="text-lg font-semibold text-foreground mb-1">간격</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>density</CodeBadge> prop으로 아이템 간격을 조절합니다.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["compact", "balanced", "spacious"] as const).map((d) => (
                <PreviewBox variant="gray" className="p-8">
                    <div key={d} className="space-y-2">
                      <p className="text-xs text-muted-foreground font-mono mb-3">{d}</p>
                      <TreeList
                        items={DENSITY_TREE}
                        density={d}
                        />
                    </div>
                </PreviewBox>
                ))}
              </div>
            </section>

            {/* ── Header ── */}
            <section id="header">
              <h2 className="text-lg font-semibold text-foreground mb-1">Header</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>header</CodeBadge> prop으로 트리 상단에 레이블을 추가합니다.
              </p>
              <PreviewBox variant="border" className="flex items-start justify-center p-8">
                <div className="w-56">
                  <TreeList
                    items={DENSITY_TREE}
                    header="탐색기"
                  />
                </div>
              </PreviewBox>
            </section>

          </TabContent>

          {/* ═══════════ CODE ═══════════ */}
          <TabContent value="code" className="mt-6 space-y-8">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Import</h2>
              <p className="text-sm text-foreground mb-4">
                컴포넌트와 데이터 타입을 함께 import합니다.{" "}
                <CodeBadge>TreeListItemData</CodeBadge>는 트리 노드 구조를 정의하는 인터페이스입니다.
              </p>
              <CodeBlock code={`import { TreeList } from "@alphacode-ai/design-system";
import type { TreeListItemData } from "@alphacode-ai/design-system";`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Basic Usage</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>children</CodeBadge> 배열이 있는 노드는 자동으로 폴더(접기/펼치기)로 렌더됩니다.{" "}
                <CodeBadge>isExpanded: true</CodeBadge>로 초기 펼침 상태를 설정할 수 있습니다.{" "}
                <CodeBadge>selectedId</CodeBadge>와 <CodeBadge>onSelect</CodeBadge>로 선택 상태를 제어합니다.
              </p>
              <CodeBlock code={`const [selectedId, setSelectedId] = useState("app");

const items: TreeListItemData[] = [
  {
    id: "src",
    label: "src",
    isExpanded: true,        // 초기 펼침
    children: [
      { id: "app",   label: "App.tsx",   icon: <FileCode size={13} /> },
      { id: "index", label: "index.ts",  icon: <FileCode size={13} /> },
    ],
  },
  { id: "readme", label: "README.md", icon: <FileText size={13} /> },
];

<TreeList
  items={items}
  selectedId={selectedId}
  onSelect={setSelectedId}    // 폴더·파일 모두 선택 가능
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">간격</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>density</CodeBadge>로 아이템 간 수직 여백을 조절합니다.
                기본값은 <CodeBadge>"balanced"</CodeBadge>이며, 공간이 좁을 때는 <CodeBadge>"compact"</CodeBadge>,
                여유로운 레이아웃에는 <CodeBadge>"spacious"</CodeBadge>를 사용합니다.
              </p>
              <CodeBlock code={`<TreeList items={items} density="compact" />   // 간격 좁음
<TreeList items={items} density="balanced" />  // 기본 (권장)
<TreeList items={items} density="spacious" />  // 간격 넓음`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Header</h2>
              <p className="text-sm text-foreground mb-4">
                <CodeBadge>header</CodeBadge>로 트리 상단에 섹션 레이블을 추가합니다.
                문자열 또는 ReactNode를 전달할 수 있습니다.
              </p>
              <CodeBlock code={`// 문자열 레이블
<TreeList items={items} header="탐색기" />

// ReactNode 레이블 (버튼 등 포함 가능)
<TreeList
  items={items}
  header={
    <div className="flex items-center justify-between">
      <span>탐색기</span>
      <Button variant="ghost" size="xs">+</Button>
    </div>
  }
/>`} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Props</h2>
              <p className="text-sm font-semibold text-foreground mb-2">TreeList</p>
              <PropsTable
                rows={[
                  ["items",      "TreeListItemData[]",                     "-",          "트리 데이터 (필수)"],
                  ["density",    "'compact' | 'balanced' | 'spacious'",    "'balanced'", "아이템 간격 밀도"],
                  ["header",     "ReactNode",                              "-",          "트리 상단 레이블"],
                  ["selectedId", "string",                                 "-",          "선택된 아이템 id"],
                  ["onSelect",   "(id: string) => void",                   "-",          "아이템 선택 콜백"],
                  ["className",  "string",                                 "-",          "추가 Tailwind 클래스"],
                ]}
              />
              <p className="text-sm font-semibold text-foreground mt-6 mb-2">TreeListItemData</p>
              <PropsTable
                rows={[
                  ["id",         "string",              "-",     "고유 식별자 (필수)"],
                  ["label",      "string",              "-",     "표시 텍스트 (필수)"],
                  ["icon",       "ReactNode",           "-",     "좌측 아이콘"],
                  ["children",   "TreeListItemData[]",  "-",     "자식 노드 (있으면 폴더로 렌더됨)"],
                  ["isExpanded", "boolean",             "false", "초기 펼침 여부"],
                ]}
              />
            </section>

          </TabContent>
        </Tabs>
      </div>

      {activeTab === "docs" && <TableOfContents items={toc} />}
    </div>
  );
}
