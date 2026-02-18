import DsButton from "./components/ds-button";
import DsBadge from "./components/ds-badge";
import DsCard from "./components/ds-card";
import DsInput from "./components/ds-input";
import DsProgress from "./components/ds-progress";
import DsAvatar from "./components/ds-avatar";

import DsSidebar, {
  DsSidebarTrigger,
  type DsSidebarProps,
} from "./components/ds-sidebar";
import DsTreeItem, {
  type DsTreeItemProps,
  type DsTreeItemStatus,
  type DsTreeNode,
} from "./components/ds-tree-item";
import type { DsBadgeProps, DsBadgeStatus } from "./components/ds-badge";
import type { DsButtonProps } from "./components/ds-button";
import type { DsInputProps } from "./components/ds-input";
import type { DsProgressProps } from "./components/ds-progress";
import type { DsAvatarProps, DsAvatarStatus } from "./components/ds-avatar";

export { DsAvatar, DsBadge, DsButton, DsCard, DsInput, DsProgress };

export { DsSidebar, DsSidebarTrigger, DsTreeItem };
export type {
  DsAvatarProps,
  DsAvatarStatus,
  DsBadgeProps,
  DsBadgeStatus,
  DsButtonProps,
  DsInputProps,
  DsProgressProps,
  DsSidebarProps,
  DsTreeItemProps,
  DsTreeItemStatus,
  DsTreeNode,
};
