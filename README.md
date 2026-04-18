# Wordly Single Page Application (SPA)

This project is a summative lab that builds an interactive dictionary Single Page Application using HTML, CSS, and JavaScript.

The app lets users search for a word and view:
- Pronunciation details
- Definitions and part of speech
- Example usage
- Synonyms
- Source reference links

It also includes:
- Error handling for invalid or missing words
- Audio playback for pronunciation when available
- Saved words with local storage
- Dynamic theme toggling for readability

## Problem Definition

Wordly needs a fast, user-friendly dictionary tool that works without full page reloads. Users should be able to search words, inspect language details, and save useful terms for later review.

## Design Decisions

- HTML: Semantic layout with accessible labels and regions for dynamic results
- CSS: Responsive, high-contrast styling with intentional visual hierarchy and interactive states
- JavaScript: Fetch-based API integration, robust parsing, event-driven UI updates, and local storage persistence

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- [Free Dictionary API](https://dictionaryapi.dev/)

## Features Mapped to Rubric

1. Search Functionality
- Users submit a word via form input
- Empty and invalid input handling is included

2. Data Display
- Definitions, parts of speech, examples, pronunciation, and synonyms are rendered dynamically
- Graceful fallback messaging for missing data

3. Form and Event Handling
- Form submission is handled with event listeners
- Buttons support theme toggling, saving words, and audio playback

4. DOM Manipulation
- Results and status messages update in-place without page reloads
- Saved words list re-renders with interactive word pills

5. Fetch API Usage
- Uses async/await and `fetch` to query the dictionary API
- Handles `404` and generic network/request failures

6. Code Syntax
- Functions are organized by behavior (fetch, render, storage, events)
- State is centralized for predictable UI updates

7. Styling and UX
- Responsive layout for desktop and mobile
- Intentional typography, gradient backgrounds, hover states, and loading/status feedback

## Project Structure

- `index.html` - semantic SPA layout and accessible UI structure
- `styles.css` - responsive styling and theme variables
- `index.js` - API integration, event handling, DOM updates, and local storage

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:Snax011/Single-page-application.git
```

2. Open the project folder:

```bash
cd Single-page-application
```

3. Launch `index.html` with Live Server or any local static server.

## Automated Testing (npm test)

This project includes automated unit tests using Vitest.

1. Install dependencies:

```bash
npm install
```

2. Run all tests once:

```bash
npm test
```

3. Run tests in watch mode while you code:

```bash
npm run test:watch
```

What is currently tested:
- Pronunciation parsing helpers
- Audio URL extraction
- Synonym collection and deduplication
- API fetch success and failure handling

## Testing Checklist

- Search valid words and confirm details render correctly
- Search words that may not include synonyms or audio
- Submit empty input and verify validation messaging
- Search invalid words and verify error handling
- Save words and confirm persistence after reload
- Toggle themes and confirm persistence after reload

## License

This project uses the MIT License.
