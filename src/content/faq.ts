// Sekcja FAQ — najczęstsze pytania przed rejestracją. Treść trafia też do JSON-LD (FAQPage)
// i jest pierwszym źródłem dla wyszukiwarek AI, więc odpowiedzi zaczynają się od konkretu.
// Źródło: FAQ obecnej strony biuromat.pl/faq/ (skrócone). Ceny i limity z `plans` w site.ts.
// Przy zmianie oferty aktualizuj tutaj i w public/llms.txt.
import { company, plans } from "./site";

const free = plans.find((p) => p.id === "free")!;
const premium = plans.find((p) => p.id === "premium")!;

export type FaqItem = { q: string; a: string };

export const faqSection = {
  title: "Najczęstsze pytania",
  subtitle: "Nie ma tu odpowiedzi na Twoje pytanie? Zadzwoń albo napisz, odpowiadamy w dni robocze.",
  // Pełne FAQ (konto, płatności, KSeF, faktury, magazyn, bezpieczeństwo) — istniejąca strona
  all: { label: "Wszystkie pytania i odpowiedzi", href: "/faq/" },
};

export const faq: FaqItem[] = [
  {
    q: "Czym jest Biuromat?",
    a: `Biuromat to program do faktur online z integracją z KSeF. Oprócz fakturowania ma bazę kontrahentów, zamówienia, magazyn i moduł produkcji. Działa w przeglądarce na komputerze, tablecie i telefonie, bez instalacji. Twórcą jest ${company.legalName} z Rzeszowa.`,
  },
  {
    q: "Czy Biuromat jest darmowy?",
    a: `Tak. Plan FREE kosztuje ${free.priceMonthly} zł bezterminowo i obejmuje 10 faktur miesięcznie, 2 konta współpracowników oraz integrację z KSeF. Nie podajesz karty płatniczej. Plan Premium kosztuje ${premium.priceMonthly} zł netto miesięcznie albo ${premium.priceYearly} zł netto rocznie (100 faktur miesięcznie, 5 kont, magazyn i produkcja). Plan Enterprise wyceniamy indywidualnie.`,
  },
  {
    q: "Czy Biuromat wysyła faktury do KSeF?",
    a: "Tak, we wszystkich planach, także w darmowym. Fakturę wysyłasz do KSeF jednym kliknięciem, a numer KSeF zapisuje się przy fakturze. Faktury kosztowe od dostawców pobierasz z KSeF na listę, gdzie je zatwierdzasz albo odrzucasz.",
  },
  {
    q: "Jak połączyć Biuromat z KSeF?",
    a: "Przez certyfikat KSeF. Logujesz się do KSeF, generujesz certyfikat i wgrywasz go w Biuromacie w Konfiguracja > Integracje > KSeF. Od tej chwili wysyłasz faktury jednym kliknięciem. Certyfikat przechowujemy w postaci zaszyfrowanej, a wysyłkę możesz najpierw sprawdzić w środowisku testowym KSeF.",
  },
  {
    // VERIFY: daty obowiązku KSeF przy każdej zmianie przepisów
    q: "Od kiedy KSeF jest obowiązkowy?",
    a: "Od 1 lutego 2026 r. wszystkie firmy odbierają faktury przez KSeF, a największe (sprzedaż powyżej 200 mln zł w 2024 r.) także je w nim wystawiają. Od 1 kwietnia 2026 r. obowiązek wystawiania faktur w KSeF objął pozostałe firmy. Najmniejsi podatnicy, ze sprzedażą do 10 000 zł brutto miesięcznie, mają czas do 1 stycznia 2027 r.",
  },
  {
    q: "Jakie faktury wystawię w Biuromacie?",
    a: "Faktury VAT, VAT marża, zaliczkowe i rozliczeniowe, korygujące, proformy, WDT, eksportowe, VAT OSS oraz faktury cykliczne. Dane kontrahenta pobierają się z GUS po numerze NIP, a numerację ustawiasz według własnego wzoru.",
  },
  {
    q: "Czy mogę wystawiać faktury w walutach i językach obcych?",
    a: "Tak. Fakturę wystawisz w walucie obcej oraz po angielsku, niemiecku albo francusku, ze stawkami VAT dla transakcji zagranicznych.",
  },
  {
    q: "Czy Biuromat ma magazyn i produkcję?",
    a: "Tak, w planach Premium i Enterprise. Magazyn pokazuje stany z alertem niskiego stanu i aktualizuje je przy sprzedaży. Produkcja obsługuje produkty własne ze składem, partie, daty produkcji, terminy przydatności i numery seryjne, a dokumenty RW i PW tworzą się automatycznie. Zamówienia klientów oznaczysz jako „do produkcji” albo „do zamówienia”.",
  },
  {
    q: "Czy moje biuro rachunkowe może pracować w Biuromacie?",
    a: "Tak. Księgowa dostaje własny dostęp jako współpracownik, z uprawnieniami, które sam ustalasz. Faktury kosztowe z KSeF pobiera jednym plikiem ZIP, a dane przeniesie do Symfonii bez przepisywania. Biuromat nie zastępuje księgowego: to program do fakturowania, nie do prowadzenia ksiąg.",
  },
  {
    q: "Gdzie są przechowywane moje dane?",
    a: "Na serwerach w Unii Europejskiej, bez przekazywania poza Europejski Obszar Gospodarczy. Połączenia są szyfrowane (HTTPS), hasła hashowane, a certyfikaty KSeF przechowywane w postaci zaszyfrowanej.",
  },
  {
    q: "Jak szybko wystawię pierwszą fakturę?",
    a: "Rejestracja trwa około minuty, a pierwszą fakturę wystawisz w około 30 sekund. Dane Twojej firmy i kontrahentów uzupełniają się po numerze NIP.",
  },
];
