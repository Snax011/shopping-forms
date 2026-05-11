import { useMemo, useState } from "react";
import Cart from "./components/Cart.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import ProductList from "./components/ProductList.jsx";

const PRODUCTS = [
  { id: 1, name: "Milk", category: "Dairy" },
  { id: 2, name: "Cheddar", category: "Dairy" },
  { id: 3, name: "Apples", category: "Produce" },
  { id: 4, name: "Broccoli", category: "Produce" },
  { id: 5, name: "Bread", category: "Bakery" },
  { id: 6, name: "Bagels", category: "Bakery" },
];

const ALL_CATEGORIES = "All";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...new Set(PRODUCTS.map((product) => product.category)),
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  function handleModeToggle() {
    setDarkMode((prevMode) => !prevMode);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleAddToCart(product) {
    setCartItems((prevItems) => [...prevItems, product]);
  }

  return (
    <main
      className={`app-shell ${darkMode ? "dark-mode" : "light-mode"}`}
      aria-live="polite"
    >
      <header className="app-header">
        <p className="eyebrow">React Hooks Shopping Lab</p>
        <h1>Groceries Dashboard</h1>
        <p className="subtitle">
          Toggle themes, filter by category, and add products to your cart.
        </p>
        <DarkModeToggle darkMode={darkMode} onToggle={handleModeToggle} />
      </header>

      <div className="app-grid">
        <section className="stack" aria-label="Shopping controls">
          <section className="panel" aria-labelledby="category-filter-title">
            <h2 id="category-filter-title">Category Filter</h2>
            <p className="panel-description">
              Pick a category to focus the shopping list.
            </p>

            <label className="field-label" htmlFor="category-select">
              Filter products by category
            </label>
            <select
              id="category-select"
              className="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </section>

          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            selectedCategory={selectedCategory}
          />
        </section>

        <Cart items={cartItems} />
      </div>
    </main>
  );
}