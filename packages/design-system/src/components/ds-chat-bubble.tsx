import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

const dsChatBubbleVariants = cva("w-full", {
  variants: {
    variant: {
      user: "flex justify-end",
      assistant: "flex justify-start",
    },
  },
  defaultVariants: {
    variant: "assistant",
  },
});

const dsChatBubbleCardVariants = cva(
  "max-w-[80%] rounded-2xl border px-4 py-2.5 shadow-[0_10px_24px_-20px_rgba(4,7,38,0.9)]",
  {
    variants: {
      variant: {
        user: "rounded-br-md border-epicode-primary/55 bg-epicode-primary text-epicode-primary-foreground",
        assistant:
          "rounded-bl-md border-epicode-border bg-epicode-surface text-epicode-foreground",
      },
    },
    defaultVariants: {
      variant: "assistant",
    },
  }
);

export interface DsChatBubbleProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof dsChatBubbleVariants> {
  avatar?: React.ReactNode;
  message: React.ReactNode;
  timestamp?: React.ReactNode;
}

function DsChatBubble({
  className,
  variant = "assistant",
  avatar,
  message,
  timestamp,
  ...props
}: DsChatBubbleProps) {
  const resolvedVariant = variant ?? "assistant";

  return (
    <div
      className={cn(
        dsChatBubbleVariants({ variant: resolvedVariant }),
        className
      )}
      data-slot="ds-chat-bubble"
      data-variant={resolvedVariant}
      {...props}
    >
      <div
        className={cn(
          "flex items-end gap-2",
          resolvedVariant === "user" ? "flex-row-reverse" : "flex-row"
        )}
      >
        {avatar ? <div data-slot="ds-chat-bubble-avatar">{avatar}</div> : null}
        <div
          className={cn(dsChatBubbleCardVariants({ variant: resolvedVariant }))}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message}
          </p>
          {timestamp ? (
            <span
              className={cn(
                "mt-1.5 block text-[11px] leading-none opacity-80",
                resolvedVariant === "user"
                  ? "text-epicode-primary-foreground/80"
                  : "text-epicode-muted-foreground"
              )}
              data-slot="ds-chat-bubble-time"
            >
              {timestamp}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { DsChatBubble };
export default DsChatBubble;
