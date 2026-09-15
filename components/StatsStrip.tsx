"use client";

import { m, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { Rule } from "@/components/Rule";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

const CONTAINER = "mx-auto max-w-container px-5 sm:px-6 lg:px-8";

/**
 * Faixa de prova. Existe um número só na página inteira — a verba acumulada
 * em mídia paga — e ele mora aqui, com a ressalva ao lado.
 */
export function StatsStrip() {
  const rm = useReducedMotion() ?? false;
  const [stat] = site.stats;

  return (
    <div className="mt-14 lg:mt-20">
      <Rule />
      <div className={CONTAINER}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-6 sm:gap-x-6 lg:gap-x-8">
          <m.div
            className="col-span-12 pt-7 lg:col-span-6 lg:py-9"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={rm ? { duration: 0.2 } : { duration: 0.55, ease: EASE }}
          >
            <p className="t-stat-lg font-mono text-bone">
              <Counter
                to={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={1.8}
                trigger="inView"
              />
            </p>
            <p className="t-cond wdth-78 mt-4 text-bone-dim">{stat.label}</p>
          </m.div>

          <m.div
            className="relative col-span-12 border-t border-rule pt-5 pb-7 lg:col-start-8 lg:col-span-5 lg:flex lg:items-end lg:border-t-0 lg:pt-0 lg:py-9"
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              rm ? { duration: 0.2 } : { duration: 0.55, ease: EASE, delay: 0.1 }
            }
          >
            <m.span
              aria-hidden="true"
              className="absolute -left-4 top-0 hidden h-full w-px origin-top bg-rule lg:block"
              initial={{ scaleY: rm ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                rm ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: 0.08 }
              }
            />
            <p className="max-w-[62ch] font-mono text-[12px] leading-[1.55] text-bone-dim">
              {site.statsNote}
            </p>
          </m.div>
        </div>
      </div>
    </div>
  );
}
