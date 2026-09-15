import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { StickyCta } from "@/components/StickyCta";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-none focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        {site.skipLink}
      </a>
      <Nav />
      <main id="conteudo" className="pb-24 lg:pb-0">
        <Hero />
        <Services />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
