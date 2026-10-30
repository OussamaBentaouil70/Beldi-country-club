import { brand } from "../data/site";
import { cn } from "../utils/cn";

/**
 * Beldi Country Club mark — a Moroccan arch framing two interlaced rings.
 * Uses currentColor; set colour with a text-* class.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M8 54V24C8 13.5 15.2 6 24 6s16 7.5 16 18v30" />
      <path d="M4 54h40" />
      <path d="M24 12.5l2.4 3.5-2.4 3.5-2.4-3.5 2.4-3.5Z" />
      <circle cx="19.5" cy="35" r="7" />
      <circle cx="28.5" cy="35" r="7" />
    </svg>
  );
}

/** Logo + two-line wordmark. `tone` = colour of the surface it sits on. */
export function Wordmark({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const onDark = tone === "dark";
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={cn("h-10 w-9 shrink-0", onDark ? "text-white" : "text-night")} />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display whitespace-nowrap",
            compact ? "text-[1.05rem]" : "text-[1.2rem]",
            onDark ? "text-white" : "text-night",
          )}
        >
          {brand.wordmarkTop}
        </span>
        <span
          className={cn(
            "mt-1.5 block font-sans text-[0.6rem] font-bold tracking-[0.34em] uppercase",
            onDark ? "text-sage-light" : "text-sage-ink",
          )}
        >
          {brand.wordmarkBottom}
        </span>
      </span>
    </span>
  );
}
