/**
 * ProjectCard — displays a single project's image, title, description,
 * tech stack, and external links.
 *
 * Props:
 *   project {object} - project data object
 */
export default function ProjectCard({ project }) {
  return (
    <article className="project-card" aria-label={`Project: ${project.title}`}>
      <div className="card-image-wrap">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          className="card-image"
          loading="lazy"
        />
        <span className="card-category">{project.category}</span>
      </div>

      <div className="card-body">
        <div className="card-header-row">
          <h2 className="card-title">{project.title}</h2>
          <span className="card-year">{project.year}</span>
        </div>

        <p className="card-description">{project.description}</p>

        <ul className="card-tech-list" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="card-tech-tag">
              {t}
            </li>
          ))}
        </ul>

        <div className="card-links">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="card-link card-link--github"
          >
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="card-link card-link--live"
          >
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}
