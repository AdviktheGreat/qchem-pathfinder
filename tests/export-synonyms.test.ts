import { expect, it } from "vitest";
import { formatResearchProfile } from "@/lib/profile-export";
import { getRecommendations } from "@/lib/recommendation";
import { studentProfiles } from "./fixtures/student-profiles";
it.each(studentProfiles)(
  "exports related search vocabulary for $name",
  ({ answers }) => {
    const profile = formatResearchProfile(answers);
    const related = profile
      .split("RELATED SEARCH PHRASES\n")[1]
      .split("\nSUGGESTED SEARCHES")[0];
    for (const result of getRecommendations(answers)) {
      expect(related).toContain(result.niche.name);
      for (const synonym of result.niche.synonyms)
        expect(related).toContain(synonym);
    }
  },
);
