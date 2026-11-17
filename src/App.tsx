import { useState } from 'react';
import { InvitationGate } from './components/invitation/InvitationGate';

/**
 * Phase 3: InvitationGate is live.
 * The post-accept view is a temporary placeholder — the Timeline (Phase 4)
 * and AnimatePresence transition (Task 5.3) will replace it.
 */
function App() {
  const [isAccepted, setIsAccepted] = useState(false);

  if (!isAccepted) {
    return <InvitationGate onAccept={() => setIsAccepted(true)} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl rounded-3xl border border-cream-200 bg-cream-50 p-12 text-center shadow-editorial">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-accent">13.12 • Yay!</p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-tight text-espresso">
          Hẹn Gia Hân nha <span className="italic text-rose-accent">💗</span>
        </h1>
        <p className="mt-6 text-taupe">Lịch trình 5 chặng sẽ xuất hiện ở đây (Phase 4).</p>
      </div>
    </main>
  );
}

export default App;
