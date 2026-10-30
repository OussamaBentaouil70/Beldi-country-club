import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { defaultWhatsappMessage, navLinks, whatsappLink } from "../data/site";
import { Wordmark } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "../utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header id="navigation"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-white shadow-soft" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-6 transition-[height] duration-300 sm:px-10",
            scrolled ? "h-[72px]" : "h-[87px]",
          )}
        >
          <a href="#top" aria-label="Beldi Country Club — back to top" className="shrink-0">
            <Wordmark tone={scrolled ? "light" : "dark"} compact={scrolled} />
          </a>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center gap-9 xl:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative py-2 font-sans text-[0.95rem] tracking-[0.24px] transition-opacity hover:opacity-60",
                    scrolled ? "text-night" : "text-white",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-full origin-left bg-sage transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              aria-label="Message us on WhatsApp"
              className="hidden h-[47px] items-center gap-2 border border-[#128C4A] bg-[#128C4A] px-4 font-sans text-[0.85rem] text-white transition-colors hover:bg-[#0F7A40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night md:inline-flex"
            >
              <WhatsAppIcon />
              <span className="hidden 2xl:inline">WhatsApp</span>
            </a>
            <a href="#contact" className={cn("btn hidden sm:inline-flex", scrolled ? "btn-outline" : "btn-outline-light")}>
              Plan your wedding
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cn(
                "grid h-[47px] w-[47px] place-items-center border transition-opacity hover:opacity-60 xl:hidden",
                scrolled ? "border-sage text-night" : "border-white/70 text-white",
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-night text-white"
          >
            <div className="flex h-[87px] items-center justify-between border-b border-white/10 px-6 sm:px-10">
              <Wordmark tone="dark" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-[47px] w-[47px] place-items-center border border-white/50 transition-opacity hover:opacity-60"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  className="font-serif text-[1.9rem] tracking-[-0.01em] transition-opacity hover:opacity-60"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 flex flex-col items-center gap-3">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-outline-light">
                  Plan your wedding
                </a>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[47px] items-center gap-2 bg-[#128C4A] px-5 font-sans text-sm text-white transition-colors hover:bg-[#0F7A40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <WhatsAppIcon /> WhatsApp us
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
