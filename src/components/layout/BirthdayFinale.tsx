import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { invitationConfig } from '../../data/itineraryData';
import { triggerBirthdayConfetti } from '../../utils/confetti';

export function BirthdayFinale() {
  const { recipientName, occasionDate } = invitationConfig;

  return (
    <footer className="relative px-6 pb-28 pt-8">
      {/* Connector cap from timeline spine */}
      <div className="mx-auto mb-12 flex flex-col items-center">
        <div className="h-12 w-[2px] bg-gradient-to-b from-rose-accent to-rose-accent/20" />
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-accent/40 bg-blush-100 text-rose-accent shadow-glow">
          <Heart className="h-4 w-4 fill-rose-accent" strokeWidth={0} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 p-10 text-center shadow-editorial md:p-14"
      >
        {/* Subtle decorative corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blush-200/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blush-100 blur-3xl"
        />

        <p className="relative font-mono text-[12.1px] uppercase tracking-[0.35em] text-rose-accent">
          Happy Birthday • {occasionDate}
        </p>

        <h2 className="relative mt-5 font-serif text-4xl font-medium leading-tight text-espresso md:text-5xl">
          Chúc mừng sinh nhật <span className="italic text-rose-accent">{recipientName}</span>
        </h2>

        <div className="relative mx-auto mt-6 h-px w-20 bg-rose-accent/40" />

        <p className="relative mx-auto mt-6 max-w-lg text-base leading-relaxed text-taupe md:text-[18.7px]">
          Tuổi mới chúc bé Hân luôn rạng rỡ, xinh đẹp và ngập tràn những điều dịu dàng nhất.
          Hẹn gặp bé Hân vào ngày <strong className="font-semibold text-espresso">13/12</strong> để
          cùng Việt Hoàng đón tuổi mới cùng bé Hân nha!
        </p>

        <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            type="button"
            onClick={() => triggerBirthdayConfetti(1800)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-rose-accent px-7 py-3.5 text-sm font-semibold tracking-wide text-cream-50 shadow-[0_12px_30px_-10px_rgba(217,119,139,0.7)] transition-colors hover:bg-rose-accent/90"
          >
            <Sparkles className="h-4 w-4" />
            Bắn pháo hoa 🎉
          </motion.button>
        </div>

        <p className="relative mt-10 font-serif text-lg italic text-taupe">
          See you on December 13th ♥
        </p>
      </motion.div>

      <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-taupe/60">
        Crafted with love for {recipientName} • 13.12 Birthday Edition
      </p>
    </footer>
  );
}

