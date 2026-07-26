import { useEffect, useState } from "react";

/** Full-screen white flash — used after the hero sequence and form submit. */
export default function TransitionOverlay({ trigger }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 520);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[85] bg-background transition-opacity duration-500 ${
        flash ? "opacity-70" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}