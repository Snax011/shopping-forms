import { useState } from "react";

const INITIAL_FORM = {
  title: "",
  description: "",
  tech: "",
  category: "Web App",
  image: "",
  github: "",
  live: "",
  year: new Date().getFullYear().toString(),
};

/**
 * ProjectForm — controlled form that collects a new project's details
 * and passes the validated data up to the parent via onAddProject.
 *
 * Props:
 *   onAddProject {function} - called with the new project object on submit
 */
export default function ProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isOpen, setIsOpen] = useState(false);

  /** Update a single field in formData. */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /** Validate, build the project object, and hand it to the parent. */
  function handleSubmit(event) {
    event.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();
    if (!title || !description) return;

    onAddProject({
      id: Date.now(),
      title,
      description,
      tech: formData.tech.split(",").map((t) => t.trim()).filter(Boolean),
      category: formData.category,
      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80",
      github: formData.github.trim() || "#",
      live: formData.live.trim() || "#",
      year: Number(formData.year) || new Date().getFullYear(),
    });

    setFormData(INITIAL_FORM);
    setIsOpen(false);
  }

  return (
    <div className="project-form-section">
      {!isOpen ? (
        <button
          type="button"
          className="btn btn--primary add-project-btn"
          onClick={() => setIsOpen(true)}
        >
          + Add New Project
        </button>
      ) : (
        <div className="form-card" aria-label="Add project form">
          <div className="form-card-header">
            <h2 className="form-title">Add a New Project</h2>
            <button
              type="button"
              className="form-close"
              aria-label="Close form"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} aria-label="New project form" className="project-form">
            <div className="form-row form-row--two">
              <div className="form-field">
                <label htmlFor="pf-title">Project Title *</label>
                <input
                  id="pf-title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Project"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="pf-category">Category</label>
                <select
                  id="pf-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Web App">Web App</option>
                  <option value="API Integration">API Integration</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Design">Design</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="pf-description">Description *</label>
              <textarea
                id="pf-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A short description of what this project does…"
                rows={3}
                required
              />
            </div>

            <div className="form-row form-row--two">
              <div className="form-field">
                <label htmlFor="pf-tech">Tech Stack</label>
                <input
                  id="pf-tech"
                  name="tech"
                  type="text"
                  value={formData.tech}
                  onChange={handleChange}
                  placeholder="React, Node.js, CSS (comma-separated)"
                />
              </div>

              <div className="form-field">
                <label htmlFor="pf-year">Year</label>
                <input
                  id="pf-year"
                  name="year"
                  type="number"
                  min="2000"
                  max="2099"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row form-row--two">
              <div className="form-field">
                <label htmlFor="pf-github">GitHub URL</label>
                <input
                  id="pf-github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/user/repo"
                />
              </div>

              <div className="form-field">
                <label htmlFor="pf-live">Live Demo URL</label>
                <input
                  id="pf-live"
                  name="live"
                  type="url"
                  value={formData.live}
                  onChange={handleChange}
                  placeholder="https://myproject.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="pf-image">Image URL</label>
              <input
                id="pf-image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/screenshot.jpg"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                Add Project
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
