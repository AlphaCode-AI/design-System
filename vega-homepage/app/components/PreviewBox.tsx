import { cn } from "@alphacode-ai/design-system";
import type { HTMLAttributes } from "react";

interface PreviewBoxProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "border" | "gray" | "anatomy";
}

export default function PreviewBox({ variant = "border", className, children, ...props }: PreviewBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-8",
        variant === "border" && "border border-border",
        variant === "gray" && "bg-ac-gray-20",
        variant === "anatomy" && "bg-[#F7F7F7] anatomy-bg flex items-center justify-center min-h-[160px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
