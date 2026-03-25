"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ChevronRight, Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type SnackbarVariant  = "default" | "error" | "success" | "info" | "warning";
export type SnackbarPosition = "top" | "bottom";
export type SnackbarSize     = "sm" | "md" | "lg";

/* ── Variant 스타일 (bg / text 분리) ────────────────────────── */
const variantBgClass: Record<SnackbarVariant, string> = {
  default: "bg-ac-orange-10",
  error:   "bg-ac-red-10",
  success: "bg-ac-green-10",
  info:    "bg-ac-blue-10",
  warning: "bg-ac-orange-20",
};

const variantTextClass: Record<SnackbarVariant, string> = {
  default: "text-ac-gray-90",
  error:   "text-ac-gray-90",
  success: "text-ac-gray-90",
  info:    "text-ac-gray-90",
  warning: "text-ac-gray-90",
};

/* size별 스타일 */
const sizeContainerClass: Record<SnackbarSize, string> = {
  sm: "h-8 px-2",
  md: "h-9 px-2",
  lg: "h-11 px-3",
};

const sizeTextClass: Record<SnackbarSize, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

const sizeCollapsedClass: Record<SnackbarSize, string> = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-11 h-11",
};

/* variant별 기본 아이콘 색상 */
const variantIconClass: Record<SnackbarVariant, string> = {
  default: "[&_svg]:text-ac-orange-50",
  error:   "[&_svg]:text-ac-red-50",
  success: "[&_svg]:text-ac-green-50",
  info:    "[&_svg]:text-ac-blue-50",
  warning: "[&_svg]:text-ac-orange-50",
};

/* ══════════════════════════════════════════════════════════════
   Snackbar Item 타입
══════════════════════════════════════════════════════════════ */
export interface SnackbarItem {
  id: string;
  message: React.ReactNode;
  variant?: SnackbarVariant;
  /** 좌측 아이콘 또는 아바타 */
  leftItem?: React.ReactNode;
  /** 우측: close / chevron / check / ReactNode (Button 등) */
  rightItem?: "close" | "chevron" | "check" | React.ReactNode;
  /** 아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용 */
  iconColorClass?: string;
  /** 배경색 override — Tailwind bg 클래스 (예: "bg-ac-blue-10") */
  bgColorClass?: string;
  /** 텍스트 색상 override — Tailwind text 클래스 (예: "text-ac-white") */
  textColorClass?: string;
  onAction?: () => void;
  duration?: number;
}

/* ══════════════════════════════════════════════════════════════
   Context (전역 snackbar 큐)
══════════════════════════════════════════════════════════════ */
interface SnackbarContextValue {
  show: (item: Omit<SnackbarItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const SnackbarContext = React.createContext<SnackbarContextValue | null>(null);

export function useSnackbar() {
  const ctx = React.useContext(SnackbarContext);
  if (!ctx) throw new Error("Must be used within <SnackbarProvider>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   SnackbarProvider
══════════════════════════════════════════════════════════════ */
export interface SnackbarProviderProps {
  children: React.ReactNode;
  position?: SnackbarPosition;
  maxCount?: number;
  defaultDuration?: number;
}

export function SnackbarProvider({
  children,
  position = "bottom",
  maxCount = 3,
  defaultDuration = 4000,
}: SnackbarProviderProps) {
  const [items, setItems] = React.useState<SnackbarItem[]>([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const show = React.useCallback((item: Omit<SnackbarItem, "id">): string => {
    const id = Math.random().toString(36).slice(2);
    setItems(prev => {
      const next = [...prev, { ...item, id }];
      return next.length > maxCount ? next.slice(next.length - maxCount) : next;
    });

    const duration = item.duration ?? defaultDuration;
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [maxCount, defaultDuration]);

  const dismiss = React.useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => setItems([]), []);

  const positionClass = position === "top"
    ? "top-4 left-1/2 -translate-x-1/2"
    : "bottom-4 left-1/2 -translate-x-1/2";

  return (
    <SnackbarContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          aria-atomic="false"
          className={cn(
            "fixed z-toast flex flex-col gap-2 w-full max-w-[480px] px-4",
            positionClass
          )}
        >
          {items.map(item => (
            <SnackbarItem key={item.id} item={item} onDismiss={dismiss} />
          ))}
        </div>,
        document.body
      )}
    </SnackbarContext.Provider>
  );
}

/* ══════════════════════════════════════════════════════════════
   SnackbarItem (내부 렌더)
══════════════════════════════════════════════════════════════ */
function SnackbarItem({
  item,
  onDismiss,
}: {
  item: SnackbarItem;
  onDismiss: (id: string) => void;
}) {
  const {
    id, message, variant = "default",
    leftItem, rightItem,
    iconColorClass, bgColorClass, textColorClass,
    onAction,
  } = item;

  const renderRight = () => {
    if (!rightItem) return null;
    if (rightItem === "close") return (
      <button type="button" onClick={() => onDismiss(id)} aria-label="닫기"
        className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    );
    if (rightItem === "chevron") return (
      <button type="button" onClick={onAction} aria-label="더보기"
        className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4" />
      </button>
    );
    if (rightItem === "check") return <Check className="shrink-0 w-4 h-4 opacity-80" />;
    // Button 등 임의 ReactNode
    return <span className="shrink-0 flex items-center">{rightItem}</span>;
  };

  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-1 w-full",
        "p-2 rounded-xl",
        "animate-slide-up",
        bgColorClass ?? variantBgClass[variant],
        textColorClass ?? variantTextClass[variant],
      )}
    >
      {leftItem && (
        <span className={cn("shrink-0 flex items-center justify-center", iconColorClass ?? variantIconClass[variant])}>
          {leftItem}
        </span>
      )}
      <span className="flex-1 text-xs font-medium leading-snug min-w-0">{message}</span>
      {renderRight()}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Snackbar 컴포넌트 (직접 렌더용 — Provider 없이 사용)
══════════════════════════════════════════════════════════════ */
export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  message: React.ReactNode;
  variant?: SnackbarVariant;
  /** 좌측 아이콘 또는 아바타 */
  leftItem?: React.ReactNode;
  /** 우측: close / chevron / check / ReactNode (Button 등) */
  rightItem?: "close" | "chevron" | "check" | React.ReactNode;
  /** 아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용 */
  iconColorClass?: string;
  /** 배경색 override — Tailwind bg 클래스 (예: "bg-ac-blue-10") */
  bgColorClass?: string;
  /** 텍스트 색상 override — Tailwind text 클래스 (예: "text-ac-white") */
  textColorClass?: string;
  /** 스낵바 크기 */
  size?: SnackbarSize;
  /**
   * close 버튼 동작 방식
   * - "dismiss": 스낵바 전체 제거 (기본값)
   * - "hide-right": 오른쪽 아이템만 제거, 스낵바는 유지
   */
  closeMode?: "dismiss" | "hide-right";
  onClose?: () => void;
  onAction?: () => void;
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({
    className, message, variant = "default",
    size = "md",
    leftItem, rightItem,
    iconColorClass, bgColorClass, textColorClass,
    closeMode = "dismiss",
    onClose, onAction,
    ...props
  }, ref) => {
    const [visible, setVisible] = React.useState(true);
    const [collapsed, setCollapsed] = React.useState(false);

    const handleClose = () => {
      if (closeMode === "hide-right") {
        setCollapsed(true);
      } else {
        setVisible(false);
      }
      onClose?.();
    };

    if (!visible) return null;

    if (collapsed) {
      return (
        <div
          role="status"
          onClick={() => setCollapsed(false)}
          className={cn(
            "inline-flex items-center justify-center rounded-full cursor-pointer",
            "transition-colors hover:opacity-80",
            sizeCollapsedClass[size],
            bgColorClass ?? variantBgClass[variant],
          )}
        >
          <span className={cn("flex items-center justify-center", iconColorClass ?? variantIconClass[variant])}>
            {leftItem}
          </span>
        </div>
      );
    }

    const renderRight = () => {
      if (!rightItem) return null;
      if (rightItem === "close") return (
        <button type="button" onClick={handleClose} aria-label="닫기"
          className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      );
      if (rightItem === "chevron") return (
        <button type="button" onClick={onAction} aria-label="더보기"
          className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </button>
      );
      if (rightItem === "check") return <Check className="shrink-0 w-4 h-4 opacity-80" />;
      // Button 등 임의 ReactNode
      return <span className="shrink-0 flex items-center">{rightItem}</span>;
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          "flex items-center gap-1 w-full",
          "rounded-xl",
          sizeContainerClass[size],
          bgColorClass ?? variantBgClass[variant],
          textColorClass ?? variantTextClass[variant],
          className,
        )}
        {...props}
      >
        {leftItem && (
          <span className={cn("shrink-0 flex items-center justify-center", iconColorClass ?? variantIconClass[variant])}>
            {leftItem}
          </span>
        )}
        <span className={cn("flex-1 font-medium leading-snug min-w-0", sizeTextClass[size])}>{message}</span>
        {renderRight()}
      </div>
    );
  }
);
Snackbar.displayName = "Snackbar";

export { Snackbar };
