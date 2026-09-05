import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://qchem-pathfinder.vercel.app"),
  title: "Quantum Research Pathfinder",
  description:
    "A peer-guided exploration to help students discover a promising direction in quantum chemistry research.",
  openGraph: {
    title: "Quantum Research Pathfinder",
    description: "Find a promising direction. Start reading with confidence.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Quantum Research Pathfinder research-notebook preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Research Pathfinder",
    description: "Find a promising direction. Start reading with confidence.",
    images: ["/og.png"],
  },
};

export const viewport = { themeColor: "#f3f0e7", colorScheme: "light" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
