import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { PHOTOGRAPHER } from "@/lib/constants";
import { portraitPhoto } from "@/data/gallery";

/** Portrait develops like film, signature draws itself, copy reveals per line. */
export default function About() {
  const scope = useScrollAnimations((el, g) => {
    g.timeline({ scrollTrigger: { trigger: el, start: "top 72%" } })
      .fromTo(
        el.querySelector("[data-about-portrait]"),
        { autoAlpha: 0, filter: "brightness(0.15) contrast(0.4) blur(12px)", scale: 1.08 },
        {
          autoAlpha: 1,
          filter: "brightness(1) contrast(1) blur(0px)",
          scale: 1,
          duration: 2.4,
          ease: "power2.out",
        },
      )
      .from(
        el.querySelectorAll("[data-about-line]"),
        { autoAlpha: 0, y: 30, stagger: 0.18, duration: 0.9, ease: "power3.out" },
        "-=1.8",
      )
      .fromTo(
        el.querySelector("[data-signature]"),
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, duration: 2.6, ease: "power1.inOut" },
        "-=0.9",
      );

    g.fromTo(
      el,
      { backgroundColor: "oklch(0.972 0.009 88)" },
      {
        backgroundColor: "oklch(0.938 0.013 86)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  return (
    <section id="about" ref={scope} className="relative py-32 sm:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="relative" data-about-portrait>
          <img
            src={portraitPhoto.src}
            width={portraitPhoto.w}
            height={portraitPhoto.h}
            loading="lazy"
            decoding="async"
            alt={portraitPhoto.alt}
            className="w-full rounded-sm object-cover shadow-[var(--shadow-lift)]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/20" />
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
            Shot by Zaid · campus afternoon light · handheld
          </p>
        </div>

        <div>
          <p
            data-about-line
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold"
          >
            About
          </p>
          <h2
            data-about-line
            className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] leading-tight tracking-tight"
          >
            I do not take photographs.
            <span className="block text-gold-gradient">I wait for them.</span>
          </h2>

          {PHOTOGRAPHER.bio.map((line) => (
            <p
              key={line}
              data-about-line
              className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {line}
            </p>
          ))}

          <svg
            viewBox="0 0 420 120"
            className="mt-10 h-24 w-64 text-gold"
            role="img"
            aria-label={`${PHOTOGRAPHER.name} signature`}
          >
            <path
              data-signature
              d="M12 88c26-46 40-64 52-64 9 0 5 22-6 42-9 17-4 24 6 24 16 0 30-20 42-44 8-16 14-24 20-24 7 0 6 12 0 26-6 15-2 22 8 22 14 0 26-14 38-34 7-12 13-18 19-18 8 0 8 12 2 26-5 12-1 20 10 20 12 0 22-8 34-24 10-13 18-20 26-20 10 0 12 10 6 22-5 11-1 18 10 18 16 0 30-10 44-28 6-8 12-12 16-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1400"
              strokeDashoffset="1400"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}