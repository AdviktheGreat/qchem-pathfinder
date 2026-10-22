"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  buildInterdisciplinarySearchQueries,
  type InterdisciplinaryLink,
  type InterdisciplinarySearchQueries,
} from "@/lib/interdisciplinary-links";

const searchTabs: readonly {
  id: keyof InterdisciplinarySearchQueries;
  label: string;
  description: string;
}[] = [
  {
    id: "orientation",
    label: "Orientation",
    description: "Learn the vocabulary and broad shape of the connection.",
  },
  {
    id: "focused",
    label: "Focused",
    description: "Look directly at the shared scientific problem.",
  },
  {
    id: "review",
    label: "Review",
    description: "Find a recent synthesis before reading individual studies.",
  },
];

export function InterdisciplinarySearchPanel({
  link,
}: {
  link: InterdisciplinaryLink;
}) {
  const id = useId();
  const [activeTab, setActiveTab] =
    useState<keyof InterdisciplinarySearchQueries>("orientation");
  const queries = buildInterdisciplinarySearchQueries(link);
  const active =
    searchTabs.find((tab) => tab.id === activeTab) ?? searchTabs[0];

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, nextIndex: number) {
    event.preventDefault();
    const tabs =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]',
      );
    const nextTab = tabs?.[nextIndex];
    if (!nextTab) return;
    setActiveTab(searchTabs[nextIndex].id);
    nextTab.focus();
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight")
      moveTab(event, (index + 1) % searchTabs.length);
    else if (event.key === "ArrowLeft")
      moveTab(event, (index - 1 + searchTabs.length) % searchTabs.length);
    else if (event.key === "Home") moveTab(event, 0);
    else if (event.key === "End") moveTab(event, searchTabs.length - 1);
  }

  return (
    <section
      className="interdisciplinary-search-panel"
      aria-label={`Bridge searches for ${link.targetNicheName}`}
    >
      <div className="interdisciplinary-search-heading">
        <strong>Search from three distances</strong>
        <span>Start broad, then narrow only when a phrase feels useful.</span>
      </div>
      <div
        className="interdisciplinary-search-tabs"
        role="tablist"
        aria-label={`Bridge query levels for ${link.targetNicheName}`}
      >
        {searchTabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${id}-${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${id}-${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-${active.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${active.id}-tab`}
        className="interdisciplinary-search-query"
      >
        <p>{active.description}</p>
        <div className="interdisciplinary-search-copy">
          <code>{queries[active.id]}</code>
          <CopyButton
            key={active.id}
            text={queries[active.id]}
            label={`Copy ${active.label.toLocaleLowerCase()} search`}
            context={link.targetNicheName}
          />
        </div>
      </div>
    </section>
  );
}
