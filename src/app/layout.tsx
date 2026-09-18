import type { Metadata } from "next";
import {
  Anek_Devanagari,
  Anek_Kannada,
  Anek_Malayalam,
  Anek_Tamil,
  Anek_Telugu,
  Urbanist,
} from "next/font/google";
import { GoogleTagManager } from "@/components/common/GoogleTagManager";
import { AppProviders } from "@/components/providers/AppProviders";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import { htmlLangFromLocale } from "@/lib/i18n";
import { getServerAppLocale } from "@/lib/i18n/server-locale";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anekTamil = Anek_Tamil({
  variable: "--font-anek-tamil",
  subsets: ["tamil", "latin"],
  weight: "variable",
});

const anekTelugu = Anek_Telugu({
  variable: "--font-anek-telugu",
  subsets: ["telugu", "latin"],
  weight: "variable",
});

const anekKannada = Anek_Kannada({
  variable: "--font-anek-kannada",
  subsets: ["kannada", "latin"],
  weight: "variable",
});

const anekMalayalam = Anek_Malayalam({
  variable: "--font-anek-malayalam",
  subsets: ["malayalam", "latin"],
  weight: "variable",
});

const anekDevanagari = Anek_Devanagari({
  variable: "--font-anek-devanagari",
  subsets: ["devanagari", "latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Teksage",
  description: "Teksage — Your Astrology & Predictions Platform",
  icons: {
    icon: [{ url: PUBLIC_ASSETS.siteIcon, type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await getServerAppLocale();

  return (
    <html
      lang={htmlLangFromLocale(initialLocale)}
      className={`${urbanist.variable} ${anekTamil.variable} ${anekTelugu.variable} ${anekKannada.variable} ${anekMalayalam.variable} ${anekDevanagari.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <GoogleTagManager />
        <AppProviders initialLocale={initialLocale}>{children}</AppProviders>
      </body>
    </html>
  );
}
