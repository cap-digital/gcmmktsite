"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { buildFormMessage, site, waLink } from "@/lib/site";
import { fadeUp, stagger } from "@/lib/motion";

const FIELD =
  "peer relative z-10 h-12 w-full rounded-none border-0 bg-transparent px-0 text-base text-bone outline-none placeholder:text-bone-dim";
const FIELD_BG =
  "pointer-events-none absolute -left-3 -right-3 bottom-0 top-0 z-0 transition-colors duration-200 peer-focus:bg-ink-2";
const FIELD_RULE = "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-rule";
const FIELD_RULE_FOCUS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px] origin-bottom scale-y-0 bg-accent transition-transform duration-200 peer-focus:scale-y-100 motion-reduce:transition-none";
const LABEL = "t-cond wdth-78 mb-1 block text-bone-dim";

export function ContactForm() {
  const rm = useReducedMotion() ?? false;
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [objetivo, setObjetivo] = useState<string>(site.objectives[0]);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!sending) return;
    const t = window.setTimeout(() => setSending(false), 4000);
    return () => window.clearTimeout(t);
  }, [sending]);

  const onChange =
    (setter: (v: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
      setSentUrl(null);
      if (error) setError(null);
    };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nome.trim().length < 2) {
      setError(site.contact.form.nameError);
      nameRef.current?.focus();
      return;
    }
    setError(null);
    const url = waLink(buildFormMessage({ nome, empresa, objetivo }));
    setSentUrl(url);
    setSending(true);
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (w === null) window.location.assign(url);
  };

  const errorId = `${uid}-nome-erro`;
  const f = site.contact.form;

  return (
    <m.form
      noValidate
      onSubmit={onSubmit}
      variants={stagger(0.06, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <m.div variants={fadeUp(rm, 10, 0.4)} className="border-t border-rule pt-5">
        <p className="t-h3 wdth-100 text-bone">{f.title}</p>
        <p className="mt-3 font-mono text-[12px] leading-[1.6] text-bone-dim">
          {f.subtitle}
        </p>
      </m.div>

      <m.div variants={fadeUp(rm, 10, 0.4)} className="mt-8">
        <label htmlFor={`${uid}-nome`} className={LABEL}>
          {f.nameLabel}
        </label>
        <div className="relative">
          <input
            ref={nameRef}
            id={`${uid}-nome`}
            name="nome"
            type="text"
            autoComplete="name"
            required
            placeholder={f.namePlaceholder}
            value={nome}
            onChange={onChange(setNome)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={FIELD}
          />
          <span aria-hidden="true" className={FIELD_BG} />
          <span
            aria-hidden="true"
            className={`${FIELD_RULE} ${error ? "bg-error" : ""}`}
          />
          <span aria-hidden="true" className={FIELD_RULE_FOCUS} />
        </div>
        <AnimatePresence>
          {error && (
            <m.p
              id={errorId}
              role="alert"
              aria-live="polite"
              className="mt-2 font-mono text-[12px] text-error"
              initial={rm ? { opacity: 0 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </m.p>
          )}
        </AnimatePresence>
      </m.div>

      <m.div variants={fadeUp(rm, 10, 0.4)} className="mt-7">
        <label htmlFor={`${uid}-empresa`} className={LABEL}>
          {f.companyLabel}
        </label>
        <div className="relative">
          <input
            id={`${uid}-empresa`}
            name="empresa"
            type="text"
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            value={empresa}
            onChange={onChange(setEmpresa)}
            className={FIELD}
          />
          <span aria-hidden="true" className={FIELD_BG} />
          <span aria-hidden="true" className={FIELD_RULE} />
          <span aria-hidden="true" className={FIELD_RULE_FOCUS} />
        </div>
      </m.div>

      <m.div variants={fadeUp(rm, 10, 0.4)} className="mt-7">
        <label htmlFor={`${uid}-objetivo`} className={LABEL}>
          {f.objectiveLabel}
        </label>
        <div className="relative">
          <select
            id={`${uid}-objetivo`}
            name="objetivo"
            value={objetivo}
            onChange={onChange(setObjetivo)}
            className={`${FIELD} appearance-none pr-8`}
          >
            {site.objectives.map((o) => (
              <option key={o} value={o} className="bg-ink text-bone">
                {o}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className={FIELD_BG} />
          <span aria-hidden="true" className={FIELD_RULE} />
          <span aria-hidden="true" className={FIELD_RULE_FOCUS} />
          <ChevronDown
            size={14}
            strokeWidth={1.25}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 z-10 -translate-y-1/2 text-bone-dim"
          />
        </div>
      </m.div>

      <m.div variants={fadeUp(rm, 10, 0.4)} className="mt-9">
        <button
          type="submit"
          className="flex h-[52px] w-full items-center justify-center rounded-none bg-accent px-6 text-[0.9375rem] font-semibold leading-none text-on-accent transition-colors duration-200 hover:bg-accent-hover active:bg-accent-press"
        >
          <AnimatePresence mode="wait" initial={false}>
            {sending ? (
              <m.span
                key="sending"
                initial={rm ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: rm ? 0.15 : 0.2 }}
              >
                {f.sending}
              </m.span>
            ) : (
              <m.span
                key="idle"
                initial={rm ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: rm ? 0.15 : 0.2 }}
              >
                {f.submit}
              </m.span>
            )}
          </AnimatePresence>
        </button>
        {sentUrl && (
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-medium text-bone underline underline-offset-4"
          >
            {f.fallback}
          </a>
        )}
        <p className="mt-4 font-mono text-[12px] leading-[1.6] text-bone-dim">
          {f.note}
        </p>
      </m.div>
    </m.form>
  );
}
