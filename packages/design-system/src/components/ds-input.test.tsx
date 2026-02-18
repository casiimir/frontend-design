import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DsInput from "./ds-input";

describe("DsInput", () => {
  it("renders without crashing and shows label/helper text", () => {
    render(
      <DsInput helperText="Use your school email" label="Email" type="email" />
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Use your school email")).toBeInTheDocument();
  });

  it("renders error state and exposes invalid attributes", () => {
    render(<DsInput error="Email is required" label="Email" />);

    const input = screen.getByLabelText("Email");

    expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-state", "error");
  });

  it("responds to input change events", () => {
    const onChange = vi.fn();

    render(<DsInput aria-label="Name" onChange={onChange} />);

    const input = screen.getByLabelText("Name");

    fireEvent.change(input, { target: { value: "Mario Rossi" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("Mario Rossi");
  });
});
