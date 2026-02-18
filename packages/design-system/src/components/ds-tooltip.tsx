import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

const dsTooltipContentVariants = cva(
  "rounded-lg border font-medium shadow-[0_12px_30px_-16px_rgba(4,7,38,0.85)]",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
      },
      tone: {
        neutral:
          "border-epicode-border bg-epicode-surface text-epicode-foreground [&>svg]:!bg-epicode-surface [&>svg]:!fill-epicode-surface",
        brand:
          "border-epicode-primary/70 bg-epicode-primary text-epicode-primary-foreground [&>svg]:!bg-epicode-primary [&>svg]:!fill-epicode-primary",
        inverse:
          "border-epicode-foreground/70 bg-epicode-foreground text-epicode-surface [&>svg]:!bg-epicode-foreground [&>svg]:!fill-epicode-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "neutral",
    },
  }
);

type PrimitiveTooltipProps = React.ComponentProps<typeof Tooltip>;
type PrimitiveTooltipProviderProps = React.ComponentProps<typeof TooltipProvider>;
type PrimitiveTooltipTriggerProps = React.ComponentProps<typeof TooltipTrigger>;
type PrimitiveTooltipContentProps = React.ComponentProps<typeof TooltipContent>;

export type DsTooltipProps = PrimitiveTooltipProps;
export type DsTooltipProviderProps = PrimitiveTooltipProviderProps;
export type DsTooltipTriggerProps = PrimitiveTooltipTriggerProps;

export interface DsTooltipContentProps
  extends PrimitiveTooltipContentProps,
    VariantProps<typeof dsTooltipContentVariants> {}

function DsTooltipProvider({
  delayDuration = 120,
  ...props
}: DsTooltipProviderProps) {
  return (
    <TooltipProvider
      data-slot="ds-tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function DsTooltip({ ...props }: DsTooltipProps) {
  return <Tooltip data-slot="ds-tooltip" {...props} />;
}

function DsTooltipTrigger({ ...props }: DsTooltipTriggerProps) {
  return <TooltipTrigger data-slot="ds-tooltip-trigger" {...props} />;
}

function DsTooltipContent({
  className,
  size = "md",
  tone = "neutral",
  sideOffset = 8,
  ...props
}: DsTooltipContentProps) {
  return (
    <TooltipContent
      className={cn(dsTooltipContentVariants({ size, tone }), className)}
      data-slot="ds-tooltip-content"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export {
  DsTooltip,
  DsTooltipContent,
  DsTooltipProvider,
  DsTooltipTrigger,
};
export default DsTooltip;
