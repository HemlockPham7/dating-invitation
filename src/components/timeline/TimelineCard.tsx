import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { TimelineStop } from '../../types/itinerary';
import { Badge } from '../ui/Badge';
import { stopIcons } from './stopIcons';

interface TimelineCardProps {
  stop: TimelineStop;
}

export function TimelineCard({ stop }: TimelineCardProps) {
  const Icon = stopIcons[stop.icon];

  return (
    <motion.article
      initial={{ opacity: 0, x: stop.side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full max-w-md overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-editorial transition-shadow duration-500 hover:shadow-[0_30px_60px_-28px_rgba(44,34,32,0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-blush-100">
        <img
          src={stop.imageUrl}
          alt={stop.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 font-serif text-lg italic text-espresso backdrop-blur-sm">
          No. {stop.stepNumber}
        </span>
      </div>

      <div className="p-7">
        <Badge icon={<Icon className="h-3 w-3" strokeWidth={2} />}>
          Stop {stop.stepNumber} • {stop.categoryTag}
        </Badge>

        <h3 className="mt-5 font-serif text-3xl font-medium leading-tight text-espresso">{stop.title}</h3>
        {stop.subtitle && <p className="mt-1 font-serif text-lg italic text-rose-accent">{stop.subtitle}</p>}

        {stop.locationName && (
          <div className="mt-5 flex gap-3 rounded-2xl border border-cream-200 bg-cream-50 p-4">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-accent" />
            <div>
              <p className="text-sm font-semibold text-espresso">{stop.locationName}</p>
              {stop.address && <p className="mt-0.5 text-xs leading-relaxed text-taupe">{stop.address}</p>}
            </div>
          </div>
        )}

        <p className="mt-5 text-[16.5px] leading-relaxed text-taupe">{stop.description}</p>

        {stop.googleMapsUrl && (
          <a
            href={stop.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-accent/40 px-5 py-2.5 text-sm font-medium text-rose-accent transition-colors hover:bg-rose-accent hover:text-cream-50"
          >
            Xem trên Google Maps
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

