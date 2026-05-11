export default function Cart({ items }) {
  return (
    <aside className="sidebar" aria-label="Shopping cart">
      <section className="status-card">
        <span className="status-badge">Cart</span>
        <h2>Your Items</h2>

        {items.length === 0 ? (
          <p className="panel-description">Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={`${item.id}-${index}`}>{item.name} is in your cart.</li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}