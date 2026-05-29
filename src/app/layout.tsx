import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  variable: "--font-nova",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://firaz.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Firaz Al Aqib — Fullstack Developer",
    template: "%s | Firaz Al Aqib",
  },
  description:
    "Undergraduate Fullstack Developer with a Computer Science background at Universitas Indonesia (GPA 3.72/4.00). 7+ shipped projects spanning face-recognition academic systems, fraud-detection platforms, and SME finance apps.",
  keywords: [
    "Firaz Al Aqib",
    "Fullstack Developer",
    "Web Developer",
    "Computer Science",
    "Universitas Indonesia",
    "Next.js",
    "Spring Boot",
    "React",
    "Portfolio",
    "Indonesia",
  ],
  authors: [{ name: "Muhammad Firaz Al Aqib", url: BASE_URL }],
  creator: "Muhammad Firaz Al Aqib",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Firaz Al Aqib",
    title: "Firaz Al Aqib — Fullstack Developer",
    description:
      "Undergraduate Fullstack Developer with a Computer Science background at Universitas Indonesia. 7+ shipped projects across face-recognition systems, fraud detection, and fintech.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firaz Al Aqib — Fullstack Developer",
    description:
      "Undergraduate Fullstack Developer at Universitas Indonesia. 7+ shipped projects across face-recognition systems, fraud detection, and fintech.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Firaz Al Aqib",
  url: BASE_URL,
  email: "contact@firaz.my.id",
  jobTitle: "Fullstack Developer",
  description:
    "Undergraduate Fullstack Developer with a Computer Science background at Universitas Indonesia.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Indonesia",
    url: "https://www.ui.ac.id",
  },
  knowsAbout: [
    "Next.js", "React", "Spring Boot", "Django",
    "PostgreSQL", "Docker", "AWS", "TypeScript",
  ],
  sameAs: [
    "https://github.com/FasiIkom",
    "https://www.linkedin.com/in/firaz-al-aqib",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas-dark text-body">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
