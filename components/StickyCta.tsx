"use client";

import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site, telLink, waLink } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function StickyCta() {
  const rm = useReducedMotion() ?? false;
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setPastHero(v > 480));
  useEffect(() => setPastHero(scrollY.get() > 480), [scrollY]);

  useEffect(() => {
    const el = document.getElementById("contato");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          setContactVisible(entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="sticky-cta"
          className="fixed inset-x-0 bottom-0 z-40 flex gap-2 rounded-none border-t border-rule bg-ink lg:hidden"
          style={{
            padding: "12px 16px calc(12px + env(safe-area-inset-bottom, 0px))",
          }}
          initial={rm ? { opacity: 0 } : { opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={rm ? { opacity: 0 } : { opacity: 0, y: "100%" }}
          transition={rm ? { duration: 0.2 } : { duration: 0.35, ease: EASE }}
        >
          <a
            href={telLink}
            aria-label={`Ligar para ${site.phoneDisplay}`}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-none bg-ink-2 text-bone"
          >
            <Phone size={20} strokeWidth={1.25} aria-hidden="true" />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="t-cond wdth-78 flex h-[52px] min-w-0 flex-1 items-center justify-center rounded-none bg-accent text-on-accent active:bg-accent-press"
          >
            {site.hero.ctaPrimaryShort}
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
