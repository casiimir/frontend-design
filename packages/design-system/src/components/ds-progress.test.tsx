import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DsProgress from "./ds-progress";

describe("DsProgress", () => {
  it("renders without crashing and shows label", () => {
    render(<DsProgress label="Course progress" value={25} />);

    expect(screen.getByText("Course progress")).toBeInTheDocument();
  });

  it("shows computed percentage text from value/max", () => {
    render(<DsProgress max={200} value={50} />);

    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("forwards props to progress track element", () => {
    render(<DsProgress data-testid="progress-track" value={60} />);

    expect(screen.getByTestId("progress-track")).toBeInTheDocument();
  });
});
