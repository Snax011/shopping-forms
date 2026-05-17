/**
 * SearchBar — controlled text input that notifies the parent of every
 * keystroke so the project list can be filtered in real time.
 *
 * Props:
 *   value        {string}   - current search text (controlled)
 *   onChange     {function} - called with the new string on every change
 */
export default function SearchBar({ value, onChange }) {
  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <div className="search-bar-wrap">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <div className="search-bar">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="project-search"
          type="text"
          className="search-input"
          placeholder="Search projects by title, tech, or category…"
          value={value}
          onChange={handleChange}
        />
        {value && (
          <button
            type="button"
            className="search-clear"
            aria-label="Clear search"
            onClick={() => onChange("")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
