import { cn } from "@/utils/cn";

const RADIUS_MAP = {
  none:    "rounded-none",
  0:       "rounded-none",
  1:       "rounded-sm",
  2:       "rounded",
  3:       "rounded-md",
  4:       "rounded-lg",
  rounded: "rounded-full",
} as const;

export type SkeletonRadius = keyof typeof RADIUS_MAP;

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: SkeletonRadius;
  index?: number;
  className?: string;
}

const STAGGER_MS = 80;
const DELAY_MS   = 100;

export function Skeleton({
  width   = "100%",
  height  = "100%",
  radius  = 3,
  index   = 0,
  className,
}: SkeletonProps) {
  const style = {
    width:          typeof width  === "number" ? `${width}px`  : width,
    height:         typeof height === "number" ? `${height}px` : height,
    animationDelay: `${DELAY_MS + STAGGER_MS * index}ms`,
  };

  return (
    <div
      className={cn("animate-pulse bg-ac-gray-30", RADIUS_MAP[radius], className)}
      style={style}
    />
  );
}
