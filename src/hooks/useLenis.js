import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Smooth scrolling wired into GSAP ScrollTrigger. */
export function useLenis() {
  const lenisRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let lenis;
    let cancelled = false;

    const onFrame = (time) => {
      lenis?.raf(time * 1000);
    };

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.45,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.4,
      });
      lenisRef.current = lenis;
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onFrame);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(onFrame);
      lenis?.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, [reduced]);

  return lenisRef;
}

/** Scroll to a section id through Lenis when available. */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = typeof window !== "undefined" ? window.__lenis : null;
  if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.4 });
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
}