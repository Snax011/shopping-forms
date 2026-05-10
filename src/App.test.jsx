import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Password input lab", () => {
  it("renders one password input", () => {
    render(<App />);

    const passwordInput = screen.getByLabelText("Password");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("logs when typing in the password input and updates the UI", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<App />);

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "hunter2" },
    });

    expect(consoleSpy).toHaveBeenCalledWith("Entering password...");
    expect(screen.getByText("Characters entered: 7")).toBeInTheDocument();
  });

  it('renders a button with the text "Submit Password"', () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Submit Password" }),
    ).toBeInTheDocument();
  });

  it("logs when the mouse enters the button and updates hover status", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<App />);

    fireEvent.mouseEnter(
      screen.getByRole("button", { name: "Submit Password" }),
    );

    expect(consoleSpy).toHaveBeenCalledWith("Mouse Entering");
    expect(
      screen.getByText("Mouse entered the submit button"),
    ).toBeInTheDocument();
  });

  it("logs when the mouse leaves the button and updates hover status", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<App />);

    const submitButton = screen.getByRole("button", {
      name: "Submit Password",
    });

    fireEvent.mouseEnter(submitButton);
    fireEvent.mouseLeave(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith("Mouse Exiting");
    expect(
      screen.getByText("Mouse exited the submit button"),
    ).toBeInTheDocument();
  });

  it("handles rapid input changes without losing the latest value", () => {
    render(<App />);

    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(passwordInput, { target: { value: "a" } });
    fireEvent.change(passwordInput, { target: { value: "ab" } });
    fireEvent.change(passwordInput, { target: { value: "abc123" } });

    expect(passwordInput).toHaveValue("abc123");
    expect(screen.getByText("Characters entered: 6")).toBeInTheDocument();
  });
});