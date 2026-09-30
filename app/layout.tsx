import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://qchem-pathfinder.vercel.app"),
  title: {
    default: "Research Pathfinder",
    template: "%s | Research Pathfinder",
  },
  description:
    "A hub of peer-guided explorations that help students narrow broad scientific interests into promising research directions.",
  openGraph: {
    title: "Research Pathfinder",
    description:
      "Choose a scientific neighborhood, find a promising direction, and start reading with confidence.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Research Pathfinder scientific research-map preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Pathfinder",
    description:
      "Choose a scientific neighborhood and find a promising direction to explore.",
    images: ["/og.png"],
  },
};

export const viewport = { themeColor: "#f3f0e7", colorScheme: "light" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
