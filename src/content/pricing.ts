// Skrócony cennik na stronie głównej — z humorem, odsyła do pełnego cennika i konfiguratora Enterprise.
// Ceny pochodzą z `plans` w site.ts (jedno źródło prawdy).
import { plans } from "./site";

const free = plans.find((p) => p.id === "free")!;
const premium = plans.find((p) => p.id === "premium")!;

export const pricingSection = {
  title: "Jedyna uczciwa cena? Za darmo.",
  subtitle: `Na start dostajesz ${free.note} za 0 zł. Bez karty płatniczej i bez czytania drobnego druku.`,
  priceNote: "netto. Brutto zresztą też.",
  // Animacja: cena „spada” z tej kwoty do zera, gdy sekcja wejdzie w widok
  priceFrom: 199,
  fullPricing: { label: "Zobacz pełny cennik", href: "/cennik/" },
  tiers: [
    {
      id: "premium",
      name: premium.name,
      price: `${premium.priceMonthly} zł`,
      unit: "netto / mies.",
      text: `Gdy 10 faktur to za mało. Mniej niż kawa na mieście, a rocznie ${premium.priceYearly} zł.`,
      link: { label: "Porównaj plany", href: "/cennik/" },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Pod Twoją firmę",
      unit: "wycena indywidualna",
      // VERIFY: zakres Enterprise (integracje, automatyzacje, wdrożenie)
      text: "Dedykowane integracje i automatyzacje. Wybierz, czego potrzebujesz, a przygotujemy ofertę.",
      link: { label: "Skonfiguruj plan Enterprise", href: "/cennik/enterprise/" }, // TODO: adres konfiguratora
    },
  ],
};
