import ProjectCard from "./ProjectCard.jsx";

/**
 * ProjectList — renders the grid of ProjectCard components.
 * Shows an empty-state message when no projects match the current filter.
 *
 * Props:
 *   projects {array} - filtered array of project objects to display
 */
export default function ProjectList({ projects }) {
  if (projects.length === 0) {
    return (
      <p className="empty-state" role="status">
        No projects match your search. Try a different keyword.
      </p>
    );
  }

  return (
    <section aria-label="Project list">
      <p className="project-count" role="status">
        Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
