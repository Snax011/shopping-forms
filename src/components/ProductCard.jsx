export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card" aria-label={`Product ${product.name}`}>
      <h3>{product.name}</h3>
      <p className="product-meta">Category: {product.category}</p>
      <button type="button" className="add-btn" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </article>
  );
}