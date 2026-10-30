import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Celebrations } from "./components/Celebrations";
import { Contact } from "./components/Contact";
import { EventPromise } from "./components/EventPromise";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";
import { SignatureExperiences } from "./components/SignatureExperiences";
import { ThankYouPage } from "./components/ThankYouPage";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import {
  defaultEventInquiry,
  defaultWhatsappMessage,
  formatInquiryPayload,
  inquiryReferenceStorageKey,
  whatsappLink,
  type EventInquiry,
  type InquirySubmitResult,
} from "./data/site";

const normalizePath = (value: string) => {
  const path = value.replace(/\/+$/, "");
  return path === "" ? "/" : path;
};

export default function App() {
  // Shared by both inquiry forms so their fields stay in sync.
  const [inquiry, setInquiry] = useState<EventInquiry>(defaultEventInquiry);
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [showTop, setShowTop] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (path !== "/thank-you") sessionStorage.removeItem(inquiryReferenceStorageKey);
  }, [path]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 900);
      // Appears once the hero (with its own WhatsApp link and form) is scrolled past,
      // so it never covers the hero form on first load.
      const hero = document.getElementById("top");
      setShowWhatsapp(window.scrollY > (hero ? hero.offsetHeight * 0.6 : 600));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Posts both inquiry forms to the PHPMailer endpoint (see public/api/send-inquiry.php).
  const submitInquiry = async (honeypot: string): Promise<InquirySubmitResult> => {
    const reference = `BCC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    try {
      const response = await fetch("/api/send-inquiry.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formatInquiryPayload(inquiry, reference), website: honeypot }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        return {
          ok: false,
          message: data?.message ?? "We could not send your request. Please try again.",
          errors: data?.errors,
        };
      }

      return { ok: true, reference };
    } catch {
      return {
        ok: false,
        message: "Connection problem. Please check your internet and try again.",
      };
    }
  };

  const resetInquiry = () => {
    setInquiry(defaultEventInquiry());
  };

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(normalizePath(to));
    window.scrollTo(0, 0);
  };

  const goToThankYou = (reference?: string) => {
    if (reference) sessionStorage.setItem(inquiryReferenceStorageKey, reference);
    resetInquiry();
    navigate("/thank-you");
  };

  const goHome = () => {
    sessionStorage.removeItem(inquiryReferenceStorageKey);
    navigate("/");
  };

  const formProps = {
    inquiry,
    onInquiryChange: setInquiry,
    onSubmitInquiry: submitInquiry,
    onInquirySubmitted: goToThankYou,
  };

  if (path === "/thank-you") {
    return <ThankYouPage onBackHome={goHome} />;
  }

  return (
    <div className="min-h-screen bg-mist font-sans text-night antialiased">
      <Navbar />
      <main>
        <Hero {...formProps} />
        <Marquee />
        <Celebrations />
        <EventPromise />
        <SignatureExperiences />
        <Contact {...formProps} />
      </main>
      <Footer />

      {/* Sticky WhatsApp — solid green with the client's white glyph */}
      <AnimatePresence>
        {showWhatsapp && (
          <motion.a
            key="sticky-whatsapp"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            href={whatsappLink(defaultWhatsappMessage)}
            target="_blank"
            rel="noreferrer"
            aria-label="Start a WhatsApp conversation"
            className="fixed right-4 bottom-[4.5rem] z-40 inline-flex h-12 items-center justify-center gap-2 bg-[#128C4A] px-4 font-sans text-[0.78rem] tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#0F7A40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:bottom-20"
          >
            <WhatsAppIcon />
            WhatsApp
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="btn-icon fixed right-4 bottom-4 z-40 h-12 w-12 sm:right-6 sm:bottom-6"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.6} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
