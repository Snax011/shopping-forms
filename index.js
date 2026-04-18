import {
  collectSynonyms,
  fetchWordData,
  findAudioUrl,
  findPhoneticText,
} from "./src/wordly.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#word-input");
const results = document.querySelector("#results");
const statusBox = document.querySelector("#status");
const favoritesList = document.querySelector("#favorites-list");
const saveWordButton = document.querySelector("#save-word");
const themeToggle = document.querySelector("#theme-toggle");

const FAVORITES_KEY = "wordly:favorites";
const THEME_KEY = "wordly:theme";

const state = {
  currentWord: null,
  favorites: getFavorites(),
};

init();

function init() {
  restoreTheme();
  renderFavorites();

  form.addEventListener("submit", onSearchSubmit);
  saveWordButton.addEventListener("click", toggleCurrentWordFavorite);
  themeToggle.addEventListener("click", toggleTheme);
}

async function onSearchSubmit(event) {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();

  if (!query) {
    setStatus("Please enter a word before searching.", "error");
    return;
  }

  setStatus("Searching...", "info");
  saveWordButton.disabled = true;

  try {
    const payload = await fetchWordData(query);
    const entry = payload[0];

    if (!entry) {
      throw new Error("No dictionary entry available.");
    }

    state.currentWord = entry.word;
    renderWordEntry(entry);
    updateSaveButton();
    setStatus(`Loaded results for "${entry.word}".`, "info");
  } catch (error) {
    state.currentWord = null;
    saveWordButton.disabled = true;
    results.innerHTML =
      '<p class="placeholder">No results to show. Try another word.</p>';
    setStatus(error.message, "error");
  }
}

function renderWordEntry(entry) {
  const phoneticText = findPhoneticText(entry);
  const audioURL = findAudioUrl(entry);
  const sourceURL = Array.isArray(entry.sourceUrls) ? entry.sourceUrls[0] : null;
  const meanings = Array.isArray(entry.meanings) ? entry.meanings : [];

  const meaningsMarkup = meanings
    .slice(0, 4)
    .map((meaning) => {
      const definitions = Array.isArray(meaning.definitions)
        ? meaning.definitions.slice(0, 3)
        : [];

      const definitionsMarkup = definitions
        .map((definition) => {
          const example = definition.example
            ? `<p><strong>Example:</strong> ${definition.example}</p>`
            : "<p><strong>Example:</strong> No example available.</p>";

          return `<li>
            <p>${definition.definition || "Definition unavailable."}</p>
            ${example}
          </li>`;
        })
        .join("");

      return `<section class="meaning">
        <p><strong>Part of speech:</strong> ${meaning.partOfSpeech || "N/A"}</p>
        <ol>${definitionsMarkup || "<li>Definition unavailable.</li>"}</ol>
      </section>`;
    })
    .join("");

  const synonymWords = collectSynonyms(entry).slice(0, 8);
  const synonymMarkup = synonymWords.length
    ? `<ul class="synonyms">${synonymWords
        .map((word) => `<li>${word}</li>`)
        .join("")}</ul>`
    : "<p class=\"meta\">No synonyms listed for this entry.</p>";

  results.innerHTML = `
    <div class="word-head">
      <div>
        <h2 class="word-title">${entry.word}</h2>
        <p class="meta">Pronunciation: ${phoneticText || "Not available"}</p>
        ${sourceURL ? `<p class="meta">Source: <a href="${sourceURL}" target="_blank" rel="noopener noreferrer">${sourceURL}</a></p>` : ""}
      </div>
      ${audioURL ? '<button id="play-audio" class="audio-btn" type="button">Play Audio</button>' : ""}
    </div>

    ${meaningsMarkup || '<p class="placeholder">No definitions available for this word.</p>'}

    <section class="meaning">
      <p><strong>Synonyms</strong></p>
      ${synonymMarkup}
    </section>
  `;

  if (audioURL) {
    const playButton = document.querySelector("#play-audio");
    playButton.addEventListener("click", () => {
      const audio = new Audio(audioURL);
      audio.play().catch(() => {
        setStatus("Unable to play pronunciation audio.", "error");
      });
    });
  }
}

function toggleCurrentWordFavorite() {
  if (!state.currentWord) {
    return;
  }

  const normalized = state.currentWord.toLowerCase();

  if (state.favorites.includes(normalized)) {
    state.favorites = state.favorites.filter((item) => item !== normalized);
    setStatus(`Removed "${state.currentWord}" from saved words.`, "info");
  } else {
    state.favorites.unshift(normalized);
    state.favorites = state.favorites.slice(0, 16);
    setStatus(`Saved "${state.currentWord}" for quick access.`, "info");
  }

  persistFavorites();
  renderFavorites();
  updateSaveButton();
}

function renderFavorites() {
  if (state.favorites.length === 0) {
    favoritesList.innerHTML =
      '<li class="placeholder">No saved words yet. Save one to pin it here.</li>';
    return;
  }

  favoritesList.innerHTML = state.favorites
    .map((word) => {
      const active =
        state.currentWord && word === state.currentWord.toLowerCase()
          ? "active"
          : "";

      return `<li>
        <button class="favorite-pill ${active}" type="button" data-word="${word}">${word}</button>
      </li>`;
    })
    .join("");

  document.querySelectorAll(".favorite-pill").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.word;
      form.requestSubmit();
    });
  });
}

function setStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`;
}

function updateSaveButton() {
  if (!state.currentWord) {
    saveWordButton.disabled = true;
    saveWordButton.textContent = "Save Word";
    return;
  }

  const normalized = state.currentWord.toLowerCase();
  const saved = state.favorites.includes(normalized);

  saveWordButton.disabled = false;
  saveWordButton.textContent = saved ? "Remove Saved Word" : "Save Word";
}

function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
}

function restoreTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const nextTheme = current === "night" ? "" : "night";

  if (nextTheme) {
    document.documentElement.setAttribute("data-theme", nextTheme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem(THEME_KEY, nextTheme);
}
