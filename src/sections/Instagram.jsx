import { InstagramMark } from "@/components/BrandIcons";
import { gallery } from "@/data/gallery";

function Row({ reverse }) {
  const items = [...gallery, ...gallery];
  return (
    <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
      {items.map((photo, index) => (
        <div
          key={`${photo.title}-${index}`}
          className="group relative mx-2 h-44 w-44 shrink-0 overflow-hidden rounded-sm sm:h-56 sm:w-56"
        >
          <img
            src={photo.src}
            width={photo.w}
            height={photo.h}
            loading="lazy"
            decoding="async"
            alt={photo.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-ink/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <InstagramMark className="h-5 w-5 text-onimage" />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Two infinite marquee rows travelling in opposite directions. */
export default function Instagram() {
  return (
    <section id="instagram" className="relative overflow-hidden py-28">
      <header className="mx-auto mb-12 max-w-7xl px-6">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">Instagram</p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-3 font-display text-[clamp(1.7rem,4vw,2.8rem)] tracking-tight transition-colors hover:text-gold"
        >
          @pathanzaidkhan
          <InstagramMark className="h-6 w-6 text-gold" />
        </a>
      </header>

      <div className="marquee-paused space-y-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}