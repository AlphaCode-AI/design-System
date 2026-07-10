"use client";

import {
  ChevronRight,
  Shapes,
  LayoutTemplate,
  Component,
  Card,
  CardTitle,
  CardDescription,
} from "@alphacode-ai/design-system";
import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
import CodeBadge from "@/app/components/CodeBadge";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import PageHeader from "@/app/components/PageHeader";

const NPMRC = `@alphacode-ai:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}`;
const INSTALL_CMD = "npm install @alphacode-ai/design-system";
const TAILWIND_CODE = `import type { Config } from "tailwindcss";
import { tailwindPreset } from "@alphacode-ai/design-system/tailwind-preset";

const config: Config = {
  presets: [tailwindPreset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./node_modules/@alphacode-ai/design-system/dist/**/*.js",
  ],
};

export default config;`;
const STYLES_CODE = `@import "@alphacode-ai/design-system/styles.css";`;
const USAGE_CODE = `import { Button, Badge } from "@alphacode-ai/design-system";

export default function App() {
  return (
    <div>
      <Badge variant="primary">v0.3.2</Badge>
      <Button variant="primary">시작하기</Button>
    </div>
  );
}`;

const toc: TocItem[] = [
  { id: "install",  label: "설치" },
  { id: "tailwind", label: "Tailwind 설정" },
  { id: "styles",   label: "스타일 추가" },
  { id: "usage",    label: "컴포넌트 사용" },
  { id: "next",     label: "다음 단계" },
];


export default function HomePage() {
  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10">

        <PageHeader
          title="시작하기"
          description="VEGA UI를 프로젝트에 추가하고 알파코드 디자인 시스템으로 개발을 시작하세요."
          border
        />

        <div className="space-y-8">

        {/* 설치 */}
        <section id="install" className="scroll-mt-8 space-y-2">
          <h2 className="text-xl font-bold text-foreground">설치</h2>
          <p className="text-sm text-foreground leading-relaxed">
            VEGA UI는 GitHub Packages를 통해 배포됩니다. 설치 전 <CodeBadge>.npmrc</CodeBadge>에
            레지스트리와 GitHub PAT(<CodeBadge>NPM_TOKEN</CodeBadge>)를 먼저 등록하세요.
          </p>
          <CodeBlock label=".npmrc" lang="text" code={NPMRC} copyText={NPMRC} />
          <p className="text-sm text-foreground leading-relaxed">
            레지스트리 설정 후 패키지를 설치합니다.
          </p>
          <CodeBlock label="터미널" lang="bash" code={INSTALL_CMD} copyText={INSTALL_CMD} />
        </section>

        {/* Tailwind 설정 */}
        <section id="tailwind" className="scroll-mt-8 space-y-2">
          <h2 className="text-xl font-bold text-foreground">Tailwind 설정</h2>
          <p className="text-sm text-foreground leading-relaxed">
            <CodeBadge>tailwind.config.ts</CodeBadge>에 프리셋을 추가하면 <CodeBadge>ac-</CodeBadge> 토큰과
            컴포넌트 스타일이 자동으로 활성화됩니다.
          </p>
          <CodeBlock label="tailwind.config.ts" lang="ts" code={TAILWIND_CODE} copyText={TAILWIND_CODE} />
        </section>

        {/* 스타일 추가 */}
        <section id="styles" className="scroll-mt-8 space-y-2">
          <h2 className="text-xl font-bold text-foreground">스타일 추가</h2>
          <p className="text-sm text-foreground leading-relaxed">
            전역 CSS 파일에 디자인 시스템 스타일시트를 임포트합니다. CSS 변수 및 기본 리셋이 포함됩니다.
          </p>
          <CodeBlock label="globals.css" lang="css" code={STYLES_CODE} copyText={STYLES_CODE} />
        </section>

        {/* 컴포넌트 사용 */}
        <section id="usage" className="scroll-mt-8 space-y-2">
          <h2 className="text-xl font-bold text-foreground">컴포넌트 사용</h2>
          <p className="text-sm text-foreground leading-relaxed">
            설정이 완료되면 컴포넌트를 임포트하여 사용합니다. 외부 라이브러리나 순수 HTML 태그 사용을 지양하고
            시스템에서 제공하는 공식 컴포넌트로 UI 정합성을 유지하세요.
          </p>
          <CodeBlock label="page.tsx" lang="tsx" code={USAGE_CODE} copyText={USAGE_CODE} />
          <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
            <p className="font-semibold text-foreground">개발 규칙</p>
            <ul className="space-y-1.5 text-muted-foreground list-disc list-inside leading-relaxed">
              <li>컬러·간격 적용 시 반드시 <CodeBadge>ac-</CodeBadge> 접두사 토큰을 사용합니다.</li>
              <li>정의된 공식 컴포넌트를 우선 사용하고 직접 태그 작성은 최소화합니다.</li>
              <li>테마 상속을 위해 <CodeBadge>tailwind.config.ts</CodeBadge>에 프리셋 설정을 반드시 포함합니다.</li>
            </ul>
          </div>
        </section>

        {/* 다음 단계 */}
        <section id="next" className="scroll-mt-8 space-y-2">
          <h2 className="text-xl font-bold text-foreground">다음 단계</h2>
          <p className="text-sm text-foreground leading-relaxed">
            설치가 완료됐다면 로고, 파운데이션 토큰, 컴포넌트 문서를 참고해 개발을 시작하세요.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/logo">
              <Card variant="line" interactive className="group flex flex-col justify-between p-5 h-full bg-card hover:shadow-md">
                <div className="flex flex-col gap-3">
                  <div className="text-ac-primary-50"><Shapes size={24} strokeWidth={1.5} /></div>
                  <div>
                    <CardTitle className="text-base font-bold text-foreground">Logo</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground mt-1">
                      알파코드 브랜드 로고 시스템과 사용 가이드라인
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-md bg-muted px-3 py-2 text-xs font-semibold text-foreground group-hover:bg-ac-primary-10 group-hover:text-ac-primary-60 transition-colors">
                  <span>로고 보기</span>
                  <ChevronRight size={14} />
                </div>
              </Card>
            </Link>

            <Link href="/foundation/breakpoints">
              <Card variant="line" interactive className="group flex flex-col justify-between p-5 h-full bg-card hover:shadow-md">
                <div className="flex flex-col gap-3">
                  <div className="text-ac-primary-50"><LayoutTemplate size={24} strokeWidth={1.5} /></div>
                  <div>
                    <CardTitle className="text-base font-bold text-foreground">Foundation</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground mt-1">
                      컬러 팔레트, 타이포그래피, 그리드 시스템
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-md bg-muted px-3 py-2 text-xs font-semibold text-foreground group-hover:bg-ac-primary-10 group-hover:text-ac-primary-60 transition-colors">
                  <span>파운데이션 보기</span>
                  <ChevronRight size={14} />
                </div>
              </Card>
            </Link>

            <Link href="/components/accordion">
              <Card variant="line" interactive className="group flex flex-col justify-between p-5 h-full bg-card hover:shadow-md">
                <div className="flex flex-col gap-3">
                  <div className="text-ac-primary-50"><Component size={24} strokeWidth={1.5} /></div>
                  <div>
                    <CardTitle className="text-base font-bold text-foreground">Components</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground mt-1">
                      즉시 사용 가능한 표준 UI 컴포넌트 모음
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-md bg-muted px-3 py-2 text-xs font-semibold text-foreground group-hover:bg-ac-primary-10 group-hover:text-ac-primary-60 transition-colors">
                  <span>컴포넌트 보기</span>
                  <ChevronRight size={14} />
                </div>
              </Card>
            </Link>
          </div>
        </section>

        </div>
      </div>

      <TableOfContents items={toc} />
    </div>
  );
}
