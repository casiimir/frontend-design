import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  DsTooltip,
  DsTooltipContent,
  DsTooltipProvider,
  DsTooltipTrigger,
} from "./ds-tooltip";

class ResizeObserverMock {
  disconnect() {
    // empty
  }
  observe() {
    // empty
  }
  unobserve() {
    // empty
  }
}

describe("DsTooltip", () => {
  beforeAll(() => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("renders without crashing and shows tooltip text when open", () => {
    render(
      <DsTooltipProvider>
        <DsTooltip open>
          <DsTooltipTrigger asChild>
            <button type="button">Info</button>
          </DsTooltipTrigger>
          <DsTooltipContent>Helpful details</DsTooltipContent>
        </DsTooltip>
      </DsTooltipProvider>
    );

    expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful details");
  });

  it("responds to hover/focus interaction via onOpenChange", async () => {
    const onOpenChange = vi.fn();

    render(
      <DsTooltipProvider delayDuration={0}>
        <DsTooltip onOpenChange={onOpenChange}>
          <DsTooltipTrigger asChild>
            <button type="button">Hover target</button>
          </DsTooltipTrigger>
          <DsTooltipContent>Tooltip body</DsTooltipContent>
        </DsTooltip>
      </DsTooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: "Hover target" });

    fireEvent.pointerMove(trigger);
    fireEvent.mouseEnter(trigger);
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalled();
    });

    expect(onOpenChange.mock.calls.some(([value]) => value === true)).toBe(
      true
    );
  });

  it("applies branded tone styles", () => {
    render(
      <DsTooltipProvider>
        <DsTooltip open>
          <DsTooltipTrigger asChild>
            <button type="button">Brand</button>
          </DsTooltipTrigger>
          <DsTooltipContent tone="brand">Brand tooltip</DsTooltipContent>
        </DsTooltip>
      </DsTooltipProvider>
    );

    const tooltipContent = document.querySelector(
      '[data-slot="ds-tooltip-content"]'
    );

    expect(tooltipContent).toHaveTextContent("Brand tooltip");
    expect(tooltipContent).toHaveClass("bg-epicode-primary");
  });
});
