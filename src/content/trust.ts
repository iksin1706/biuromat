// Pasek zaufania — tylko sprawdzalne fakty. Bez nazw dostawców infrastruktury.
// Źródła: FAQ Biuromatu (TLS, serwery w UE, szyfrowane certyfikaty KSeF), dane firmy z biuromat.pl.
// Miejsce na licznik użytkowników — dodać, gdy będzie czym się pochwalić.
import { company } from "./site";

export type TrustFact = {
  icon: "ksef" | "eu" | "company" | "support";
  title: string;
  text: string;
};

export const trustFacts: TrustFact[] = [
  {
    icon: "ksef",
    title: "Zintegrowany z KSeF",
    text: "Wysyłka i pobieranie faktur prosto z programu.",
  },
  {
    icon: "eu",
    title: "Dane w Unii Europejskiej",
    text: "Serwery w UE, połączenia szyfrowane, certyfikaty KSeF zaszyfrowane.",
  },
  {
    icon: "company",
    title: "Polska firma",
    text: "Siedziba w Rzeszowie. Przetwarzanie danych na podstawie regulaminu powierzenia.",
  },
  {
    icon: "support",
    title: `Wsparcie ${company.supportHours}`,
    text: "Zadzwoń lub napisz:",
  },
];
