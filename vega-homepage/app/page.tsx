"use client";

import { useState } from "react";
import {
  ChevronRight,
  Shapes,
  LayoutTemplate,
  Component,
  Card,
  CardTitle,
  CardDescription,
  Badge,
  Copy,
  Check,
} from "@alphacode-ai/design-system";
import Link from "next/link";
import CodeBadge from "@/app/components/CodeBadge";

const INSTALL_CMD = "npm install @alphacode-ai/design-system";
const NPMRC_CONTENT = `@alphacode-ai:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}`;

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [copiedNpmrc, setCopiedNpmrc] = useState(false);

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  const handleCopy = () => {
    copyToClipboard(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyNpmrc = () => {
    copyToClipboard(NPMRC_CONTENT);
    setCopiedNpmrc(true);
    setTimeout(() => setCopiedNpmrc(false), 2000);
  };

  return (
    <div  className="flex w-full">
      <div className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-8">
        
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-ac-primary-50">환영합니다 😄</h1>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                VEGA UI - 알파코드 디자인 시스템</h1>
              <Badge variant="primary" size="md" className="md:hidden">v0.3.0</Badge>
              <Badge variant="primary" size="lg" className="hidden md:inline-flex">version 0.3.0</Badge>
            </div>
          </div>
        </header>

        <section className="p-4 md:p-8 rounded-lg border border-ac-gray-40 flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Getting Started</h2>
            <p className="text-sm md:text-md text-foreground leading-relaxed mt-1 md:mt-2 max-w-5xl font-medium">
              VEGA UI는 Tailwind CSS 기반의 <b>알파코드 전용 토큰(<CodeBadge>ac-</CodeBadge>)</b>과 <b>고유 컴포넌트</b>로 구축되었습니다.<br />
              외부 라이브러리나 순수 HTML 태그 사용을 지양하고, 시스템에서 제공하는 공식 컴포넌트를 사용하여 UI 정합성을 유지해야 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-ac-gray-40 pt-6 md:pt-8">
            <div className="flex flex-col gap-4">
              {/* text-primary -> text-ac-primary-50 변경 */}
              <h3 className="text-base md:text-lg font-bold text-ac-primary-50">1. Library Installation</h3>
              <p className="text-sm md:text-md text-foreground">GitHub Packages를 통해 알파코드 패키지를 설치합니다.</p>
              <p className="text-sm md:text-md text-foreground">
                설치 전 <CodeBadge>.npmrc</CodeBadge>에 registry와 GitHub PAT(<CodeBadge>NPM_TOKEN</CodeBadge>)를 설정하세요.
              </p>
              <div className="relative rounded-lg bg-white p-4 font-mono text-xs border border-ac-gray-40 text-ac-gray-80 shadow-sm leading-relaxed overflow-x-auto">
                <p>@alphacode-ai:registry=https://npm.pkg.github.com</p>
                <p>{"//npm.pkg.github.com/:_authToken=${NPM_TOKEN}"}</p>
                <button
                  onClick={handleCopyNpmrc}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-ac-gray-50 hover:text-ac-gray-80 hover:bg-ac-gray-20 transition-colors"
                  aria-label="복사"
                >
                  {copiedNpmrc ? <Check className="w-4 h-4 text-ac-green-50" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative rounded-lg bg-white p-4 font-mono text-sm border border-ac-gray-40 text-ac-gray-80 shadow-sm overflow-x-auto">
                <span>{INSTALL_CMD}</span>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-ac-gray-50 hover:text-ac-gray-80 hover:bg-ac-gray-20 transition-colors"
                  aria-label="복사"
                >
                  {copied ? <Check className="w-4 h-4 text-ac-green-50" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* text-primary -> text-ac-primary-50 변경 */}
              <h3 className="text-base md:text-lg font-bold text-ac-primary-50">2. Development Rules</h3>
              <ul className="text-sm md:text-md text-foreground space-y-3 list-disc list-inside font-medium">
                <li>
                  <span className="text-ac-primary-50 font-bold">Official Components:</span> <Badge variant="default" size="sm" className="md:hidden">Badge</Badge><Badge variant="default" size="md" className="hidden md:inline-flex">Badge</Badge>, <Badge variant="default" size="sm" className="md:hidden">Card</Badge><Badge variant="default" size="md" className="hidden md:inline-flex">Card</Badge> 등 정의된 컴포넌트를 우선 사용합니다.
                </li>
                <li>
                  <span className="text-ac-primary-50 font-bold">Token System:</span> 컬러, 간격 적용 시 반드시 <CodeBadge>ac-</CodeBadge> 접두사 토큰을 참조합니다.
                </li>
                <li>
                  <span className="text-ac-primary-50 font-bold">Preset Connection:</span> 테마 상속을 위해 프리셋 설정을 <CodeBadge>tailwind.config.ts</CodeBadge>에 반드시 포함합니다.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3 pb-8 md:pb-12 mt-6 md:mt-8">
          
          <Link href="/logo">
            <Card variant="line" shadowSize="xl" interactive className="group flex flex-col justify-between p-5 md:p-8 h-full hover:shadow-xl bg-white">
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="text-ac-primary-50"><Shapes size={28} strokeWidth={1.5} className="md:w-8 md:h-8" /></div>
                <div>
                  <CardTitle className="text-base md:text-xl font-bold text-foreground">Logo</CardTitle>
                  <CardDescription className="text-xs md:text-base leading-relaxed text-foreground mt-2 break-korean">
                    알파코드 브랜드 아이덴티티를 상징하는 로고 시스템과 자산 가이드라인을 확인합니다.
                  </CardDescription>
                </div>
              </div>
              <div className="mt-6 md:mt-10 flex items-center justify-between rounded-lg bg-muted p-3 md:p-4 text-sm font-bold text-foreground group-hover:bg-ac-primary-10 group-hover:text-ac-primary-60 transition-colors">
                <span>Go to Logo</span>
                <ChevronRight size={18} className="group-hover:text-ac-primary-50" />
              </div>
            </Card>
          </Link>

          <Link href="/foundation/breakpoints">
            <Card variant="line" shadowSize="xl" interactive className="group flex flex-col justify-between p-5 md:p-8 h-full hover:shadow-xl bg-white">
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="text-ac-primary-50"><LayoutTemplate size={28} strokeWidth={1.5} className="md:w-8 md:h-8" /></div>
                <div>
                  <CardTitle className="text-base md:text-xl font-bold text-foreground">Foundation</CardTitle>
                  <CardDescription className="text-xs md:text-base leading-relaxed text-foreground mt-2 break-korean">
                    시스템의 근간이 되는 ac- 컬러 팔레트와 타이포그래피, 그리드 시스템을 안내합니다.
                  </CardDescription>
                </div>
              </div>
              <div className="mt-6 md:mt-10 flex items-center justify-between rounded-lg bg-muted p-3 md:p-4 text-sm font-bold text-foreground group-hover:bg-ac-primary-10 group-hover:text-ac-primary-60 transition-colors">
                <span>Go to Foundation</span>
                <ChevronRight size={18} className="group-hover:text-ac-primary-50" />
              </div>
            </Card>
          </Link>

          <Link href="/components">
            <Card variant="line" shadowSize="xl" interactive className="group flex flex-col justify-between p-5 md:p-8 h-full hover:shadow-xl bg-white">
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="text-ac-primary-50"><Component size={28} strokeWidth={1.5} className="md:w-8 md:h-8" /></div>
                <div>
                  <CardTitle className="text-base md:text-xl font-bold text-foreground">Component</CardTitle>
                  <CardDescription className="text-xs md:text-base leading-relaxed text-foreground mt-2 break-korean">
                    Badge, Card, Button 등 실제 서비스 개발에 즉시 사용 가능한 표준 컴포넌트를 제공합니다.
                  </CardDescription>
                </div>
              </div>
              <div className="mt-6 md:mt-10 flex items-center justify-between rounded-lg bg-muted p-3 md:p-4 text-sm font-bold text-foreground group-hover:bg-ac-primary-10 group-hover:text-ac-primary-60 transition-colors">
                <span>Go to Component</span>
                <ChevronRight size={18} className="group-hover:text-ac-primary-50" />
              </div>
            </Card>
          </Link>

        </section>
      </div>
    </div>
  );
}