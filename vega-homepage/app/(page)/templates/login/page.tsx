"use client";

import { Button, TextInput } from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";
import PreviewBox from "@/app/components/PreviewBox";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function LoginTemplatePage() {
  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="로그인"
        description="TextInput, Button을 조합한 소셜 로그인 폼입니다."
        border
      />

      <PreviewBox variant="gray">
        <div className="flex flex-col items-center justify-center py-10 gap-6">

          {/* 로고 */}
          <div className="flex flex-col items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>
            </svg>
            <p className="text-sm font-bold text-foreground">AlphaCode</p>
          </div>

          {/* 카드 */}
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-foreground">다시 오셨군요!</h2>
              <p className="text-sm text-muted-foreground">계정에 로그인하세요</p>
            </div>

            <div className="space-y-3">
              <TextInput type="email" placeholder="name@company.com" size="md" />
              <TextInput type="password" placeholder="비밀번호를 입력하세요" size="md" />
            </div>

            <Button variant="primary" className="w-full">로그인</Button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border" />
              <span>또는 다른 방법으로</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-2">
              <Button variant="secondary" className="w-full gap-2">
                <AppleIcon />
                Apple로 로그인
              </Button>
              <Button variant="secondary" className="w-full gap-2">
                <GoogleIcon />
                Google로 로그인
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              계정이 없으신가요?{" "}
              <button className="text-foreground font-semibold hover:underline">회원가입</button>
            </p>
          </div>

          {/* 하단 약관 */}
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            계속하면{" "}
            <span className="text-foreground font-medium cursor-pointer hover:underline">서비스 이용약관</span>
            {" "}및{" "}
            <span className="text-foreground font-medium cursor-pointer hover:underline">개인정보처리방침</span>
            에 동의하는 것으로 간주됩니다.
          </p>

        </div>
      </PreviewBox>
    </div>
  );
}
