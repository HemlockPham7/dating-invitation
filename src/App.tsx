import { useState } from 'react';
import { InvitationGate } from './components/invitation/InvitationGate';
import { PortfolioHeader } from './components/layout/PortfolioHeader';
import { TimelineSection } from './components/timeline/TimelineSection';

/**
 * Phase 4: Gate → Header + Timeline.
 * Finale, music toggle and the AnimatePresence transition arrive in Phase 5.
 */
function App() {
  const [isAccepted, setIsAccepted] = useState(false);

  if (!isAccepted) {
    return <InvitationGate onAccept={() => setIsAccepted(true)} />;
  }

  return (
    <main>
      <PortfolioHeader />
      <TimelineSection />
    </main>
  );
}

export default App;
