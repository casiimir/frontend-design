import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@workspace/ui/components/sidebar";
import { ChevronRightIcon, FileTextIcon, FolderIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/utils";

export type DsTreeItemStatus = "completed" | "in-progress" | "locked" | "new";

export interface DsTreeNode {
  children?: DsTreeNode[];
  disabled?: boolean;
  icon?: React.ReactNode;
  id: string;
  label: string;
  status?: DsTreeItemStatus;
}

export interface DsTreeItemProps {
  activeItemId?: string;
  depth?: number;
  expandedItemIds?: string[];
  item: DsTreeNode;
  onItemSelect?: (item: DsTreeNode) => void;
}

const TREE_STATUS_META: Record<
  DsTreeItemStatus,
  { className: string; label: string }
> = {
  completed: {
    label: "Done",
    className:
      "border-emerald-400/35 bg-emerald-500/10 text-emerald-200/95 dark:border-emerald-400/35 dark:bg-emerald-500/10 dark:text-emerald-200/95",
  },
  "in-progress": {
    label: "Now",
    className:
      "border-epicode-primary/45 bg-epicode-primary/15 text-epicode-foreground",
  },
  locked: {
    label: "Lock",
    className:
      "border-sidebar-border bg-sidebar-accent/35 text-sidebar-foreground/70",
  },
  new: {
    label: "New",
    className:
      "border-sky-400/35 bg-sky-400/10 text-sky-100 dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-100",
  },
};

function hasDescendant(node: DsTreeNode, id?: string): boolean {
  if (!(id && node.children?.length)) {
    return false;
  }

  return node.children.some(
    (child) => child.id === id || hasDescendant(child, id)
  );
}

function getTreeItemButtonClass(depth: number) {
  return cn(
    "h-[34px] rounded-md px-2.5 text-left leading-none transition-colors",
    "!bg-transparent hover:!bg-transparent active:!bg-transparent font-sans text-sidebar-foreground/88 hover:text-sidebar-foreground",
    "data-[active=true]:!bg-sidebar-accent data-[active=true]:hover:!bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
    depth === 0
      ? "font-semibold text-[14px] text-sidebar-foreground/96"
      : "font-medium text-[13px]",
    depth >= 2 ? "text-sidebar-foreground/82" : undefined
  );
}

function getDefaultIconClass(depth: number) {
  return cn(
    "size-3.5",
    depth === 0 ? "text-sidebar-foreground/75" : "text-sidebar-foreground/65"
  );
}

function TreeItemStatusBadge({ status }: { status: DsTreeItemStatus }) {
  const meta = TREE_STATUS_META[status];

  return (
    <span
      className={cn(
        "inline-flex h-4 shrink-0 items-center rounded-sm border px-1.5 font-sans font-semibold text-[9px] uppercase tracking-[0.09em]",
        meta.className
      )}
      data-slot="ds-tree-item-status"
    >
      {meta.label}
    </span>
  );
}

function DsTreeItem({
  item,
  activeItemId,
  expandedItemIds,
  onItemSelect,
  depth = 0,
}: DsTreeItemProps) {
  const children = item.children ?? [];
  const hasChildren = children.length > 0;
  const isActive = item.id === activeItemId;
  const defaultOpen =
    !!expandedItemIds?.includes(item.id) || hasDescendant(item, activeItemId);
  const Icon = hasChildren ? FolderIcon : FileTextIcon;

  if (!hasChildren) {
    return (
      <SidebarMenuItem data-depth={depth} data-slot="ds-tree-item">
        <SidebarMenuButton
          className={getTreeItemButtonClass(depth)}
          data-slot="ds-tree-item-button"
          disabled={item.disabled}
          isActive={isActive}
          onClick={() => onItemSelect?.(item)}
        >
          {item.icon ?? (
            <Icon aria-hidden="true" className={getDefaultIconClass(depth)} />
          )}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate">{item.label}</span>
            {item.status ? <TreeItemStatusBadge status={item.status} /> : null}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem data-depth={depth} data-slot="ds-tree-item">
      <Collapsible className="group/ds-tree-item" defaultOpen={defaultOpen}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={getTreeItemButtonClass(depth)}
            data-slot="ds-tree-item-button"
            disabled={item.disabled}
            isActive={isActive}
            onClick={() => onItemSelect?.(item)}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className="size-3.5 text-sidebar-foreground/55 transition-transform duration-150 group-data-[state=open]/menu-button:rotate-90"
            />
            {item.icon ?? (
              <Icon aria-hidden="true" className={getDefaultIconClass(depth)} />
            )}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="truncate">{item.label}</span>
              {item.status ? (
                <TreeItemStatusBadge status={item.status} />
              ) : null}
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent
          className="mt-0.5"
          data-slot="ds-tree-item-children"
        >
          <SidebarMenuSub className="ml-3.5 border-sidebar-border/75 py-0.5 pl-2.5">
            {children.map((child) => (
              <DsTreeItem
                activeItemId={activeItemId}
                depth={depth + 1}
                expandedItemIds={expandedItemIds}
                item={child}
                key={child.id}
                onItemSelect={onItemSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

export { DsTreeItem };
export default DsTreeItem;
