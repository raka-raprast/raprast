import { Syne, Space_Grotesk, Space_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Lenis } from "@/components/motion/Lenis";
import { Cursor } from "@/components/motion/Cursor";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { ScrollGuide } from "@/components/motion/ScrollGuide";
import { profile } from "@/content/site";

const siteUrl = "https://raprast.asia";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.shortName} — Software Engineer`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.shortName} — Software Engineer`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.shortName,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b102b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <Lenis />
        <Cursor />
        <RouteTransition />
        <ScrollLine />
        <ScrollGuide />
        <Nav />
        <main id="main" className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
