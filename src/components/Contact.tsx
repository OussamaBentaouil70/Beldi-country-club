import { photos, type EventInquiry, type InquirySubmitResult } from "../data/site";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";
import { InquiryForm } from "./InquiryForm";

/** Section 5 — Plan your dream wedding */
export function Contact({
  inquiry,
  onInquiryChange,
  onSubmitInquiry,
  onInquirySubmitted,
}: {
  inquiry: EventInquiry;
  onInquiryChange: (inquiry: EventInquiry) => void;
  onSubmitInquiry: (honeypot: string) => Promise<InquirySubmitResult>;
  onInquirySubmitted: (reference?: string) => void;
}) {
  return (
    <section id="contact" className="scroll-mt-20 bg-mist">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow align="left">Your celebration begins here</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-display mt-5 max-w-xl">Your Dream Wedding at Beldi Country Club</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="type-body-lg mt-6 max-w-xl space-y-4 text-night/75">
              <p>
                Imagine exchanging vows surrounded by lush greenery, celebrating with loved ones in
                beautifully styled spaces and ending the evening beneath the warm glow of Moroccan
                lanterns.
              </p>
              <p>
                At Weddings Planner Morocco, we bring your vision to life with thoughtful planning,
                creative design and personalized coordination.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 border-l border-sage pl-5 font-display text-[1.45rem] leading-snug italic">
              Let's create a wedding that feels entirely yours.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <figure className="relative mt-10 overflow-hidden">
              <img
                src={photos.dreamWedding.src}
                alt={photos.dreamWedding.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="gradient-photo absolute inset-x-0 bottom-0 px-5 pt-12 pb-4 font-sans text-[0.75rem] font-bold tracking-[0.2em] text-white uppercase">
                Beldi Country Club · Marrakech
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-2">
          <InquiryForm
            variant="contact"
            inquiry={inquiry}
            onChange={onInquiryChange}
            onSubmitInquiry={onSubmitInquiry}
            onInquirySubmitted={onInquirySubmitted}
          />
        </Reveal>
      </div>
    </section>
  );
}
