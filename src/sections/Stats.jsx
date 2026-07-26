import { useCountUp } from "@/hooks/useScrollAnimations";
import { useTilt } from "@/hooks/useMagnetic";
import { useIsCompact, useReducedMotion } from "@/hooks/useReducedMotion";
import { stats } from "@/data/stats";

function StatCard({ stat, index, interactive }) {
  const numberRef = useCountUp(stat.value);
  const tiltRef = useTilt(9, interactive);

  return (
    <div
      ref={tiltRef}
      className="card-3d group relative rounded-sm border border-border bg-card/60 p-8 text-center animate-float-soft hover:shadow-[var(--glow-gold)]"
      style={{ animationDelay: `-${index * 1.6}s`, animationDuration: `${7 + index}s` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,oklch(0.765_0.128_86.5_/_0.14),transparent_70%)]" />
      <p className="font-display text-5xl tracking-tight text-gold-gradient">
        <span ref={numberRef}>0</span>
        {stat.suffix}
      </p>
      <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}

/** Floating stat cards with numbers that count up on entry. */
export default function Stats() {
  const compact = useIsCompact();
  const reduced = useReducedMotion();

  return (
    <section id="stats" className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={index}
            interactive={!compact && !reduced}
          />
        ))}
      </div>
    </section>
  );
}