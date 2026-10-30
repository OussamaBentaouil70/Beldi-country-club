import { useCallback, useState } from "react";
import { Images } from "lucide-react";
import { celebrations, type Celebration } from "../data/site";
import { CelebrationGallery } from "./CelebrationGallery";
import { Eyebrow } from "./Ornament";
import { Reveal } from "./Reveal";

/** Section 2 — Celebrations at Beldi. Each image opens its own gallery. */
export function Celebrations() {
  const [selected, setSelected] = useState<Celebration | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="celebrations" className="gradient-white-mist scroll-mt-20">
      <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Discover our events</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="type-display mt-5">Beautiful Moments, Exceptional Settings</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="type-body-lg mx-auto mt-5 max-w-2xl text-night/75">
              From romantic wedding ceremonies to sophisticated private gatherings, discover a world
              of celebrations inspired by the beauty of Marrakech.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {celebrations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="group">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  aria-label={`Open ${item.title} gallery (${item.gallery.length} photos)`}
                  aria-haspopup="dialog"
                  className="relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-night"
                >
                  <img
                    src={item.photo.src}
                    alt={item.photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="gradient-photo pointer-events-none absolute inset-0" />
                  <span className="btn-icon absolute bottom-4 left-4 h-[30px] px-3 font-sans text-[0.72rem] tracking-[0.16em] uppercase">
                    <Images className="h-3.5 w-3.5" strokeWidth={1.6} />
                    View gallery · {item.gallery.length}
                  </span>
                </button>
                <p className="type-caption mt-6 font-bold tracking-[0.18em] text-sage-ink">0{index + 1}</p>
                <h3 className="type-heading mt-2">
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    aria-haspopup="dialog"
                    className="text-left transition-opacity hover:opacity-60"
                  >
                    {item.title}
                  </button>
                </h3>
                <p className="type-body-md mt-3 text-night/75">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <CelebrationGallery celebration={selected} onClose={close} />
    </section>
  );
}
