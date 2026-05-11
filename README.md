# Shopping Forms Lab

This project extends the shopping list app with controlled form elements in React.

## Component Tree

```text
App
|- Filter
|- ItemList
|- ItemForm
```

## Features Implemented

- Controlled Search
	- The search input uses a `search` prop for its value.
	- `onSearchChange` is called whenever the user types.
	- The list updates dynamically for full and partial matches.
- Controlled Category Filter
	- The category `<select>` is controlled by app state.
	- List output reflects category and search at the same time.
- Controlled Item Form
	- Name and category inputs are fully controlled.
	- Category input initializes as `Produce`.
	- Form submission calls `onItemFormSubmit` and appends a new item.

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

- controlled `search` value behavior
- `onSearchChange` callback behavior
- initial item rendering
- full and partial search filtering
- `onItemFormSubmit` callback behavior
- adding a new item from form submit

## License

This project uses the MIT License.
