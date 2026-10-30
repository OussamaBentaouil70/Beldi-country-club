import { brand, defaultWhatsappMessage, navLinks, whatsappLink } from "../data/site";
import { Wordmark } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer id="footer" className="bg-night text-white">
      <div className="mx-auto max-w-[1380px] px-[30px] pt-[70px] sm:px-10">
        <div className="grid gap-12 border-b border-white/12 pb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <a href="#top" aria-label="Back to top" className="inline-block">
              <Wordmark tone="dark" />
            </a>
            <p className="mt-6 max-w-md font-sans text-[1.05rem] leading-[1.72] text-white/75">
              Romantic weddings and exclusive celebrations among lush gardens, olive trees and
              beautiful Moroccan architecture in Marrakech.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="type-eyebrow text-sage-light">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-sans text-[1.05rem] text-white/85 transition-opacity hover:opacity-60">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="type-eyebrow text-sage-light">Enquiries</h2>
            <a href="#contact" className="mt-5 block font-sans text-[1.05rem] text-white/85 transition-opacity hover:opacity-60">
              Plan your wedding
            </a>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex h-11 items-center gap-2 bg-[#128C4A] px-4 font-sans text-[1.05rem] text-white transition-colors hover:bg-[#0F7A40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-7 type-caption text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {brand.name} · Wedding planning by {brand.planner}</p>
          <a href="#top" className="font-bold tracking-[0.18em] uppercase transition-opacity hover:opacity-60">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
