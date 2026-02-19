import { Progress } from "@workspace/ui/components/progress";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

const dsProgressTrackVariants = cva(
  "overflow-hidden rounded-full bg-epicode-muted",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2",
        lg: "h-2.5",
      },
      tone: {
        brand: "[&_[data-slot=progress-indicator]]:bg-epicode-primary",
        success: "[&_[data-slot=progress-indicator]]:bg-epicode-success",
        warning: "[&_[data-slot=progress-indicator]]:bg-epicode-warning",
        danger: "[&_[data-slot=progress-indicator]]:bg-epicode-danger",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "brand",
    },
  }
);

type PrimitiveProgressProps = React.ComponentProps<typeof Progress>;

export interface DsProgressProps
  extends Omit<PrimitiveProgressProps, "value">,
    VariantProps<typeof dsProgressTrackVariants> {
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  showPercentage?: boolean;
  value?: number;
  valueText?: React.ReactNode;
}

function normalizePercentage(value?: number, max = 100) {
  if (typeof value !== "number") {
    return 0;
  }

  if (!(max > 0)) {
    return 0;
  }

  const percentage = (value / max) * 100;

  if (percentage < 0) {
    return 0;
  }

  if (percentage > 100) {
    return 100;
  }

  return percentage;
}

function DsProgress({
  className,
  size = "md",
  tone = "brand",
  value = 0,
  max = 100,
  label,
  helperText,
  showPercentage = true,
  valueText,
  ...props
}: DsProgressProps) {
  const percentage = normalizePercentage(value, max);
  const resolvedValueText = valueText ?? `${Math.round(percentage)}%`;

  return (
    <div className="space-y-1.5" data-slot="ds-progress">
      {label || showPercentage ? (
        <div className="flex items-center justify-between gap-2">
          {label ? (
            <span className="font-medium text-epicode-foreground text-sm">
              {label}
            </span>
          ) : (
            <span />
          )}
          {showPercentage ? (
            <span className="font-medium text-epicode-muted-foreground text-xs">
              {resolvedValueText}
            </span>
          ) : null}
        </div>
      ) : null}
      <Progress
        className={cn(dsProgressTrackVariants({ size, tone }), className)}
        data-slot="ds-progress-track"
        max={100}
        value={percentage}
        {...props}
      />
      {helperText ? (
        <p className="text-epicode-muted-foreground text-xs">{helperText}</p>
      ) : null}
    </div>
  );
}

export { DsProgress };
export default DsProgress;
