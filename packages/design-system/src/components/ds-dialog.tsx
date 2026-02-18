import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

const dsDialogContentVariants = cva(
  "border border-epicode-border bg-epicode-surface p-5 text-epicode-foreground shadow-[0_24px_60px_-24px_rgba(4,7,38,0.8)]",
  {
    variants: {
      size: {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type PrimitiveDialogProps = React.ComponentProps<typeof Dialog>;
type PrimitiveDialogCloseProps = React.ComponentProps<typeof DialogClose>;
type PrimitiveDialogContentProps = React.ComponentProps<typeof DialogContent>;
type PrimitiveDialogDescriptionProps = React.ComponentProps<
  typeof DialogDescription
>;
type PrimitiveDialogFooterProps = React.ComponentProps<typeof DialogFooter>;
type PrimitiveDialogHeaderProps = React.ComponentProps<typeof DialogHeader>;
type PrimitiveDialogTitleProps = React.ComponentProps<typeof DialogTitle>;
type PrimitiveDialogTriggerProps = React.ComponentProps<typeof DialogTrigger>;

export interface DsDialogContentProps
  extends PrimitiveDialogContentProps,
    VariantProps<typeof dsDialogContentVariants> {}

export type DsDialogProps = PrimitiveDialogProps;
export type DsDialogCloseProps = PrimitiveDialogCloseProps;
export type DsDialogTriggerProps = PrimitiveDialogTriggerProps;

function DsDialog({ ...props }: DsDialogProps) {
  return <Dialog data-slot="ds-dialog" {...props} />;
}

function DsDialogTrigger({ ...props }: DsDialogTriggerProps) {
  return <DialogTrigger data-slot="ds-dialog-trigger" {...props} />;
}

function DsDialogClose({ ...props }: DsDialogCloseProps) {
  return <DialogClose data-slot="ds-dialog-close" {...props} />;
}

function DsDialogContent({
  className,
  size = "md",
  ...props
}: DsDialogContentProps) {
  return (
    <DialogContent
      className={cn(dsDialogContentVariants({ size }), className)}
      data-slot="ds-dialog-content"
      {...props}
    />
  );
}

function DsDialogHeader({
  className,
  children,
  ...props
}: PrimitiveDialogHeaderProps) {
  return (
    <DialogHeader
      className={cn(
        "relative -mx-5 -mt-5 gap-0 border-epicode-border border-b px-5 pt-6 pb-4",
        className
      )}
      data-slot="ds-dialog-header"
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-1 rounded-t-xl bg-gradient-to-r from-epicode-primary via-epicode-primary/75 to-epicode-primary/25"
        data-slot="ds-dialog-header-bar"
      />
      <div className="space-y-2">{children}</div>
    </DialogHeader>
  );
}

function DsDialogTitle({ className, ...props }: PrimitiveDialogTitleProps) {
  return (
    <DialogTitle
      className={cn(
        "font-display font-semibold text-xl tracking-tight",
        className
      )}
      data-slot="ds-dialog-title"
      {...props}
    />
  );
}

function DsDialogDescription({
  className,
  ...props
}: PrimitiveDialogDescriptionProps) {
  return (
    <DialogDescription
      className={cn("text-epicode-muted-foreground text-sm", className)}
      data-slot="ds-dialog-description"
      {...props}
    />
  );
}

function DsDialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-3 text-epicode-foreground text-sm", className)}
      data-slot="ds-dialog-body"
      {...props}
    />
  );
}

function DsDialogFooter({ className, ...props }: PrimitiveDialogFooterProps) {
  return (
    <DialogFooter
      className={cn(
        "-mx-5 -mb-5 rounded-b-xl border-epicode-border bg-epicode-muted/35 px-5 py-4",
        className
      )}
      data-slot="ds-dialog-footer"
      {...props}
    />
  );
}

export {
  DsDialog,
  DsDialogBody,
  DsDialogClose,
  DsDialogContent,
  DsDialogDescription,
  DsDialogFooter,
  DsDialogHeader,
  DsDialogTitle,
  DsDialogTrigger,
};
export default DsDialog;
