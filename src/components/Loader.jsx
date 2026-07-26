import { useEffect, useState } from "react";
import { PHOTOGRAPHER } from "@/lib/constants";

/** Calm loader: counts to 100, then the veil fades and lifts away. */
export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let value = 0;
    const tick = setInterval(() => {
      value = Math.min(100, value + Math.random() * 12 + 7);
      setProgress(Math.round(value));
      if (value >= 100) {
        clearInterval(tick);
        setTimeout(() => setOpening(true), 180);
        setTimeout(() => {
          setGone(true);
          onDone?.();
        }, 1200);
      }
    }, 95);
    return () => clearInterval(tick);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-background transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        opening ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Soft light pool */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,oklch(0.687_0.061_138_/_0.10),transparent_65%)]" />

      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-700 ${
          opening ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/40">
          <div className="absolute inset-3 rounded-full border border-gold/20" />
          <div className="h-2 w-2 rounded-full bg-gold shadow-[var(--glow-gold)]" />
        </div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
          {PHOTOGRAPHER.name}
        </p>
        <div className="h-px w-56 overflow-hidden bg-border">
          <div
            className="h-full bg-gold transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-gold">
          {String(progress).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}