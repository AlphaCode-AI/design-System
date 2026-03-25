import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";
import { Select } from "@/components/Input/Select";
import { TextInput } from "@/components/Input/TextInput";

/* ── Types ─────────────────────────────────────────────────── */
export type PaginationType = "simple" | "default";

/* ── 페이지 번호 계산 헬퍼 ──────────────────────────────────── */
function getPageNumbers(current: number, total: number, maxVisible = 10): (number | "...")[] {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];
  const delta = 2;

  const left  = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}

/* ══════════════════════════════════════════════════════════════
   Pagination (Root)
══════════════════════════════════════════════════════════════ */
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 전체 페이지 수 */
  total: number;
  /** 현재 페이지 (controlled) */
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** simple: 이전/다음 아이콘만, 중앙에 input 표시 */
  type?: PaginationType;
  /** 비활성화 */
  disabled?: boolean;
  /** 활성 페이지 버튼 배경 색상 — Tailwind bg 클래스 (예: "bg-ac-gray-80", 기본: "bg-ac-primary-50") */
  activeColorClass?: string;
  /** 페이지당 항목 수 선택 표시 */
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  defaultPageSize?: number;
  onPageSizeChange?: (size: number) => void;
  /** Go to 페이지 점프 입력 표시 */
  showJumper?: boolean;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      total,
      page: controlledPage,
      defaultPage = 1,
      onPageChange,
      type = "default",
      disabled = false,
      activeColorClass,
      showPageSize = false,
      pageSizeOptions = [10, 20, 40, 100],
      pageSize: controlledPageSize,
      defaultPageSize = 10,
      onPageSizeChange,
      showJumper = false,
      ...props
    },
    ref
  ) => {
    const [internalPage, setInternalPage] = React.useState(defaultPage);
    const [internalPageSize, setInternalPageSize] = React.useState(defaultPageSize);
    const [jumperValue, setJumperValue] = React.useState("");

    const controlled        = controlledPage !== undefined;
    const page              = controlled ? controlledPage! : internalPage;
    const pageSizeControlled = controlledPageSize !== undefined;
    const pageSize          = pageSizeControlled ? controlledPageSize! : internalPageSize;

    const goTo = (p: number) => {
      if (disabled) return;
      const next = Math.max(1, Math.min(p, total));
      if (!controlled) setInternalPage(next);
      onPageChange?.(next);
    };

    const handlePageSizeChange = (val: string) => {
      const size = Number(val);
      if (!pageSizeControlled) setInternalPageSize(size);
      onPageSizeChange?.(size);
      goTo(1);
    };

    const handleJumper = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const target = Number(jumperValue);
        if (!isNaN(target) && target > 0) goTo(target);
        setJumperValue("");
      }
    };

    /* 페이지 번호 버튼 스타일 */
    const pageBtn = (active: boolean) =>
      cn(
        "inline-flex items-center justify-center h-9 w-9 rounded-md text-xs font-bold",
        "transition-colors duration-fast select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "text-ac-white"
          : "text-ac-gray-80 hover:text-ac-primary-50",
        disabled && "opacity-40 pointer-events-none"
      );

    /* ── Simple 타입 ────────────────────────────────────────── */
    if (type === "simple") {
      return (
        <div
          ref={ref}
          role="navigation"
          aria-label="페이지네이션"
          className={cn("flex items-center gap-3", className)}
          {...props}
        >
          <Button
            variant="tertiary"
            size="icon-sm"
            onClick={() => goTo(page - 1)}
            disabled={disabled || page <= 1}
            aria-label="이전 페이지"
          >
            <ChevronLeft />
          </Button>

          <div className="flex items-center gap-1">
            <div className="w-10">
              <TextInput
                type="number"
                size="md"
                value={String(page)}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!isNaN(v) && v >= 1 && v <= total) goTo(v);
                }}
                disabled={disabled}
                className="text-center tabular-nums [&_input]:appearance-none [&_input]:[appearance:textfield] [&_input::-webkit-inner-spin-button]:appearance-none [&_input::-webkit-outer-spin-button]:appearance-none"
                aria-label="현재 페이지"
              />
            </div>
            <span className="text-sm text-ac-gray-60">/ {total}</span>
          </div>

          <Button
            variant="tertiary"
            size="icon-sm"
            onClick={() => goTo(page + 1)}
            disabled={disabled || page >= total}
            aria-label="다음 페이지"
          >
            <ChevronRight />
          </Button>
        </div>
      );
    }

    /* ── Default 타입 ───────────────────────────────────────── */
    const pages = getPageNumbers(page, total);

    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="페이지네이션"
        className={cn("flex items-center gap-2 flex-wrap", className)}
        {...props}
      >
        {/* 이전 */}
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => goTo(page - 1)}
          disabled={disabled || page <= 1}
          leftIcon={<ChevronLeft />}
          aria-label="이전 페이지"
        >
          이전
        </Button>

        {/* 페이지 번호 */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 text-center text-xs text-foreground select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p as number)}
              disabled={disabled}
              aria-current={p === page ? "page" : undefined}
              className={cn(pageBtn(p === page), p === page && (activeColorClass ?? "bg-ac-primary-50"))}
              style={undefined}
            >
              {p}
            </button>
          )
        )}

        {/* 다음 */}
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => goTo(page + 1)}
          disabled={disabled || page >= total}
          rightIcon={<ChevronRight />}
          aria-label="다음 페이지"
        >
          다음
        </Button>

        {/* PageSize 선택 */}
        {showPageSize && (
          <div className="w-28">
            <Select
              size="md"
              value={String(pageSize)}
              onValueChange={handlePageSizeChange}
              disabled={disabled}
              options={pageSizeOptions.map(s => ({ label: `${s} / page`, value: String(s) }))}
            />
          </div>
        )}

        {/* Jumper */}
        {showJumper && (
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-sm text-foreground">Go to</span>
            <div className="w-16">
              <TextInput
                type="number"
                size="md"
                value={jumperValue}
                onChange={(e) => setJumperValue(e.target.value)}
                onKeyDown={handleJumper}
                disabled={disabled}
                className="text-center tabular-nums [&_input]:appearance-none [&_input]:[appearance:textfield] [&_input::-webkit-inner-spin-button]:appearance-none [&_input::-webkit-outer-spin-button]:appearance-none"
                aria-label="이동할 페이지 번호"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };
