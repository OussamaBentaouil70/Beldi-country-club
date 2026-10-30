import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { photos, type EventInquiry, type InquirySubmitResult } from "../data/site";
import { InquiryForm } from "./InquiryForm";
import { Eyebrow } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

/** Section 1 — Hero & introduction (Photo 5: golden-lantern reception) */
export function Hero({
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-night text-white">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[4%] h-[110%]">
        <img
          src={photos.photo5.src}
          alt={photos.photo5.alt}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="gradient-photo absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,21,22,0.82)_0%,rgba(19,21,22,0.55)_45%,rgba(19,21,22,0.2)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(rgba(19,21,22,0.6),rgba(19,21,22,0))]" />

      <div className="relative z-10 mx-auto grid max-w-[1380px] items-center gap-12 px-6 pt-[140px] pb-20 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-[160px] lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-[640px]"
        >
          <Eyebrow tone="light" align="left">Beldi Country Club · Marrakech</Eyebrow>

          <h1 className="type-display-xl mt-6">Where Moroccan Charm Meets Timeless Romance</h1>

          <p className="type-body-xl mt-6 text-white">
            An enchanting setting for extraordinary weddings and unforgettable celebrations.
          </p>

          <div className="type-body-lg mt-6 max-w-[560px] space-y-4 text-white/85">
            <p>
              Nestled among lush gardens, olive trees and beautiful Moroccan architecture, Beldi
              Country Club offers a romantic escape for destination weddings and exclusive
              private events.
            </p>
            <p>
              From intimate garden ceremonies to elegant candlelit receptions, discover a setting
              where authentic Moroccan character meets effortless sophistication.
            </p>
          </div>

          <a href="#inquiry" className="btn btn-outline-light mt-9">
            Plan your wedding
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="w-full lg:ml-auto lg:max-w-[580px]"
        >
          <InquiryForm
            variant="hero"
            inquiry={inquiry}
            onChange={onInquiryChange}
            onSubmitInquiry={onSubmitInquiry}
            onInquirySubmitted={onInquirySubmitted}
          />
        </motion.div>
      </div>
    </section>
  );
}
