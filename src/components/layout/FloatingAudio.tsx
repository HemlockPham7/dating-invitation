import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Volume2, VolumeX } from 'lucide-react';

interface FloatingAudioProps {
  isPlaying: boolean;
  onToggle: () => void;
}

/**
 * Gentle music-box notes for "Happy Birthday" in F major (frequencies in Hz, duration in beats).
 * Used as a built-in romantic music-box melody so audio works out-of-the-box without external files.
 */
const MELODY_NOTES: Array<[number, number]> = [
  [261.63, 0.75], // C4
  [261.63, 0.25], // C4
  [293.66, 1.0],  // D4
  [261.63, 1.0],  // C4
  [349.23, 1.0],  // F4
  [329.63, 2.0],  // E4

  [261.63, 0.75], // C4
  [261.63, 0.25], // C4
  [293.66, 1.0],  // D4
  [261.63, 1.0],  // C4
  [392.0, 1.0],   // G4
  [349.23, 2.0],  // F4

  [261.63, 0.75], // C4
  [261.63, 0.25], // C4
  [523.25, 1.0],  // C5
  [440.0, 1.0],   // A4
  [349.23, 1.0],  // F4
  [329.63, 1.0],  // E4
  [293.66, 2.0],  // D4

  [466.16, 0.75], // Bb4
  [466.16, 0.25], // Bb4
  [440.0, 1.0],   // A4
  [349.23, 1.0],  // F4
  [392.0, 1.0],   // G4
  [349.23, 2.5],  // F4
];

export function FloatingAudio({ isPlaying, onToggle }: FloatingAudioProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    const clearLoop = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (!isPlaying) {
      clearLoop();
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const playNextNote = () => {
      if (!isPlaying) return;
      const [freq, beats] = MELODY_NOTES[stepRef.current % MELODY_NOTES.length];
      stepRef.current += 1;

      const now = ctx.currentTime;
      const durationSec = beats * 0.48;

      // Soft music-box chime (sine + subtle octave overtone)
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const gain = ctx.createGain();
      const overtoneGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.065, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + 0.35);

      overtoneGain.gain.setValueAtTime(0.012, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      overtone.connect(overtoneGain);
      overtoneGain.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + durationSec + 0.4);
      overtone.stop(now + 0.3);

      timerRef.current = window.setTimeout(playNextNote, durationSec * 1000);
    };

    playNextNote();

    return () => {
      clearLoop();
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      if (audioCtxRef.current) void audioCtxRef.current.close();
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
      title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full border border-cream-200 bg-cream-50/90 px-4 py-2.5 text-xs font-medium text-espresso shadow-editorial backdrop-blur-md transition-colors hover:border-rose-accent/50"
    >
      <motion.span
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-blush-100 text-rose-accent"
      >
        <Disc3 className="h-3.5 w-3.5" />
      </motion.span>

      <span className="hidden font-mono text-[12.1px] uppercase tracking-[0.2em] text-taupe sm:inline">
        {isPlaying ? 'Birthday Melody' : 'Muted'}
      </span>

      {isPlaying ? (
        <Volume2 className="h-4 w-4 text-rose-accent" />
      ) : (
        <VolumeX className="h-4 w-4 text-taupe" />
      )}
    </motion.button>
  );
}

