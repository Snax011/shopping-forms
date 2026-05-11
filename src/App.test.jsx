import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("shopping app behavior", () => {
  it("toggles dark mode button text", () => {
    render(<App />);

    const toggleButton = screen.getByRole("button", {
      name: "Toggle Dark Mode",
    });

    fireEvent.click(toggleButton);

    expect(
      screen.getByRole("button", { name: "Toggle Light Mode" }),
    ).toBeInTheDocument();
  });

  it("filters products by category", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Filter products by category"), {
      target: { value: "Produce" },
    });

    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Broccoli")).toBeInTheDocument();
    expect(screen.queryByText("Milk")).not.toBeInTheDocument();
  });

  it("adds products to the cart", () => {
    render(<App />);

    const milkCard = screen
      .getByText("Milk")
      .closest("article");
    const addButton = milkCard.querySelector("button");
    fireEvent.click(addButton);

    expect(screen.getByText("Milk is in your cart.")).toBeInTheDocument();
  });
});