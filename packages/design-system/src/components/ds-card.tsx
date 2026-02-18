import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";
import DsProgress from "./ds-progress";

const dsCardVariants = cva(
  "border border-epicode-border/80 bg-epicode-surface text-epicode-foreground shadow-[0_8px_24px_-16px_rgba(4,7,38,0.6)] transition-colors",
  {
    variants: {
      variant: {
        default: "",
        lesson:
          "bg-gradient-to-br from-epicode-primary/10 via-epicode-surface to-epicode-surface",
      },
    },
    defaultVariants: {
      variant: "lesson",
    },
  }
);

type PrimitiveCardProps = React.ComponentProps<typeof Card>;

export interface DsCardProps
  extends Omit<PrimitiveCardProps, "title">,
    VariantProps<typeof dsCardVariants> {
  action?: React.ReactNode;
  contentClassName?: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  progressLabel?: React.ReactNode;
  progressSlot?: React.ReactNode;
  progressValue?: number;
  title?: React.ReactNode;
}

function DsCard({
  className,
  variant = "lesson",
  title,
  description,
  action,
  progressValue,
  progressLabel = "Progress",
  progressSlot,
  footer,
  contentClassName,
  children,
  ...props
}: DsCardProps) {
  const hasHeader = !!(title || description || action);
  const hasProgress = !!progressSlot || typeof progressValue === "number";

  return (
    <Card
      className={cn(dsCardVariants({ variant }), className)}
      data-slot="ds-card"
      {...props}
    >
      {hasHeader ? (
        <CardHeader className="border-epicode-border/70 border-b pb-3">
          {title ? (
            <CardTitle className="font-display font-semibold text-xl">
              {title}
            </CardTitle>
          ) : null}
          {description ? (
            <CardDescription className="text-epicode-muted-foreground text-sm">
              {description}
            </CardDescription>
          ) : null}
          {action ? <CardAction>{action}</CardAction> : null}
        </CardHeader>
      ) : null}
      <CardContent className={cn("space-y-3", contentClassName)}>
        {children}
        {hasProgress ? (
          <div data-slot="ds-card-progress">
            {progressSlot ?? (
              <DsProgress
                label={progressLabel}
                showPercentage
                size="md"
                tone="brand"
                value={progressValue ?? 0}
              />
            )}
          </div>
        ) : null}
      </CardContent>
      {footer ? (
        <CardFooter className="border-epicode-border/70 border-t bg-epicode-muted/40">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  );
}

export { DsCard };
export default DsCard;
