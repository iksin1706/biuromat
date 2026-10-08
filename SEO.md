# SEO i widoczność w AI

## Co jest wdrożone

| Element | Plik |
|---|---|
| Tytuł, opis, canonical, Open Graph, Twitter, robots meta | `src/app/layout.tsx`, teksty w `seo` w `src/content/site.ts` |
| Obraz udostępniania 1200×630 | `src/app/opengraph-image.png` + `.alt.txt` |
| `robots.txt` (wszystkie boty, w tym AI, wpuszczone) | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts`: **każdą nową podstronę dopisz tutaj** |
| JSON-LD: Organization, WebSite, WebPage, SoftwareApplication (ceny), FAQPage | `src/lib/structured-data.ts` |
| Sekcja FAQ (treść w HTML, `<details>`) | `src/content/faq.ts`, `src/components/sections/home/faq.tsx` |
| `llms.txt` (wizytówka dla modeli AI) | `public/llms.txt`: **aktualizuj przy zmianie cen i funkcji** |
| 301 ze starych podstron WordPressa | `redirects()` w `next.config.ts` |
| `trailingSlash: true` (adresy jak w WordPressie) | `next.config.ts` |

Zasada: treść ważna dla wyszukiwarek musi być w HTML z serwera. Crawlery AI (GPTBot,
ClaudeBot, PerplexityBot) nie wykonują JS. Zakładki renderują wszystkie panele (nieaktywne
z `hidden`), FAQ działa na `<details>`. Wyjątek: chipy w sekcji Moduły (wizualizacja). Ich
treść jest w FAQ, JSON-LD `featureList` i `llms.txt`.

## Migracja z WordPressa: adresy, które muszą działać

Obecna strona ma zaindeksowane adresy. Przy przełączeniu domeny na tę aplikację każdy z nich
musi działać pod tym samym URL albo dostać 301 na odpowiednik. Inaczej spadają pozycje.

- Przekierowane: `/poznaj-biuromat/`, `/dlaczego-warto/`, `/funkcjonalnosci/`
- **Do zachowania** (nie ma ich w tej aplikacji):
  - `/faq/` (pełne FAQ, linkowane z sekcji FAQ na stronie głównej)
  - `/cennik/`, `/kontakt/`, `/ksef/wizualizacja/` (narzędzie, wartościowe dla SEO)
  - `/regulamin/`, `/polityka-prywatnosci/`, `/regulamin-powierzenia/`, `/polityka-plikow-cookies/`
  - blog: `/aktualnosci/`, ~35 wpisów pod `/<slug>/`, kategorie `/category/aktualnosci/…/`
    (lista: https://biuromat.pl/post-sitemap.xml)

## Linki wewnętrzne do stron, których jeszcze nie ma (404)

`/funkcje/`, `/funkcje/faktury-vat/`, `/funkcje/zamowienia/`, `/funkcje/magazyn/`,
`/funkcje/produkcja/`, `/dla-kogo/biura-rachunkowe/`, `/ksef/jak-uruchomic/`,
`/cennik/enterprise/`. Zbuduj je albo podmień linki przed publikacją.

## Kolejne kroki (największy zysk)

1. Podstrony pod frazy, na które konkurencja ma osobne strony: „program do KSeF”,
   „program magazynowy z fakturowaniem”, „program do produkcji”, „faktura proforma/WDT/korekta”,
   „program dla biura rachunkowego”, „darmowy program do faktur”.
2. Blog: poradniki KSeF (jak wysłać fakturę, jak wygenerować certyfikat KSeF, kary 2027). To one zbierają
   ruch i cytowania w odpowiedziach AI.
3. Opinie: profil Firmy w Google + prawdziwe recenzje → potem `AggregateRating` w JSON-LD.
4. Nowe profile firmy (np. YouTube) dopisz do `seo.sameAs` w `site.ts`.
