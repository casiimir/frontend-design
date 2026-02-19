import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DsChatInput from "./ds-chat-input";

describe("DsChatInput", () => {
  it("renders without crashing and shows expected helper text", () => {
    render(
      <DsChatInput
        helperText="Press Enter on send to post your message."
        placeholder="Write a message..."
      />
    );

    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByText("Press Enter on send to post your message.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("responds to message typing and send interaction", () => {
    const onSend = vi.fn();

    render(<DsChatInput onSend={onSend} />);

    const textarea = screen.getByLabelText("Message");
    const sendButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(textarea, { target: { value: "Ciao team" } });
    fireEvent.click(sendButton);

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0]?.[0]).toMatchObject({
      message: "Ciao team",
    });
    expect(textarea).toHaveValue("");
  });

  it("supports attachments and forwards selected files", () => {
    const onAttachmentsChange = vi.fn();
    const onSend = vi.fn();
    const { container } = render(
      <DsChatInput onAttachmentsChange={onAttachmentsChange} onSend={onSend} />
    );
    const fileInput = container.querySelector(
      '[data-slot="ds-chat-input-file"]'
    ) as HTMLInputElement;
    const file = new File(["pdf-content"], "lesson-notes.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onAttachmentsChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText("lesson-notes.pdf")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0]?.[0]).toMatchObject({
      attachments: [expect.objectContaining({ name: "lesson-notes.pdf" })],
      message: "",
    });
  });
});
