import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { company, legalLinks, mainNav, seo, siteConfig } from "@/content/site";

// Stopka: tylko istniejące miejsca — sekcje strony głównej, kontakt i dokumenty prawne.
// Jasna, „schowana” pod treścią: sticky na dole ekranu pod <main> (z-10), więc odsłania się,
// gdy ostatnia sekcja odjeżdża w górę. -mt/pt = stopka wchodzi pod zaokrąglony dół ostatniej sekcji.
// Tylko gdy ekran jest wyższy od stopki (+ nagłówek) — inaczej jej górna część byłaby
// nieosiągalna. Wysokość stopki: ~690 px na telefonie, ~490 px od md. Progi niżej.
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="light -mt-10 bg-background pt-10 text-sm text-muted-foreground sm:-mt-14 sm:pt-14 [@media(min-height:46rem)]:sticky [@media(min-height:46rem)]:bottom-0 md:[@media(min-height:34rem)]:sticky md:[@media(min-height:34rem)]:bottom-0">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
        <div className="col-span-2 max-w-sm md:col-span-1">
          <Link href="/" aria-label="Biuromat — strona główna" className="inline-block text-foreground">
            <Logo className="h-6" />
          </Link>
          <p className="mt-4 leading-relaxed">{siteConfig.description}</p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 text-foreground hover:text-link"
              >
                <Phone className="size-4 text-link" aria-hidden />
                {company.phone}
                <span className="text-muted-foreground">· {company.supportHours}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 text-foreground hover:text-link">
                <Mail className="size-4 text-link" aria-hidden />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-link" aria-hidden />
              {company.address}
            </li>
          </ul>
        </div>

        <nav aria-label="Na stronie">
          <p className="font-semibold text-foreground">Na stronie</p>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Dokumenty">
          <p className="font-semibold text-foreground">Dokumenty</p>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs">
          <p>© {year} Biuromat. Wszelkie prawa zastrzeżone.</p>
          <ul className="flex items-center gap-5">
            {seo.sameAs.map((href) => (
              <li key={href}>
                <a href={href} rel="noopener" target="_blank" className="hover:text-foreground">
                  {href.includes("facebook") ? "Facebook" : "LinkedIn"}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
