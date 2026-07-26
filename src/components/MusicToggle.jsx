import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Ambient music toggle. Silently no-ops when no audio file is present. */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      className="fixed bottom-8 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full glass-card text-muted-foreground transition-colors duration-300 hover:text-gold"
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      {playing && (
        <span className="absolute inset-0 animate-ping rounded-full border border-gold/30" />
      )}
    </button>
  );
}