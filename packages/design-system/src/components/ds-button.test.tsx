import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DsButton from "./ds-button";

describe("DsButton", () => {
  it("renders without crashing and shows provided label", () => {
    render(<DsButton>Continue lesson</DsButton>);

    expect(
      screen.getByRole("button", { name: "Continue lesson" })
    ).toBeInTheDocument();
  });

  it("responds to click events", () => {
    const onClick = vi.fn();
    render(<DsButton onClick={onClick}>Open module</DsButton>);

    screen.getByRole("button", { name: "Open module" }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables interaction in loading state", () => {
    render(<DsButton loading>Saving</DsButton>);

    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
  });
});
