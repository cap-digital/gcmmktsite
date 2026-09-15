import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { ServiceRow } from "@/components/ServiceRow";
import { SplitWords } from "@/components/SplitWords";
import { site } from "@/lib/site";

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="on-paper bg-paper text-ink"
    >
      <Marquee />

      <div className="mx-auto max-w-container px-5 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6 sm:gap-x-6 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-2">
            <p className="t-label font-mono text-graphite">
              {site.servicesSection.number}
            </p>
            <span
              aria-hidden="true"
              className="mt-3 block h-[2px] w-6 bg-accent-ink"
            />
          </div>

          <div className="col-span-12 lg:col-start-3 lg:col-span-7">
            <SplitWords
              as="h2"
              id="servicos-title"
              lines={site.servicesSection.titleLines}
              label={site.servicesSection.titleLabel}
              variant="block"
              className="t-h2 wdth-100 sm:wdth-112 lg:wdth-118 text-ink"
            />
          </div>

          <Reveal
            delay={0.12}
            className="col-span-12 lg:col-start-10 lg:col-span-3"
          >
            <p className="t-body wdth-100 text-graphite">
              {site.servicesSection.marginNote}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 lg:mt-10">
          {site.services.map((service, i) => (
            <ServiceRow key={service.index} service={service} index={i} />
          ))}
        </div>

        <HowItWorks />
      </div>
    </section>
  );
}
