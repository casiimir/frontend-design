import { Button } from "@workspace/ui/components/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import { cn } from "../lib/utils";
import type { DsTreeNode } from "./ds-tree-item";
import { DsTreeItem } from "./ds-tree-item";

interface SidebarBaseProps {
  collapsible?: "offcanvas" | "icon" | "none";
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
}

const DEFAULT_SIDEBAR_LOGO_SRC = new URL(
  "../../public/logo.png",
  import.meta.url
).href;

export type DsSidebarProps = SidebarBaseProps & {
  items: DsTreeNode[];
  activeItemId?: string;
  brandIcon?: ReactNode;
  className?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
  expandedItemIds?: string[];
  footer?: ReactNode;
  headerEnd?: ReactNode;
  onItemSelect?: (item: DsTreeNode) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  providerClassName?: string;
  providerStyle?: CSSProperties;
  showCollapseTrigger?: boolean;
  logoAlt?: string;
  logoSrc?: string;
  title?: ReactNode;
};

export type DsSidebarTriggerProps = ComponentProps<typeof Button> & {
  side?: "left" | "right";
};

function DsSidebarTrigger({
  side = "left",
  className,
  onClick,
  ...props
}: DsSidebarTriggerProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isLeft = side === "left";
  let Icon = ChevronsLeftIcon;

  if (isLeft) {
    Icon = isCollapsed ? ChevronsRightIcon : ChevronsLeftIcon;
  } else {
    Icon = isCollapsed ? ChevronsLeftIcon : ChevronsRightIcon;
  }

  return (
    <Button
      aria-label="Toggle sidebar"
      className={cn(
        "size-6 rounded-sm text-sidebar-foreground/55 hover:bg-transparent hover:text-sidebar-foreground",
        className
      )}
      data-slot="ds-sidebar-trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      <Icon className="size-3.5" />
    </Button>
  );
}

function DsSidebar({
  items,
  activeItemId,
  expandedItemIds,
  onItemSelect,
  title = "Course Content",
  brandIcon,
  logoAlt = "EPICODE",
  logoSrc = DEFAULT_SIDEBAR_LOGO_SRC,
  headerEnd,
  footer,
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
  defaultOpen = true,
  open,
  onOpenChange,
  providerClassName,
  providerStyle,
  showCollapseTrigger = true,
  className,
  contentClassName,
}: DsSidebarProps) {
  const [internalActiveItemId, setInternalActiveItemId] = useState<
    string | undefined
  >(activeItemId);

  const resolvedActiveItemId = activeItemId ?? internalActiveItemId;
  const handleItemSelect = useCallback(
    (item: DsTreeNode) => {
      if (activeItemId === undefined) {
        setInternalActiveItemId(item.id);
      }

      onItemSelect?.(item);
    },
    [activeItemId, onItemSelect]
  );

  const resolvedBrandIcon = brandIcon ?? (
    <span
      aria-label={logoAlt}
      className="block h-7 w-9 bg-center bg-contain bg-no-repeat"
      role="img"
      style={{ backgroundImage: `url(${logoSrc})` }}
    />
  );

  return (
    <SidebarProvider
      className={providerClassName}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      style={
        {
          "--sidebar-width": "17.25rem",
          "--sidebar-width-icon": "4.25rem",
          ...providerStyle,
        } as CSSProperties
      }
    >
      <Sidebar
        className={cn(
          "border-sidebar-border/90 bg-sidebar font-sans text-sidebar-foreground",
          className
        )}
        collapsible={collapsible}
        side={side}
        variant={variant}
      >
        <div className="relative flex h-full flex-col">
          <SidebarHeader className="border-sidebar-border/90 px-4 pt-4 pb-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0">{resolvedBrandIcon}</span>
                <h2 className="truncate font-display font-semibold text-[1.03rem] tracking-tight">
                  {title}
                </h2>
              </div>
              {headerEnd}
            </div>
          </SidebarHeader>
          <SidebarContent className={cn("px-2 py-2.5", contentClassName)}>
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {items.map((item) => (
                    <DsTreeItem
                      activeItemId={resolvedActiveItemId}
                      expandedItemIds={expandedItemIds}
                      item={item}
                      key={item.id}
                      onItemSelect={handleItemSelect}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          {footer ? (
            <SidebarFooter className="border-sidebar-border/90 border-t px-2.5 py-2.5">
              {footer}
            </SidebarFooter>
          ) : null}
          {showCollapseTrigger && collapsible !== "none" ? (
            <DsSidebarTrigger
              className={cn(
                "absolute top-[5.15rem] z-30 -translate-y-1/2 rounded-full bg-sidebar/95 text-sidebar-foreground/60 shadow-sm",
                side === "left" ? "-right-3.5" : "-left-3.5"
              )}
              side={side}
            />
          ) : null}
        </div>
        <SidebarRail className="after:bg-sidebar-border/90 hover:after:bg-sidebar-border" />
      </Sidebar>
    </SidebarProvider>
  );
}

export { DsSidebar, DsSidebarTrigger };
export default DsSidebar;
