// Końcowe CTA — spokojne zaproszenie, bez presji czasu.
// Grafika: public/media/cta/paperclip.jpg — render 3D spinacza z logo.
// Dopóki pliku nie ma, po prawej jest znak spinacza z logo (SVG) z gradientem.
import { company } from "./site";

export const ctaSection = {
  title: "Wystaw pierwszą fakturę jeszcze dziś",
  text: "Konto zakładasz w minutę, a dane firmy uzupełnimy za Ciebie po numerze NIP. Na start płacisz 0 zł.",
  points: ["Bez karty płatniczej", "10 faktur miesięcznie za 0 zł", `Pomoc ${company.supportHours}`],
  talk: { label: "Wolisz najpierw porozmawiać?", phone: company.phone },
  image: "/media/cta/paperclip.jpg",
};
