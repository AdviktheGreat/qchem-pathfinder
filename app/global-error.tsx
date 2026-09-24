"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
          color: "#142422",
          background: "#f3f0e7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p style={{ color: "#0d665b", fontWeight: 800 }}>
            The path is still here
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 7vw, 4rem)", lineHeight: 1 }}>
            Something interrupted this exploration.
          </h1>
          <p style={{ color: "#5d6d69", lineHeight: 1.6 }}>
            Try rebuilding the page. Your locally saved answers should still be
            available.
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              marginTop: "1rem",
              padding: "0.8rem 1.1rem",
              border: 0,
              borderRadius: "0.55rem",
              background: "#0d665b",
              color: "white",
              font: "inherit",
              fontWeight: 750,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
