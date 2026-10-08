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
  async redirects() {
    return [
      { source: "/poznaj-biuromat", destination: "/", permanent: true },
      { source: "/dlaczego-warto", destination: "/", permanent: true },
      { source: "/funkcjonalnosci", destination: "/#moduly", permanent: true },
    ];
  },
};

export default nextConfig;
