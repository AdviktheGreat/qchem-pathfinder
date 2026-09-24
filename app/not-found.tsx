import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <Compass size={34} aria-hidden="true" />
      <p className="eyebrow">Path not found</p>
      <h1>This route is outside the research map.</h1>
      <p>
        Return to the pathfinder to continue your saved exploration or begin a
        new one.
      </p>
      <Link className="primary-button" href="/">
        Return to the pathfinder
      </Link>
    </main>
  );
}
