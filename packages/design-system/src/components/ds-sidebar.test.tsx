import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DsSidebar from "./ds-sidebar";

vi.mock("@workspace/ui/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

const MODULE_LABEL = /M0. Fundamentals/i;
const LESSON_LABEL = /Dati 1/i;

const items = [
  {
    id: "module-1",
    label: "M0. Fundamentals",
    children: [
      {
        id: "lesson-1",
        label: "Introduzione al mondo dei dati",
        status: "completed" as const,
      },
      { id: "lesson-2", label: "Dati 1", status: "in-progress" as const },
    ],
  },
];

describe("DsSidebar", () => {
  it("renders title and nested tree items", () => {
    render(
      <DsSidebar
        expandedItemIds={["module-1"]}
        items={items}
        title="Welcome: Data Analyst"
      />
    );

    expect(screen.getByText("Welcome: Data Analyst")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: MODULE_LABEL })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: LESSON_LABEL })
    ).toBeInTheDocument();
  });

  it("calls onItemSelect when a lesson is clicked", () => {
    const onItemSelect = vi.fn();

    render(
      <DsSidebar
        expandedItemIds={["module-1"]}
        items={items}
        onItemSelect={onItemSelect}
        title="Welcome: Data Analyst"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: LESSON_LABEL }));

    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "lesson-2" })
    );
  });

  it("marks clicked lesson as active when uncontrolled", () => {
    render(
      <DsSidebar
        expandedItemIds={["module-1"]}
        items={items}
        title="Welcome: Data Analyst"
      />
    );

    const lessonButton = screen.getByRole("button", { name: LESSON_LABEL });

    expect(lessonButton).toHaveAttribute("data-active", "false");

    fireEvent.click(lessonButton);

    expect(screen.getByRole("button", { name: LESSON_LABEL })).toHaveAttribute(
      "data-active",
      "true"
    );
  });
});
