import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DsChatBubble from "./ds-chat-bubble";

describe("DsChatBubble", () => {
  it("renders without crashing and shows message content", () => {
    render(
      <DsChatBubble message="How can I help you today?" variant="assistant" />
    );

    expect(screen.getByText("How can I help you today?")).toBeInTheDocument();
  });

  it("renders timestamp when provided", () => {
    render(
      <DsChatBubble
        message="Sure, let's continue."
        timestamp="10:45"
        variant="assistant"
      />
    );

    expect(screen.getByText("10:45")).toBeInTheDocument();
  });

  it("sets variant data attribute for state styling", () => {
    render(
      <DsChatBubble
        data-testid="chat-bubble"
        message="I completed lesson one."
        variant="user"
      />
    );

    expect(screen.getByTestId("chat-bubble")).toHaveAttribute(
      "data-variant",
      "user"
    );
  });
});
