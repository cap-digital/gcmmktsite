"use client";

import { m, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

/** Marquee em movimento não se lê. A amplitude precisa ser legível. */
export function PlatformGrid() {
  const rm = useReducedMotion() ?? false;
  return (
    <div className="pb-9">
      <div className="-ml-px overflow-hidden border-t border-rule-ink">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {site.platformGrid.map((name, i) => (
            <m.p
              key={name}
              className="border-b border-l border-rule-ink bg-paper-2 py-3 pl-4 font-mono text-[13px] uppercase tracking-[0.04em] text-ink"
              initial={{ opacity: rm ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={rm ? { duration: 0 } : { duration: 0.3, delay: i * 0.04 }}
            >
              {name}
            </m.p>
          ))}
        </div>
      </div>
      <p className="mt-4 max-w-[52ch] font-mono text-[12px] leading-[1.6] text-graphite">
        {site.platformGridNote}
      </p>
    </div>
  );
}
