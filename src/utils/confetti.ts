import confetti from 'canvas-confetti';

const COLORS = ['#D9778B', '#F4D5DC', '#FFD166', '#FF8FA3', '#FFFFFF', '#E8B4C0'];

let confettiInstance: confetti.CreateTypes | null = null;

function getConfetti(): confetti.CreateTypes {
  if (!confettiInstance) {
    confettiInstance = confetti.create(undefined, {
      resize: true,
      useWorker: false,
    });
  }
  return confettiInstance;
}

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * Triggers a vibrant combination of center burst, side confetti cannons,
 * and 360-degree radial firework explosions across the screen.
 */
export function triggerBirthdayConfetti(durationMs = 2200) {
  const fire = getConfetti();

  // 1. Immediate center celebratory burst
  void fire({
    particleCount: 90,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.65 },
    colors: COLORS,
    scalar: 1.15,
    zIndex: 9999,
  });

  // 2. Left & right side cannons
  void fire({
    particleCount: 55,
    angle: 60,
    spread: 65,
    startVelocity: 50,
    origin: { x: 0, y: 0.75 },
    colors: COLORS,
    zIndex: 9999,
  });

  void fire({
    particleCount: 55,
    angle: 120,
    spread: 65,
    startVelocity: 50,
    origin: { x: 1, y: 0.75 },
    colors: COLORS,
    zIndex: 9999,
  });

  // 3. Staggered 360° firework bursts in the upper half of the screen
  const end = Date.now() + durationMs;
  const interval = window.setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }

    const particleCount = Math.round(55 * (timeLeft / durationMs) + 25);

    // Left-side sky firework burst
    void fire({
      particleCount,
      startVelocity: 32,
      spread: 360,
      ticks: 70,
      gravity: 0.85,
      origin: { x: randomInRange(0.15, 0.42), y: randomInRange(0.18, 0.48) },
      colors: COLORS,
      scalar: randomInRange(0.95, 1.25),
      zIndex: 9999,
    });

    // Right-side sky firework burst
    void fire({
      particleCount,
      startVelocity: 32,
      spread: 360,
      ticks: 70,
      gravity: 0.85,
      origin: { x: randomInRange(0.58, 0.85), y: randomInRange(0.18, 0.48) },
      colors: COLORS,
      scalar: randomInRange(0.95, 1.25),
      zIndex: 9999,
    });
  }, 320);
}
