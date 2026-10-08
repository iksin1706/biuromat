// Sekcja „Moduły” — 4 moduły, z których po kliknięciu „wychodzą” funkcje w chipach.
// Źródła: brief serwisu (mapa funkcji, opisy zrzutów) + obecna strona biuromat.pl.
// Chipy z `verify: true` wymagają potwierdzenia, że funkcja działa tak w aplikacji.
// Najlepiej 6–8 chipów na moduł (tyle mieści układ promienisty na desktopie).

export type ModuleId = "fakturowanie" | "zamowienia" | "magazyn" | "produkcja";

export type ModuleChip = { label: string; verify?: boolean };

export type AppModule = {
  id: ModuleId;
  name: string;
  tagline: string;
  href: string;
  chips: ModuleChip[];
};

export const modulesSection = {
  title: "Wszystko w jednym miejscu",
  subtitle: "Faktury, zamówienia, magazyn i produkcja w jednym programie. Wybierz moduł, żeby zobaczyć, co potrafi.",
  allFeatures: { label: "Zobacz listę wszystkich funkcji", href: "/funkcje/" },
};

export const appModules: AppModule[] = [
  {
    id: "fakturowanie",
    name: "Fakturowanie",
    tagline: "Każdy rodzaj faktury, z wysyłką do KSeF",
    href: "/funkcje/faktury-vat/",
    chips: [
      { label: "Faktury VAT" },
      { label: "Wysyłka do KSeF" },
      { label: "Faktury cykliczne" },
      { label: "Korekty" },
      { label: "Proformy i zaliczkowe" },
      { label: "WDT i VAT marża" },
      { label: "Dane kontrahenta z GUS" },
      { label: "Faktury w walutach obcych" },
    ],
  },
  {
    id: "zamowienia",
    name: "Zamówienia",
    tagline: "Od zamówienia klienta do produkcji i zakupu",
    href: "/funkcje/zamowienia/",
    chips: [
      { label: "Lista zamówień klientów" },
      { label: "Status „do produkcji”" },
      { label: "Status „do zamówienia”" },
      { label: "Podgląd dostępności w magazynie", verify: true },
      { label: "Faktura z zamówienia", verify: true },
      { label: "Historia zamówień kontrahenta", verify: true },
    ],
  },
  {
    id: "magazyn",
    name: "Magazyn",
    tagline: "Stany, które aktualizują się same",
    href: "/funkcje/magazyn/",
    chips: [
      { label: "Stany magazynowe" },
      { label: "Alert niskiego stanu" },
      { label: "Aktualizacja stanów przy sprzedaży" },
      { label: "Kontrola dostępności produktów" },
      { label: "Dokumenty RW i PW" },
      { label: "Partie i terminy przydatności" },
    ],
  },
  {
    id: "produkcja",
    name: "Produkcja",
    tagline: "Produkty własne, partie i identyfikowalność",
    href: "/funkcje/produkcja/",
    chips: [
      { label: "Produkt własny ze składem" },
      { label: "Produkcja jednym kliknięciem" },
      { label: "Partie produkcyjne" },
      { label: "Daty produkcji i przydatności" },
      { label: "Numery seryjne i historia" },
      { label: "Dokumenty RW i PW" },
      { label: "Kalkulacja kosztów wytworzenia" },
      { label: "Planowanie produkcji" },
    ],
  },
];
