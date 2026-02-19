import { Button } from "@workspace/ui/components/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/utils";

const dsButtonVariants = cva("font-semibold", {
  variants: {
    variant: {
      primary:
        "bg-epicode-primary text-epicode-primary-foreground shadow-sm hover:bg-epicode-primary/90",
      secondary:
        "border border-epicode-border bg-epicode-surface text-epicode-foreground hover:bg-epicode-muted",
      outline:
        "border border-epicode-border bg-transparent text-epicode-foreground hover:bg-epicode-primary/10",
      ghost: "text-epicode-foreground hover:bg-epicode-muted",
      danger: "bg-epicode-danger text-white hover:bg-epicode-danger/90",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-8 px-3 text-sm",
      lg: "h-11 px-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type PrimitiveButtonProps = React.ComponentProps<typeof Button>;

export type DsButtonProps = Omit<PrimitiveButtonProps, "variant" | "size"> &
  VariantProps<typeof dsButtonVariants> & {
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
  };

type DsButtonVariant = NonNullable<DsButtonProps["variant"]>;
type DsButtonSize = NonNullable<DsButtonProps["size"]>;

const primitiveVariantByDsVariant: Record<
  DsButtonVariant,
  PrimitiveButtonProps["variant"]
> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  danger: "destructive",
};

function DsButton({
  className,
  variant = "primary",
  size = "default",
  loading = false,
  icon,
  iconPosition = "start",
  disabled,
  children,
  ...props
}: DsButtonProps) {
  const resolvedVariant: DsButtonVariant = variant ?? "primary";
  const resolvedSize: DsButtonSize = size ?? "default";
  const primitiveVariant = primitiveVariantByDsVariant[resolvedVariant];
  const iconNode = loading ? (
    <Loader2Icon aria-hidden="true" className="size-4 animate-spin" />
  ) : (
    icon
  );

  return (
    <Button
      className={cn(
        dsButtonVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
      data-slot="ds-button"
      disabled={disabled || loading}
      size={resolvedSize}
      variant={primitiveVariant}
      {...props}
    >
      {iconNode && iconPosition === "start" ? (
        <span data-slot="ds-button-icon-start">{iconNode}</span>
      ) : null}
      <span data-slot="ds-button-label">{children}</span>
      {iconNode && iconPosition === "end" ? (
        <span data-slot="ds-button-icon-end">{iconNode}</span>
      ) : null}
    </Button>
  );
}

export { DsButton };
export default DsButton;
