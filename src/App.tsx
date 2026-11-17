/**
 * Phase 1 placeholder: verifies the design system (colors, fonts) is wired up.
 * InvitationGate / Timeline flow will replace this in Phase 3–5.
 */
function App() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl rounded-3xl border border-cream-200 bg-cream-50 p-12 text-center shadow-editorial">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-accent">
          13.12 • Birthday Edition
        </p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-tight text-espresso">
          Gia Hân ơi,
          <br />
          <span className="italic text-rose-accent">sắp có điều bất ngờ</span>
        </h1>
        <p className="mt-6 text-taupe">
          Design system đã sẵn sàng — kem ấm, hồng đất, chữ serif thanh lịch.
        </p>
      </div>
    </main>
  );
}

export default App;

