// Rejestr sekcji strony głównej. Kolejność = kolejność na stronie.
// `brief` to skrót z briefu — wyświetlany w szkielecie, dopóki sekcja nie zostanie zbudowana.

export type HomeSection = {
  id: string;
  title: string;
  brief: string;
  /** Powierzchnia: night = granat bazowy, tile = granat o krok jaśniejszy, light = jasny kafel */
  tone: "night" | "tile" | "light";
};

export const homeSections: HomeSection[] = [
  {
    id: "hero",
    title: "Program do faktur online z KSeF – darmowy start",
    brief:
      "H1 + podtytuł, CTA i mikrotekst. Zrzuty aplikacji (desktop + telefon) i niezależna karta statusu KSeF z animacją kroków.",
    tone: "night",
  },
  {
    id: "liczby",
    title: "Biuromat w liczbach",
    brief: "Animowane liczby pod hero: klienci, faktury w KSeF, lata doświadczenia (content/numbers.ts).",
    tone: "night",
  },
  {
    id: "dla-kogo",
    title: "Dla firm i dla biur rachunkowych",
    brief: "Przełącznik segmentów; korzyści zależne od wyboru (content/audience.ts).",
    tone: "tile",
  },
  {
    id: "jak-to-dziala",
    title: "Jak to działa",
    brief: "3 kroki z nagraniami mobilnymi: rejestracja, integracja z KSeF, faktura z wysyłką.",
    tone: "light",
  },
  {
    id: "zaufanie",
    title: "Pasek zaufania",
    brief:
      "Cztery fakty: KSeF, dane w UE (bez nazw dostawców), polska firma, wsparcie z kontaktem. Ciemna karta na jasnym tle.",
    tone: "light",
  },
  {
    id: "moduly",
    title: "Moduły",
    brief: "Zakładki: Fakturowanie, KSeF, Magazyn, Produkcja, Zamówienia — zrzut + 3 punkty.",
    tone: "light",
  },
  {
    id: "case-studies",
    title: "Biuromat w praktyce",
    brief: "Slider scenariuszy (JDG, biuro rachunkowe, produkcja, eksport) z portretami; content/case-studies.ts.",
    tone: "night",
  },
  {
    id: "ksef",
    title: "KSeF",
    brief: "Logo KSeF, dwa niezależne tory: wysyłka i pobieranie faktur. Link do Wizualizacji KSeF XML.",
    tone: "tile",
  },
  {
    id: "cennik",
    title: "Cennik",
    brief: "FREE 0 zł, Premium 5 zł netto/mies. (50 zł/rok), Enterprise. Przełącznik okresu, Premium wyróżniony.",
    tone: "light",
  },
  {
    id: "faq",
    title: "Najczęstsze pytania",
    brief: "Akordeon na <details> (treść w HTML), te same pytania w JSON-LD FAQPage (content/faq.ts).",
    tone: "tile",
  },
  {
    id: "start",
    title: "Końcowy CTA",
    brief: "Powtórzenie „Załóż darmowe konto” z jednym zdaniem.",
    tone: "night",
  },
];

export const getSection = (id: string) => {
  const section = homeSections.find((s) => s.id === id);
  if (!section) throw new Error(`Brak sekcji: ${id}`);
  return section;
};
