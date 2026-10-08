# Biuromat — system wizualny landing page

Podgląd na żywo: `npm run dev` → http://localhost:3000/styleguide

## Kierunek: język Apple w ciemnym granacie

Bazą jest skill `apple-design-system` (.claude/skills): jeden akcent, przyciski w kształcie
pigułki, brak cieni na elementach interfejsu, drabina wag 400/600/700, podział sekcji zmianą
powierzchni. Neutralne szarości Apple zastąpiliśmy **ciemnym granatem**, a „Action Blue”
**niebieskim Biuromatu**. Strona jest ciemna domyślnie; jasne kafle pojawiają się tam, gdzie
liczy się czytelność detali (zrzuty, cennik, FAQ).

Gdy `frontend-design` i `apple-design-system` są sprzeczne (np. krój, cienie), wygrywa
**apple-design-system**. Z `frontend-design` bierzemy proces (plan → krytyka → kod), zasady
pisania copy i „jeden zapamiętywalny moment”.

**Jeden zapamiętywalny moment:** faktura w hero na laptopie, która przy załadowaniu strony
dostaje potwierdzenie „Wysłano do KSeF ✓” i numer KSeF (jedna sekwencja GSAP).

## Kolory

| Nazwa | Hex | Token | Rola |
|---|---|---|---|
| Noc | `#07101F` | `navy-950` / `background` | tło bazowe (sekcje `night`) |
| Kafel | `#0D1A2E` | `navy-900` | sekcje `tile`, karty na `night` |
| Kafel 2 | `#16253E` | `navy-800` | karty na `tile`, `muted` |
| Biuromat | `#203A8F` | `blue-600` / `primary` | główny kolor marki, CTA (biały tekst 11:1) |
| Link | `#8EA6EA` | `blue-300` / `link` | linki i aktywne stany na granacie |
| Jasny kafel | `#F3F6FB` | `.light` → `background` | sekcje `light`; tekst `navy-950` |
| Hairline | `rgb(255 255 255 / .09)` / `#DDE4EE` | `border` | jedyny rodzaj obramowania (1px) |

Statusy, tylko do oznaczania stanu: `success` (KSeF ✓, statusy OK), `warning` (niski stan),
`danger` (odrzucono). W kaflu `.light` automatycznie przechodzą na ciemniejsze, kontrastowe
odcienie.

Zasady:
- **Jeden akcent.** Wszystko, co klikalne lub aktywne, jest niebieskie. Nie ma drugiego koloru marki.
- **Bez gradientów i cieni** na kartach, przyciskach i tekście. Jedyny cień to `shadow-product`
  pod urządzeniami i zrzutami w hero.
- **Podział sekcji zmianą powierzchni** `night → tile → light`. Rytm ustala `tone` w
  [src/content/home.ts](src/content/home.ts). Komponent `Section` nakłada klasę zakresu
  (`night`/`tile`/`light`), więc tokeny semantyczne same się przełączają.
- Tokeny mają nazwy jak w shadcn (`primary`, `muted-foreground`, `border`...), więc komponenty
  z 21st.dev przejmują paletę bez zmian. Po wklejeniu: usunąć cienie, zamienić `font-medium`
  na `font-semibold`, przyciski na `rounded-pill`.

## Typografia

- Stos: **SF Pro** na urządzeniach Apple (`-apple-system`), **Inter** (400/600/700, latin-ext)
  wszędzie indziej. Monospace systemowy tylko dla numerów KSeF/NIP.
- **Wagi: 400 tekst · 600 wyróżnienia i etykiety · 700 nagłówki. 500 (`font-medium`) zakazane.**
- Skala: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body` (17px).
  Duże nagłówki z ciasnym trackingiem (zawarte w tokenach).
- Kwoty i numery: utility `tabular`. Linia ≤ 65ch. Zdania w sentence case.

## Kształty

`rounded-sm` 6 · `rounded-md` 10 · `rounded-lg` 14 (karty) · `rounded-xl` 20 · `rounded-2xl` 28
(kafle) · `rounded-pill` (chipy, statusy). Przyciski: `rounded-lg` (14 px). Bez wartości pośrednich. Obramowanie:
utility `hairline` (1px); 2px tylko dla zaznaczonej opcji.

## Ruch

- Cichy: 150–240 ms, `ease-apple`, bez odbić. Wciśnięcie przycisku: `scale(0.95)`.
- **GSAP + ScrollTrigger** (`@/lib/gsap`): sekwencja hero, schemat KSeF rysowany przy
  przewijaniu, ewentualnie przypięta sekcja Produkcji.
- **Motion** (`motion/react`): zakładki modułów (`layoutId`), akordeon FAQ, przełącznik
  cennika, menu mobilne.
- Bez fade-up na każdej sekcji. Zawsze `prefers-reduced-motion` (MotionConfig + `gsap.matchMedia()`).

## Struktura

```
src/
  app/              layout (fonty, metadane), page (kompozycja sekcji), styleguide
  components/
    layout/         site-header, site-footer
    sections/home/  jeden plik = jedna sekcja strony głównej
    ui/             prymitywy (button, container, section) + komponenty z 21st.dev
    providers/      MotionProvider
    motion/         współdzielone komponenty animacji
  content/          treści i dane (site.ts, home.ts): copy poza JSX
  lib/              utils (cn), gsap (rejestracja pluginów)
public/media/       screens/ video/ photos/ illustrations/   og/
```

Obrazy: WebP/AVIF, zawsze `width`/`height`, `priority` tylko w hero, reszta lazy.
Zrzuty ekranu aplikacji: wersje w ciemnym motywie dla sekcji `night`/`tile`, w jasnym dla `light`.

## Zrzuty ekranu i KSeF w hero

- Interfejs aplikacji pokazujemy **wyłącznie prawdziwymi zrzutami** (`src/assets/screens/`), nie
  odtwarzamy go w kodzie, bo UI się zmienia. Podmiana = nowy plik o tej samej nazwie
  (małe litery w rozszerzeniu — `.JPG` psuje Turbopack). Przed wgraniem usuń dane osobowe
  (e-mail, nazwa firmy) i baner „Środowisko demonstracyjne”. Najlepiej zrzuty w 2×.
- Animacja KSeF to **niezależna karta** (`components/ksef/ksef-status-card.tsx`) nałożona na
  zrzuty — nie zależy od wyglądu aplikacji.
- Logo: `components/brand/logo.tsx` (ścieżki z `public/brand/biuromat-logo.svg`); napis
  w `currentColor`, spinacz w tokenie `--logo-mark`.
- Przycisk główny: klasa `.btn-primary` (globals.css) — gradient, jasna krawędź, poświata,
  odblask przy najechaniu. Świadome odstępstwo od „bez cieni” ze skilla Apple, na życzenie.
