"use client";

import { m, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

type Tone = "dark" | "light";

type SplitWordsProps = {
  as: "h1" | "h2";
  id?: string;
  /** Quebras de linha escritas à mão em lib/site.ts. */
  lines: readonly string[];
  label: string;
  mode?: "mount" | "inView";
  /** "lines" revela linha a linha dentro de máscara; "block" revela de uma vez. */
  variant?: "lines" | "block";
  /** Palavra que recebe o bloco de acento varrendo por trás dela. */
  accentWord?: string | null;
  tone?: Tone;
  delay?: number;
  className?: string;
};

const PUNCT = /[.,;:!?]+$/;

function AccentWord({
  word,
  tone,
  delay,
  mode,
  rm,
}: {
  word: string;
  tone: Tone;
  delay: number;
  mode: "mount" | "inView";
  rm: boolean;
}) {
  const bg = tone === "light" ? "bg-accent-ink" : "bg-accent";
  const fg = tone === "light" ? "text-bone" : "text-on-accent";

  if (rm) {
    return <span className={`inline-block px-[0.06em] ${bg} ${fg}`}>{word}</span>;
  }

  const run =
    mode === "mount"
      ? { animate: { x: "0%" } }
      : {
          whileInView: { x: "0%" },
          viewport: { once: true, margin: "-80px" } as const,
        };
  const transition = { duration: 0.45, ease: EASE, delay };

  return (
    <span className="relative inline-block">
      <span className="relative px-[0.06em]">{word}</span>
      <m.span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        initial={{ x: "-100%" }}
        transition={transition}
        {...run}
      >
        <m.span
          className={`block h-full px-[0.06em] ${bg} ${fg}`}
          initial={{ x: "100%" }}
          transition={transition}
          {...run}
        >
          {word}
        </m.span>
      </m.span>
    </span>
  );
}

function Line({
  line,
  accentWord,
  tone,
  accentDelay,
  mode,
  rm,
}: {
  line: string;
  accentWord: string | null;
  tone: Tone;
  accentDelay: number;
  mode: "mount" | "inView";
  rm: boolean;
}) {
  if (!accentWord) return <>{line}</>;
  const tokens = line.split(" ");
  return (
    <>
      {tokens.map((token, i) => {
        const bare = token.replace(PUNCT, "");
        const trail = token.slice(bare.length);
        const space = i < tokens.length - 1 ? " " : "";
        if (bare !== accentWord) return <span key={i}>{token + space}</span>;
        return (
          <span key={i}>
            <AccentWord
              word={bare}
              tone={tone}
              delay={accentDelay}
              mode={mode}
              rm={rm}
            />
            {trail}
            {space}
          </span>
        );
      })}
    </>
  );
}

export function SplitWords({
  as,
  id,
  lines,
  label,
  mode = "inView",
  variant = "lines",
  accentWord = null,
  tone = "dark",
  delay = 0.15,
  className = "",
}: SplitWordsProps) {
  const rm = useReducedMotion() ?? false;
  const Tag = m[as];
  const accentDelay = delay + lines.length * 0.1 + 0.3;

  const run =
    mode === "mount"
      ? { animate: "show" }
      : {
          whileInView: "show",
          viewport: { once: true, margin: "-100px" } as const,
        };

  const body = lines.map((line, i) => (
    <span key={i} className="mask-line block" aria-hidden="true">
      {variant === "lines" && !rm ? (
        <m.span
          className="block"
          variants={{
            hidden: { y: "100%", opacity: 0 },
            show: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, ease: EASE },
            },
          }}
        >
          <Line
            line={line}
            accentWord={accentWord}
            tone={tone}
            accentDelay={accentDelay}
            mode={mode}
            rm={rm}
          />
        </m.span>
      ) : (
        <span className="block">
          <Line
            line={line}
            accentWord={accentWord}
            tone={tone}
            accentDelay={accentDelay}
            mode={mode}
            rm={rm}
          />
        </span>
      )}
    </span>
  ));

  const container: Variants =
    variant === "lines" && !rm
      ? {
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
        }
      : {
          hidden: { opacity: 0, ...(rm ? {} : { y: 14 }) },
          show: {
            opacity: 1,
            y: 0,
            transition: rm
              ? { duration: 0.25, delay }
              : { duration: 0.6, ease: EASE, delay },
          },
        };

  return (
    <Tag
      id={id}
      aria-label={label}
      className={className}
      variants={container}
      initial="hidden"
      {...run}
    >
      {body}
    </Tag>
  );
}
