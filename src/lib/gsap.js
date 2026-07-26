import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Single registration point for GSAP plugins (client only).
if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };