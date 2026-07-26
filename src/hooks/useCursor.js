import { useEffect, useState } from "react";

/** Tracks pointer position (px) and whether an interactive target is hovered. */
export function useCursor() {
  const [state, setState] = useState({ x: 0, y: 0, active: false, visible: false });

  useEffect(() => {
    const onMove = (event) => {
      const target = event.target;
      const active =
        target instanceof Element &&
        Boolean(target.closest("a, button, [data-cursor='hover']"));
      setState({ x: event.clientX, y: event.clientY, active, visible: true });
    };
    const onLeave = () => setState((prev) => ({ ...prev, visible: false }));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return state;
}

/** Normalised (-0.5..0.5) pointer position for parallax effects. */
export function usePointerParallax(enabled = true) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event) => {
      setPos({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  return pos;
}