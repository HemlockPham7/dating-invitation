import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { invitationConfig } from '../../data/itineraryData';
import { triggerBirthdayConfetti } from '../../utils/confetti';
import { RunawayButton } from './RunawayButton';

interface InvitationGateProps {
  onAccept: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function InvitationGate({ onAccept }: InvitationGateProps) {
  const acceptRef = useRef<HTMLButtonElement>(null);
  const [escapes, setEscapes] = useState(0);
  const { recipientName, occasionDate, heroHeadline, heroSubtext, evasiveMessages } = invitationConfig;

  // "Đồng ý" grows a little every time "Từ chối" escapes (capped).
  const acceptScale = Math.min(1 + escapes * 0.04, 1.3);

  const handleAccept = () => {
    triggerBirthdayConfetti();
    onAccept();
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      {/* Soft background blooms */}
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blush-200/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-blush-100 blur-3xl" />

      {/* Editorial corner marks */}
      <div aria-hidden className="pointer-events-none absolute inset-6 hidden border border-cream-200 md:block" />
      <p className="absolute left-10 top-10 hidden font-mono text-[12.1px] uppercase tracking-[0.35em] text-taupe md:block">
        Vol. 13 — Birthday Edition
      </p>
      <p className="absolute bottom-10 right-10 hidden font-mono text-[12.1px] uppercase tracking-[0.35em] text-taupe md:block">
        For {recipientName} • {occasionDate}
      </p>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.span
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 rounded-full border border-rose-accent/30 bg-cream-50/70 px-4 py-1.5 font-mono text-[12.1px] uppercase tracking-[0.3em] text-rose-accent"
        >
          <Heart className="h-3 w-3 fill-rose-accent" strokeWidth={0} />
          Special Invitation • 13.12
        </motion.span>

        <motion.h1
          {...fadeUp(0.25)}
          className="mt-8 font-serif text-5xl font-medium leading-[1.1] text-espresso md:text-7xl"
        >
          {heroHeadline}
        </motion.h1>

        <motion.div {...fadeUp(0.4)} className="mt-8 h-px w-24 bg-rose-accent/50" />

        <motion.p {...fadeUp(0.5)} className="mt-8 max-w-xl text-base leading-relaxed text-taupe md:text-[19.8px]">
          {heroSubtext}
        </motion.p>

        <motion.div {...fadeUp(0.65)} className="mt-12 flex items-center gap-5">
          <motion.button
            ref={acceptRef}
            type="button"
            onClick={handleAccept}
            animate={{ scale: acceptScale }}
            whileHover={{ scale: acceptScale * 1.05 }}
            whileTap={{ scale: acceptScale * 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative inline-flex items-center gap-2 rounded-full bg-rose-accent px-9 py-3.5 text-sm font-semibold tracking-wide text-cream-50 shadow-[0_12px_30px_-10px_rgba(217,119,139,0.7)]"
          >
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-rose-accent/30 [animation-duration:2.4s]" />
            <Heart className="relative h-4 w-4 fill-cream-50" strokeWidth={0} />
            <span className="relative">Đồng ý</span>
          </motion.button>

          <RunawayButton messages={evasiveMessages} avoidRef={acceptRef} onEscape={setEscapes} />
        </motion.div>

        <motion.p {...fadeUp(0.85)} className="mt-10 font-mono text-[12.1px] uppercase tracking-[0.3em] text-taupe/70">
          {escapes === 0 ? 'Chọn một nha ✦' : `Đã né ${escapes} lần — vẫn chỉ có một đáp án thôi`}
        </motion.p>
      </div>
    </section>
  );
}

