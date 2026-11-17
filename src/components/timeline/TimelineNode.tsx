import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { StopIconType, TimelineSide } from '../../types/itinerary';
import { stopIcons } from './stopIcons';

interface TimelineNodeProps {
  icon: StopIconType;
  side: TimelineSide;
}

/**
 * Dot + icon on the spine. Lights up once the row reaches the middle of the screen.
 * Includes a short connector line reaching toward the card.
 */
export function TimelineNode({ icon, side }: TimelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: '0px 0px -40% 0px' });
  const Icon = stopIcons[icon];

  // Mobile: card is always to the right of the node. Desktop: follows `side`.
  const connectorSide =
    side === 'left' ? 'left-1/2 md:left-auto md:right-1/2' : 'left-1/2';

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center">
      <motion.span
        aria-hidden
        className={`absolute top-1/2 h-px w-[calc(50%+1.5rem)] origin-center bg-rose-accent/40 ${connectorSide}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      />
      <motion.div
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2"
        initial={false}
        animate={
          active
            ? { scale: 1, backgroundColor: '#D9778B', borderColor: '#D9778B', color: '#FDFBF7' }
            : { scale: 0.8, backgroundColor: '#FDFBF7', borderColor: '#E8B4C0', color: '#D9778B' }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ boxShadow: active ? '0 0 0 8px rgba(217,119,139,0.15)' : 'none' }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </motion.div>
    </div>
  );
}

