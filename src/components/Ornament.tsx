import { cn } from "../utils/cn";

/** Section label: a short sage hairline followed by an uppercase Montserrat label. */
export function Eyebrow({
  children,
  tone = "dark",
  align = "center",
  className,
}: {
  children: React.ReactNode;
  /** "dark" = dark text for light surfaces; "light" = for photography / near-black bands */
  tone?: "dark" | "light";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-eyebrow flex items-center gap-3",
        tone === "dark" ? "text-sage-ink" : "text-sage-light",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-8", tone === "dark" ? "bg-sage" : "bg-sage-light")} />
      <span>{children}</span>
      {align === "center" && (
        <span aria-hidden="true" className={cn("h-px w-8", tone === "dark" ? "bg-sage" : "bg-sage-light")} />
      )}
    </p>
  );
}
