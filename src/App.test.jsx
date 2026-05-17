import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import projects from "./projects_data.js";

// ─── ProjectCard ────────────────────────────────────────────────────────
describe("ProjectCard component", () => {
  const project = projects[0];

  it("renders the project title", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText(project.title)).toBeInTheDocument();
  });

  it("renders the project description", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText(project.description)).toBeInTheDocument();
  });

  it("renders each tech tag", () => {
    render(<ProjectCard project={project} />);
    project.tech.forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("renders GitHub and Live Demo links", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /live demo/i })).toBeInTheDocument();
  });
});

// ─── SearchBar ──────────────────────────────────────────────────────────
describe("SearchBar component", () => {
  it("renders with the provided value", () => {
    render(<SearchBar value="react" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("react");
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "node" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("shows the clear button only when value is non-empty", () => {
    const { rerender } = render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();

    rerender(<SearchBar value="test" onChange={() => {}} />);
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("calls onChange with empty string when clear is clicked", () => {
    const onChange = vi.fn();
    render(<SearchBar value="hello" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(onChange).toHaveBeenCalledWith("");
  });
});

// ─── ProjectForm ────────────────────────────────────────────────────────
describe("ProjectForm component", () => {
  it("reveals the form when Add New Project is clicked", () => {
    render(<ProjectForm onAddProject={() => {}} />);
    fireEvent.click(screen.getByText("+ Add New Project"));
    expect(screen.getByLabelText("New project form")).toBeInTheDocument();
  });

  it("calls onAddProject with correct data on submit", () => {
    const onAddProject = vi.fn();
    render(<ProjectForm onAddProject={onAddProject} />);

    fireEvent.click(screen.getByText("+ Add New Project"));

    fireEvent.change(screen.getByLabelText(/project title/i), {
      target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A test description" },
    });

    fireEvent.submit(screen.getByLabelText("New project form"));

    expect(onAddProject).toHaveBeenCalledTimes(1);
    expect(onAddProject.mock.calls[0][0]).toMatchObject({
      title: "Test Project",
      description: "A test description",
    });
  });

  it("does not call onAddProject when title is empty", () => {
    const onAddProject = vi.fn();
    render(<ProjectForm onAddProject={onAddProject} />);
    fireEvent.click(screen.getByText("+ Add New Project"));
    fireEvent.submit(screen.getByLabelText("New project form"));
    expect(onAddProject).not.toHaveBeenCalled();
  });
});

// ─── App integration ────────────────────────────────────────────────────
describe("Portfolio App", () => {
  it("renders all initial projects on load", () => {
    render(<App />);
    projects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("filters projects when the user types in the search bar", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: projects[0].title },
    });
    expect(screen.getByText(projects[0].title)).toBeInTheDocument();
    // other projects should be hidden
    expect(screen.queryByText(projects[1].title)).not.toBeInTheDocument();
  });

  it("shows empty state when no projects match the search", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "xyznonexistentproject123" },
    });
    expect(
      screen.getByText(/no projects match your search/i),
    ).toBeInTheDocument();
  });

  it("adds a new project via the form and displays it", () => {
    render(<App />);
    fireEvent.click(screen.getByText("+ Add New Project"));

    fireEvent.change(screen.getByLabelText(/project title/i), {
      target: { value: "Brand New Portfolio Entry" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "This is a brand new entry." },
    });

    fireEvent.submit(screen.getByLabelText("New project form"));

    expect(screen.getByText("Brand New Portfolio Entry")).toBeInTheDocument();
  });
});
