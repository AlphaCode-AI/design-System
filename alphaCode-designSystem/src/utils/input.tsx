import * as React from "react";
import { cn } from "@/utils/cn";

interface InputHelperTextProps {
  id?: string;
  helperText?: string;
  errorMessage?: string;
  isError: boolean;
}

export function InputHelperText({ id, helperText, errorMessage, isError }: InputHelperTextProps) {
  if (!helperText && !errorMessage) return null;
  return (
    <p id={id} className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>
      {errorMessage || helperText}
    </p>
  );
}
