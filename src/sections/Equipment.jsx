import { useTilt } from "@/hooks/useMagnetic";
import { useRevealChildren } from "@/hooks/useScrollAnimations";
import { useIsCompact, useReducedMotion } from "@/hooks/useReducedMotion";
import { equipment } from "@/data/equipment";

function GearCard({ item, interactive }) {
  const tiltRef = useTilt(11, interactive);

  return (
    <article data-reveal className="[perspective:1200px]">
      <div
        ref={tiltRef}
        className="card-3d group relative overflow-hidden rounded-sm border border-border bg-card"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            alt={`${item.name} — ${item.model}`}
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:rotate-[6deg] group-hover:scale-110"
          />
          {/* Lens glow */}
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_60%,oklch(0.765_0.128_86.5_/_0.3),transparent_55%)]" />
        </div>

        <div className="relative p-6">
          <h3 className="font-display text-xl tracking-tight">{item.name}</h3>
          <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
            {item.model}
          </p>

          <ul className="mt-4 max-h-0 space-y-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-48 group-hover:opacity-100">
            {item.specs.map((spec) => (
              <li key={spec} className="text-xs text-muted-foreground">
                · {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/** 3D gear cards; lens glows and specs slide up on hover. */
export default function Equipment() {
  const compact = useIsCompact();
  const reduced = useReducedMotion();
  const scope = useRevealChildren();

  return (
    <section id="equipment" ref={scope} className="relative bg-surface py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
            Equipment
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] tracking-tight">
            The tools, kept boring on purpose
          </h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipment.map((item) => (
            <GearCard key={item.name} item={item} interactive={!compact && !reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}