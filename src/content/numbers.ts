// Pas z liczbami pod hero. Wartości liczbowe są animowane (odliczanie od 0).
// Klienci (500+) i lata doświadczenia (15+) — potwierdzone przez właściciela.
// VERIFY: „kilkadziesiąt tysięcy faktur” → wpisano bezpieczną dolną granicę (30 000+).

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

export const numbersSection = {
  srTitle: "Biuromat w liczbach",
  items: [
    { value: 500, suffix: "+", label: "klientów z całej Polski zaufało Biuromatowi" },
    { value: 30000, suffix: "+", label: "faktur zsynchronizowanych z KSeF" },
    { value: 15, suffix: "+", label: "lat doświadczenia w tworzeniu oprogramowania" },
  ] satisfies StatItem[],
};
