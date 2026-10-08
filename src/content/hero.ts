// Treść hero.
// Zrzuty ekranu: src/assets/screens/ — przy zmianie interfejsu podmień pliki (te same nazwy),
// najlepiej w 2× rozdzielczości. Dane na zrzutach muszą być fikcyjne (bez e-maili, nazw firm klientów).

export const hero = {
  titleLines: ["Program do faktur online", "z KSeF – darmowy start"],
  subtitle: "Faktury, magazyn i produkcja w jednym miejscu. Pierwszą fakturę wystawisz w 30 sekund.",
  secondaryCta: { label: "Zobacz, jak to działa", href: "#jak-to-dziala" },
  screens: {
    desktop: { alt: "Lista faktur sprzedażowych w Biuromacie: numery, nabywcy, status płatności i wartość" },
    mobile: { alt: "Lista faktur w aplikacji Biuromat na telefonie" },
  },
} as const;

/**
 * Dane karty KSeF w animacji. Wyraźnie przykładowe: NIP 1234563218 (wzorzec 123456…),
 * kwota = 2 480,00 zł netto + 8% VAT.
 */
export const ksefDemo = {
  number: "FV/8/10/2026",
  buyer: "Hurtownia Spożywcza Kłos",
  gross: "2 678,40 zł",
  time: "09:41",
  ksef: "1234563218-20261003-3A9F21C47B0D-E4",
} as const;
