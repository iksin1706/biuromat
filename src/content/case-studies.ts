// Sekcja „Biuromat w praktyce” — scenariusze użycia.
//
// WAŻNE: osoby i firmy są FIKCYJNE (portrety generowane przez AI), dlatego sekcja jest
// oznaczona jako „przykładowe scenariusze” i nie zawiera cytatów ani liczb udających
// wyniki prawdziwych klientów (dyrektywa Omnibus / UOKiK — zakaz fałszywych opinii).
// Gdy będą prawdziwe historie ze zgodami: podmień treść, zdjęcia i usuń `disclaimer`.
//
// Portrety: public/media/people/<image> — JPG/WebP (Next konwertuje), pionowo 4:5 (np. 1200×1500), osoba
// w prawej części kadru (lewa strona jest pod tekst). Prompty: `imagePrompt` poniżej.
// Funkcje z VERIFY wymagają potwierdzenia, że działają dokładnie tak w aplikacji.

export type CaseStudy = {
  id: string;
  segment: string;
  persona: { name: string; role: string };
  company: string;
  plan: "FREE" | "Premium" | "Enterprise";
  title: string;
  story: string;
  points: string[];
  modules: string[];
  image: string;
  imageAlt: string;
  imagePrompt: string;
  /** Pozioma pozycja twarzy na zdjęciu (0–1) — wyśrodkowanie w wąskim pasku slidera. */
  focusX: number;
};

export const caseStudiesSection = {
  title: "Biuromat w praktyce",
  subtitle: "Cztery sposoby pracy: od jednoosobowej działalności po producenta z własnym magazynem i eksportem.",
  disclaimer: "Przykładowe scenariusze. Osoby i firmy są fikcyjne, jednak oparte na rzeczywistych przypadkach użycia.",
};

const STYLE =
  "Editorial environmental portrait, photorealistic, shot on 85mm lens at f/2, soft natural window light, " +
  "calm confident expression, looking slightly off-camera, subject placed in the right third of the frame, " +
  "clean negative space on the left side, muted color palette with deep navy and cool blue tones, " +
  "subtle film grain, vertical 4:5 aspect ratio, no text, no logos, no watermarks.";

export const caseStudies: CaseStudy[] = [
  {
    id: "jdg",
    segment: "Jednoosobowa firma",
    persona: { name: "Marta", role: "fotografka ślubna" },
    company: "Pracownia fotograficzna, działalność jednoosobowa",
    plan: "FREE",
    title: "Kilka faktur w miesiącu, zero papierologii",
    story:
      "Marta wystawia kilka faktur miesięcznie za sesje i reportaże. Mieści się w darmowym planie, a fakturę wystawia z telefonu zaraz po zleceniu. Księgowa ma własny dostęp do jej firmy i sama pobiera dokumenty.",
    points: [
      "Dane klienta pobierane z GUS po numerze NIP",
      "Wysyłka do KSeF bez wychodzenia z programu",
      "Księgowa z własnym dostępem zamiast faktur w mailach",
    ],
    modules: ["Fakturowanie", "KSeF"],
    image: "/media/people/case-jdg.jpg",
    focusX: 0.66,
    imageAlt: "Portret fotografki w jej pracowni",
    imagePrompt:
      "A Polish woman in her early 30s, wedding photographer, sitting in her bright home studio with a camera " +
      "on the desk and a laptop, wearing a simple dark sweater, warm but professional. " +
      STYLE,
  },
  {
    id: "biuro",
    segment: "Biuro rachunkowe",
    persona: { name: "Katarzyna", role: "właścicielka biura rachunkowego" },
    company: "Biuro rachunkowe obsługujące w biuromacie ponad klientów",
    plan: "Premium",
    title: "Koniec z dokumentami zbieranymi z maili",
    story:
      "Biuro Katarzyny przełącza się między firmami klientów w jednym programie. Faktury kosztowe pobierają się z KSeF, a pytania do konkretnych dokumentów zostają w notatkach przy fakturze, nie w skrzynce. Własne faktury za usługi biuro wystawia w tym samym miejscu.",
    points: [
      "Przełączanie między firmami klientów jednym kliknięciem", // VERIFY
      "Faktury kosztowe z KSeF, raporty i paczka ZIP do księgowania",
      "Notatki przy fakturach zamiast wątków mailowych", // VERIFY
    ],
    modules: ["KSeF", "Raporty", "Fakturowanie"],
    image: "/media/people/case-biuro.jpg",
    focusX: 0.7,
    imageAlt: "Portret właścicielki biura rachunkowego przy biurku",
    imagePrompt:
      "A Polish woman in her late 40s, owner of an accounting office, sitting at a tidy desk with two monitors " +
      "and neatly arranged binders in the background, reading glasses in hand, blazer over a light shirt, " +
      "modern small office interior. " +
      STYLE,
  },
  {
    id: "produkcja",
    segment: "Produkcja",
    persona: { name: "Tomasz", role: "dyrektor operacyjny" },
    company: "Producent lodów rzemieślniczych z siecią odbiorców w całym kraju",
    plan: "Enterprise",
    title: "Od zamówienia hurtowni do partii w mroźni",
    story:
      "Wytwórnia lodów prowadzi w Biuromacie zamówienia od sklepów i hurtowni, produkcję z recepturami i magazyn wyrobów gotowych. W planie Enterprise doszły dedykowane integracje i automatyzacje pod ich procesy.",
    points: [
      "Zamówienia ze statusami „do produkcji” i „do zamówienia”",
      "Partie produkcyjne, terminy przydatności i dokumenty RW/PW",
      "Dedykowane integracje i automatyzacje w planie Enterprise", // VERIFY: zakres
    ],
    modules: ["Zamówienia", "Produkcja", "Magazyn", "Fakturowanie"],
    image: "/media/people/case-produkcja.jpg",
    focusX: 0.7,
    imageAlt: "Portret dyrektora operacyjnego w hali produkcyjnej wytwórni lodów",
    imagePrompt:
      "A Polish man in his early 40s, operations director of an artisanal ice cream factory, standing in a clean " +
      "stainless-steel production hall with blurred ice cream production equipment and cold storage door behind him, " +
      "wearing a navy work jacket over a shirt, holding a tablet. " +
      STYLE,
  },
  {
    id: "eksport",
    segment: "Sprzedaż zagraniczna",
    persona: { name: "Anna", role: "specjalistka ds. eksportu" },
    company: "Producent mebli sprzedający do Niemiec i Czech",
    plan: "Premium",
    title: "Zamówienia i faktury dla klientów z zagranicy",
    story:
      "Firma Anny przyjmuje zamówienia od odbiorców z Niemiec i Czech. Faktury wystawia w walucie klienta i w jego języku, z właściwym typem dokumentu dla dostaw wewnątrzwspólnotowych. Kurs waluty pobiera się automatycznie.",
    points: [
      "Faktury w EUR i innych walutach z automatycznym kursem", // VERIFY: automatyczne kursy (NBP?)
      "Faktury WDT dla dostaw do krajów UE",
      "Dokumenty w języku kontrahenta", // VERIFY: obsługiwane języki
    ],
    modules: ["Zamówienia", "Fakturowanie"],
    image: "/media/people/case-eksport.jpg",
    focusX: 0.72,
    imageAlt: "Portret specjalistki ds. eksportu w showroomie meblowym",
    imagePrompt:
      "A Polish woman in her mid 30s, export specialist at a furniture manufacturer, standing in a modern furniture " +
      "showroom with wooden chairs and fabric samples softly blurred behind her, holding a laptop, " +
      "smart casual outfit in navy tones. " +
      STYLE,
  },
];
