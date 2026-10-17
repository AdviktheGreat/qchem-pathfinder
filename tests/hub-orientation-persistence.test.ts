import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { HUB_STORAGE_KEY } from "@/lib/hub-persistence";
import {
  clearHubOrientationStorage,
  createHubOrientationState,
  HUB_ORIENTATION_STORAGE_KEY,
  parseHubOrientationState,
  readHubOrientationStorage,
  restoreHubOrientationState,
  serializeHubOrientationState,
  writeHubOrientationStorage,
} from "@/lib/hub-orientation-persistence";

describe("hub orientation persistence", () => {
  it("uses a storage namespace isolated from the hub and every pathfinder", () => {
    expect(HUB_ORIENTATION_STORAGE_KEY).not.toBe(HUB_STORAGE_KEY);
    expect(
      pathfinderModules.some(
        (moduleEntry) =>
          moduleEntry.lifecycle === "available" &&
          moduleEntry.definition.storage.key === HUB_ORIENTATION_STORAGE_KEY,
      ),
    ).toBe(false);
  });

  it("round-trips valid orientation progress", () => {
    const state = createHubOrientationState(
      {
        screen: "question",
        answers: {
          "broad-curiosity": "living-systems",
          "preferred-system": "biomolecules-cells",
        },
        currentQuestionId: "question-style",
      },
      new Date("2026-10-13T18:00:00.000Z"),
    );

    expect(
      parseHubOrientationState(serializeHubOrientationState(state)),
    ).toEqual(state);
  });

  it("rejects malformed records and removes invalid or hidden answers", () => {
    expect(parseHubOrientationState("not-json")).toBeNull();
    expect(
      parseHubOrientationState(
        JSON.stringify({ version: 1, screen: "question", savedAt: "never" }),
      ),
    ).toBeNull();

    const restored = parseHubOrientationState(
      JSON.stringify({
        version: 1,
        screen: "question",
        savedAt: "2026-10-13T18:00:00.000Z",
        currentQuestionId: "question-style",
        answers: {
          "broad-curiosity": "methods-computing",
          "preferred-system": "not-a-real-option",
          "molecular-boundary": "biological-function",
          unknown: "anything",
        },
      }),
    );

    expect(restored?.answers).toEqual({
      "broad-curiosity": "methods-computing",
    });
  });

  it("resumes an unfinished result at the first unanswered question", () => {
    const restored = restoreHubOrientationState(
      JSON.stringify({
        version: 1,
        screen: "results",
        savedAt: "2026-10-13T18:00:00.000Z",
        answers: { "broad-curiosity": "living-systems" },
      }),
    );

    expect(restored).toMatchObject({
      screen: "question",
      currentQuestionId: "preferred-system",
    });
  });

  it("reports unavailable storage without throwing", () => {
    const unavailable = {
      getItem() {
        throw new Error("blocked");
      },
      setItem() {
        throw new Error("blocked");
      },
      removeItem() {
        throw new Error("blocked");
      },
    };
    const state = createHubOrientationState({
      screen: "question",
      answers: { "broad-curiosity": "living-systems" },
    });

    expect(readHubOrientationStorage(unavailable)).toEqual({
      health: "unavailable",
      state: null,
    });
    expect(writeHubOrientationStorage(unavailable, state)).toBe("unavailable");
    expect(clearHubOrientationStorage(unavailable)).toBe("unavailable");
  });

  it("reads, writes, and clears through the isolated storage key", () => {
    const records = new Map<string, string>();
    const storage = {
      getItem: (key: string) => records.get(key) ?? null,
      setItem: (key: string, value: string) => records.set(key, value),
      removeItem: (key: string) => records.delete(key),
    };
    const state = createHubOrientationState({
      screen: "question",
      answers: { "broad-curiosity": "living-systems" },
    });

    expect(writeHubOrientationStorage(storage, state)).toBe("available");
    expect(readHubOrientationStorage(storage)).toMatchObject({
      health: "available",
      state: {
        ...state,
        currentQuestionId: "preferred-system",
      },
    });
    expect(clearHubOrientationStorage(storage)).toBe("available");
    expect(records.has(HUB_ORIENTATION_STORAGE_KEY)).toBe(false);
  });
});
