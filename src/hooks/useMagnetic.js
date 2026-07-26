import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Attach to a button to make it drift toward the pointer. */
export function useMagnetic(strength = 0.35, enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, enabled]);

  return ref;
}

/** Tilt a card in 3D toward the pointer. */
export function useTilt(max = 12, enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: px * max * 2,
        rotateX: -py * max * 2,
        scale: 1.03,
        duration: 0.5,
        ease: "power3.out",
        transformPerspective: 900,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.8, ease: "power3.out" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [max, enabled]);

  return ref;
}