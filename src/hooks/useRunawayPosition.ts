import { useCallback, useEffect, useState, type RefObject } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

export interface RunawayOptions {
  viewport: Size;
  button: Size;
  current: Point;
  /** Area the button must never land on (the "Đồng ý" button) */
  avoid?: Rect;
  /** Minimum gap to the viewport edges */
  padding?: number;
  /** Minimum jump distance so the move is clearly visible */
  minDistance?: number;
  /** Extra gap kept around the avoided rect */
  avoidPadding?: number;
  maxAttempts?: number;
  random?: () => number;
}

const SAFE_PADDING = 48;
const MIN_DISTANCE = 150;
const AVOID_PADDING = 24;
const MAX_ATTEMPTS = 20;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const intersects = (a: Rect, b: Rect, gap: number) =>
  a.x < b.x + b.width + gap &&
  a.x + a.width + gap > b.x &&
  a.y < b.y + b.height + gap &&
  a.y + a.height + gap > b.y;

/** Valid top-left range for the button inside the viewport (centered if the viewport is too small). */
const getBounds = (viewport: Size, button: Size, padding: number) => {
  const minX = padding;
  const minY = padding;
  const maxX = viewport.width - button.width - padding;
  const maxY = viewport.height - button.height - padding;
  const centerX = Math.max(0, (viewport.width - button.width) / 2);
  const centerY = Math.max(0, (viewport.height - button.height) / 2);
  return {
    minX: maxX >= minX ? minX : centerX,
    maxX: maxX >= minX ? maxX : centerX,
    minY: maxY >= minY ? minY : centerY,
    maxY: maxY >= minY ? maxY : centerY,
  };
};

/** Keeps an existing position inside the viewport (used on resize). */
export function clampToViewport(point: Point, viewport: Size, button: Size, padding = SAFE_PADDING): Point {
  const b = getBounds(viewport, button, padding);
  return { x: clamp(point.x, b.minX, b.maxX), y: clamp(point.y, b.minY, b.maxY) };
}

/**
 * Picks a random top-left position for the runaway button that:
 *  1. stays fully inside the viewport (with padding),
 *  2. is at least `minDistance` away from the current position,
 *  3. does not overlap the avoided rect.
 * Falls back to the best candidate found if no sample satisfies every rule.
 */
export function pickRunawayPosition({
  viewport,
  button,
  current,
  avoid,
  padding = SAFE_PADDING,
  minDistance = MIN_DISTANCE,
  avoidPadding = AVOID_PADDING,
  maxAttempts = MAX_ATTEMPTS,
  random = Math.random,
}: RunawayOptions): Point {
  const b = getBounds(viewport, button, padding);

  let best: { point: Point; score: number } | null = null;

  for (let i = 0; i < maxAttempts; i++) {
    const point = {
      x: b.minX + random() * (b.maxX - b.minX),
      y: b.minY + random() * (b.maxY - b.minY),
    };
    const distance = Math.hypot(point.x - current.x, point.y - current.y);
    const collides = avoid ? intersects({ ...point, ...button }, avoid, avoidPadding) : false;

    if (!collides && distance >= minDistance) return point;

    // Prefer non-colliding candidates, then the farthest one.
    const score = (collides ? 0 : 1_000_000) + distance;
    if (!best || score > best.score) best = { point, score };
  }

  return best!.point;
}

/** Reserve enough width for the longest teasing label so it never overflows after changing text. */
const MIN_BUTTON_BUDGET: Size = { width: 380, height: 52 };

interface UseRunawayPositionArgs {
  buttonRef: RefObject<HTMLElement>;
  avoidRef?: RefObject<HTMLElement>;
}

interface RunawayState {
  /** Where the fixed button starts (its original in-flow position) */
  start: Point;
  /** Current target position */
  position: Point;
}

export function useRunawayPosition({ buttonRef, avoidRef }: UseRunawayPositionArgs) {
  const [state, setState] = useState<RunawayState | null>(null);

  const getButtonSize = useCallback((): Size => {
    const rect = buttonRef.current?.getBoundingClientRect();
    return {
      width: Math.max(rect?.width ?? 0, MIN_BUTTON_BUDGET.width),
      height: Math.max(rect?.height ?? 0, MIN_BUTTON_BUDGET.height),
    };
  }, [buttonRef]);

  const runAway = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const avoidRect = avoidRef?.current?.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    setState((prev) => {
      const current = prev?.position ?? { x: rect.left, y: rect.top };
      const position = pickRunawayPosition({
        viewport,
        button: getButtonSize(),
        current,
        avoid: avoidRect
          ? { x: avoidRect.left, y: avoidRect.top, width: avoidRect.width, height: avoidRect.height }
          : undefined,
      });
      return { start: prev?.start ?? current, position };
    });
  }, [avoidRef, buttonRef, getButtonSize]);

  // Pull the button back inside the viewport when the window is resized.
  useEffect(() => {
    if (!state) return;
    const onResize = () => {
      setState((prev) =>
        prev
          ? {
              ...prev,
              position: clampToViewport(
                prev.position,
                { width: window.innerWidth, height: window.innerHeight },
                getButtonSize(),
              ),
            }
          : prev,
      );
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [state, getButtonSize]);

  return {
    hasMoved: state !== null,
    start: state?.start ?? null,
    position: state?.position ?? null,
    runAway,
  };
}

