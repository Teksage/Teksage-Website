import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
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
      className={`${urbanist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <GoogleTagManager />
        <AppProviders initialLocale={initialLocale}>{children}</AppProviders>
      </body>
    </html>
  );
}
