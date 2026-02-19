import { render, screen } from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import type * as React from "react";
import { describe, expect, it, vi } from "vitest";
import type { DsTreeNode } from "./ds-tree-item";
import DsTreeItem from "./ds-tree-item";

vi.mock("@workspace/ui/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

const INTRO_TO_DATA_LABEL = /Intro to data/i;
const LESSON_1_LABEL = /Lesson 1/i;

function renderInSidebar(node: React.ReactNode) {
  return render(
    <SidebarProvider>
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarMenu>{node}</SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

describe("DsTreeItem", () => {
  it("renders without crashing and shows item label", () => {
    const item: DsTreeNode = { id: "lesson-1", label: "Intro to data" };

    renderInSidebar(<DsTreeItem item={item} />);

    expect(
      screen.getByRole("button", { name: INTRO_TO_DATA_LABEL })
    ).toBeInTheDocument();
  });

  it("renders nested children when item is expanded", () => {
    const item: DsTreeNode = {
      id: "module-1",
      label: "Module 1",
      children: [{ id: "lesson-1", label: "Lesson 1" }],
    };

    renderInSidebar(<DsTreeItem expandedItemIds={["module-1"]} item={item} />);

    expect(
      screen.getByRole("button", { name: LESSON_1_LABEL })
    ).toBeInTheDocument();
  });

  it("fires onItemSelect on leaf click", () => {
    const item: DsTreeNode = { id: "lesson-1", label: "Lesson 1" };
    const onItemSelect = vi.fn();

    renderInSidebar(<DsTreeItem item={item} onItemSelect={onItemSelect} />);

    screen.getByRole("button", { name: LESSON_1_LABEL }).click();

    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onItemSelect).toHaveBeenCalledWith(item);
  });
});
