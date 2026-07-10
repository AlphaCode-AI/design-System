"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  ProgressIndicator,
  StepIndicator,
  TextInput,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";
import PreviewBox from "@/app/components/PreviewBox";

const STEPS = [
  { title: "기본 정보" },
  { title: "보안 설정" },
  { title: "약관 동의" },
];

export default function SignupTemplatePage() {
  const [step, setStep] = useState(1);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const allChecked = terms && privacy && marketing;
  const progress = Math.round((step / STEPS.length) * 100);

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked;
    setTerms(v);
    setPrivacy(v);
    setMarketing(v);
  };

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="회원가입"
        description="StepIndicator와 ProgressIndicator를 조합한 단계별 회원가입 플로우입니다."
        border
      />

      <PreviewBox variant="gray">
        <div className="flex items-center justify-center py-8">
          <div className="w-full max-w-md space-y-6">

            {/* 헤더 */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-foreground">회원가입</h2>
              <p className="text-sm text-muted-foreground">AlphaCode 계정을 만들어 시작하세요.</p>
            </div>

            {/* StepIndicator */}
            <StepIndicator
              steps={STEPS}
              current={step - 1}
              type="horizontal"
              size="md"
            />

            {/* ProgressIndicator */}
            <div className="space-y-1">
              <ProgressIndicator
                type="linear"
                value={progress}
                linearSize="sm"
              />
              <p className="text-xs text-right text-muted-foreground">{step} / {STEPS.length}단계</p>
            </div>

            {/* Step 1: 기본 정보 */}
            {step === 1 && (
              <div className="space-y-3">
                <TextInput label="이름" placeholder="홍길동" size="md" />
                <TextInput label="이메일" type="email" placeholder="example@alphacode.co.kr" size="md" />
              </div>
            )}

            {/* Step 2: 보안 설정 */}
            {step === 2 && (
              <div className="space-y-3">
                <TextInput
                  label="비밀번호"
                  type="password"
                  placeholder="8자 이상 입력하세요"
                  size="md"
                  helperText="영문, 숫자, 특수문자 포함 8자 이상"
                />
                <TextInput
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  size="md"
                />
              </div>
            )}

            {/* Step 3: 약관 동의 */}
            {step === 3 && (
              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <Checkbox
                  label="전체 동의"
                  checked={allChecked}
                  indeterminate={!allChecked && (terms || privacy || marketing)}
                  onChange={handleAllChange}
                />
                <div className="border-t border-border pt-3 space-y-2.5 pl-1">
                  <Checkbox
                    label="이용약관에 동의합니다 (필수)"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <Checkbox
                    label="개인정보 수집 및 이용에 동의합니다 (필수)"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                  />
                  <Checkbox
                    label="마케팅 정보 수신에 동의합니다 (선택)"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                </div>
              </div>
            )}

            {/* 네비게이션 버튼 */}
            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  variant="tertiary"
                  className="flex-1"
                  onClick={() => setStep((s) => s - 1)}
                >
                  이전
                </Button>
              )}
              {step < STEPS.length ? (
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setStep((s) => s + 1)}
                >
                  다음
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="flex-1"
                  disabled={!terms || !privacy}
                >
                  가입하기
                </Button>
              )}
            </div>

            {step === 1 && (
              <p className="text-center text-xs text-muted-foreground">
                이미 계정이 있으신가요?{" "}
                <button className="text-ac-primary-50 hover:underline font-medium">로그인</button>
              </p>
            )}

          </div>
        </div>
      </PreviewBox>
    </div>
  );
}
