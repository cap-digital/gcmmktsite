"use client";

import { m, useReducedMotion } from "framer-motion";
import { site, telLink } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function Footer() {
  const rm = useReducedMotion() ?? false;

  const draw = (delay: number, duration: number) => ({
    initial: { scaleX: rm ? 1 : 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true, margin: "-40px" } as const,
    transition: rm ? { duration: 0 } : { duration, ease: EASE, delay },
  });

  return (
    <footer className="bg-ink">
      {/* Fio corrido que muda de espessura 80px depois de começar. */}
      <div className="flex items-end" aria-hidden="true">
        <m.span
          className="block h-[2px] w-20 origin-left bg-accent"
          {...draw(0, 0.3)}
        />
        <m.span
          className="block h-px min-w-0 flex-1 origin-left bg-rule"
          {...draw(0.1, 0.8)}
        />
      </div>

      <div className="mx-auto flex max-w-container flex-col gap-3 px-5 py-6 font-mono text-[12px] text-bone-dim sm:h-[72px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-0 lg:px-8">
        <p className="flex items-center gap-2">
          <span className="wdth-125 font-sans text-[14px] font-extrabold tracking-[-0.03em] text-bone">
            {site.shortName}
          </span>
          <span aria-hidden="true">·</span>
          <span>{site.footerLine}</span>
        </p>
        <a
          href={telLink}
          aria-label={`Ligar para ${site.phoneDisplay}`}
          className="inline-flex min-h-[44px] items-center tabular transition-colors duration-200 hover:text-bone sm:min-h-0"
        >
          {site.phoneDisplay}
        </a>
        <p className="tabular">
          © {site.footerYear} {site.name}
        </p>
      </div>
    </footer>
  );
}
