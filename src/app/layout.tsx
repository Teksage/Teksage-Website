import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { htmlLangFromLocale } from "@/lib/i18n";
import { getServerAppLocale } from "@/lib/i18n/server-locale";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "teksage",
  description: "teksage — Your Astrology & Predictions Platform",
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
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppProviders initialLocale={initialLocale}>{children}</AppProviders>
      </body>
    </html>
  );
}
