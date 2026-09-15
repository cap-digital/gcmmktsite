"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AbDemo } from "@/components/demos/AbDemo";
import { PixelDemo } from "@/components/demos/PixelDemo";
import { PlatformGrid } from "@/components/PlatformGrid";
import { Rule } from "@/components/Rule";
import { site, waLink } from "@/lib/site";
import type { Service } from "@/lib/site";
import { EASE } from "@/lib/motion";

type Props = { service: Service; index: number };

/** Palavra do título com o bloco de acento varrendo por trás no hover. */
function SweepWord({ word }: { word: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative px-[0.06em]">{word}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full overflow-hidden transition-transform duration-[250ms] group-hover:translate-x-0 group-focus-within:translate-x-0 motion-reduce:transition-none"
      >
        <span className="block h-full translate-x-full bg-accent-ink px-[0.06em] text-bone transition-transform duration-[250ms] group-hover:translate-x-0 group-focus-within:translate-x-0 motion-reduce:transition-none">
          {word}
        </span>
      </span>
    </span>
  );
}

function Title({ title, accentWord }: { title: string; accentWord: string | null }) {
  if (!accentWord) return <>{title}</>;
  const tokens = title.split(" ");
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i}>
          {token === accentWord ? <SweepWord word={token} /> : token}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function ServiceRow({ service, index }: Props) {
  const rm = useReducedMotion() ?? false;

  return (
    <m.article
      className="group"
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        rm
          ? { duration: 0.2 }
          : { duration: 0.55, ease: EASE, delay: index * 0.08 }
      }
    >
      <Rule tone="light-strong" delay={index * 0.05} />

      <div className="transition-transform duration-[250ms] group-hover:translate-x-2 group-focus-within:translate-x-2 motion-reduce:transform-none motion-reduce:transition-none">
        <div className="grid grid-cols-12 gap-x-4 gap-y-4 py-6 sm:gap-x-6 lg:gap-x-8 lg:py-7">
          <p
            className="t-label col-span-12 font-mono text-graphite transition-colors duration-200 group-hover:text-accent-ink lg:col-span-1"
            style={{ textIndent: "-0.24em" }}
          >
            {service.index}
          </p>

          <h3 className="t-h3 wdth-100 lg:wdth-106 col-span-12 text-ink lg:col-start-2 lg:col-span-4">
            <span className="relative inline after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent-ink after:transition-transform after:duration-[250ms] after:content-[''] group-hover:after:scale-x-100 group-focus-within:after:scale-x-100 motion-reduce:after:transition-none">
              <Title title={service.title} accentWord={service.accentWord} />
            </span>
          </h3>

          <p className="t-body wdth-100 col-span-12 text-graphite lg:col-start-6 lg:col-span-3">
            {service.description}
          </p>

          <div className="col-span-12 lg:col-start-9 lg:col-span-4">
            <ul>
              {service.bullets.map((bullet, i) => (
                <m.li
                  key={bullet}
                  className="border-b border-rule-ink py-1.5 text-[15px] leading-[1.5] text-ink first:border-t first:border-rule-ink lg:first:border-t-0 lg:first:pt-0"
                  initial={rm ? { opacity: 0 } : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={
                    rm
                      ? { duration: 0.2 }
                      : { duration: 0.4, ease: EASE, delay: 0.1 + i * 0.05 }
                  }
                >
                  {bullet}
                </m.li>
              ))}
            </ul>
            <a
              href={waLink(service.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative mt-3 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-ink after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:bg-rule-ink after:content-[''] before:absolute before:inset-x-0 before:bottom-2.5 before:h-[2px] before:origin-left before:scale-x-0 before:bg-accent-ink before:transition-transform before:duration-[250ms] before:content-[''] hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none"
            >
              {site.serviceCta}
              <ArrowUpRight
                size={14}
                strokeWidth={1.25}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </div>

      {service.block === "platforms" && <PlatformGrid />}
      {service.block === "pixel" && <PixelDemo />}
      {service.block === "ab" && <AbDemo />}
    </m.article>
  );
}
