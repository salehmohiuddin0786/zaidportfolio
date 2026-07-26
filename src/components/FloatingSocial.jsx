import { Mail } from "lucide-react";
import { InstagramMark, YoutubeMark, XMark } from "@/components/BrandIcons";
import { SOCIALS } from "@/lib/constants";

const ICONS = { instagram: InstagramMark, youtube: YoutubeMark, twitter: XMark, mail: Mail };

/** Vertical social rail on the left edge (desktop). */
export default function FloatingSocial() {
  return (
    <div className="fixed bottom-8 left-6 z-40 hidden flex-col items-center gap-5 lg:flex">
      {SOCIALS.map((social) => {
        const Icon = ICONS[social.icon] ?? Mail;
        return (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={social.label}
            className="text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-gold"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
      <span className="h-20 w-px bg-border" />
    </div>
  );
}