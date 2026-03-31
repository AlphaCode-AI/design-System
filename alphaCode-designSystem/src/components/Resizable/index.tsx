"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type ResizableOrientation  = "horizontal" | "vertical";
export type ResizableHandleVariant = "margin" | "line";

/* ── Context ─────────────────────────────────────────────────── */
interface ResizableContextValue {
  orientation: ResizableOrientation;
  sizes: number[];
  onResizeStart: (handleIndex: number, clientPos: number) => void;
}

const ResizableContext = React.createContext<ResizableContextValue | null>(null);

function useResizable() {
  const ctx = React.useContext(ResizableContext);
  if (!ctx) throw new Error("Must be inside <ResizablePanelGroup>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   ResizablePanelGroup
══════════════════════════════════════════════════════════════ */
export interface ResizablePanelGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 크기 조절 방향. 기본값: horizontal */
  orientation?: ResizableOrientation;
  /** 초기 패널 크기 (%, 합산 100). 생략 시 균등 분할 */
  defaultSizes?: number[];
  children: React.ReactNode;
}

function ResizablePanelGroup({
  orientation = "horizontal",
  defaultSizes,
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const panelCount = React.useMemo(() => {
    return React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && (child as React.ReactElement).type === ResizablePanel
    ).length;
  }, [children]);

  const [sizes, setSizes] = React.useState<number[]>(
    () => defaultSizes ?? Array(panelCount).fill(100 / panelCount)
  );

  // 최신 sizes를 ref로 유지 (클로저 stale 방지)
  const sizesRef = React.useRef(sizes);
  sizesRef.current = sizes;

  const dragRef = React.useRef<{
    handleIndex: number;
    startPos: number;
    startSizes: number[];
  } | null>(null);

  const onResizeStart = React.useCallback((handleIndex: number, clientPos: number) => {
    dragRef.current = {
      handleIndex,
      startPos: clientPos,
      startSizes: [...sizesRef.current],
    };
  }, []);

  React.useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current || !containerRef.current) return;
      const { handleIndex, startPos, startSizes } = dragRef.current;
      const containerSize =
        orientation === "horizontal"
          ? containerRef.current.offsetWidth
          : containerRef.current.offsetHeight;
      const delta = orientation === "horizontal" ? e.clientX : e.clientY;
      const deltaPercent = ((delta - startPos) / containerSize) * 100;
      const total = startSizes[handleIndex] + startSizes[handleIndex + 1];
      const a = Math.min(total, Math.max(0, startSizes[handleIndex] + deltaPercent));
      const b = total - a;
      setSizes((prev) => {
        const next = [...prev];
        next[handleIndex] = a;
        next[handleIndex + 1] = b;
        return next;
      });
    };

    const onPointerUp = () => { dragRef.current = null; };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [orientation]);

  // 자식에 _index 주입
  let panelIdx = 0;
  let handleIdx = 0;
  const injected = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const el = child as React.ReactElement<{ _index?: number }>;
    if (el.type === ResizablePanel) return React.cloneElement(el, { _index: panelIdx++ });
    if (el.type === ResizableHandle) return React.cloneElement(el, { _index: handleIdx++ });
    return child;
  });

  return (
    <ResizableContext.Provider value={{ orientation, sizes, onResizeStart }}>
      <div
        ref={containerRef}
        className={cn(
          "flex h-full w-full overflow-hidden",
          orientation === "vertical" && "flex-col",
          className
        )}
        {...props}
      >
        {injected}
      </div>
    </ResizableContext.Provider>
  );
}
ResizablePanelGroup.displayName = "ResizablePanelGroup";

/* ══════════════════════════════════════════════════════════════
   ResizablePanel
══════════════════════════════════════════════════════════════ */
export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ResizablePanelGroup이 자동으로 주입합니다 */
  _index?: number;
}

function ResizablePanel({ className, _index = 0, style, ...props }: ResizablePanelProps) {
  const { orientation, sizes } = useResizable();
  const size = sizes[_index] ?? 50;

  return (
    <div
      className={cn("overflow-auto", className)}
      style={{
        ...(orientation === "horizontal"
          ? { width: `${size}%`, flexShrink: 0 }
          : { height: `${size}%`, flexShrink: 0 }),
        ...style,
      }}
      {...props}
    />
  );
}
ResizablePanel.displayName = "ResizablePanel";

/* ── GripDots (6개 점) ────────────────────────────────────────── */
function GripDots({ orientation }: { orientation: ResizableOrientation }) {
  return (
    <div
      className={cn(
        "grid gap-[3px]",
        orientation === "horizontal" ? "grid-cols-2" : "grid-cols-3"
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="block h-[2px] w-[2px] rounded-full bg-[#555555] transition-colors group-hover:bg-ac-primary-50 group-active:bg-ac-primary-50"
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ResizableHandle
══════════════════════════════════════════════════════════════ */
export interface ResizableHandleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** margin: 여백 구분 (기본) | line: 1px 선 구분 */
  variant?: ResizableHandleVariant;
  /** ResizablePanelGroup이 자동으로 주입합니다 */
  _index?: number;
}

function ResizableHandle({
  variant = "margin",
  className,
  _index = 0,
  ...props
}: ResizableHandleProps) {
  const { orientation, onResizeStart } = useResizable();

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const pos = orientation === "horizontal" ? e.clientX : e.clientY;
    onResizeStart(_index, pos);
  };

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      tabIndex={0}
      className={cn(
        "group relative flex shrink-0 select-none touch-none items-center justify-center outline-none",
        orientation === "horizontal" ? "cursor-col-resize" : "cursor-row-resize",
        // margin variant: 여백만 제공, 선 없음
        variant === "margin" && [
          orientation === "horizontal" ? "w-4" : "h-4 w-full",
        ],
        // line variant: 1px 구분선 + 클릭 영역 확장 after
        variant === "line" && [
          orientation === "horizontal"
            ? "w-px bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 after:content-['']"
            : "h-px w-full bg-border after:absolute after:inset-x-0 after:top-1/2 after:h-2 after:-translate-y-1/2 after:content-['']",
        ],
        className
      )}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {/* Handle pill: horizontal 12×30 / vertical 30×12 */}
      <div
        className={cn(
          "z-10 flex items-center justify-center rounded-[4px] transition-colors",
          orientation === "horizontal" ? "h-[30px] w-3" : "h-3 w-[30px]",
          variant === "margin"
            ? "group-hover:bg-[rgba(255,230,215,1)] group-active:bg-[rgba(255,230,215,1)]"
            : "bg-white"
        )}
      >
        <GripDots orientation={orientation} />
      </div>
    </div>
  );
}
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
