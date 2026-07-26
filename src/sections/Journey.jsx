import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { timeline } from "@/data/timeline";

/** Scroll-driven timeline: the spine grows, a glow follows, cards rotate in. */
export default function Journey() {
  const scope = useScrollAnimations((el, g) => {
    const spine = el.querySelector("[data-spine]");
    const glow = el.querySelector("[data-glow]");

    g.fromTo(
      spine,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 80%", scrub: 0.6 },
      },
    );

    g.fromTo(
      glow,
      { top: "0%" },
      {
        top: "100%",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 80%", scrub: 0.6 },
      },
    );

    el.querySelectorAll("[data-step]").forEach((step, index) => {
      g.fromTo(
        step,
        { autoAlpha: 0, y: 70, rotate: index % 2 === 0 ? -3.5 : 3.5 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        },
      );
      g.fromTo(
        step.querySelector("[data-year]"),
        { autoAlpha: 0, letterSpacing: "0.6em" },
        {
          autoAlpha: 1,
          letterSpacing: "0.12em",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        },
      );
    });
  });

  return (
    <section id="journey" ref={scope} className="relative bg-surface py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-20 text-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">Journey</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] tracking-tight">
            Five years, one frame at a time
          </h2>
        </header>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2">
            <div data-spine className="h-full w-px bg-[image:var(--gradient-gold)]" />
            <div
              data-glow
              className="absolute left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-2xl"
            />
          </div>

          <ol className="space-y-16">
            {timeline.map((item, index) => (
              <li
                key={item.year}
                data-step
                className={`relative pl-14 md:w-1/2 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-14" : "md:ml-auto md:pl-14"
                }`}
              >
                <span className="absolute left-[13px] top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[var(--glow-gold)] md:left-auto md:right-[-5px] md:translate-x-0" />
                <div className="glass-card rounded-sm p-6">
                  <span
                    data-year
                    className="font-mono text-sm uppercase tracking-[0.12em] text-gold"
                  >
                    {item.year}
                  </span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                  <img
                    src={item.image}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                    alt={item.alt}
                    className="mt-6 h-48 w-full rounded-sm object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}