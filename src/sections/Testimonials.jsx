import { useState } from "react";
import { Plus, Minus, Quote } from "lucide-react";
import { useRevealChildren } from "@/hooks/useScrollAnimations";
import { testimonials, faqs } from "@/data/testimonials";

/** Floating Polaroids that straighten on hover, plus the FAQ accordion. */
export default function Testimonials() {
  const scope = useRevealChildren();
  const [open, setOpen] = useState(0);

  return (
    <section id="testimonials" ref={scope} className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-20 text-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
            Testimonials
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] tracking-tight">
            Words left on the table
          </h2>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              data-reveal
              className="group animate-float-soft rounded-sm bg-card p-4 pb-8 shadow-[var(--shadow-lift)] transition-all duration-500 hover:z-10 hover:scale-[1.04] hover:shadow-[0_40px_90px_-34px_oklch(0.29_0.021_140_/_0.4)]"
              style={{
                transform: `rotate(${item.rotate}deg)`,
                animationDelay: `-${index * 1.3}s`,
                animationDuration: `${8 + index}s`,
              }}
            >
              <div className="flex min-h-40 flex-col justify-center bg-surface p-6">
                <Quote className="h-5 w-5 text-gold" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                  {item.quote}
                </blockquote>
              </div>
              <figcaption className="mt-5 px-2">
                <p className="font-display text-lg">{item.name}</p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {item.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div id="faq" className="mx-auto mt-32 max-w-3xl">
          <h2 className="text-center font-display text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight">
            Frequently asked
          </h2>
          <dl className="mt-12 divide-y divide-border border-y border-border">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.q} data-reveal>
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                    >
                      <span className="font-display text-lg">{faq.q}</span>
                      <span className="shrink-0 text-gold">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`grid overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="min-h-0">{faq.a}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}