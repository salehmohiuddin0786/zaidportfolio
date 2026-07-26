import { useEffect, useRef, useState } from "react";
import { Aperture, Mail, MapPin, Phone } from "lucide-react";
import { PHOTOGRAPHER } from "@/lib/constants";
import { useRevealChildren } from "@/hooks/useScrollAnimations";

const SUCCESS = "Frame captured. I will reply within one working day.";

/** Camera-interface contact form: shutter submit, flash, typed confirmation. */
export default function Contact() {
  const scope = useRevealChildren();
  const [flash, setFlash] = useState(false);
  const [typed, setTyped] = useState("");
  const [sent, setSent] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onSubmit = (event) => {
    event.preventDefault();
    setFlash(true);
    setSent(true);
    setTyped("");
    timers.current.push(setTimeout(() => setFlash(false), 420));
    SUCCESS.split("").forEach((_, index) => {
      timers.current.push(
        setTimeout(() => setTyped(SUCCESS.slice(0, index + 1)), 520 + index * 22),
      );
    });
  };

  const field =
    "peer w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-hidden transition-colors duration-300 placeholder:text-muted-foreground/60 focus:border-gold";

  return (
    <section id="contact" ref={scope} className="relative bg-surface py-32 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div data-reveal>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">Contact</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight tracking-tight">
            Let's find your light
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell me the date, the place and the feeling you want to keep. I reply to every
            enquiry personally.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${PHOTOGRAPHER.email}`} className="hover:text-foreground">
                {PHOTOGRAPHER.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold" />
              {PHOTOGRAPHER.phone}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gold" />
              {PHOTOGRAPHER.location}
            </li>
          </ul>
        </div>

        {/* Camera body */}
        <form
          data-reveal
          onSubmit={onSubmit}
          className="relative rounded-sm border border-border bg-card p-8 shadow-[var(--shadow-lift)] sm:p-10"
        >
          <div className="mb-8 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-gold">● REC</span>
            <span>ISO 400 · f/1.4 · 1/125</span>
          </div>

          <div className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-muted-foreground"
              >
                Name
              </label>
              <input id="name" name="name" required placeholder="Your name" className={field} />
            </div>
            <div>
              <label
                htmlFor="email"
                className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className={field}
              />
            </div>
            <div>
              <label
                htmlFor="occasion"
                className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-muted-foreground"
              >
                Occasion
              </label>
              <input
                id="occasion"
                name="occasion"
                placeholder="Wedding, editorial, portrait…"
                className={field}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about the day…"
                className={`${field} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-[image:var(--gradient-gold)] py-4 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-primary-foreground transition-shadow duration-300 hover:shadow-[var(--glow-gold)]"
          >
            <Aperture className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            Release the shutter
          </button>

          {sent && (
            <p
              className="mt-6 text-center font-mono text-xs text-gold"
              role="status"
              aria-live="polite"
            >
              {typed}
              <span className="ml-0.5 inline-block animate-[caret-blink_1s_steps(1)_infinite]">
                |
              </span>
            </p>
          )}

          <div
            className={`pointer-events-none absolute inset-0 rounded-sm bg-background transition-opacity duration-300 ${
              flash ? "opacity-70" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        </form>
      </div>
    </section>
  );
}