import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Runs a GSAP setup function inside a scoped context, cleaned up on unmount.
 * setup receives (element, gsapInstance).
 */
export function useScrollAnimations(setup, deps = []) {
  const scope = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = scope.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => setup(el, gsap), el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);

  return scope;
}

/** Simple fade-up reveal for every [data-reveal] child of the scope. */
export function useRevealChildren(selector = "[data-reveal]") {
  return useScrollAnimations((el, g) => {
    const items = el.querySelectorAll(selector);
    items.forEach((item, index) => {
      g.fromTo(
        item,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          delay: (index % 4) * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 90%" },
        },
      );
    });
  });
}

/** Count a number up when it scrolls into view. */
export function useCountUp(target, duration = 2) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = String(target);
      return;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(counter.value).toLocaleString("en-US");
        },
      });
    }, el);
    return () => ctx.revert();
  }, [target, duration, reduced]);

  return ref;
}