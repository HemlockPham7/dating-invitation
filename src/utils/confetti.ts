import confetti from 'canvas-confetti';

const COLORS = ['#D9778B', '#F4D5DC', '#FFD166', '#FFFFFF', '#E8B4C0'];

const HEART_PATH =
  'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z';

let heartShape: confetti.Shape | null = null;
const getHeart = () => (heartShape ??= confetti.shapeFromPath({ path: HEART_PATH }));

/**
 * Two side-cannons of confetti + hearts for ~1.6s, plus a center heart burst.
 * Automatically skipped for users who prefer reduced motion.
 */
export function triggerBirthdayConfetti(durationMs = 1600) {
  const end = Date.now() + durationMs;
  const shapes: confetti.Shape[] = ['circle', 'square', getHeart()];

  confetti({
    particleCount: 70,
    spread: 100,
    startVelocity: 38,
    origin: { x: 0.5, y: 0.55 },
    colors: COLORS,
    shapes: [getHeart()],
    scalar: 1.4,
    disableForReducedMotion: true,
  });

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
      shapes,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
      shapes,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

