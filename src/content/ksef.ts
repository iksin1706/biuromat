// Sekcja KSeF: logo na górze, pod nim dwa niezależne tory — wysyłka (w górę do KSeF)
// i pobieranie (w dół z KSeF). Logo odtworzone typograficznie: components/brand/ksef-logo.tsx.
// Źródła funkcji: brief (lista faktur ze statusem KSeF, koszty z KSeF z Zatwierdź/Odrzuć,
// dane do płatności z kodem QR) + FAQ (numer KSeF).

export const ksefSection = {
  title: "Skoro KSeF jest obowiązkowy, niech będzie prosty",
  // Pytanie-zaczepka przed podtytułem (wyróżnione kolorem), podtytuł na nie odpowiada
  hook: "Drażni Cię wieloetapowe logowanie do nieintuicyjnej Aplikacji Podatnika KSeF?",
  subtitle: "W Biuromacie fakturę wysyłasz do KSeF jednym kliknięciem. Faktury od dostawców pobierasz tak samo.",
  tool: { label: "Darmowa wizualizacja pliku KSeF XML", href: "/ksef/wizualizacja/" },
  send: {
    title: "Wysyłka jednym kliknięciem",
    text: "Wystawiasz fakturę i klikasz „Wyślij do KSeF”. Biuromat przekazuje ją do systemu, a numer KSeF trafia do faktury.",
    points: ["Numer KSeF zapisany przy fakturze", "Status wysyłki na liście faktur"],
  },
  receive: {
    title: "Pobieranie jednym kliknięciem",
    text: "Klikasz „Pobierz z KSeF” i faktury od dostawców trafiają na listę kosztów w Biuromacie.",
    points: ["Zatwierdzasz albo odrzucasz fakturę na liście", "Dane do płatności z kodem QR", "Gotowe dokumenty dla księgowej"],
  },
};
