"use client";

import { m, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

/**
 * Ilustração do formato de um teste A/B: duas variantes, uma barra cada.
 * Não há número nenhum aqui — nem taxa, nem sessão, nem ganho. As proporções
 * são decoração e não representam resultado de conta nenhuma.
 */
export function AbDemo() {
  const rm = useReducedMotion() ?? false;
  const bars = [
    { ...site.abTest.a, fill: "bg-graphite" },
    { ...site.abTest.b, fill: "bg-accent-ink" },
  ];

  return (
    <div className="pb-9">
      <div className="border-t border-rule-ink pt-5">
        {bars.map((bar, i) => (
          <div
            key={bar.label}
            className="flex items-center gap-3 py-2 font-mono text-[13px] tabular text-ink"
          >
            <span className="w-3 shrink-0 font-medium">{bar.label}</span>
            <span className="relative h-[3px] min-w-0 flex-1">
              <span className="absolute inset-0 bg-rule-ink" />
              <m.span
                aria-hidden="true"
                className={`absolute inset-0 origin-left ${bar.fill}`}
                initial={{ scaleX: rm ? bar.scale : 0 }}
                whileInView={{ scaleX: bar.scale }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  rm
                    ? { duration: 0 }
                    : { duration: 0.7, ease: EASE, delay: i * 0.12 }
                }
              />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[12px] text-graphite">
        {site.abTest.note}
      </p>
    </div>
  );
}
