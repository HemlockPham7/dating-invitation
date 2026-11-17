import { motion, useScroll, useSpring, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

interface TimelineSpineProps {
  /** The timeline container whose scroll progress draws the line */
  containerRef: RefObject<HTMLElement>;
}

/**
 * Vertical center line. The rose overlay grows top → bottom with scroll progress.
 * Mobile/narrow: sits on the left, centered on the node column (section px-4 + half of 3.5rem).
 */
export function TimelineSpine({ containerRef }: TimelineSpineProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 60%'],
  });
  const scaleY: MotionValue<number> = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 top-0 left-[2.75rem] w-[2px] -translate-x-1/2 md:left-1/2"
    >
      <div className="absolute inset-0 rounded-full bg-blush-200/70" />
      <motion.div
        className="absolute inset-0 origin-top rounded-full bg-rose-accent"
        style={{ scaleY }}
      />
    </div>
  );
}
