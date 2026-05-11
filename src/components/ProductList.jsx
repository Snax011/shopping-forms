import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products, onAddToCart, selectedCategory }) {
  return (
    <section className="panel" aria-labelledby="product-list-title">
      <h2 id="product-list-title">Product List</h2>
      <p className="panel-description">
        Showing products for: <strong>{selectedCategory}</strong>
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}