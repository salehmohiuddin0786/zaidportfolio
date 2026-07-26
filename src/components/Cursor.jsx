import { useCursor } from "@/hooks/useCursor";
import { useIsCompact, useHydrated } from "@/hooks/useReducedMotion";

/** Custom aperture cursor with a lagging ring. Desktop pointers only. */
export default function Cursor() {
  const { x, y, active, visible } = useCursor();
  const compact = useIsCompact();
  const hydrated = useHydrated();

  if (!hydrated || compact) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block" aria-hidden="true">
      <div
        className="absolute h-1.5 w-1.5 rounded-full bg-sage transition-opacity duration-300"
        style={{
          transform: `translate3d(${x - 3}px, ${y - 3}px, 0)`,
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        className="absolute rounded-full border border-sage/40 transition-[width,height,opacity,border-color] duration-300 ease-out"
        style={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          transform: `translate3d(${x - (active ? 28 : 15)}px, ${y - (active ? 28 : 15)}px, 0)`,
          opacity: visible ? 1 : 0,
          transitionProperty: "width, height, opacity, transform",
          transitionDuration: "260ms, 260ms, 300ms, 120ms",
        }}
      />
    </div>
  );
}