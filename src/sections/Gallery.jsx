import { useEffect, useRef } from "react";
import { Maximize2, Play } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { gallery, horizontalGallery, heroPhoto } from "@/data/gallery";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useIsCompact, useReducedMotion } from "@/hooks/useReducedMotion";

const GALLERY_ID = "masonry-gallery";

/** Magazine blocks: one large featured frame + four supporting frames. */
const BLOCKS = Array.from({ length: Math.ceil(19 / 5) }, (_, i) => i);

function Tile({ photo, featured, index }) {
  return (
    <a
      data-tile
      href={photo.src}
      data-pswp-width={photo.w}
      data-pswp-height={photo.h}
      target="_blank"
      rel="noreferrer"
      className={`group relative block w-full overflow-hidden rounded-lg ${
        featured ? "h-[46vh] lg:h-full lg:min-h-[70vh]" : "h-[26vh] lg:h-[34vh]"
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <img
        src={photo.src}
        width={photo.w}
        height={photo.h}
        loading="lazy"
        decoding="async"
        alt={photo.alt}
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-veil)] opacity-70 transition-opacity duration-700 group-hover:opacity-95" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full border border-onimage/60 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4 text-onimage" />
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <span
          className={`block font-display tracking-tight text-onimage ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {photo.title}
        </span>
        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.28em] text-sand">
          {photo.category}
        </span>
      </span>
    </a>
  );
}

/** Masonry gallery + PhotoSwipe viewer + horizontal exhibition + video reel. */
export default function Gallery() {
  const compact = useIsCompact();
  const reduced = useReducedMotion();
  const trackRef = useRef(null);

  // Fullscreen viewer (blurred backdrop, zoom transition).
  useEffect(() => {
    let lightbox;
    let cancelled = false;
    import("photoswipe/lightbox").then(({ default: PhotoSwipeLightbox }) => {
      if (cancelled) return;
      lightbox = new PhotoSwipeLightbox({
        gallery: `#${GALLERY_ID}, #horizontal-gallery`,
        children: "a[data-pswp-width]",
        showHideAnimationType: "zoom",
        bgOpacity: 0.92,
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    });
    return () => {
      cancelled = true;
      lightbox?.destroy();
    };
  }, []);

  // Gentle editorial reveal
  const scope = useScrollAnimations((el, g) => {
    el.querySelectorAll("[data-block]").forEach((block) => {
      g.fromTo(
        block.querySelectorAll("[data-tile]"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: block, start: "top 85%" },
        },
      );
    });
  });

  // Horizontal exhibition scroll (pinned) — desktop only.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || compact || reduced) return;
    const wrapper = track.parentElement;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
      });
    }, wrapper);
    return () => ctx.revert();
  }, [compact, reduced]);

  // Video reel: scales to fullscreen, corners flatten.
  const videoScope = useScrollAnimations((el, g) => {
      g.fromTo(
        el.querySelector("[data-reel]"),
        { scale: 0.82, borderRadius: "24px" },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 88%", end: "center center", scrub: 1.2 },
        },
      );
  });

  return (
    <>
      <section id="gallery" ref={scope} className="relative py-32 sm:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <header className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-sage">
                Field Archive
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-tight">
                Light, weather &amp; terrain
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Frames gathered across seasons — skies, canopies and the hour before dark. Tap
              any photograph for the full print view.
            </p>
          </header>

          <div id={GALLERY_ID} className="space-y-5">
            {BLOCKS.map((blockIndex) => {
              const items = gallery.slice(blockIndex * 5, blockIndex * 5 + 5);
              if (!items.length) return null;
              const [feature, ...rest] = items;
              const flip = blockIndex % 2 === 1;
              return (
                <div
                  key={blockIndex}
                  data-block
                  className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:grid-rows-2"
                >
                  <div
                    className={`col-span-2 lg:col-span-2 lg:row-span-2 ${
                      flip ? "lg:order-2" : ""
                    }`}
                  >
                    <Tile photo={feature} featured index={0} />
                  </div>
                  {rest.map((photo, i) => (
                    <Tile key={photo.title} photo={photo} index={i + 1} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horizontal exhibition */}
      <section className="relative overflow-hidden bg-surface py-20 lg:h-screen lg:py-0">
        <div className="flex h-full flex-col justify-center">
          <p className="mb-8 px-6 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-sage">
            The trail — scroll sideways
          </p>
          <div
            id="horizontal-gallery"
            ref={trackRef}
            className="flex gap-6 overflow-x-auto px-6 pb-4 lg:overflow-visible lg:pb-0"
          >
            {horizontalGallery.map((photo, index) => (
              <a
                key={`${photo.title}-${index}`}
                href={photo.src}
                data-pswp-width={photo.w}
                data-pswp-height={photo.h}
                target="_blank"
                rel="noreferrer"
                className="group relative h-[52vh] w-[78vw] shrink-0 overflow-hidden rounded-lg sm:w-[46vw] lg:h-[62vh] lg:w-[34vw]"
              >
                <img
                  src={photo.src}
                  width={photo.w}
                  height={photo.h}
                  loading="lazy"
                  decoding="async"
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-[image:var(--gradient-veil)] p-5">
                  <span className="block font-display text-lg text-onimage">{photo.title}</span>
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-sand">
                    {photo.category}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured video reel */}
      <section ref={videoScope} className="relative overflow-hidden py-24">
        <div
          data-reel
          className="relative mx-auto aspect-video w-full max-w-[1600px] overflow-hidden bg-card"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          poster={heroPhoto.src}
          >
            <source src="/videos/reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-sand/60 text-sand">
              <Play className="h-5 w-5" />
            </span>
            <p className="font-display text-3xl tracking-tight text-onimage sm:text-5xl">
              The 2026 Reel
            </p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-onimage/70">
              Three minutes · Shot on location
            </p>
          </div>
        </div>
      </section>
    </>
  );
}