import { useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useRunawayPosition } from '../../hooks/useRunawayPosition';

interface RunawayButtonProps {
  /** messages[0] is the initial label; the rest rotate on every escape */
  messages: string[];
  /** The "Đồng ý" button — the runaway button never lands on it */
  avoidRef: RefObject<HTMLElement>;
  /** Called with the total number of escapes so the parent can react (e.g. grow "Đồng ý") */
  onEscape?: (count: number) => void;
}

const baseClass =
  'whitespace-nowrap rounded-full border border-taupe/40 bg-cream-50/80 px-7 py-3 text-sm font-medium tracking-wide text-taupe backdrop-blur-sm transition-colors hover:border-taupe/60';

const pickLabel = (messages: string[], count: number) => {
  if (count === 0 || messages.length < 2) return messages[0];
  return messages[1 + ((count - 1) % (messages.length - 1))];
};

export function RunawayButton({ messages, avoidRef, onEscape }: RunawayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const { hasMoved, start, position, runAway } = useRunawayPosition({ buttonRef, avoidRef });

  const escape = () => {
    runAway();
    const next = count + 1;
    setCount(next);
    onEscape?.(next);
  };

  const label = pickLabel(messages, count);

  if (!hasMoved || !start || !position) {
    return (
      <button
        ref={buttonRef}
        type="button"
        className={baseClass}
        onMouseEnter={escape}
        onClick={escape}
      >
        {label}
      </button>
    );
  }

  return (
    <>
      {/* Keeps the original slot so the "Đồng ý" button doesn't shift */}
      <span aria-hidden className={`${baseClass} invisible`}>
        {messages[0]}
      </span>
      {createPortal(
        <motion.button
          ref={buttonRef}
          type="button"
          className={`${baseClass} fixed left-0 top-0 z-50 shadow-editorial`}
          initial={{ x: start.x, y: start.y }}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          onMouseEnter={escape}
          onClick={escape}
        >
          {label}
        </motion.button>,
        document.body,
      )}
    </>
  );
}
