import { expect, it } from "vitest";
import { profileFilename } from "@/lib/profile-export";
it("names a downloaded profile with its direction and date", () => {
  const date = new Date("2026-09-26T12:00:00Z");
  expect(profileFilename("charge-transfer", date)).toBe(
    "quantum-research-profile-charge-transfer-2026-09-26.txt",
  );
  expect(profileFilename("computational-spectroscopy", date)).not.toBe(
    profileFilename("charge-transfer", date),
  );
  expect(profileFilename("../New Direction!", date)).toBe(
    "quantum-research-profile-new-direction-2026-09-26.txt",
  );
});
