import { site } from "@/lib/site";

/** Lista achatada para o ramo estático: 2 rótulos de segmento + os itens. */
const FLAT = site.marquee.segments.flatMap((segment) => [
  { label: segment.label, segment: true },
  ...segment.items.map((label) => ({ label, segment: false })),
]);

/** Trilho que rola. Sai do ar sob movimento reduzido. */
function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ? "true" : undefined}
      className="flex shrink-0 items-center"
    >
      {site.marquee.segments.map((segment) => (
        <li key={segment.label} className="flex items-center">
          <span className="t-label whitespace-nowrap px-4 font-mono text-bone-dim">
            {segment.label}
          </span>
          {segment.items.map((label) => (
            <span key={label} className="flex items-center">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-accent" />
              <span className="t-label whitespace-nowrap px-4 font-mono text-bone">
                {label}
              </span>
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

/**
 * Tarja preta que atravessa o topo da dobra clara.
 *
 * Sob movimento reduzido o trilho animado sai do ar e entra uma lista chata que
 * quebra em várias linhas. A amplitude de plataformas é o argumento principal
 * da marca e não pode ser cortada por causa de uma preferência de
 * acessibilidade. Variante de CSS não reestrutura DOM, então as duas versões
 * são renderizadas e alternadas por display — sem JS e sem risco de hidratação.
 */
export function Marquee() {
  return (
    <div className="border-y border-rule bg-ink">
      <div className="flex min-h-11 items-center gap-4 px-5 motion-reduce:min-h-0 motion-reduce:items-start motion-reduce:py-3 sm:px-6 lg:px-8">
        <span className="t-cond wdth-78 hidden shrink-0 text-bone-dim sm:block">
          {site.marquee.label}
        </span>

        {/* Ramo animado */}
        <div className="mask-fade-x min-w-0 flex-1 overflow-hidden motion-reduce:hidden">
          <div className="motion-loop flex w-max animate-marquee-fast will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] sm:animate-marquee">
            <Track />
            <Track hidden />
          </div>
        </div>

        {/* Ramo estático: a lista inteira, quebrando em linhas. */}
        <ul className="hidden min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1.5 motion-reduce:flex">
          {FLAT.map((entry) => (
            <li
              key={entry.label}
              className={
                entry.segment
                  ? "t-label font-mono text-bone-dim"
                  : "t-label flex items-center gap-1.5 font-mono text-bone"
              }
            >
              {!entry.segment && (
                <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-accent" />
              )}
              {entry.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
