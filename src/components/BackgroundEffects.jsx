import { useMemo } from "react";
import { usePointerParallax } from "@/hooks/useCursor";
import { useIsCompact, useHydrated } from "@/hooks/useReducedMotion";

/** Film grain, drifting blobs, particles, lens flare and mouse spotlight. */
export default function BackgroundEffects() {
  const compact = useIsCompact();
  const hydrated = useHydrated();
  const pointer = usePointerParallax(!compact);

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 1 + (i % 3),
        delay: (i % 9) * 0.7,
        duration: 7 + (i % 6),
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 noise-veil" />

      {/* Dynamic gradient blobs */}
      <div className="absolute -left-32 top-[10vh] h-[46vw] w-[46vw] rounded-full bg-sage/[0.13] blur-[140px] animate-blob" />
      <div
        className="absolute -right-40 top-[55vh] h-[42vw] w-[42vw] rounded-full bg-clay/[0.12] blur-[150px] animate-blob"
        style={{ animationDelay: "-9s" }}
      />

      {/* Warm light pool */}
      <div className="absolute left-[12%] top-[18%] h-[30vw] w-[30vw] rounded-full bg-[radial-gradient(circle,oklch(0.784_0.098_55_/_0.22),transparent_64%)] blur-2xl" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-moss/25 animate-float-soft"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Mouse spotlight */}
      {hydrated && !compact && (
        <div
          className="absolute h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(circle,oklch(0.545_0.064_140_/_0.07),transparent_60%)] transition-transform duration-500 ease-out"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate3d(calc(-50% + ${pointer.x * 60}vw), calc(-50% + ${
              pointer.y * 60
            }vh), 0)`,
          }}
        />
      )}

      <div className="film-grain" />
    </div>
  );
}