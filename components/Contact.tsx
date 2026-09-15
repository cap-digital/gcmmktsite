"use client";

import { m, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Rule } from "@/components/Rule";
import { SplitWords } from "@/components/SplitWords";
import { site, telLink, waLink } from "@/lib/site";
import { EASE } from "@/lib/motion";

const CONTAINER = "mx-auto max-w-container px-5 sm:px-6 lg:px-8";

export function Contact() {
  const rm = useReducedMotion() ?? false;

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-ink">
      <Rule />

      {/* Área de silêncio: só o fio, o marcador e preto. */}
      <div className={CONTAINER}>
        <p className="t-label pt-4 font-mono text-bone-dim">
          {site.contact.marker}
        </p>
      </div>
      <div aria-hidden="true" className="h-[92px] lg:h-[164px]" />

      <div className={`${CONTAINER} pb-16 lg:pb-24`}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-14 sm:gap-x-6 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="t-label font-mono text-bone-dim">
                {site.contact.number}
              </p>
              <span
                aria-hidden="true"
                className="mt-3 block h-[2px] w-6 bg-accent"
              />
            </Reveal>

            <div className="mt-7 lg:w-[124%]">
              <SplitWords
                as="h2"
                id="contato-title"
                lines={site.contact.titleLines}
                label={site.contact.titleLabel}
                variant="block"
                className="t-h2 wdth-100 sm:wdth-112 lg:wdth-118 text-bone"
              />
            </div>

            <Reveal delay={0.12}>
              <p className="t-lead wdth-100 mt-7 text-bone-dim lg:w-5/6">
                {site.contact.lead}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-9">
              <a
                href={waLink(site.contactMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center rounded-none bg-accent px-6 text-[0.9375rem] font-semibold leading-none text-on-accent transition-colors duration-200 hover:bg-accent-hover active:bg-accent-press lg:w-2/3"
              >
                {site.contact.cta}
              </a>
              <p className="mt-3 font-mono text-[12px] text-bone-dim">
                {site.contact.ctaNote}
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-10">
              <p className="t-cond wdth-78 text-bone-dim">
                {site.contact.phoneLabel}
              </p>
              <a
                href={telLink}
                aria-label={`Ligar para ${site.phoneDisplay}`}
                className="mt-1 inline-flex min-h-[44px] items-center font-mono text-[24px] font-medium tabular leading-none text-bone transition-colors duration-200 hover:text-accent"
              >
                {site.phoneDisplay}
              </a>
              <p className="font-mono text-[12px] leading-[1.6] text-bone-dim">
                {site.hours}
              </p>
            </Reveal>

            <dl className="mt-10 border-t border-rule">
              {site.guarantees.map((g, i) => (
                <m.div
                  key={g.key}
                  className="dot-leader min-h-[44px] border-b border-rule py-3 text-bone-dim"
                  initial={rm ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={
                    rm
                      ? { duration: 0.2 }
                      : { duration: 0.4, ease: EASE, delay: i * 0.06 }
                  }
                >
                  <dt className="t-kv shrink-0 font-mono">{g.key}</dt>
                  <span aria-hidden="true" className="dot-leader-fill" />
                  <dd className="dot-leader-value t-kv shrink-0 whitespace-nowrap text-right font-mono font-medium text-bone">
                    {g.value}
                  </dd>
                </m.div>
              ))}
            </dl>
          </div>

          <div className="col-span-12 lg:col-start-8 lg:col-span-5 lg:mt-24">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
