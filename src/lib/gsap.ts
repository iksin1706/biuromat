"use client";

// Jedno miejsce rejestracji pluginów GSAP. Importuj gsap/ScrollTrigger/useGSAP stąd,
// nie bezpośrednio z paczek — wtedy pluginy są zawsze zarejestrowane.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
