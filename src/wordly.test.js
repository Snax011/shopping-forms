import { describe, expect, it, vi } from "vitest";
import {
  collectSynonyms,
  fetchWordData,
  findAudioUrl,
  findPhoneticText,
} from "./wordly.js";

describe("wordly utility functions", () => {
  it("findPhoneticText returns top-level phonetic when available", () => {
    const entry = { phonetic: "/word/", phonetics: [{ text: "/alt/" }] };
    expect(findPhoneticText(entry)).toBe("/word/");
  });

  it("findPhoneticText falls back to phonetics array", () => {
    const entry = { phonetics: [{ text: "/fallback/" }] };
    expect(findPhoneticText(entry)).toBe("/fallback/");
  });

  it("findAudioUrl returns first available audio", () => {
    const entry = {
      phonetics: [{ audio: "" }, { audio: "https://audio.test/word.mp3" }],
    };
    expect(findAudioUrl(entry)).toBe("https://audio.test/word.mp3");
  });

  it("collectSynonyms deduplicates from meanings and definitions", () => {
    const entry = {
      meanings: [
        {
          synonyms: ["bright", "radiant"],
          definitions: [
            { synonyms: ["luminous", "bright"] },
            { synonyms: ["glowing"] },
          ],
        },
      ],
    };

    expect(collectSynonyms(entry)).toEqual([
      "bright",
      "radiant",
      "luminous",
      "glowing",
    ]);
  });
});

describe("fetchWordData", () => {
  it("returns parsed JSON on success", async () => {
    const fakeResponse = [{ word: "test" }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeResponse,
    });

    const result = await fetchWordData("test", fetchMock);
    expect(result).toEqual(fakeResponse);
  });

  it("throws 404-specific error for missing words", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchWordData("notaword", fetchMock)).rejects.toThrow(
      "Word not found. Check spelling and try again.",
    );
  });

  it("throws generic error for other failures", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchWordData("error", fetchMock)).rejects.toThrow(
      "Request failed. Please try again in a moment.",
    );
  });
});
