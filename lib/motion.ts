import type { Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const VIEWPORT = { once: true, margin: "-80px" } as const;

export function fadeUp(
  rm: boolean,
  y = 16,
  duration = 0.55,
  delay = 0,
): Variants {
  if (rm) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2, delay } },
    };
  }
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
  };
}

export function stagger(staggerChildren = 0.08, delayChildren = 0.1): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  };
}

/**
 * Primitiva única de revelação de traço: todo fio, medidor, barra e a
 * polilinha do sparkline crescem por scaleX com origem à esquerda.
 */
export function drawX(
  rm: boolean,
  to = 1,
  duration = 0.55,
  delay = 0,
): Variants {
  if (rm) {
    return { hidden: { scaleX: to }, show: { scaleX: to } };
  }
  return {
    hidden: { scaleX: 0 },
    show: { scaleX: to, transition: { duration, ease: EASE, delay } },
  };
}
