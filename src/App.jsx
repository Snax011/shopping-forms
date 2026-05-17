import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProjectList from "./components/ProjectList.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import initialProjects from "./projects_data.js";

/**
 * App — root component.
 * Owns the canonical projects array and the search string.
 * Passes filtered data down to ProjectList and add-handler down to ProjectForm.
 */
export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");

  /** Add a new project to the top of the list. */
  function handleAddProject(newProject) {
    setProjects((prev) => [newProject, ...prev]);
  }

  /** Derived list — recomputed only when projects or search changes. */
  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;

    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tech.some((t) => t.toLowerCase().includes(query)),
    );
  }, [projects, search]);

  return (
    <div className="portfolio-shell">
      <Header />

      <main className="portfolio-main" aria-label="Portfolio">
        <div className="portfolio-controls">
          <SearchBar value={search} onChange={setSearch} />
          <ProjectForm onAddProject={handleAddProject} />
        </div>

        <ProjectList projects={visibleProjects} />
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} DevShowcase — Built with React</p>
      </footer>
    </div>
  );
}