import { useMemo } from "react";
import { Rocket } from "lucide-react";
import { NAV_LINKS, PHOTOGRAPHER } from "@/lib/constants";
import { scrollToSection } from "@/hooks/useLenis";

/** Night-sky footer with twinkling stars, a drifting moon and a rocket to top. */
export default function Footer() {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: (i * 53) % 100,
        top: (i * 29) % 100,
        size: i % 7 === 0 ? 2 : 1,
        delay: (i % 11) * 0.4,
      })),
    [],
  );

  const toTop = () => {
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(to_bottom,oklch(0.95_0.018_82),oklch(0.905_0.032_70))] pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-clay/40 animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDelay: `-${star.delay}s`,
            }}
          />
        ))}
        <div
          className="absolute right-[14%] top-16 h-28 w-28 rounded-full bg-[radial-gradient(circle,oklch(0.86_0.11_66_/_0.55),transparent_68%)] blur-[10px] animate-float-soft"
          style={{ animationDuration: "18s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="font-display text-3xl tracking-tight">
              {PHOTOGRAPHER.name}
              <span className="text-gold">.</span>
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {PHOTOGRAPHER.tagline} — {PHOTOGRAPHER.role} based in {PHOTOGRAPHER.location}.
            </p>
          </div>

          <nav aria-label="Footer sections">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Studio
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${PHOTOGRAPHER.email}`} className="hover:text-foreground">
                  {PHOTOGRAPHER.email}
                </a>
              </li>
              <li>{PHOTOGRAPHER.phone}</li>
              <li>{PHOTOGRAPHER.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-border py-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} {PHOTOGRAPHER.name} — All frames reserved
          </p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold"
          >
            Back to top
            <Rocket className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-6 group-hover:opacity-0" />
          </button>
        </div>
      </div>
    </footer>
  );
}