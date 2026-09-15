"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/Button";
import { LightPillar } from "@/components/LightPillar";
import { PanelOperacao } from "@/components/PanelOperacao";
import { Rule } from "@/components/Rule";
import { SplitWords } from "@/components/SplitWords";
import { StatsStrip } from "@/components/StatsStrip";
import { site, telLink, waLink } from "@/lib/site";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const rm = useReducedMotion() ?? false;
  const item = fadeUp(rm, 16, 0.55);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink"
    >
      <LightPillar
        topColor="#9AA75F"
        bottomColor="#3F4A1E"
        intensity={0.52}
        glowAmount={0.0038}
        pillarWidth={2.2}
        pillarRotation={-16}
        rotationSpeed={0.22}
        noiseIntensity={0.35}
        scrim="linear-gradient(100deg, rgba(14,17,15,0.62) 0%, rgba(14,17,15,0.56) 42%, rgba(14,17,15,0.34) 64%, rgba(14,17,15,0.06) 100%)"
      />

      <Rule />

      <div className="mx-auto max-w-container px-5 pb-4 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-12">
        {/* Duas colunas de verdade a partir de lg: todo o texto à esquerda,
            painel à direita, os dois começando na mesma linha de topo. */}
        <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 lg:gap-x-12 xl:gap-x-16">
          <div className="col-span-12 min-w-0 lg:col-span-7">
            <m.p
              className="t-label flex items-start gap-2.5 font-mono text-bone-dim"
              variants={item}
              initial="hidden"
              animate="show"
            >
              <span
                aria-hidden="true"
                className="mt-[3px] h-2 w-2 shrink-0 bg-accent"
              />
              {site.hero.eyebrow}
            </m.p>

            <div className="mt-5">
              <SplitWords
                as="h1"
                id="hero-title"
                mode="mount"
                lines={site.hero.titleLines}
                label={site.hero.titleLabel}
                accentWord={site.hero.accentWord}
                delay={0.15}
                className="t-display wdth-100 sm:wdth-106 lg:wdth-106 xl:wdth-112 text-bone"
              />
            </div>

            <m.div
              className="mt-5"
              variants={stagger(0.08, 0.25)}
              initial="hidden"
              animate="show"
            >
              <m.p variants={item} className="t-lead wdth-100 text-bone-dim">
                {site.hero.lead}
              </m.p>

              <m.div
                variants={item}
                className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
              >
                <Button
                  href={waLink()}
                  external
                  className="h-[52px] w-full sm:h-14 sm:w-auto"
                >
                  {site.hero.ctaPrimary}
                </Button>
                <Button href="#servicos" variant="rule" className="self-start">
                  {site.hero.ctaSecondary}
                  <ArrowDown size={14} strokeWidth={1.25} aria-hidden="true" />
                </Button>
              </m.div>

              <m.p
                variants={item}
                className="mt-5 font-mono text-[12px] leading-[1.6] text-bone-dim"
              >
                {site.hero.microcopyBefore}{" "}
                <a
                  href={telLink}
                  aria-label={`Ligar para ${site.phoneDisplay}`}
                  className="inline-flex min-h-[44px] items-center tabular text-bone transition-colors duration-200 hover:text-accent"
                >
                  {site.phoneDisplay}
                </a>
              </m.p>
            </m.div>
          </div>

          <div className="col-span-12 min-w-0 mt-10 lg:col-span-5 lg:mt-0">
            <PanelOperacao />
          </div>
        </div>
      </div>

      <StatsStrip />
    </section>
  );
}
