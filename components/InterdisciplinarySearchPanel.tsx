"use client";

import { useId, useState } from "react";
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

  return (
    <section
      className="interdisciplinary-search-panel"
      aria-label={`Bridge searches for ${link.targetNicheName}`}
    >
      <div className="interdisciplinary-search-heading">
        <strong>Search from three distances</strong>
        <span>Start broad, then narrow only when a phrase feels useful.</span>
      </div>
      <div className="interdisciplinary-search-tabs" role="tablist">
        {searchTabs.map((tab) => (
          <button
            key={tab.id}
            id={`${id}-${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${id}-${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
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
