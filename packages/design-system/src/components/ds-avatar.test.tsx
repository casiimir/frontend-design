import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DsAvatar from "./ds-avatar";

describe("DsAvatar", () => {
  it("renders without crashing and shows fallback initials from name", () => {
    render(<DsAvatar name="Mario Rossi" />);

    expect(screen.getByText("MR")).toBeInTheDocument();
  });

  it("renders custom fallback text", () => {
    render(<DsAvatar fallback="AI" name="Assistant" />);

    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders status indicator with selected status", () => {
    const { container } = render(<DsAvatar showStatus status="online" />);

    const statusNode = container.querySelector(
      '[data-slot="ds-avatar-status"]'
    );

    expect(statusNode).toBeInTheDocument();
    expect(statusNode).toHaveAttribute("data-status", "online");
  });
});
