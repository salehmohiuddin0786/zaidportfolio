import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PHOTOGRAPHER } from "@/lib/constants";
import { scrollToSection } from "@/hooks/useLenis";

/** Sticky header: transparent over the hero, glass once scrolled. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-3" : "border-b border-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => go("hero")}
          className="text-left font-display text-lg tracking-tight text-foreground"
        >
          {PHOTOGRAPHER.firstName}
          <span className="text-gold">.</span>
          <span className="ml-2 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground">
            Studio
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="relative font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-foreground hover:after:origin-left hover:after:scale-x-100"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="mt-3 flex flex-col gap-1 border-t border-border bg-surface/95 px-6 py-4 backdrop-blur-xl md:hidden"
          aria-label="Sections"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="py-3 text-left font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}