import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Track Variants ────────────────────────────────────────── */
const switchTrackVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer",
    "transition-colors duration-200 ease-in-out",
    "border-border border",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "bg-ac-gray-30 rounded-lg",
    "data-[state=checked]:bg-white",
  ],
  {
    variants: {
      size: {
        lg: "h-5 w-9",
        md: "h-4 w-[30px]",
      },
    },
    defaultVariants: { size: "lg" },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none inline-block rounded-full",
    "shadow-md translate-y-[-1px] ",
    "transition-all duration-200 ease-in-out",
    "translate-x-0",
    "bg-ac-gray-50",
    "data-[state=checked]:bg-[--switch-color]",
  ],
  {
    variants: {
      size: {
        lg: "h-5 w-5 data-[state=checked]:translate-x-4",
        md: "h-4 w-4 data-[state=checked]:translate-x-[14px]",
      },
    },
    defaultVariants: { size: "lg" },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchTrackVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** 활성 색상 (기본: ac-primary-50 #FF6300) */
  activeColor?: string;
  label?: string;
}

/* ── Component ─────────────────────────────────────────────── */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, checked, defaultChecked, onCheckedChange, activeColor, label, disabled, id, style, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
    const controlled = checked !== undefined;
    const state = (controlled ? checked : isChecked) ? "checked" : "unchecked";
    const inputId = id ?? React.useId();

    const handleClick = () => {
      if (disabled) return;
      const next = state !== "checked";
      if (!controlled) setIsChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <div className="inline-flex items-center gap-2">
        <button
          ref={ref}
          id={inputId}
          type="button"
          role="switch"
          aria-checked={state === "checked"}
          data-state={state}
          disabled={disabled}
          onClick={handleClick}
          className={cn(switchTrackVariants({ size }), className)}
          style={{
            ["--switch-color" as string]: activeColor ?? "#FF6300",
            ...style,
          }}
          {...props}
        >
          <span
            data-state={state}
            className={cn(switchThumbVariants({ size }))}
          />
        </button>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
