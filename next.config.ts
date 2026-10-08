import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // W katalogu domowym leży obcy package-lock.json — wskazujemy root projektu.
  turbopack: { root: __dirname },
  images: { formats: ["image/avif", "image/webp"] },
  // Adresy z ukośnikiem na końcu, jak na obecnej stronie (WordPress) — zaindeksowane
  // URL-e zostają te same, bez dodatkowego przekierowania.
  trailingSlash: true,
  // 301/308 ze starych podstron WordPressa, których treść przejęła nowa strona główna.
  // Wpisy blogowe, /faq/, /cennik/, /kontakt/, /ksef/wizualizacja/ i dokumenty prawne NIE są
  // tu przekierowane — muszą dalej działać pod tymi samymi adresami (patrz SEO.md).
  // Przed startem strony: noindex na każdej odpowiedzi, także plikach (obrazy, llms.txt).
  // Włączenie indeksowania: SITE_INDEXING=on (patrz allowIndexing w src/content/site.ts).
  async headers() {
    if (process.env.SITE_INDEXING === "on") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  async redirects() {
    return [
      { source: "/poznaj-biuromat", destination: "/", permanent: true },
      { source: "/dlaczego-warto", destination: "/", permanent: true },
      { source: "/funkcjonalnosci", destination: "/#moduly", permanent: true },
    ];
  },
};

export default nextConfig;
