import { useRef } from 'react';
import { motion } from 'framer-motion';
import { timelineStops } from '../../data/itineraryData';
import type { TimelineStop } from '../../types/itinerary';
import { TimelineCard } from './TimelineCard';
import { TimelineNode } from './TimelineNode';
import { TimelineSpine } from './TimelineSpine';

/** Large faded number shown opposite each card on desktop (lookbook style). */
function Watermark({ stop }: { stop: TimelineStop }) {
  const alignRight = stop.side === 'right'; // watermark sits in the left column → text hugs the spine
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`select-none ${alignRight ? 'text-right' : 'text-left'}`}
      aria-hidden
    >
      <p className="font-serif text-[9rem] font-medium leading-none text-blush-200">{stop.stepNumber}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.35em] text-taupe">{stop.categoryTag}</p>
    </motion.div>
  );
}

/**
 * Desktop: 3-column grid [card | spine | watermark] alternating left/right.
 * Narrow screens: 2-column grid [spine | card] with the spine on the left.
 */
export function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative mx-auto max-w-6xl px-4 pb-24 md:px-6">
      <TimelineSpine containerRef={containerRef} />

      <ol className="relative flex flex-col gap-20 md:gap-28">
        {timelineStops.map((stop) => {
          const isLeft = stop.side === 'left';
          return (
            <li
              key={stop.id}
              className="grid grid-cols-[3.5rem_1fr] items-center gap-6 md:grid-cols-[1fr_80px_1fr]"
            >
              {/* Node: col 1 on mobile, center column on desktop */}
              <div className="col-start-1 row-start-1 self-stretch md:col-start-2">
                <TimelineNode icon={stop.icon} side={stop.side} />
              </div>

              {/* Card */}
              <div
                className={`col-start-2 row-start-1 flex ${
                  isLeft ? 'md:col-start-1 md:justify-end' : 'md:col-start-3 md:justify-start'
                }`}
              >
                <TimelineCard stop={stop} />
              </div>

              {/* Opposite side watermark (desktop only) */}
              <div
                className={`row-start-1 hidden md:flex ${
                  isLeft ? 'md:col-start-3 md:justify-start' : 'md:col-start-1 md:justify-end'
                }`}
              >
                <Watermark stop={stop} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
