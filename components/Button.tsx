"use client";

import type { ReactNode } from "react";

type Variant = "solid" | "rule";
type Tone = "dark" | "light";

type ButtonProps = {
  href: string;
  variant?: Variant;
  tone?: Tone;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Retângulo duro: raio 0, sem sombra, sem brilho, sem varredura.
 * "solid" preenche com o acento; "rule" é texto com fio embaixo.
 */
const SOLID =
  "inline-flex items-center justify-center gap-2 rounded-none bg-accent px-6 text-[0.9375rem] font-semibold leading-none text-on-accent transition-colors duration-200 hover:bg-accent-hover active:bg-accent-press min-h-[44px]";

const RULE_BASE =
  "group relative inline-flex items-center gap-2 rounded-none text-[0.9375rem] font-medium leading-none min-h-[44px] " +
  "after:absolute after:inset-x-0 after:bottom-[10px] after:h-px after:content-[''] " +
  "before:absolute before:inset-x-0 before:bottom-[10px] before:h-[2px] before:origin-left before:scale-x-0 before:transition-transform before:duration-[250ms] before:content-[''] " +
  "hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none";

const RULE_TONE: Record<Tone, string> = {
  dark: "text-bone after:bg-rule before:bg-accent",
  light: "text-ink after:bg-rule-ink before:bg-accent-ink",
};

export function Button({
  href,
  variant = "solid",
  tone = "dark",
  external = false,
  className = "",
  children,
  ariaLabel,
}: ButtonProps) {
  const cls =
    variant === "solid" ? SOLID : `${RULE_BASE} ${RULE_TONE[tone]}`;

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${cls} ${className}`}
    >
      {children}
    </a>
  );
}
