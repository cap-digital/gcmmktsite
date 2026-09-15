"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/Counter";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

/**
 * Painel de operação do hero. É equipamento de campo, não dashboard:
 * placa de identificação, figura única e duas fichas de roster. Uma chapa
 * cheia (a placa), todo o resto é fio de 1px. Raio 0, sem sombra, sem vidro,
 * sem desfoque, sem gradiente.
 *
 * REGRA: aqui só entra o que é verificável — a verba acumulada em mídia paga,
 * as plataformas que operamos e a stack que usamos. Nenhuma média, nenhum
 * percentual, nenhuma série, nenhuma nota, nenhuma data ou hora.
 */

const panel = site.panel;

const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Fio + rótulo de bloco. */
function BlockHead({ label, unit }: { label: string; unit: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-rule-strong pt-3">
      <span className="t-cond wdth-78 text-bone-dim">{label}</span>
      <span className="t-cond wdth-78 text-bone-dim">{unit}</span>
    </div>
  );
}

/** Linha de roster: marcador de 1 quadrado, nome em mono, fio embaixo. */
function RosterRow({
  name,
  delay,
  rm,
}: {
  name: string;
  delay: number;
  rm: boolean;
}) {
  return (
    <m.li
      className="flex min-w-0 items-center gap-2.5 border-b border-rule py-[7px]"
      initial={{ opacity: rm ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={rm ? { duration: 0 } : { duration: 0.35, ease: EASE, delay }}
    >
      <span aria-hidden="true" className="h-[3px] w-[3px] shrink-0 bg-sage" />
      <span className="min-w-0 font-mono text-[11px] uppercase leading-[1.3] tracking-[0.06em] text-bone">
        {name}
      </span>
    </m.li>
  );
}

export function PanelOperacao() {
  const rm = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallax = wide && !rm ? [40, -40] : [0, 0];
  const y = useTransform(scrollYProgress, [0, 1], parallax);

  // Parallax só no desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref}>
      <m.div style={{ y }} className="will-change-transform">
        <m.div
          initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={rm ? { duration: 0.2 } : { duration: 0.55, ease: EASE }}
        >
          <h2 className="sr-only">{panel.srTitle}</h2>

          {/* A — Placa de identificação */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 bg-ink-2 px-3 py-2 lg:px-4 lg:py-2.5">
            <span className="flex shrink-0 items-center gap-2.5">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-accent" />
              <span className="t-cond wdth-78 text-bone">{panel.label}</span>
            </span>
            <span className="t-cond wdth-78 basis-full text-left text-accent sm:basis-auto sm:text-right">
              {panel.status}
            </span>
          </div>

          {/* B — Figura principal */}
          <div className="mt-4">
            <p className="t-cond wdth-78 text-bone-dim">{panel.figureLabel}</p>
            <p className="t-figure mt-2 font-mono text-bone">
              <Counter
                to={panel.figureValue}
                decimals={0}
                prefix={panel.figurePrefix}
                suffix={panel.figureSuffix}
                duration={1.8}
                delay={0.1}
                trigger="inView"
              />
            </p>
            <p className="mt-2 font-mono text-[11px] leading-[1.4] tracking-[0.06em] text-bone-dim">
              {panel.figureNote}
            </p>
          </div>

          {/* C — Plataformas: roster aberto, sem percentual e sem barra */}
          <div className="mt-5">
            <BlockHead label={panel.platformsLabel} unit={panel.platformsUnit} />
            <ul className="mt-2">
              {panel.platforms.map((name, i) => (
                <RosterRow
                  key={name}
                  name={name}
                  delay={0.18 + i * 0.04}
                  rm={rm}
                />
              ))}
            </ul>
            <p className="mt-2.5 flex min-w-0 items-center gap-2.5 font-mono text-[11px] uppercase leading-[1.3] tracking-[0.06em] text-accent">
              <span
                aria-hidden="true"
                className="h-[3px] w-[3px] shrink-0 bg-accent"
              />
              {panel.platformsOpen}
            </p>
          </div>

          {/* D — Stack */}
          <div className="mt-5">
            <BlockHead label={panel.stackLabel} unit={panel.stackUnit} />
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {panel.stack.map((name, i) => (
                <RosterRow
                  key={name}
                  name={name}
                  delay={0.24 + i * 0.03}
                  rm={rm}
                />
              ))}
            </ul>
          </div>

          {/* E — Rodapé do painel */}
          <div className="mt-5 border-t border-rule pt-3">
            <p className="font-mono text-[11px] leading-[1.5] text-bone-dim">
              {panel.footnote}
            </p>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
