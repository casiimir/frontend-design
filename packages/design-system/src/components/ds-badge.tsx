import { Badge } from "@workspace/ui/components/badge";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

export type DsBadgeStatus = "completed" | "in-progress" | "locked" | "new";

const STATUS_LABELS: Record<DsBadgeStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  locked: "Locked",
  new: "New",
};

const dsBadgeVariants = cva("font-medium font-sans tracking-tight", {
  variants: {
    status: {
      completed:
        "border-epicode-success/50 bg-epicode-success/20 text-epicode-success",
      "in-progress":
        "border-epicode-warning/50 bg-epicode-warning/20 text-epicode-warning",
      locked:
        "border-epicode-border bg-epicode-muted text-epicode-muted-foreground",
      new: "border-epicode-primary/50 bg-epicode-primary/20 text-epicode-primary",
    },
    size: {
      sm: "h-5 px-2 text-[11px]",
      md: "h-6 px-2.5 text-xs",
    },
  },
  defaultVariants: {
    status: "in-progress",
    size: "md",
  },
});

type PrimitiveBadgeProps = React.ComponentProps<typeof Badge>;

export interface DsBadgeProps
  extends Omit<PrimitiveBadgeProps, "variant">,
    VariantProps<typeof dsBadgeVariants> {}

function DsBadge({
  className,
  status = "in-progress",
  size = "md",
  children,
  ...props
}: DsBadgeProps) {
  const resolvedStatus = status ?? "in-progress";

  return (
    <Badge
      className={cn(
        dsBadgeVariants({ status: resolvedStatus, size }),
        className
      )}
      data-size={size}
      data-slot="ds-badge"
      data-status={resolvedStatus}
      variant="outline"
      {...props}
    >
      {children ?? STATUS_LABELS[resolvedStatus]}
    </Badge>
  );
}

export { DsBadge };
export default DsBadge;
