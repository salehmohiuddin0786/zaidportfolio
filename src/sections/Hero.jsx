import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { PHOTOGRAPHER } from "@/lib/constants";
import { usePointerParallax } from "@/hooks/useCursor";
import { useIsCompact, useReducedMotion } from "@/hooks/useReducedMotion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { scrollToSection } from "@/hooks/useLenis";
import ScrollIndicator from "@/components/ScrollIndicator";
import { heroPhoto } from "@/data/gallery";

/**
 * 8–10s opening sequence: iris opens, background fades in, the name types out
 * letter by letter, subtitle rises, buttons ease in, scroll cue.
 */
export default function Hero({ start }) {
  const root = useRef(null);
  const nameRef = useRef(null);
  const [cue, setCue] = useState(false);
  const compact = useIsCompact();
  const reduced = useReducedMotion();
  const pointer = usePointerParallax(!compact && !reduced);
  const primaryBtn = useMagnetic(0.28, !compact && !reduced);
  const secondaryBtn = useMagnetic(0.28, !compact && !reduced);

  useEffect(() => {
    if (!start) return;
    const el = root.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el.querySelectorAll("[data-hero]"), { autoAlpha: 1, y: 0, scale: 1 });
      setCue(true);
      return;
    }

    let cleanupSplit = () => {};
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-bg]",
        { autoAlpha: 0, scale: 1.1, filter: "blur(10px)" },
        { autoAlpha: 1, scale: 1.03, filter: "blur(0px)", duration: 1.6 },
      )
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 16, duration: 0.8 }, "-=1.1")
        .add(() => {
          import("split-type").then(({ default: SplitType }) => {
            const split = new SplitType(nameRef.current, { types: "chars" });
            cleanupSplit = () => split.revert();
            gsap.set(nameRef.current, { autoAlpha: 1 });
            gsap.from(split.chars, {
              autoAlpha: 0,
              yPercent: 60,
              stagger: 0.03,
              duration: 0.8,
              ease: "power2.out",
            });
          });
        })
        .to({}, { duration: 0.9 })
        .from("[data-hero-sub]", { autoAlpha: 0, y: 24, duration: 1 })
        .from(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 16, stagger: 0.12, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        .add(() => setCue(true), "+=0.2");
    }, el);

    return () => {
      ctx.revert();
      cleanupSplit();
    };
  }, [start, reduced]);

  const parallax = (depth) => ({
    transform: `translate3d(${pointer.x * depth}px, ${pointer.y * depth}px, 0)`,
  });

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background plate — video when available, hero still as poster/fallback */}
      <div className="absolute inset-0" data-hero-bg style={parallax(26)}>
        <video
          className="h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPhoto.src}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.972_0.009_88_/_0.75),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          data-hero
          data-hero-eyebrow
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-clay"
          style={parallax(-14)}
        >
          {PHOTOGRAPHER.role}
        </p>

        <h1
          ref={nameRef}
          data-hero
          className="mt-6 font-display text-[clamp(2.5rem,8.5vw,7rem)] leading-[0.95] tracking-[-0.02em] text-foreground opacity-0 [text-wrap:balance]"
          style={parallax(-24)}
        >
          {PHOTOGRAPHER.name}
        </h1>

        <p
          data-hero
          data-hero-sub
          className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={parallax(-8)}
        >
          {PHOTOGRAPHER.tagline} A student archive of festivals, quiet faces and late-night
          streets — shot, graded and delivered by hand.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            ref={primaryBtn}
            data-hero
            data-hero-cta
            type="button"
            onClick={() => scrollToSection("gallery")}
            className="group inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground shadow-[var(--glow-gold)] transition-shadow duration-300 hover:shadow-[0_0_90px_oklch(0.765_0.128_86.5_/_0.45)]"
          >
            View the gallery
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            ref={secondaryBtn}
            data-hero
            data-hero-cta
            type="button"
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-3 rounded-full border border-foreground/25 bg-background/60 px-8 py-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-clay hover:text-clay"
          >
            <Camera className="h-4 w-4" />
            Book a session
          </button>
        </div>
      </div>

      <ScrollIndicator visible={cue} target="about" />
    </section>
  );
}