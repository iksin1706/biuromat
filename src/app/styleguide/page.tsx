import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const scales = [
  { name: "Granat", token: "navy", role: "Powierzchnie, tekst, hairline" },
  { name: "Niebieski", token: "blue", role: "Jedyny akcent: CTA, linki, aktywne stany, focus" },
];

const core = [
  { name: "Noc", value: "#07101F", cls: "bg-navy-950", note: "tło bazowe strony (night)" },
  { name: "Kafel", value: "#0D1A2E", cls: "bg-navy-900", note: "sekcja o krok jaśniejsza (tile)" },
  { name: "Kafel 2", value: "#16253E", cls: "bg-navy-800", note: "karty na kaflu" },
  { name: "Biuromat", value: "#203A8F", cls: "bg-blue-600", note: "główny kolor, CTA (biały 11:1)" },
  { name: "Link", value: "#8EA6EA", cls: "bg-blue-300", note: "linki na granacie (~7:1)" },
  { name: "Jasny kafel", value: "#F3F6FB", cls: "bg-[#f3f6fb]", note: "sekcje light, zrzuty" },
];

const status = [
  { name: "Sukces", value: "#30D158", cls: "bg-success", note: "KSeF ✓, statusy OK" },
  { name: "Ostrzeżenie", value: "#FF9F0A", cls: "bg-warning", note: "niski stan" },
  { name: "Błąd", value: "#FF453A", cls: "bg-danger", note: "odrzucono" },
];

function Swatch({ name, value, cls, note }: (typeof core)[number]) {
  return (
    <li className="overflow-hidden rounded-lg hairline bg-card">
      <div className={`h-20 ${cls}`} />
      <div className="p-4">
        <p className="font-semibold">{name}</p>
        <p className="tabular text-sm text-muted-foreground">
          {value} · {note}
        </p>
      </div>
    </li>
  );
}

function InvoiceCard() {
  return (
    <div className="rounded-xl hairline bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Faktura VAT</p>
          <p className="tabular text-h3 font-bold">FV/2026/10/014</p>
          <p className="mt-1 text-sm">Przykładowa Piekarnia Sp. z o.o.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-muted px-2.5 py-0.5 text-sm font-semibold text-success">
          Wysłano do KSeF ✓
        </span>
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-4 border-t pt-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Netto</dt>
          <dd className="tabular font-semibold">1 240,00 zł</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">VAT 23%</dt>
          <dd className="tabular font-semibold">285,20 zł</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Brutto</dt>
          <dd className="tabular font-bold">1 525,20 zł</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-pill bg-primary px-2.5 py-0.5 font-semibold text-primary-foreground">
          Partia P-2610-03
        </span>
        <span className="rounded-pill bg-muted px-2.5 py-0.5 font-semibold text-warning">
          Niski stan: mąka typ 650
        </span>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section tone="night" className="pb-12 sm:pb-16 lg:pb-20">
        <Container className="space-y-16">
          <header>
            <h1 className="text-display">Granat i jeden niebieski.</h1>
            <p className="mt-6 max-w-[56ch] text-lead text-muted-foreground">
              Język Apple w barwach Biuromatu: ciemny granat zamiast szarości, jeden niebieski akcent, przyciski w
              kształcie pigułki, bez cieni. Sekcje dzieli zmiana powierzchni.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg">Załóż darmowe konto</Button>
              <Button size="lg" variant="secondary">
                Zobacz, jak to działa
              </Button>
              <Button variant="link">Pełny cennik</Button>
            </div>
          </header>

          <div>
            <h2 className="text-h2">Kolory bazowe</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {core.map((c) => (
                <Swatch key={c.name} {...c} />
              ))}
            </ul>
            <h3 className="mt-12 text-h3">Statusy (tylko stan, nigdy dekoracja)</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {status.map((c) => (
                <Swatch key={c.name} {...c} />
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-h2">Skale</h2>
            {scales.map((s) => (
              <div key={s.token}>
                <p className="font-semibold">
                  {s.name} <span className="font-normal text-muted-foreground">({s.token}) · {s.role}</span>
                </p>
                <div className="mt-3 flex overflow-hidden rounded-md">
                  {steps.map((step) => (
                    <div
                      key={step}
                      className="tabular flex h-16 flex-1 items-end p-1.5 text-[0.6875rem]"
                      style={{
                        background: `var(--color-${s.token}-${step})`,
                        color: Number(step) >= 500 ? "#fff" : "var(--color-navy-950)",
                      }}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="tile">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">Kafel „tile” · typografia</p>
            <p className="text-h1 font-bold">Faktury bez przepisywania</p>
            <p className="text-h2 font-bold">Program do faktur online z KSeF</p>
            <p className="text-h3 font-bold">Produkcja i identyfikowalność partii</p>
            <p className="max-w-[56ch] text-lead text-muted-foreground">
              Lead 400. Faktury, magazyn i produkcja w jednym miejscu. Zażółć gęślą jaźń.
            </p>
            <p className="max-w-[65ch]">
              Body 17/400. Wystaw fakturę, wyślij ją do KSeF bez wychodzenia z programu.{" "}
              <span className="font-semibold">Wyróżnienie 600.</span> Ąę Óó Śś Łł Żż Źź Ćć Ńń.
            </p>
            <p className="font-mono text-sm text-muted-foreground">5260250274-20261003-0A1B2C3D4E5F-7G</p>
          </div>
          <InvoiceCard />
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Kafel „light”</p>
            <h2 className="mt-3 text-h2">Jasne kafle dla zrzutów i cennika.</h2>
            <p className="mt-4 max-w-[56ch] text-muted-foreground">
              Ten sam niebieski akcent, tekst w granacie zamiast czerni. Używane tam, gdzie liczy się czytelność
              detali.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>Załóż darmowe konto</Button>
              <Button variant="secondary">Zobacz, jak to działa</Button>
            </div>
          </div>
          <InvoiceCard />
        </Container>
      </Section>
    </>
  );
}
