import { Textarea } from "@workspace/ui/components/textarea";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRightIcon, PaperclipIcon } from "lucide-react";
import type * as React from "react";
import { useId, useRef, useState } from "react";
import { cn } from "../lib/utils";
import DsButton from "./ds-button";

const dsChatInputVariants = cva(
  "w-full rounded-2xl border border-epicode-border bg-epicode-surface p-3 shadow-[0_10px_30px_-24px_rgba(4,7,38,0.9)]",
  {
    variants: {
      size: {
        sm: "space-y-2",
        md: "space-y-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dsChatInputTextareaVariants = cva(
  "w-full resize-none border-epicode-border bg-epicode-ink/35 text-epicode-foreground placeholder:text-epicode-muted-foreground focus-visible:border-epicode-primary focus-visible:ring-2 focus-visible:ring-epicode-primary/30",
  {
    variants: {
      size: {
        sm: "min-h-20 rounded-xl px-3 py-2 text-sm leading-6",
        md: "min-h-24 rounded-xl px-3 py-2.5 text-sm leading-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface DsChatInputAttachment {
  id?: string;
  name: string;
  size?: number;
  type?: string;
}

export interface DsChatInputSendPayload {
  attachments: DsChatInputAttachment[];
  message: string;
}

export interface DsChatInputProps
  extends Omit<React.ComponentProps<"form">, "children" | "onSubmit">,
    VariantProps<typeof dsChatInputVariants> {
  accept?: string;
  allowAttachments?: boolean;
  attachLabel?: React.ReactNode;
  attachments?: DsChatInputAttachment[];
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  helperText?: React.ReactNode;
  maxLength?: number;
  multiple?: boolean;
  onAttachmentsChange?: (
    attachments: DsChatInputAttachment[],
    files: File[]
  ) => void;
  onSend?: (
    payload: DsChatInputSendPayload,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onValueChange?: (nextValue: string) => void;
  placeholder?: string;
  rows?: number;
  sending?: boolean;
  sendLabel?: React.ReactNode;
  textareaClassName?: string;
  textareaLabel?: React.ReactNode;
  value?: string;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function fileToAttachment(file: File): DsChatInputAttachment {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    type: file.type,
  };
}

function DsChatInput({
  className,
  size = "md",
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  onSubmit,
  placeholder = "Write your message...",
  disabled = false,
  sending = false,
  sendLabel = "Send",
  attachLabel = "Attach",
  textareaLabel = "Message",
  helperText,
  allowAttachments = true,
  attachments,
  onAttachmentsChange,
  accept,
  multiple = true,
  maxLength,
  rows = 3,
  textareaClassName,
  ...props
}: DsChatInputProps) {
  const textareaId = useId();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMessageControlled = typeof value === "string";
  const [internalMessage, setInternalMessage] = useState(defaultValue);
  const message = isMessageControlled ? value : internalMessage;

  const isAttachmentsControlled = Array.isArray(attachments);
  const [internalAttachments, setInternalAttachments] = useState<
    DsChatInputAttachment[]
  >([]);
  const resolvedAttachments = attachments ?? internalAttachments;
  const canSubmit =
    !(disabled || sending) &&
    (message.trim().length > 0 || resolvedAttachments.length > 0);

  function updateMessage(nextValue: string) {
    if (!isMessageControlled) {
      setInternalMessage(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    const normalized = selectedFiles.map(fileToAttachment);
    const mergedAttachments = multiple
      ? [...resolvedAttachments, ...normalized]
      : normalized;

    if (!isAttachmentsControlled) {
      setInternalAttachments(mergedAttachments);
    }
    onAttachmentsChange?.(mergedAttachments, selectedFiles);

    event.currentTarget.value = "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    onSubmit?.(event);
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    if (!(canSubmit && onSend)) {
      return;
    }

    onSend(
      {
        attachments: resolvedAttachments,
        message: message.trim(),
      },
      event
    );

    if (!isMessageControlled) {
      setInternalMessage("");
    }
    if (!isAttachmentsControlled) {
      setInternalAttachments([]);
    }
  }

  return (
    <form
      className={cn(dsChatInputVariants({ size }), className)}
      data-slot="ds-chat-input"
      onSubmit={handleSubmit}
      {...props}
    >
      <label className="sr-only" htmlFor={textareaId}>
        {textareaLabel}
      </label>
      <Textarea
        className={cn(dsChatInputTextareaVariants({ size }), textareaClassName)}
        data-slot="ds-chat-input-textarea"
        disabled={disabled || sending}
        id={textareaId}
        maxLength={maxLength}
        onChange={(event) => updateMessage(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        value={message}
      />

      {resolvedAttachments.length > 0 ? (
        <ul
          className="flex flex-wrap items-center gap-1.5"
          data-slot="ds-chat-input-attachments"
        >
          {resolvedAttachments.map((attachment, index) => (
            <li
              className="inline-flex max-w-full items-center gap-1 rounded-md border border-epicode-border/80 bg-epicode-muted/70 px-2 py-1 text-epicode-foreground text-xs"
              key={attachment.id ?? `${attachment.name}-${index}`}
            >
              <PaperclipIcon aria-hidden="true" className="size-3.5" />
              <span className="max-w-48 truncate">{attachment.name}</span>
              {typeof attachment.size === "number" ? (
                <span className="text-[11px] text-epicode-muted-foreground">
                  {formatFileSize(attachment.size)}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {helperText ? (
        <p
          className="text-epicode-muted-foreground text-xs"
          data-slot="ds-chat-input-helper"
        >
          {helperText}
        </p>
      ) : null}

      <div
        className="flex items-center justify-between gap-2"
        data-slot="ds-chat-input-controls"
      >
        {allowAttachments ? (
          <div className="flex items-center">
            <input
              accept={accept}
              className="sr-only"
              data-slot="ds-chat-input-file"
              disabled={disabled || sending}
              id={fileInputId}
              multiple={multiple}
              onChange={handleFileSelection}
              ref={fileInputRef}
              type="file"
            />
            <DsButton
              className="h-8 rounded-lg px-2.5 text-epicode-muted-foreground hover:text-epicode-foreground"
              disabled={disabled || sending}
              icon={<PaperclipIcon aria-hidden="true" className="size-4" />}
              onClick={() => fileInputRef.current?.click()}
              size="sm"
              type="button"
              variant="ghost"
            >
              {attachLabel}
            </DsButton>
          </div>
        ) : (
          <span />
        )}

        <DsButton
          className="h-8 rounded-lg px-3"
          disabled={!canSubmit}
          icon={<ArrowRightIcon aria-hidden="true" className="size-4" />}
          iconPosition="end"
          loading={sending}
          size="sm"
          type="submit"
          variant="primary"
        >
          {sendLabel}
        </DsButton>
      </div>
    </form>
  );
}

export { DsChatInput };
export default DsChatInput;
