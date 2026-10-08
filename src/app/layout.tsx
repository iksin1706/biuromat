import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { IntroLoader } from "@/components/brand/intro-loader";
import { allowIndexing, company, seo, siteConfig } from "@/content/site";
import "./globals.css";

// Na urządzeniach Apple renderuje się SF Pro (stos w globals.css); Inter to zamiennik
// na Windows/Android. Tylko wagi 400/600/700 (zasada Apple). latin-ext = polskie znaki.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Obraz OG/Twitter: app/opengraph-image.png (+ .alt.txt), Next dopina go automatycznie.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seo.title,
    template: "%s | Biuromat",
  },
  description: seo.description,
  applicationName: siteConfig.name,
  category: "business",
  creator: company.legalName,
  publisher: company.legalName,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: "/",
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export const viewport: Viewport = {
  themeColor: "#07101f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: skrypt intro dopisuje klasę `intro-seen` do <html> przed hydratacją
    <html lang="pl" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Intro poza <main> (z-10), żeby przykryło też nagłówek */}
        <IntroLoader />
        <MotionProvider>
          <SiteHeader />
          {/* Treść nad stopką (z-10): stopka leży pod spodem i odsłania się na końcu strony */}
          <main className="relative z-10 flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
