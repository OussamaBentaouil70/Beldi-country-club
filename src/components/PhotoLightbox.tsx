import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { cn } from "../utils/cn";

export interface ZoomPhoto {
  src: string;
  alt: string;
  title: string;
}

/** A photo button that opens the lightbox. Optional children are overlaid on the image. */
export function ZoomableImage({
  photo,
  onOpen,
  className,
  imageClassName,
  children,
}: {
  photo: ZoomPhoto;
  onOpen: (photo: ZoomPhoto) => void;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      aria-label={`View larger image: ${photo.title}`}
      className={cn(
        "group/photo relative block w-full cursor-zoom-in overflow-hidden bg-mist text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-night",
        className,
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover/photo:scale-[1.04]",
          imageClassName,
        )}
      />
      {children}
      <span className="btn-icon pointer-events-none absolute top-4 right-4 h-[30px] w-[30px] opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100">
        <ZoomIn className="h-4 w-4" strokeWidth={1.6} />
      </span>
    </button>
  );
}

export function PhotoLightbox({
  photo,
  onClose,
}: {
  photo: ZoomPhoto | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!photo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [photo, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-night/90 p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image preview: ${photo.title}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-full w-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image preview"
              className="absolute -top-14 right-0 z-10 grid h-[47px] w-[47px] place-items-center border border-white/60 text-white transition-opacity hover:opacity-60"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <img src={photo.src} alt={photo.alt} className="max-h-[78vh] max-w-full object-contain" />
            <p className="mt-5 max-w-2xl text-center font-serif text-lg text-white">{photo.title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
