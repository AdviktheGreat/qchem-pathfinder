import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";
import { pathfinders } from "@/data/pathfinders";

export function PathfinderSwitcher({ currentId }: { currentId: string }) {
  const destinations = pathfinders.filter(
    (pathfinder) =>
      pathfinder.status === "available" &&
      pathfinder.href &&
      pathfinder.id !== currentId,
  );

  if (!destinations.length) return null;

  return (
    <nav className="pathfinder-switcher" aria-label="Switch pathfinder">
      <p>Switch pathfinder</p>
      {destinations.map((pathfinder) => (
        <Link href={pathfinder.href!} key={pathfinder.id}>
          <ArrowRightLeft size={15} aria-hidden="true" />
          {pathfinder.shortName}
        </Link>
      ))}
      <small>Your progress here stays saved on this device.</small>
    </nav>
  );
}
