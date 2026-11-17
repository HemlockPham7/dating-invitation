import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/** Small magazine-style label, e.g. "STOP 02 • BIRTHDAY DINNER". */
export function Badge({ children, icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-rose-accent/25 bg-blush-100/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-rose-accent ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

