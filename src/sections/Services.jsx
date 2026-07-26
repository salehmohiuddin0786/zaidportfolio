import { Heart, Camera, Building2, Mountain, Film, Plane } from "lucide-react";
import { useRevealChildren } from "@/hooks/useScrollAnimations";
import { services } from "@/data/services";

const ICONS = { Heart, Camera, Building2, Mountain, Film, Plane };

/** Glassmorphism service cards with animated borders and rotating icons. */
export default function Services() {
  const scope = useRevealChildren();

  return (
    <section id="services" ref={scope} className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 text-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">Services</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] tracking-tight">
            How we can work together
          </h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Camera;
            return (
              <article
                key={service.title}
                data-reveal
                className="group relative overflow-hidden rounded-sm glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--glow-accent)]"
              >
                {/* Animated border */}
                <span className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:conic-gradient(from_0deg,transparent,oklch(0.765_0.128_86.5_/_0.55),transparent_45%)] [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px" />

                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-transform duration-700 group-hover:rotate-[200deg]">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-6 font-display text-2xl tracking-tight">{service.title}</h3>
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  {service.price}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}