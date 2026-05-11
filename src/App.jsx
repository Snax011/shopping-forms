import { useMemo, useState } from "react";
import Filter from "./components/Filter.jsx";
import ItemForm from "./components/ItemForm.jsx";
import ItemList from "./components/ItemList.jsx";

const INITIAL_ITEMS = [
  { id: 1, name: "Milk", category: "Dairy" },
  { id: 2, name: "Cheese", category: "Dairy" },
  { id: 3, name: "Apples", category: "Produce" },
  { id: 4, name: "Bread", category: "Bakery" },
  { id: 5, name: "Chicken", category: "Meat" },
];

const ALL_CATEGORIES = "All";

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...new Set(items.map((item) => item.category)),
    ],
    [items],
  );

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleItemFormSubmit(newItem) {
    setItems((currentItems) => [...currentItems, newItem]);
  }

  const visibleItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategory]);

  return (
    <main className="app-shell" aria-live="polite">
      <header className="app-header">
        <p className="eyebrow">Shopping Forms Lab</p>
        <h1>Smart Shopping List</h1>
        <p className="subtitle">
          Search and filter your list, then add more items with a controlled form.
        </p>
      </header>

      <div className="app-grid">
        <section className="panel stack" aria-label="Shopping list controls">
          <Filter
            search={search}
            onSearchChange={handleSearchChange}
            category={selectedCategory}
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
          <ItemList items={visibleItems} />
        </section>

        <section className="panel" aria-label="Add a new shopping item">
          <ItemForm onItemFormSubmit={handleItemFormSubmit} />
        </section>
      </div>
    </main>
  );
}