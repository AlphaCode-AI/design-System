import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";

/* ── Container Variants ────────────────────────────────────── */
const textInputVariants = cva(
  [
    "flex items-center rounded-md border bg-background transition-colors duration-150",
    "focus-within:border-ac-gray-80",
    "has-[:disabled]:bg-ac-gray-20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
  ],
  {
    variants: {
      size: {
        lg: "h-10 px-3 text-sm gap-2",
        md: "h-9 px-3 text-sm gap-2",
        sm: "h-[30px] px-2.5 text-xs gap-1.5",
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
      buttonLabel, onButtonClick,
      id, disabled, ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const isError = state === "error" || !!errorMessage;
    const resolvedState = isError ? "error" : state;

    const inputContainer = (
      <div
        className={cn(
          textInputVariants({ size, state: resolvedState }),
          buttonLabel ? "flex-1" : !labelLeft && "w-full",
          className
        )}
      >
        {prefix && <span className="shrink-0 text-muted-foreground">{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={isError}
          aria-describedby={helperText || errorMessage ? `${inputId}-helper` : undefined}
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-0"
          {...props}
        />
        {suffix && <span className="shrink-0 text-muted-foreground">{suffix}</span>}
      </div>
    );

    const inputEl = buttonLabel ? (
      <div className={cn("flex items-center gap-2", !labelLeft && "w-full")}>
        {inputContainer}
        <Button
          type="button"
          size={buttonSizeMap[size ?? "md"]}
          onClick={onButtonClick}
          disabled={disabled}
          className="shrink-0"
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
              {(helperText || errorMessage) && (
                <p
                  id={`${inputId}-helper`}
                  className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}
                >
                  {errorMessage || helperText}
                </p>
              )}
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

export { TextInput };
