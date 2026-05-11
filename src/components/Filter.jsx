export default function Filter({
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
}) {
  return (
    <section aria-labelledby="filter-title">
      <h2 id="filter-title">Filter</h2>

      <label className="field-label" htmlFor="search-input">
        Search items
      </label>
      <input
        id="search-input"
        type="text"
        className="text-input"
        placeholder="Search..."
        value={search}
        onChange={onSearchChange}
      />

      <label className="field-label" htmlFor="category-filter">
        Category
      </label>
      <select
        id="category-filter"
        className="category-select"
        value={category}
        onChange={onCategoryChange}
      >
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );
}