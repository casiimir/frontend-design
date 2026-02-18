import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import DsButton from "./ds-button";
import {
  DsDialog,
  DsDialogBody,
  DsDialogContent,
  DsDialogDescription,
  DsDialogFooter,
  DsDialogHeader,
  DsDialogTitle,
  DsDialogTrigger,
} from "./ds-dialog";

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <DsDialog onOpenChange={setOpen} open={open}>
      <DsDialogTrigger asChild>
        <button type="button">Open dialog</button>
      </DsDialogTrigger>
      <DsDialogContent>
        <DsDialogHeader>
          <DsDialogTitle>Interactive dialog</DsDialogTitle>
          <DsDialogDescription>Dialog interaction flow.</DsDialogDescription>
        </DsDialogHeader>
        <DsDialogBody>Body content</DsDialogBody>
      </DsDialogContent>
    </DsDialog>
  );
}

describe("DsDialog", () => {
  it("renders without crashing and shows expected text", () => {
    render(
      <DsDialog defaultOpen>
        <DsDialogContent>
          <DsDialogHeader>
            <DsDialogTitle>Lesson details</DsDialogTitle>
            <DsDialogDescription>
              Read this before continuing.
            </DsDialogDescription>
          </DsDialogHeader>
          <DsDialogBody>Dialog body content</DsDialogBody>
        </DsDialogContent>
      </DsDialog>
    );

    expect(screen.getByText("Lesson details")).toBeInTheDocument();
    expect(screen.getByText("Dialog body content")).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="ds-dialog-header-bar"]')
    ).toBeInTheDocument();
  });

  it("responds to open and close interactions", async () => {
    render(<ControlledDialog />);

    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));

    expect(screen.getByText("Interactive dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByText("Interactive dialog")).not.toBeInTheDocument();
    });
  });

  it("renders footer actions", () => {
    render(
      <DsDialog defaultOpen>
        <DsDialogContent>
          <DsDialogHeader>
            <DsDialogTitle>Confirm action</DsDialogTitle>
            <DsDialogDescription>Choose an action to continue.</DsDialogDescription>
          </DsDialogHeader>
          <DsDialogFooter>
            <DsButton variant="secondary">Cancel</DsButton>
            <DsButton>Confirm</DsButton>
          </DsDialogFooter>
        </DsDialogContent>
      </DsDialog>
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });
});
