import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  brand,
  defaultWhatsappMessage,
  inquiryReferenceStorageKey,
  photos,
  whatsappLink,
} from "../data/site";
import { Wordmark } from "./Logo";
import { Eyebrow } from "./Ornament";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Standalone /thank-you page shown after either inquiry form is submitted. */
export function ThankYouPage({ onBackHome }: { onBackHome: () => void }) {
  const [reference] = useState(() =>
    typeof window === "undefined" ? null : sessionStorage.getItem(inquiryReferenceStorageKey),
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Thank You — Beldi Country Club";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main id="thank-you" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
      <img
        src={photos.photo5.src}
        alt={photos.photo5.alt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="gradient-photo absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,21,22,0.82)_0%,rgba(19,21,22,0.55)_45%,rgba(19,21,22,0.2)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(rgba(19,21,22,0.6),rgba(19,21,22,0))]" />

      <div className="relative z-10 flex flex-1 flex-col px-6 py-8 sm:px-10">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onBackHome();
          }}
          aria-label="Beldi Country Club — back to home"
          className="self-start"
        >
          <Wordmark tone="dark" />
        </a>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-2xl py-16 text-center">
            <Eyebrow tone="light" align="center">Your enquiry</Eyebrow>
            <h1 className="type-display-xl mt-6">Thank You</h1>
            <p className="type-body-xl mx-auto mt-6 max-w-xl text-white/90">
              Your wedding inquiry has been received. A confirmation has been sent to your inbox,
              and our team will be in touch within 24–48 hours.
            </p>

            {reference && (
              <p className="type-body-md mt-6 text-white/75">
                Your reference is{" "}
                <span className="font-bold tracking-[0.08em] text-white">{reference}</span>.
              </p>
            )}

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={onBackHome} className="btn btn-outline-light w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                Back to Home
              </button>
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn w-full border-[#128C4A] bg-[#128C4A] text-white hover:bg-[#0F7A40] hover:opacity-100 sm:w-auto"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <p className="type-caption text-center text-white/60">
          © {new Date().getFullYear()} {brand.name} · Wedding planning by {brand.planner}
        </p>
      </div>
    </main>
  );
}
