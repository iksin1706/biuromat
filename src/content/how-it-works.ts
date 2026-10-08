// Sekcja „Jak to działa” — 3 kroki z nagraniami widoku mobilnego.
//
// Nagrania wrzuć do public/media/video/ pod nazwami z `video` i `poster` poniżej.
// Specyfikacja: nagranie ekranu telefonu (pionowo, ~390×844 lub 2× 780×1688), 8–20 s,
// MP4 (H.264), bez dźwięku, bez danych osobowych. Poster = pierwsza klatka (JPG/WebP).
// Dopóki pliku nie ma, w telefonie wyświetla się placeholder (sprawdzane przy buildzie).

export type HowStep = {
  id: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
  video: string;
  poster: string;
  /** Czas kroku w sekundach, gdy nagrania jeszcze nie ma (placeholder). */
  fallbackDuration: number;
};

export const howItWorks = {
  title: "Od rejestracji do faktury w KSeF w trzech krokach",
  subtitle: "Wszystko działa w przeglądarce, także na telefonie. Zobacz, jak to wygląda.",
  steps: [
    {
      id: "rejestracja",
      title: "Rejestracja",
      text: "Zakładasz konto adresem e-mail. Dane firmy uzupełniasz po numerze NIP, pobierają się z GUS.",
      video: "/media/video/krok-1-rejestracja.mp4",
      poster: "/media/video/krok-1-rejestracja.jpg",
      fallbackDuration: 6,
    },
    {
      id: "ksef",
      title: "Integracja z KSeF",
      text: "Generujesz certyfikat w KSeF i wgrywasz go w ustawieniach firmy. Przechowujemy go w postaci zaszyfrowanej.",
      link: { label: "Jak uzyskać certyfikat KSeF", href: "/ksef/jak-uruchomic/" },
      video: "/media/video/krok-2-ksef.mp4",
      poster: "/media/video/krok-2-ksef.jpg",
      fallbackDuration: 6,
    },
    {
      id: "faktura",
      title: "Faktura z wysyłką do KSeF",
      text: "Wybierasz kontrahenta, dodajesz pozycje i klikasz „Wyślij do KSeF”. Numer KSeF pojawia się przy fakturze.",
      video: "/media/video/krok-3-faktura.mp4",
      poster: "/media/video/krok-3-faktura.jpg",
      fallbackDuration: 6,
    },
  ] satisfies HowStep[],
};
