import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

// BinanceNova substitute (display + body)
const inter = Inter({
  variable: "--font-nova",
  subsets: ["latin"],
  display: "swap",
});

// BinancePlex substitute (numbers, dates, tabular data)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Firaz Al Aqib — Fullstack Developer",
  description:
    "Fullstack Developer & Computer Science student at Universitas Indonesia. 7+ shipped projects across academic systems, fraud detection, and fintech.",
  metadataBase: new URL("https://firaz.my.id"),
  openGraph: {
    title: "Firaz Al Aqib — Fullstack Developer",
    description:
      "Fullstack Developer & Computer Science student at Universitas Indonesia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas-dark text-body">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
