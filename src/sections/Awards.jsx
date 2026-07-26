import { Trophy, Medal, Award, Star } from "lucide-react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { awards } from "@/data/awards";

const ICONS = { Trophy, Medal, Award, Star };

/** Gold cards: shine sweeps across, medals rotate, trophies bounce. */
export default function Awards() {
  const scope = useScrollAnimations((el, g) => {
    const cards = el.querySelectorAll("[data-award]");
    g.fromTo(
      cards,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          onEnter: () =>
            cards.forEach((card, i) =>
              setTimeout(() => card.classList.add("is-shining"), i * 220),
            ),
        },
      },
    );

    el.querySelectorAll("[data-award-icon]").forEach((icon, index) => {
      g.fromTo(
        icon,
        { rotate: index % 2 === 0 ? -180 : 0, y: index % 2 === 0 ? 0 : -26, autoAlpha: 0 },
        {
          rotate: 0,
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          delay: index * 0.12,
          ease: index % 2 === 0 ? "back.out(2)" : "bounce.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    });
  });

  return (
    <section id="awards" ref={scope} className="relative bg-surface py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">Awards</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] tracking-tight">
            Recognition, quietly kept
          </h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((item) => {
            const Icon = ICONS[item.icon] ?? Award;
            return (
              <article
                key={item.title}
                data-award
                className="shine-sweep rounded-sm border border-gold/25 bg-[linear-gradient(160deg,oklch(0.985_0.008_88),oklch(0.945_0.02_78))] p-8"
              >
                <span data-award-icon className="inline-block text-gold">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-gold">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{item.org}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}