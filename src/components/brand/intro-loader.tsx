import { LOGO_TEXT_PATHS, LOGO_VIEWBOX } from "./logo-paths";

/** Koniec intro w sekundach (zgodny z animacjami .intro-* w globals.css) — hero startuje po nim. */
export const INTRO_END = 2.3;

/**
 * Spinacz z logo jako JEDNA linia: oś drutu znaku LOGO_MARK_PATH. W układzie obróconym o −45°
 * drut to proste odcinki i łuki o wspólnych środkach (u=224 / 244.6), grubość 26.41
 * (= 18.678·√2). Rysowany z transform="rotate(45)" kreską tej grubości daje dokładnie znak z logo.
 * Kolejność: koniec zewnętrzny → duża pętla → dolna pętla → środkowa pętla → koniec wewnętrzny.
 */
const MARK_LINE =
  "M141.4 117.2V-88.6A82.55 82.55 0 0 1 306.55 -88.6V138.4A61.9 61.9 0 0 1 182.7 138.4" +
  "V-88.6A41.25 41.25 0 0 1 265.25 -88.6V117.2";

// Raz na sesję: przy kolejnych wejściach klasa `intro-seen` ukrywa nakładkę, zanim się narysuje.
const once = `try{var k="bm-intro";if(sessionStorage.getItem(k))document.documentElement.classList.add("intro-seen");else sessionStorage.setItem(k,"1")}catch(e){}`;

/**
 * Intro: spinacz rysuje się jedną linią (dasharray z dużą przerwą + animowany dashoffset),
 * potem logo przesuwa się w lewo, a napis „biuromat” wysuwa się zza spinacza; nakładka znika.
 * Sam CSS — kończy się także bez JS. SEO: nakładka jest aria-hidden i bez treści,
 * cała strona leży pod nią w HTML.
 */
export function IntroLoader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: once }} />
      <div aria-hidden className="intro-overlay">
        <svg viewBox={LOGO_VIEWBOX} className="intro-logo" style={{ fillRule: "evenodd" }}>
          <defs>
            {/* Napis widoczny tylko na prawo od spinacza — „wyjeżdża” spod niego */}
            <clipPath id="intro-text-clip">
              <rect x="334" y="-40" width="1200" height="430" />
            </clipPath>
          </defs>
          <g clipPath="url(#intro-text-clip)">
            <g className="intro-text">
              {LOGO_TEXT_PATHS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </g>
          <path className="intro-mark" d={MARK_LINE} transform="rotate(45)" pathLength={1} />
        </svg>
      </div>
    </>
  );
}
