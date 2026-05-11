# React Shopping App Lab

This project is a dynamic shopping application built with React and the `useState` hook.

It implements three core features:

- dark mode toggle
- category-based product filtering
- add-to-cart behavior

## Component Tree

```text
App
|- DarkModeToggle
|- ProductList
|  |- ProductCard
|- Cart
```

## Features Implemented

- Dark Mode Toggle
	- The toggle button text switches between `Toggle Dark Mode` and `Toggle Light Mode`.
	- The app shell updates visual styles when dark mode is enabled.
- Product Category Filtering
	- A category dropdown in `App` updates selected category state.
	- `ProductList` only renders products matching the selected category.
- Add to Cart
	- Each `ProductCard` has an `Add to Cart` button.
	- Added items appear in `Cart` as messages such as `Milk is in your cart.`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

4. Build for production:

```bash
npm run build
```

## Test Coverage

`src/App.test.jsx` verifies:

- dark mode toggle button text changes correctly
- category filtering shows matching products
- add-to-cart updates cart output

## License

This project uses the MIT License.
