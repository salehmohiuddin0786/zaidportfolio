import { ChevronDown } from "lucide-react";
import { scrollToSection } from "@/hooks/useLenis";

/** Bouncing scroll cue at the bottom of the hero. */
export default function ScrollIndicator({ visible = true, target = "about" }) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(target)}
      className={`group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to next section"
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-gold">
        Scroll
      </span>
      <span className="animate-bounce-down text-gold">
        <ChevronDown className="h-5 w-5" />
      </span>
    </button>
  );
}