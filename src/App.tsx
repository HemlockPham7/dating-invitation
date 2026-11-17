import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InvitationGate } from './components/invitation/InvitationGate';
import { BirthdayFinale } from './components/layout/BirthdayFinale';
import { FloatingAudio } from './components/layout/FloatingAudio';
import { PortfolioHeader } from './components/layout/PortfolioHeader';
import { TimelineSection } from './components/timeline/TimelineSection';

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    setIsMusicPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {!isAccepted ? (
        <motion.div
          key="invitation-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <InvitationGate onAccept={handleAccept} />
        </motion.div>
      ) : (
        <motion.main
          key="portfolio-timeline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-screen"
        >
          <PortfolioHeader />
          <TimelineSection />
          <BirthdayFinale />
          <FloatingAudio
            isPlaying={isMusicPlaying}
            onToggle={() => setIsMusicPlaying((prev) => !prev)}
          />
        </motion.main>
      )}
    </AnimatePresence>
  );
}

export default App;
