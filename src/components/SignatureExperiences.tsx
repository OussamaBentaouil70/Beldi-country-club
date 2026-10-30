import { useCallback, useState } from "react";
import { signatureExperiences } from "../data/site";
import { Eyebrow } from "./Ornament";
import { PhotoLightbox, ZoomableImage, type ZoomPhoto } from "./PhotoLightbox";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

/** Section 4 — Signature wedding experiences. Photography-led cards with overlaid titles: 2 wide, then 3. */
export function SignatureExperiences() {
  const [zoomed, setZoomed] = useState<ZoomPhoto | null>(null);
  const close = useCallback(() => setZoomed(null), []);

  return (
    <section id="experiences" className="gradient-mist-white scroll-mt-20">
      <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow align="left">Unforgettable celebrations</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="type-display mt-5">Extraordinary Ways to Celebrate</h2>
            </Reveal>
          </div>
          <Reveal delay={0.14} className="lg:col-span-5">
            <p className="type-body-lg text-night/75">
              From candlelit dinners to vibrant Moroccan entertainment, every setting tells a
              different story.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {signatureExperiences.map((item, index) => {
            const featured = index < 2;
            return (
              <Reveal
                key={item.title}
                delay={(featured ? index : index - 2) * 0.08}
                className={cn(featured ? "lg:col-span-3" : "lg:col-span-2", index === 4 && "sm:col-span-2 lg:col-span-2")}
              >
                <ZoomableImage
                  photo={{ ...item.photo, title: item.title }}
                  onOpen={setZoomed}
                  className={cn(
                    "aspect-[4/5]",
                    featured && "lg:aspect-[16/11]",
                    index === 4 && "sm:aspect-[16/9] lg:aspect-[4/5]",
                  )}
                >
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_75%)]" />
                  <span className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                    <span className="type-caption block font-bold tracking-[0.18em] text-sage-light">
                      0{index + 1}
                    </span>
                    <span className={cn("mt-2 block font-serif leading-tight tracking-[-0.015em]", featured ? "text-[1.7rem]" : "text-[1.35rem]")}>
                      {item.title}
                    </span>
                    <span className="type-body-md mt-2 block max-w-md text-white/85">{item.description}</span>
                  </span>
                </ZoomableImage>
              </Reveal>
            );
          })}
        </div>
      </div>
      <PhotoLightbox photo={zoomed} onClose={close} />
    </section>
  );
}
