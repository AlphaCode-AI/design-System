"use client";

import { cn } from "@alphacode-ai/design-system";

interface CodeBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBadge({ children, className }: CodeBadgeProps) {
  return (
    <code
      className={cn(
        "rounded bg-ac-gray-20 px-1.5 py-0.5 font-mono text-sm text-foreground border border-ac-gray-30",
        className
      )}
    >
      {children}
    </code>
  );
}