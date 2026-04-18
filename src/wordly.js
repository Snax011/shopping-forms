export const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function fetchWordData(word, fetchImpl = fetch) {
  const response = await fetchImpl(`${API_BASE}${encodeURIComponent(word)}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Word not found. Check spelling and try again.");
    }

    throw new Error("Request failed. Please try again in a moment.");
  }

  return response.json();
}

export function findPhoneticText(entry) {
  if (entry.phonetic) {
    return entry.phonetic;
  }

  if (Array.isArray(entry.phonetics)) {
    const withText = entry.phonetics.find((item) => item.text);
    return withText ? withText.text : "";
  }

  return "";
}

export function findAudioUrl(entry) {
  if (!Array.isArray(entry.phonetics)) {
    return "";
  }

  const withAudio = entry.phonetics.find((item) => item.audio);
  return withAudio ? withAudio.audio : "";
}

export function collectSynonyms(entry) {
  const synonyms = new Set();

  if (!Array.isArray(entry.meanings)) {
    return [];
  }

  entry.meanings.forEach((meaning) => {
    if (Array.isArray(meaning.synonyms)) {
      meaning.synonyms.forEach((synonym) => synonyms.add(synonym));
    }

    if (Array.isArray(meaning.definitions)) {
      meaning.definitions.forEach((definition) => {
        if (Array.isArray(definition.synonyms)) {
          definition.synonyms.forEach((synonym) => synonyms.add(synonym));
        }
      });
    }
  });

  return [...synonyms];
}
