"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Rule } from "@/components/Rule";
import { site, waLink } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function HowItWorks() {
  const rm = useReducedMotion() ?? false;

  return (
    <div id="como-funciona" className="scroll-mt-16 pt-6">
      <Rule tone="light" />
      <div className="grid grid-cols-12 gap-x-4 gap-y-8 pt-8 sm:gap-x-6 lg:gap-x-8">
        <p className="t-cond wdth-78 col-span-12 text-graphite lg:col-span-12">
          {site.howItWorks.label}
        </p>

        <ol className="col-span-12 grid grid-cols-12 gap-x-4 sm:gap-x-6 lg:gap-x-8">
          {site.steps.map((step, i) => (
            <m.li
              key={step.index}
              className="relative col-span-12 border-t border-rule-ink pt-5 lg:col-span-4 lg:border-t-0 lg:pt-0"
              initial={rm ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                rm
                  ? { duration: 0.2 }
                  : { duration: 0.5, ease: EASE, delay: i * 0.12 }
              }
            >
              {i > 0 && (
                <m.span
                  aria-hidden="true"
                  className="absolute -left-4 top-0 hidden h-full w-px origin-top bg-rule-ink lg:block"
                  initial={{ scaleY: rm ? 1 : 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={
                    rm ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: i * 0.08 }
                  }
                />
              )}
              <p className="t-label flex items-center gap-2 font-mono text-graphite">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent-ink" />
                {step.index}
              </p>
              <h3 className="t-h3 wdth-100 lg:wdth-106 mt-3 text-ink">
                {step.title}
              </h3>
              <p className="t-body wdth-100 mt-3 text-graphite">{step.text}</p>
            </m.li>
          ))}
        </ol>

        <div className="col-span-12 flex lg:col-start-9 lg:col-span-4 lg:justify-end">
          <Button
            href={waLink(site.diagnosisMessage)}
            external
            variant="rule"
            tone="light"
          >
            {site.howItWorks.cta}
            <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
