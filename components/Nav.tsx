"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function Nav() {
  const rm = useReducedMotion() ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));
  useEffect(() => setScrolled(scrollY.get() > 8), [scrollY]);

  // Um instrumento por viewport: no celular quem marca posição é o trilho.
  useEffect(() => {
    const sections = site.sectionRail
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = sections.indexOf(entry.target as HTMLElement);
          if (i >= 0) setCurrent(i);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    for (const el of sections) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <m.header
        initial={rm ? { opacity: 0 } : { opacity: 0, y: -12 }}
        animate={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={rm ? { duration: 0.2 } : { duration: 0.45, ease: EASE }}
        className="sticky top-0 z-40 bg-ink"
      >
        <div className="relative mx-auto flex h-14 max-w-container items-center justify-between px-5 sm:px-6 md:h-16 lg:px-8">
          <a
            href="#inicio"
            aria-label={`${site.name}, voltar ao início`}
            className="inline-flex min-h-[44px] items-center gap-2.5"
          >
            <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-accent" />
            <span className="t-wordmark wdth-125 text-bone">
              {site.shortName}
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden md:flex md:items-center md:gap-8"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative inline-flex min-h-[44px] items-center text-[15px] text-bone-dim transition-colors duration-200 hover:text-bone after:absolute after:inset-x-0 after:bottom-3 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-none bg-accent px-4 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover active:bg-accent-press md:inline-flex"
          >
            {site.hero.ctaPrimary}
          </a>

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="t-cond wdth-78 inline-flex h-11 min-w-[44px] items-center justify-center rounded-none bg-accent px-3 text-on-accent md:hidden"
          >
            WHATSAPP
          </a>

          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-px bg-rule transition-opacity duration-200 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <m.span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 hidden h-[2px] origin-left bg-accent lg:block"
            style={{ scaleX: rm ? 1 : scrollYProgress }}
          />
        </div>
      </m.header>

      {/* Trilho de seções: 44px, rola junto com a página, sem overflow-x. */}
      <nav
        aria-label="Seções da página"
        className="border-y border-rule bg-ink md:hidden"
      >
        <ol className="mx-auto flex h-11 max-w-container items-stretch justify-between px-5 sm:px-6">
          {site.sectionRail.map((s, i) => (
            <li key={s.id} className="relative flex items-stretch">
              {i === current && (
                <span
                  aria-hidden="true"
                  className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-accent"
                />
              )}
              <a
                href={s.href}
                aria-current={i === current ? "true" : undefined}
                className={`inline-flex items-center font-mono text-[12px] uppercase tracking-[0.06em] ${
                  i === current ? "text-bone" : "text-bone-dim"
                }`}
              >
                <span className="tabular">{s.index}</span>
                <span className="ml-1.5">{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
