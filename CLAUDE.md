@AGENTS.md

# Biuromat — landing page

Stack: Next.js 16 (App Router), Tailwind CSS v4, Motion (`motion/react`), GSAP + `@gsap/react`.

- System wizualny, paleta i zasady ruchu: [DESIGN.md](DESIGN.md). Trzymaj się go przy każdej sekcji.
- Sekcje strony głównej powstają po kolei w `src/components/sections/home/`; kolejność i tło w `src/content/home.ts`.
- Copy po polsku, w `src/content/`. Tylko prawdziwe dane o Biuromacie; makiety z fikcyjnymi danymi („Przykładowa Piekarnia Sp. z o.o.”). Nie wymyślaj opinii klientów.
- SEO i AI: [SEO.md](SEO.md). Nowa podstrona = wpis w `src/app/sitemap.ts`; treść ważna dla SEO musi być w HTML z serwera (bez JS).
- Jeden główny CTA: `primaryCta` z `src/content/site.ts`.
- GSAP importuj z `@/lib/gsap`, w komponentach używaj `useGSAP` (sprzątanie) i `gsap.matchMedia()` dla reduced motion.
- Komponenty z 21st.dev / shadcn trafiają do `src/components/ui/` i używają tokenów semantycznych z `globals.css`. Po dodaniu dopasuj je do DESIGN.md.
- Skille projektu (.claude/skills): `apple-design-system` (nadrzędny dla wyglądu), `frontend-design` (proces i copy), `gsap-scrolltrigger`, `motion-framer`.
- Paleta: ciemny granat + jeden niebieski akcent. Bez cieni na UI, bez `font-medium`, przyciski `rounded-lg`, chipy `rounded-pill`, główny kolor #203a8f.
