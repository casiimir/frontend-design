import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DsBadge from "./ds-badge";

describe("DsBadge", () => {
  it("renders without crashing and shows default status label", () => {
    render(<DsBadge status="completed" />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders provided children text", () => {
    render(<DsBadge status="new">Nuovo contenuto</DsBadge>);

    expect(screen.getByText("Nuovo contenuto")).toBeInTheDocument();
  });

  it("sets status and size data attributes", () => {
    render(
      <DsBadge data-testid="status-badge" size="sm" status="locked">
        Locked
      </DsBadge>
    );

    const badge = screen.getByTestId("status-badge");

    expect(badge).toHaveAttribute("data-status", "locked");
    expect(badge).toHaveAttribute("data-size", "sm");
  });
});
