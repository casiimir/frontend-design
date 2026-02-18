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
    "h-9 rounded-md px-2.5 text-left text-[14px] leading-none transition-colors",
    "!bg-transparent hover:!bg-transparent active:!bg-transparent font-display text-sidebar-foreground/88 hover:text-sidebar-foreground",
    "data-[active=true]:!bg-sidebar-accent data-[active=true]:hover:!bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
    depth === 0
      ? "font-semibold text-[14px] text-sidebar-foreground/96"
      : "font-medium text-[13.5px]",
    depth >= 2 ? "text-sidebar-foreground/82" : undefined
  );
}

function getDefaultIconClass(depth: number) {
  return cn(
    "size-3.5",
    depth === 0 ? "text-sidebar-foreground/75" : "text-sidebar-foreground/65"
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
          <span>{item.label}</span>
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
              className="size-3.5 text-sidebar-foreground/55 transition-transform duration-150 group-data-[state=open]/ds-tree-item:rotate-90"
            />
            {item.icon ?? (
              <Icon aria-hidden="true" className={getDefaultIconClass(depth)} />
            )}
            <span>{item.label}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent
          className="mt-0.5"
          data-slot="ds-tree-item-children"
        >
          <SidebarMenuSub className="ml-4 border-sidebar-border/75 py-0.5 pl-3">
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
