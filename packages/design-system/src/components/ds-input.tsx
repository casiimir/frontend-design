import { Input } from "@workspace/ui/components/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useId } from "react";
import { cn } from "../lib/utils";

const dsInputVariants = cva(
  "h-10 rounded-xl border-epicode-border bg-epicode-surface text-epicode-foreground placeholder:text-epicode-muted-foreground focus-visible:border-epicode-primary focus-visible:ring-2 focus-visible:ring-epicode-primary/35",
  {
    variants: {
      state: {
        default: "",
        error:
          "border-epicode-danger/70 focus-visible:border-epicode-danger focus-visible:ring-epicode-danger/35",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

type PrimitiveInputProps = React.ComponentProps<typeof Input>;

export interface DsInputProps
  extends Omit<PrimitiveInputProps, "aria-invalid">,
    VariantProps<typeof dsInputVariants> {
  containerClassName?: string;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  invalid?: boolean;
  label?: React.ReactNode;
}

function DsInput({
  className,
  containerClassName,
  id,
  label,
  helperText,
  error,
  state = "default",
  invalid = false,
  "aria-describedby": ariaDescribedByProp,
  ...props
}: DsInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = invalid || state === "error" || !!error;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const ariaDescribedBy = [ariaDescribedByProp, helperId, errorId]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={cn("space-y-1.5", containerClassName)} data-slot="ds-input">
      {label ? (
        <label
          className="font-medium text-epicode-foreground text-sm"
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : null}
      <Input
        aria-describedby={ariaDescribedBy || undefined}
        aria-invalid={hasError || undefined}
        className={cn(
          dsInputVariants({ state: hasError ? "error" : state }),
          className
        )}
        data-invalid={hasError}
        data-slot="ds-input-field"
        data-state={hasError ? "error" : "default"}
        id={inputId}
        {...props}
      />
      {helperText ? (
        <p
          className="text-epicode-muted-foreground text-xs"
          data-slot="ds-input-helper"
          id={helperId}
        >
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p
          className="font-medium text-epicode-danger text-xs"
          data-slot="ds-input-error"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { DsInput };
export default DsInput;
