import * as React from "react";
import { cn } from "@/utils/cn";

export function IconWrapper({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("shrink-0 flex items-center", className)} {...props}>
      {children}
    </span>
  );
}

export function cloneIconWithSize(icon: React.ReactNode, sizeClass: string): React.ReactNode {
  if (!React.isValidElement(icon)) return icon;
  const el = icon as React.ReactElement<{ className?: string }>;
  return React.cloneElement(el, {
    className: cn(el.props.className, sizeClass),
  });
}
