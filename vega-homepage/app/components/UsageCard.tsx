"use client";

import { cn } from "@alphacode-ai/design-system";

interface UsageCardProps {
  /** 가이드 타입: 긍정(Do) 또는 부정(Don't) */
  type: "Do" | "Don't";
  /** 이미지 경로 */
  src?: string;
  /** 가이드 설명 문구 */
  description?: string;
  /** 추가 스타일 클래스 */
  className?: string;
  variant?: "fill" | "fit";
}

export function UsageCard({ type, src, description, className, variant = "fit" }: UsageCardProps) {
  const isDo = type === "Do";
  const isFill = variant === "fill";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* 이미지 컨테이너: 타입에 따라 테두리 색상 변경 */}
      <div
        className={cn(
          "relative w-full overflow-hidden border-b-2 flex items-center justify-center",
          "aspect-[8/3]",
          isDo ? "border-ac-blue-30 bg-ac-blue-10" : "border-ac-red-30 bg-ac-red-10"
        )}
      >
        {src ? (
          <img
            src={src}
            alt={description ?? type}
            className={cn(
              "h-full w-full",
              isFill ? "object-cover" : "object-contain p-6"
            )}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className={cn("text-2xl font-bold opacity-20", isDo ? "text-ac-blue-60" : "text-ac-red-60")}>
              {isDo ? "✓" : "✕"}
            </span>
            <span className="text-sm text-ac-gray-40 font-medium tracking-wider">
              No Image Provided
            </span>
          </div>
        )}
      </div>

      {/* 가이드 텍스트 섹션 */}
      <div className="flex flex-col gap-1.5 px-1">
        <span
          className={cn(
            "text-md font-extrabold tracking-widest",
            isDo ? "text-ac-blue-60" : "text-ac-red-60"
          )}
        >
          {type}
        </span>
        {description && (
          <p className="text-sm leading-relaxed text-ac-gray-80 break-korean font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}