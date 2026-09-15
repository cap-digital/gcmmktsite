"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  margin?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  duration = 0.55,
  margin = "-80px",
}: RevealProps) {
  const rm = useReducedMotion() ?? false;
  return (
    <m.div
      className={className}
      initial={rm ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={rm ? { duration: 0.2 } : { duration, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
