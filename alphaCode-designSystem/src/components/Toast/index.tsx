"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Bell, Upload, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { Avatar } from "@/components/Avatar";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Button } from "@/components/Button";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export type ToastStyle    = "default" | "full" | "uploading" | "uploading-success" | "message";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ToastStackMode = "list" | "nesting";

export interface ToastItem {
  id: string;
  style?: ToastStyle;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** uploading: 진행률 0-100 */
  progress?: number;
  /** uploading: 진행률 텍스트 */
  progressLabel?: string;
  /** uploading: 소요 시간 텍스트 */
  timeLabel?: string;
  /** message: 아바타 이미지 URL */
  avatarSrc?: string;
  /** message: 아바타 대체 텍스트 (이니셜 등) */
  avatarFallback?: string;
  /** message: 시간 텍스트 */
  timestamp?: string;
  /** ms. 0 = 자동 닫힘 없음. 기본 4000 */
  duration?: number;
}

export interface ToastProps extends Omit<ToastItem, "id"> {
  onClose?: () => void;
  className?: string;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxCount?: number;
  defaultDuration?: number;
  /** list: 세로 나열 (기본) | nesting: 카드 스택, 호버 시 펼침 */
  stackMode?: ToastStackMode;
}

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface ToastContextValue {
  show: (item: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("Must be used within <ToastProvider>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   Position 클래스
══════════════════════════════════════════════════════════════ */
const positionClass: Record<ToastPosition, string> = {
  "top-left":      "top-4 left-4 items-start",
  "top-center":    "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-4 right-4 items-end",
  "bottom-left":   "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-4 right-4 items-end",
};

/* ══════════════════════════════════════════════════════════════
   NestingContainer — 스택 뷰 (호버 시 리스트로 펼침)
══════════════════════════════════════════════════════════════ */
const PEEK_OFFSET = 10; // px per level
const SCALE_STEP  = 0.05;

function NestingContainer({
  items,
  onDismiss,
  maxVisible,
}: {
  items: ToastItem[];
  onDismiss: (id: string) => void;
  maxVisible: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  const visible = items.slice(-maxVisible);
  const newest  = visible[visible.length - 1];
  const behind  = visible.slice(0, -1);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        /* 호버: 전체 리스트 펼침 */
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <ToastItemComponent key={item.id} item={item} onDismiss={onDismiss} />
          ))}
        </div>
      ) : (
        /* 기본: 위→아래 스택 뷰 (최신이 맨 위, 이전 것들이 아래로 겹침) */
        <div className="relative">
          {/* 최신 토스트: 일반 흐름으로 컨테이너 높이 결정 */}
          <div style={{ position: "relative", zIndex: maxVisible }}>
            <ToastItemComponent item={newest} onDismiss={onDismiss} />
          </div>
          {behind.map((item, i) => {
            const fromFront = behind.length - i; // 1=second, 2=third
            const translateY = fromFront * PEEK_OFFSET;
            const scale = 1 - fromFront * SCALE_STEP;

            return (
              <div
                key={item.id}
                className="absolute inset-x-0 top-0"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  transformOrigin: "top center",
                  zIndex: maxVisible - fromFront,
                  opacity: 1 - fromFront * 0.2,
                }}
              >
                <ToastItemComponent item={item} onDismiss={onDismiss} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ToastProvider
══════════════════════════════════════════════════════════════ */
export function ToastProvider({
  children,
  position = "bottom-right",
  maxCount = 5,
  defaultDuration = 4000,
  stackMode = "list",
}: ToastProviderProps) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const dismiss = React.useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const show = React.useCallback((item: Omit<ToastItem, "id">): string => {
    const id = Math.random().toString(36).slice(2);
    setItems(prev => {
      const next = [...prev, { ...item, id }];
      return next.length > maxCount ? next.slice(next.length - maxCount) : next;
    });
    const duration = item.duration ?? defaultDuration;
    if (duration > 0) setTimeout(() => dismiss(id), duration);
    return id;
  }, [maxCount, defaultDuration, dismiss]);

  const dismissAll = React.useCallback(() => setItems([]), []);

  return (
    <ToastContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          aria-atomic="false"
          className={cn("fixed z-[9999] pointer-events-none", positionClass[position])}
        >
          {items.length > 0 && (
            <div className="pointer-events-auto">
              {stackMode === "nesting" ? (
                <NestingContainer
                  items={items}
                  onDismiss={dismiss}
                  maxVisible={maxCount}
                />
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map(item => (
                    <ToastItemComponent key={item.id} item={item} onDismiss={dismiss} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

/* ══════════════════════════════════════════════════════════════
   ToastItemComponent (내부 렌더)
══════════════════════════════════════════════════════════════ */
function ToastItemComponent({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <Toast
      {...item}
      onClose={() => onDismiss(item.id)}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   Toast (단독 사용 가능한 presentational 컴포넌트)
══════════════════════════════════════════════════════════════ */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({
  style = "default",
  title,
  description,
  actionLabel,
  onAction,
  progress = 0,
  progressLabel,
  timeLabel,
  avatarSrc,
  avatarFallback,
  timestamp,
  onClose,
  className,
}, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        "relative bg-white rounded-lg p-4 w-[410px] border border-border",
        "[box-shadow:0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)]",
        className
      )}
    >
      {/* 메인 콘텐츠 행: 좌측 콘텐츠 + 우측 액션 버튼 */}
      <div className="flex items-start gap-1">

        {/* 좌측 콘텐츠 */}
        <div className={cn(
          "flex-1 flex flex-col gap-1 min-w-0",
          onClose && !actionLabel && "pr-7"
        )}>
          {/* 타이틀 행 */}
          <div className="flex items-center gap-2">
            {style === "full" && (
              <Bell className="w-4 h-4 shrink-0 text-foreground" />
            )}
            {style === "uploading" && (
              <Upload className="w-4 h-4 shrink-0 text-foreground" />
            )}
            {style === "uploading-success" && (
              <Check className="w-4 h-4 shrink-0 text-[#00A63B]" />
            )}
            {style === "message" && (
              <Avatar
                size="xs"
                shape="circle"
                src={avatarSrc}
                name={avatarFallback}
                className="shrink-0"
              />
            )}
            <span className="text-base font-medium text-foreground leading-snug flex-1 min-w-0">{title}</span>
            {style === "uploading" && timeLabel && (
              <span className="text-xs text-ac-gray-60 shrink-0">{timeLabel}</span>
            )}
          </div>

          {/* 설명글 */}
          {description && (
            <p className={cn(
              "text-xs leading-relaxed",
              (style === "full" || style === "uploading" || style === "uploading-success") && "pl-6 text-ac-gray-60",
              style === "message" && "pl-6 text-ac-gray-80",
            )}>
              {description}
            </p>
          )}

          {/* uploading: 프로그레스 바 */}
          {style === "uploading" && (
            <div className="flex flex-col gap-1">
              {progressLabel && (
                <span className="pl-6 text-xs text-ac-gray-60">{progressLabel}</span>
              )}
              <ProgressIndicator
                type="linear"
                linearSize="sm"
                value={progress}
              />
            </div>
          )}

          {/* message: 타임스탬프 */}
          {style === "message" && timestamp && (
            <span className="pl-6 text-[10px] text-ac-gray-60">{timestamp}</span>
          )}
        </div>

        {/* 우측 액션 버튼 */}
        {actionLabel && (
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            onClick={onAction}
            className="shrink-0"
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {/* 닫기 버튼: 카드 경계 -4px 바깥 */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center hover:bg-ac-gray-30 transition-colors"
        >
          <X className="w-3 h-3 text-ac-gray-50" />
        </button>
      )}
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
