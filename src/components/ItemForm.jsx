import { useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  category: "Produce",
};

export default function ItemForm({ onItemFormSubmit }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      return;
    }

    const newItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: trimmedName,
      category: formData.category,
    };

    onItemFormSubmit(newItem);
    setFormData(INITIAL_FORM_DATA);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Item form">
      <h2>Add Item</h2>

      <label className="field-label" htmlFor="item-name">
        Name
      </label>
      <input
        id="item-name"
        className="text-input"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="e.g. Bananas"
      />

      <label className="field-label" htmlFor="item-category">
        Category
      </label>
      <select
        id="item-category"
        className="category-select"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
        <option value="Meat">Meat</option>
      </select>

      <button className="primary-btn" type="submit">
        Add to List
      </button>
    </form>
  );
}