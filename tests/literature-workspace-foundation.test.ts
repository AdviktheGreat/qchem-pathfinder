import { describe, expect, it } from "vitest";
import {
  createLiteratureWorkspaceBackup,
  importLiteratureWorkspaceBackup,
} from "@/lib/literature-workspace-backup";
import {
  setLiteratureComparisonObservation,
  setLiteratureComparisonSources,
  setLiteratureComparisonSynthesis,
} from "@/lib/literature-workspace-comparison";
import {
  addLiteratureVocabularyNote,
  upsertLiteratureReadingNote,
} from "@/lib/literature-workspace-notes";
import {
  getLiteratureWorkspaceStorageKey,
  readLiteratureWorkspaceStorage,
  restoreLiteratureWorkspace,
  serializeLiteratureWorkspace,
  writeLiteratureWorkspaceStorage,
} from "@/lib/literature-workspace-persistence";
import { getLiteratureWorkspaceProgress } from "@/lib/literature-workspace-progress";
import {
  addLiteratureSource,
  removeLiteratureSource,
  updateLiteratureSource,
  type NewLiteratureSource,
} from "@/lib/literature-workspace-sources";
import { createLiteratureWorkspace } from "@/lib/literature-workspace-state";
import { validateLiteratureWorkspace } from "@/lib/literature-workspace-validation";

const created = new Date("2026-10-23T12:00:00.000Z");
const edited = new Date("2026-10-23T13:00:00.000Z");

function source(id: string, title = `Paper ${id}`): NewLiteratureSource {
  return {
    id,
    title,
    authors: ["Researcher One"],
    year: 2025,
    kind: "research-article",
    verification: "unverified",
    readingStatus: "saved",
  };
}

const readingContent = {
  researchPurpose: "Test a specific physical explanation.",
  methods: ["Simulation"],
  evidence: ["Computed trajectory"],
  reportedFindings: ["The source reports a stable trend."],
  reportedLimitations: ["The source studies one model system."],
  studentInterpretations: ["This may be useful in a related system."],
  openQuestions: ["Does the trend persist at another scale?"],
};

function emptyWorkspace() {
  return createLiteratureWorkspace({
    id: "workspace-1",
    title: "  Charge transfer reading  ",
    date: created,
  });
}

describe("literature workspace foundation", () => {
  it("creates a versioned, valid, privacy-local starting record", () => {
    const workspace = emptyWorkspace();

    expect(workspace.identity).toMatchObject({
      id: "workspace-1",
      title: "Charge transfer reading",
      stage: "sources",
      origin: { kind: "manual" },
    });
    expect(workspace.sources).toEqual([]);
    expect(validateLiteratureWorkspace(workspace)).toEqual({
      valid: true,
      issues: [],
    });
  });

  it("adds and edits normalized sources without mutating earlier state", () => {
    const initial = emptyWorkspace();
    const added = addLiteratureSource(
      initial,
      {
        ...source("paper-1", "  First paper  "),
        authors: [" Researcher One ", "Researcher One", "Researcher Two"],
      },
      edited,
    );
    const updated = updateLiteratureSource(
      added,
      "paper-1",
      { verification: "student-checked", readingStatus: "reading" },
      new Date("2026-10-23T14:00:00.000Z"),
    );

    expect(initial.sources).toEqual([]);
    expect(added.sources[0]).toMatchObject({
      title: "First paper",
      authors: ["Researcher One", "Researcher Two"],
      verification: "unverified",
    });
    expect(updated.sources[0]).toMatchObject({
      verification: "student-checked",
      readingStatus: "reading",
    });
    expect(() => addLiteratureSource(added, source("paper-1"))).toThrow(
      "already exists",
    );
  });

  it("keeps reported findings separate from student interpretations", () => {
    const withSource = addLiteratureSource(
      emptyWorkspace(),
      source("paper-1"),
      edited,
    );
    const withNotes = upsertLiteratureReadingNote(
      withSource,
      "paper-1",
      readingContent,
      edited,
    );

    expect(withNotes.readingNotes[0].reportedFindings).toEqual([
      "The source reports a stable trend.",
    ]);
    expect(withNotes.readingNotes[0].studentInterpretations).toEqual([
      "This may be useful in a related system.",
    ]);
    expect(() =>
      upsertLiteratureReadingNote(withSource, "missing", readingContent),
    ).toThrow("unknown source");
  });

  it("links vocabulary only to sources that exist", () => {
    const withSource = addLiteratureSource(
      emptyWorkspace(),
      source("paper-1"),
      edited,
    );
    const withVocabulary = addLiteratureVocabularyNote(
      withSource,
      {
        id: "term-1",
        term: "  decoherence  ",
        workingDefinition: "Loss of observable phase relationships.",
        familiarity: "building",
        sourceIds: ["paper-1", "unknown"],
        relatedTerms: ["open system"],
        questions: ["Which environmental interactions dominate?"],
      },
      edited,
    );

    expect(withVocabulary.vocabulary[0]).toMatchObject({
      term: "decoherence",
      sourceIds: ["paper-1"],
    });
  });

  it("supports two- or three-paper comparisons and rejects a fourth", () => {
    let workspace = emptyWorkspace();
    for (const id of ["one", "two", "three", "four"])
      workspace = addLiteratureSource(workspace, source(id), edited);

    workspace = setLiteratureComparisonSources(
      workspace,
      ["one", "two", "three"],
      edited,
    );
    workspace = setLiteratureComparisonObservation(
      workspace,
      "methods",
      "one",
      "Molecular dynamics",
      edited,
    );
    workspace = setLiteratureComparisonSynthesis(
      workspace,
      "methods",
      "The papers resolve different time scales.",
      edited,
    );

    expect(workspace.comparison.entries[0]).toMatchObject({
      axisId: "methods",
      observations: { one: "Molecular dynamics" },
      synthesis: "The papers resolve different time scales.",
    });
    expect(() =>
      setLiteratureComparisonSources(workspace, [
        "one",
        "two",
        "three",
        "four",
      ]),
    ).toThrow("at most three");
    expect(() =>
      setLiteratureComparisonObservation(
        workspace,
        "methods",
        "four",
        "Not selected",
      ),
    ).toThrow("not selected");
  });

  it("removes all dependent records when a source is removed", () => {
    let workspace = addLiteratureSource(
      emptyWorkspace(),
      source("one"),
      edited,
    );
    workspace = addLiteratureSource(workspace, source("two"), edited);
    workspace = upsertLiteratureReadingNote(
      workspace,
      "one",
      readingContent,
      edited,
    );
    workspace = addLiteratureVocabularyNote(
      workspace,
      {
        id: "term",
        term: "Term",
        workingDefinition: "Working definition",
        familiarity: "new-to-me",
        sourceIds: ["one", "two"],
        relatedTerms: [],
        questions: [],
      },
      edited,
    );
    workspace = setLiteratureComparisonSources(
      workspace,
      ["one", "two"],
      edited,
    );
    workspace = setLiteratureComparisonObservation(
      workspace,
      "evidence",
      "one",
      "A figure",
      edited,
    );

    const removed = removeLiteratureSource(workspace, "one", edited);

    expect(removed.sources.map((item) => item.id)).toEqual(["two"]);
    expect(removed.readingNotes).toEqual([]);
    expect(removed.vocabulary[0].sourceIds).toEqual(["two"]);
    expect(removed.comparison.sourceIds).toEqual(["two"]);
    expect(removed.comparison.entries).toEqual([]);
  });

  it("derives transparent next steps without a completion percentage", () => {
    let workspace = emptyWorkspace();
    expect(getLiteratureWorkspaceProgress(workspace).nextStep).toBe(
      "add-source",
    );

    workspace = addLiteratureSource(workspace, source("one"), edited);
    expect(getLiteratureWorkspaceProgress(workspace).nextStep).toBe(
      "verify-citations",
    );
    workspace = updateLiteratureSource(
      workspace,
      "one",
      { verification: "student-checked" },
      edited,
    );
    expect(getLiteratureWorkspaceProgress(workspace).nextStep).toBe(
      "read-source",
    );
    workspace = upsertLiteratureReadingNote(
      workspace,
      "one",
      readingContent,
      edited,
    );
    expect(getLiteratureWorkspaceProgress(workspace).nextStep).toBe(
      "add-comparison-source",
    );
    expect(getLiteratureWorkspaceProgress(workspace)).not.toHaveProperty(
      "percentage",
    );
  });

  it("reports precise orphaned-record validation issues", () => {
    const invalid = structuredClone(emptyWorkspace());
    invalid.readingNotes.push({
      sourceId: "missing",
      ...readingContent,
      updatedAt: edited.toISOString(),
    });

    expect(validateLiteratureWorkspace(invalid).issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "workspace.orphaned-reading-note",
          path: "readingNotes[0].sourceId",
        }),
      ]),
    );
  });

  it("round-trips valid local progress and rejects corrupted records", () => {
    const workspace = emptyWorkspace();
    const restored = restoreLiteratureWorkspace(
      serializeLiteratureWorkspace(workspace),
    );

    expect(restored).toEqual({ workspace, issues: [] });
    expect(restoreLiteratureWorkspace("not json")).toMatchObject({
      workspace: null,
      issues: [{ code: "workspace.invalid-json" }],
    });
    expect(
      restoreLiteratureWorkspace(
        JSON.stringify({ ...workspace, schemaVersion: 999 }),
      ),
    ).toMatchObject({
      workspace: null,
      issues: [{ code: "workspace.unsupported-version" }],
    });
  });

  it("survives unavailable browser storage without throwing", () => {
    const blockedStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };

    expect(
      readLiteratureWorkspaceStorage(blockedStorage, "workspace-1"),
    ).toMatchObject({ health: "unavailable", workspace: null });
    expect(
      writeLiteratureWorkspaceStorage(blockedStorage, emptyWorkspace()),
    ).toBe("unavailable");
  });

  it("uses isolated storage keys and portable validated backups", () => {
    const workspace = emptyWorkspace();
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    };

    expect(writeLiteratureWorkspaceStorage(storage, workspace)).toBe(
      "available",
    );
    expect(getLiteratureWorkspaceStorageKey("workspace 1")).toBe(
      "research-pathfinder:literature-workspace:workspace%201",
    );
    expect(
      readLiteratureWorkspaceStorage(storage, workspace.identity.id).workspace,
    ).toEqual(workspace);

    const backup = createLiteratureWorkspaceBackup(workspace, edited);
    expect(importLiteratureWorkspaceBackup(backup)).toEqual({
      workspace,
      issues: [],
    });
    expect(
      importLiteratureWorkspaceBackup(JSON.stringify(workspace)),
    ).toMatchObject({
      workspace: null,
      issues: [{ code: "workspace-backup.unsupported-envelope" }],
    });
  });
});
