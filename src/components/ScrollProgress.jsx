import { useEffect, useState } from "react";

/** Thin gold progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-[image:var(--gradient-gold)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}