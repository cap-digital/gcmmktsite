"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Tone = "dark" | "light" | "light-strong";

const TONE: Record<Tone, string> = {
  dark: "bg-rule",
  light: "bg-rule-ink",
  "light-strong": "bg-rule-ink-strong",
};

type RuleProps = {
  /** "dark" = fio sobre ink; "light"/"light-strong" = fio sobre o papel cáqui. */
  tone?: Tone;
  delay?: number;
  className?: string;
};

/**
 * Fio de 1px que se desenha da esquerda para a direita.
 * Como filho direto de uma <section> ele sangra de borda a borda da viewport;
 * dentro do container ele respeita a grade do texto.
 */
export function Rule({ tone = "dark", delay = 0, className = "" }: RuleProps) {
  const rm = useReducedMotion() ?? false;
  return (
    <m.div
      aria-hidden="true"
      className={`rule-x h-px w-full ${TONE[tone]} ${className}`}
      initial={{ scaleX: rm ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={rm ? { duration: 0 } : { duration: 0.55, ease: EASE, delay }}
    />
  );
}
