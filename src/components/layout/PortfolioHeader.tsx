import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { invitationConfig, timelineStops } from '../../data/itineraryData';

export function PortfolioHeader() {
  const { recipientName } = invitationConfig;

  return (
    <header className="relative px-6 pt-8">
      {/* Thin editorial top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-cream-200 pb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">
        <span>{recipientName} • 13.12</span>
        <span className="hidden sm:inline">{timelineStops.length} Stops • No Clock</span>
      </div>

      <div className="mx-auto flex min-h-[78vh] max-w-4xl flex-col items-center justify-center py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-rose-accent"
        >
          The Birthday Itinerary
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-6xl font-medium leading-[1.05] text-espresso md:text-8xl"
        >
          {recipientName}&rsquo;s <span className="italic text-rose-accent">13.12</span>
          <br />
          Itinerary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-taupe md:text-lg"
        >
          Không giờ giấc, không vội vàng — chỉ là {timelineStops.length} chặng nhỏ Việt Hoàng đã chuẩn bị, đi
          theo nhịp của bé Hân.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-taupe"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5 text-rose-accent" />
          </motion.span>
        </motion.div>
      </div>
    </header>
  );
}

