"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { InputHelperText } from "@/utils/input";
import { Button } from "@/components/Button";

/* ── Container Variants ────────────────────────────────────── */
const textInputVariants = cva(
  [
    "flex items-center rounded-md border bg-background overflow-hidden transition-colors duration-150",
    "focus-within:border-ac-gray-80",
    "has-[:disabled]:bg-ac-gray-20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
  ],
  {
    variants: {
      size: {
        lg: "h-10 text-sm gap-2",
        md: "h-9 text-sm gap-2",
        sm: "h-[30px] text-xs gap-1.5",
      },
      state: {
        default:  "border-border",
        complete: "border-border",
        focus:    "border-ac-gray-80",
        error:    "border-ac-red-50 focus-within:border-ac-red-50",
        disable:  "border-border",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  }
);

const buttonSizeMap = { lg: "md", md: "sm", sm: "xs" } as const;

const inputPxMap = {
  lg: { px: "px-3", pl: "pl-3", pr: "pr-3" },
  md: { px: "px-3", pl: "pl-3", pr: "pr-3" },
  sm: { px: "px-2.5", pl: "pl-2.5", pr: "pr-2.5" },
} as const;

/* ── Props ─────────────────────────────────────────────────── */
export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: "sm" | "md" | "lg";
  state?: "default" | "complete" | "focus" | "error" | "disable";
  label?: string;
  labelLeft?: boolean;
  helperText?: string;
  errorMessage?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  buttonLabel?: string;
  buttonVariant?: "primary" | "secondary" | "tertiary" | "link";
  buttonClassName?: string;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/* ── Component ─────────────────────────────────────────────── */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className, size = "md", state = "default",
      label, labelLeft = false,
      helperText, errorMessage,
      prefix, suffix,
      buttonLabel, buttonVariant = "tertiary", buttonClassName, onButtonClick,
      id, disabled, ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const isError = state === "error" || !!errorMessage;
    const resolvedState = isError ? "error" : state;
    const px = inputPxMap[size ?? "md"];

    const inputContainer = (
      <div
        className={cn(
          textInputVariants({ size, state: resolvedState }),
          buttonLabel ? "flex-1" : !labelLeft && "w-full",
          className
        )}
      >
        {prefix && <span className={cn("shrink-0 text-muted-foreground", px.pl)}>{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={isError}
          aria-describedby={helperText || errorMessage ? `${inputId}-helper` : undefined}
          className={cn(
            "flex-1 h-full bg-background outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-0",
            !prefix && px.pl,
            !suffix && px.pr,
          )}
          {...props}
        />
        {suffix && <span className={cn("shrink-0 text-muted-foreground", px.pr)}>{suffix}</span>}
      </div>
    );

    const inputEl = buttonLabel ? (
      <div className={cn("flex items-center gap-2", !labelLeft && "w-full")}>
        {inputContainer}
        <Button
          type="button"
          variant={buttonVariant}
          size={buttonSizeMap[size ?? "md"]}
          onClick={onButtonClick}
          disabled={disabled}
          className={cn("shrink-0", buttonClassName)}
        >
          {buttonLabel}
        </Button>
      </div>
    ) : inputContainer;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && !labelLeft && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        {labelLeft ? (
          <div className="flex items-start gap-3">
            {label && (
              <label htmlFor={inputId} className="text-sm font-medium text-foreground shrink-0 mt-2">
                {label}
              </label>
            )}
            <div className="flex flex-col gap-1 flex-1">
              {inputEl}
              <InputHelperText id={`${inputId}-helper`} helperText={helperText} errorMessage={errorMessage} isError={isError} />
            </div>
          </div>
        ) : (
          <>
            {inputEl}
            {(helperText || errorMessage) && (
              <p
                id={`${inputId}-helper`}
                className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}
              >
                {errorMessage || helperText}
              </p>
            )}
          </>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput, textInputVariants };
