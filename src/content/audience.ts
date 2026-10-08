// Sekcja „Dla firm / Dla biur rachunkowych” — korzyści zależne od wyboru.
// Źródła: brief serwisu (funkcje z FAQ i cennika) + obecna strona biuromat.pl.
// Pozycje z VERIFY wymagają potwierdzenia, że działają dokładnie tak w aplikacji.

export type AudienceId = "firmy" | "biura";

export type Benefit = {
  icon: "invoice" | "ksef" | "warehouse" | "team" | "zip" | "export" | "costs" | "clients";
  title: string;
  text: string;
};

export type Audience = {
  id: AudienceId;
  tab: string;
  tabHint: string;
  lead: string;
  benefits: Benefit[];
  more: { label: string; href: string };
};

export const audienceSection = {
  title: "Dla firm i dla biur rachunkowych",
  subtitle: "Każdy korzysta z Biuromatu inaczej. Wybierz, jak pracujesz, a pokażemy, co zyskasz.",
};

export const audiences: Audience[] = [
  {
    id: "firmy",
    tab: "Dla firm",
    tabHint: "Fakturujesz, sprzedajesz, produkujesz",
    lead: "Faktury, KSeF, magazyn i produkcja w jednym programie. Zaczynasz za darmo i dokładasz funkcje, gdy firma rośnie.",
    benefits: [
      {
        icon: "invoice",
        title: "Faktura w 30 sekund",
        text: "Wpisujesz NIP, a dane kontrahenta pobierają się z GUS. VAT, korekty, proformy, zaliczkowe i cykliczne.",
      },
      {
        icon: "ksef",
        title: "KSeF bez przepisywania",
        text: "Wysyłasz faktury do KSeF prosto z programu. Faktury kosztowe z KSeF zatwierdzasz albo odrzucasz na liście.",
      },
      {
        icon: "warehouse",
        title: "Magazyn i produkcja",
        text: "Stany z alertem niskiego stanu, produkty własne ze składem, partie, daty produkcji i terminy przydatności.",
      },
      {
        icon: "team",
        title: "Zespół z uprawnieniami",
        text: "Zapraszasz współpracowników i ustalasz, kto co widzi. Każdy ma dostęp tylko do tego, co mu potrzebne.",
      },
    ],
    more: { label: "Wszystkie funkcje", href: "/funkcje/" },
  },
  {
    id: "biura",
    tab: "Dla biur rachunkowych",
    tabHint: "Prowadzisz księgowość klientów",
    lead: "Dokumenty klientów trafiają do Ciebie uporządkowane, bez przepisywania i bez zbierania faktur z maili.",
    benefits: [
      {
        icon: "costs",
        title: "Faktury kosztowe z KSeF",
        text: "Faktury zakupowe klienta pobierają się z KSeF na listę do zatwierdzenia, razem z danymi do płatności i kodem QR.",
      },
      {
        icon: "zip",
        title: "Dokumenty w paczce ZIP",
        text: "Komplet dokumentów kosztowych klienta pobierasz jednym plikiem ZIP, gotowym do zaksięgowania.",
      },
      {
        icon: "export",
        title: "Eksport do Symfonii",
        text: "Przenosisz dane z Biuromatu do Symfonii bez ręcznego przepisywania faktur.",
      },
      {
        // VERIFY: czy biuro jest zapraszane do firmy klienta i przełącza firmy w nagłówku aplikacji
        icon: "clients",
        title: "Firmy klientów pod ręką",
        text: "Klient zaprasza Cię do swojej firmy i nadaje rolę. Między firmami klientów przełączasz się jednym kliknięciem.",
      },
    ],
    more: { label: "Więcej dla biur rachunkowych", href: "/dla-kogo/biura-rachunkowe/" },
  },
];
