const phrases = [
  "Garden weddings",
  "Glasshouse ceremonies",
  "Lantern-lit receptions",
  "Olive groves & courtyards",
  "Authentic Moroccan welcomes",
  "Private celebrations",
];

/** Quiet near-black band between the hero and section 02. */
export function Marquee() {
  const row = [...phrases, ...phrases];
  return (
    <section id="marquee" className="relative overflow-hidden border-y border-white/10 bg-night py-4 text-white" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10 pr-10 whitespace-nowrap">
        {row.map((phrase, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-sans text-[0.75rem] font-bold tracking-[0.24em] uppercase">{phrase}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-sage-light" />
          </span>
        ))}
      </div>
    </section>
  );
}
