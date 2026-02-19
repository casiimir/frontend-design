import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DsCard from "./ds-card";

describe("DsCard", () => {
  it("renders without crashing and shows title/content", () => {
    render(
      <DsCard description="Core concepts" title="Introduzione ai dati">
        Lesson body
      </DsCard>
    );

    expect(screen.getByText("Introduzione ai dati")).toBeInTheDocument();
    expect(screen.getByText("Lesson body")).toBeInTheDocument();
  });

  it("renders progress label and percentage text", () => {
    render(
      <DsCard progressLabel="Lesson progress" progressValue={42} title="Dati 1">
        Content
      </DsCard>
    );

    expect(screen.getByText("Lesson progress")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("responds to click events on card root", () => {
    const onClick = vi.fn();

    render(
      <DsCard data-testid="lesson-card" onClick={onClick} title="Dati 1">
        Content
      </DsCard>
    );

    screen.getByTestId("lesson-card").click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
