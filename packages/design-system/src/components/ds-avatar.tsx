import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

export type DsAvatarStatus = "online" | "away" | "offline";

const dsAvatarStatusVariants = cva("ring-1 ring-epicode-surface", {
  variants: {
    status: {
      online: "bg-epicode-success",
      away: "bg-epicode-warning",
      offline: "bg-epicode-muted-foreground",
    },
  },
  defaultVariants: {
    status: "offline",
  },
});

type PrimitiveAvatarProps = React.ComponentProps<typeof Avatar>;

export interface DsAvatarProps
  extends Omit<PrimitiveAvatarProps, "children" | "size"> {
  alt?: string;
  fallback?: React.ReactNode;
  name?: string;
  showStatus?: boolean;
  size?: "default" | "sm" | "lg";
  src?: string;
  status?: DsAvatarStatus;
}

const initialsPartsRegex = /\s+/;

function getInitials(name?: string) {
  if (!name) {
    return "EP";
  }
  const parts = name.trim().split(initialsPartsRegex).filter(Boolean);

  if (parts.length === 0) {
    return "EP";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function DsAvatar({
  className,
  size = "default",
  src,
  alt,
  name,
  fallback,
  status = "offline",
  showStatus = true,
  ...props
}: DsAvatarProps) {
  const resolvedSize = size ?? "default";
  const resolvedStatus = status ?? "offline";
  const fallbackLabel = fallback ?? getInitials(name);
  const altText = alt ?? name ?? "User avatar";

  return (
    <Avatar
      className={cn(
        "bg-epicode-surface ring-1 ring-epicode-border/70",
        className
      )}
      data-slot="ds-avatar"
      size={resolvedSize}
      {...props}
    >
      {src ? <AvatarImage alt={altText} src={src} /> : null}
      <AvatarFallback
        className="bg-epicode-primary/20 font-sans font-semibold text-epicode-primary uppercase tracking-tight"
        data-slot="ds-avatar-fallback"
      >
        {fallbackLabel}
      </AvatarFallback>
      {showStatus ? (
        <AvatarBadge
          className={cn(dsAvatarStatusVariants({ status: resolvedStatus }))}
          data-slot="ds-avatar-status"
          data-status={resolvedStatus}
        />
      ) : null}
    </Avatar>
  );
}

export { DsAvatar };
export default DsAvatar;
