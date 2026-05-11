export default function ItemList({ items }) {
  return (
    <section aria-labelledby="items-title">
      <h2 id="items-title">Shopping Items</h2>

      {items.length === 0 ? (
        <p className="subtitle">No items match your current filters.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item-row">
              <span className="item-name">{item.name}</span>
              <span className="item-category">{item.category}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}