## Goal

Move the site away from the black + gold "luxury studio" look into a warm, natural, outdoor-photography identity: terracotta clay + sage green, Urbanist/Epilogue typography, a magazine-style gallery, and calmer motion.

## 1. Colour system (src/styles.css)

New tokens, all in oklch, dark-but-warm so the photos stay the brightest thing on screen:

- `--background` deep forest-charcoal (warm green-black, ~#141a15) instead of pure #050505
- `--surface` / `--card` warm bark tones (~#1d241d / #252c23)
- `--gold` → re-valued as **terracotta #c4654a**, with `--gold-soft` = warm sand #e8a87c (token names kept so every existing `text-gold` / `border-gold/60` usage instantly re-themes; a `--color-clay` and `--color-sage` alias are added for new code)
- `--accent` changed from violet #7C3AED to **sage #87a878**, `--primary` = terracotta, deep moss #4a6741 used for borders and glows
- `--gradient-gold` → clay→sand→sage gradient; `--glow-gold` / `--glow-accent` recoloured to warm amber and sage
- `--radius` raised slightly (0.25rem → 0.5rem) for a softer, organic edge
- `::selection` and scroll/progress accents follow the new tokens

## 2. Typography

- Swap the Playfair/Inter/Space Grotesk Google Fonts `<link>` in `src/routes/__root.jsx` for **Urbanist + Epilogue**
- `--font-display: Urbanist`, `--font-sans: Epilogue`, `--font-mono` label style kept as Urbanist uppercase-tracked (the tiny `font-mono` eyebrow labels stay, just in the new family)
- Slightly reduce the extreme letter-spacing on eyebrow labels so it reads editorial-natural rather than fashion-luxury

## 3. Magazine layout for the photo sections

- **Gallery**: replace the uniform 3-column masonry with a magazine composition — one large featured frame spanning two columns at the top of each block, supporting frames in a staggered grid beneath, repeating down the section. Portrait/landscape handled by the existing `orientation` field so nothing gets cropped badly.
- **Horizontal exhibition** kept but retitled/restyled to the new palette with softer edges.
- Section rhythm across the page moves to alternating wide-image bands and text columns (About, Journey) for the editorial feel.

## 4. Softer motion

- Loader: shutter-flash replaced with a slow fade-and-lift, shorter overall duration
- Hero: the ~8–10s intro compressed to a calmer ~3–4s; camera-flash strobe removed
- Scroll reveals: longer durations, gentler easing (`power2.out`), smaller travel distance, less scale-pop
- Pinned horizontal scroll kept but with higher `scrub` smoothing; Lenis duration eased up
- Custom cursor made subtler (thin sage ring, no aggressive blend-mode invert)
- Background effects: violet blobs → soft moss/clay light pools, grain opacity reduced

## 5. Copy & framing touches

Reword the small labels and section intros so they read as nature/landscape work (light, weather, seasons, terrain) rather than generic studio-luxury, keeping all of Pathan Zaid Khan's existing facts, stats, and photos unchanged.

## Technical notes

- All colour changes are token-level in `src/styles.css` + `src/styles/effects.css`; no hardcoded colour utilities added to components.
- Files touched: `src/styles.css`, `src/styles/effects.css`, `src/routes/__root.jsx`, `src/components/{Loader,Cursor,BackgroundEffects,Header,Footer,ScrollProgress}.jsx`, `src/sections/{Hero,Gallery,About,Journey,Services,Contact,Testimonials,Awards,Equipment,Stats}.jsx`, `src/hooks/useLenis.js`.
- Images in `src/assets` and `src/data/*` stay exactly as they are.
- Verified with a production build and a browser screenshot pass at desktop and mobile widths.
