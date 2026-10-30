import { Gem, Landmark, Trees } from "lucide-react";
import { photos, promises } from "../data/site";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

const icons = {
  gardens: Trees,
  spaces: Landmark,
  tailored: Gem,
};

/** Section 3 — Our event promise, over a darkened full-bleed photograph. */
export function EventPromise() {
  return (
    <section id="promise" className="relative isolate scroll-mt-20 overflow-hidden bg-night text-white">
      <img
        src={photos.oliveCourtyard.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(19,21,22,0.75),rgba(19,21,22,0.92))]" />

      <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="light">The Beldi experience</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-display mt-5">Our Event Promise</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="type-body-lg mx-auto mt-5 max-w-2xl text-white/80">
              Authentic surroundings. Beautifully considered details. Celebrations to remember.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid border-t border-sage/60 md:grid-cols-3">
          {promises.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="h-full border-b border-sage/60 py-10 md:border-b-0 md:px-10 md:first:pl-0 md:[&:not(:first-child)]:border-l">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-sage-light" strokeWidth={1.2} />
                    <span className="type-caption font-bold tracking-[0.18em] text-sage-light">0{index + 1}</span>
                  </div>
                  <h3 className="type-heading mt-8">{item.title}</h3>
                  <p className="type-body-md mt-3 text-white/80">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
