import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import Filter from "./components/Filter.jsx";
import ItemForm from "./components/ItemForm.jsx";

describe("Filter component", () => {
  it("uses the search prop in the input value", () => {
    render(
      <Filter
        search="milk"
        onSearchChange={() => {}}
        category="All"
        categories={["All", "Produce"]}
        onCategoryChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText("Search...")).toHaveValue("milk");
  });

  it("calls onSearchChange when input changes", () => {
    const onSearchChange = vi.fn();

    render(
      <Filter
        search=""
        onSearchChange={onSearchChange}
        category="All"
        categories={["All", "Produce"]}
        onCategoryChange={() => {}}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "app" },
    });

    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });
});

describe("shopping forms app behavior", () => {
  it("shows all shopping items on initial render", () => {
    render(<App />);

    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
    expect(screen.getByText("Chicken")).toBeInTheDocument();
  });

  it("filters shopping items by full and partial search terms", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Apples" },
    });

    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.queryByText("Milk")).not.toBeInTheDocument();
    expect(screen.queryByText("Bread")).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "ee" },
    });

    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Bread")).not.toBeInTheDocument();
  });

  it("adds a new item to the list when the form is submitted", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Yogurt" },
    });
    fireEvent.change(screen.getByLabelText("Category", { selector: "#item-category" }), {
      target: { value: "Dairy" },
    });

    fireEvent.submit(screen.getByRole("form", { name: "Item form" }));

    expect(screen.getByText("Yogurt")).toBeInTheDocument();
  });
});

describe("ItemForm component", () => {
  it("calls onItemFormSubmit when submitted", () => {
    const onItemFormSubmit = vi.fn();
    render(<ItemForm onItemFormSubmit={onItemFormSubmit} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Spinach" },
    });

    fireEvent.submit(screen.getByRole("form", { name: "Item form" }));

    expect(onItemFormSubmit).toHaveBeenCalledTimes(1);
    expect(onItemFormSubmit.mock.calls[0][0]).toMatchObject({
      name: "Spinach",
      category: "Produce",
    });
  });

  it("uses controlled inputs", () => {
    render(<ItemForm onItemFormSubmit={() => {}} />);

    const nameInput = screen.getByLabelText("Name");
    const categoryInput = screen.getByLabelText("Category");

    fireEvent.change(nameInput, { target: { value: "Tomato" } });
    fireEvent.change(categoryInput, { target: { value: "Produce" } });

    expect(nameInput).toHaveValue("Tomato");
    expect(categoryInput).toHaveValue("Produce");
  });
});