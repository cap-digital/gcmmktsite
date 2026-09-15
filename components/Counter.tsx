"use client";

import {
  m,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE } from "@/lib/motion";

type CounterProps = {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  trigger?: "mount" | "inView";
  className?: string;
};

export function formatNumber(value: number, decimals: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function Counter({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  delay = 0,
  trigger = "mount",
  className = "",
}: CounterProps) {
  const rm = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(to);
  const text = useTransform(mv, (v) => `${prefix}${formatNumber(v, decimals)}${suffix}`);
  const finalText = `${prefix}${formatNumber(to, decimals)}${suffix}`;
  const shouldRun = trigger === "mount" || inView;

  useEffect(() => {
    if (rm) {
      mv.set(to);
      return;
    }
    if (!shouldRun) {
      mv.set(from);
      return;
    }
    mv.set(from);
    const controls = animate(mv, to, { duration, delay, ease: EASE });
    return () => controls.stop();
  }, [rm, shouldRun, mv, from, to, duration, delay]);

  return (
    <m.span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      style={{ minWidth: `${finalText.length}ch` }}
    >
      {text}
    </m.span>
  );
}
