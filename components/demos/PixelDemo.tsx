"use client";

import { m, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

/** Tabela de conferência estática: sem rolagem, sem loop. */
export function PixelDemo() {
  const rm = useReducedMotion() ?? false;
  const t = site.trackingTable;

  return (
    <div className="pb-9">
      <div className="border-t border-rule-ink">
        {t.rows.map((row, i) => (
          <div
            key={row.event}
            className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-b border-rule-ink py-2.5 font-mono text-[12px] uppercase tracking-[0.04em]"
          >
            <span className="text-ink">{row.event}</span>
            <span className="text-graphite">{row.to}</span>
            <span className="relative flex h-4 w-[34px] items-center justify-end">
              <m.span
                aria-hidden="true"
                className="absolute right-0 text-graphite"
                initial={{ opacity: rm ? 0 : 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  rm ? { duration: 0 } : { duration: 0.25, delay: i * 0.3 }
                }
              >
                {t.pending}
              </m.span>
              <m.span
                className="absolute right-0 flex items-center gap-1.5 font-medium text-ink"
                initial={{ opacity: rm ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  rm ? { duration: 0 } : { duration: 0.25, delay: i * 0.3 }
                }
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent-ink" />
                {t.ok}
              </m.span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[12px] text-graphite">{t.note}</p>
    </div>
  );
}
