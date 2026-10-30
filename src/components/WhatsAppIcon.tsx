import { cn } from "../utils/cn";

/** White WhatsApp glyph supplied by the client, sized to match lucide icons. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <img
      src="/images/whatsapp-white-icon.webp"
      alt=""
      aria-hidden="true"
      className={cn("h-4 w-4 object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
