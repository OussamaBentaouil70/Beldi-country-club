import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  eventTypeOptions,
  type EventInquiry,
  type InquirySubmitResult,
} from "../data/site";
import { cn } from "../utils/cn";

interface InquiryErrors {
  name?: string;
  email?: string;
  guestCount?: string;
}

/**
 * Copy per variant.
 * Both variants submit to the PHPMailer endpoint and show a success summary.
 */
const copy = {
  hero: {
    title: "Tell Us About Your Celebration",
    subtitle: "Share a few details about your event and start creating something unforgettable.",
    showEventType: true,
    messageLabel: "Your Vision",
    showMessageLabel: true,
    messagePlaceholder: "Garden ceremony, candlelit dinner, glasshouse reception...",
    submit: "Send Wedding Inquiry",
    note: null,
  },
  contact: {
    title: "Wedding & Event Reservation",
    subtitle: "Tell us about your celebration and receive a personalized proposal.",
    showEventType: false,
    messageLabel: "Tell us about your wedding vision",
    showMessageLabel: false,
    messagePlaceholder: "Tell us about your wedding vision...",
    submit: "Request your personalized proposal",
    note: null,
  },
} as const;

export function InquiryForm({
  variant,
  inquiry,
  onChange,
  onSubmitInquiry,
  onInquirySubmitted,
}: {
  variant: "hero" | "contact";
  inquiry: EventInquiry;
  onChange: (inquiry: EventInquiry) => void;
  onSubmitInquiry: (honeypot: string) => Promise<InquirySubmitResult>;
  onInquirySubmitted: (reference?: string) => void;
}) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const isHero = variant === "hero";
  const text = copy[variant];
  const prefix = `${variant}-inquiry`;
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const update = (patch: Partial<EventInquiry>) => {
    if (submitError) setSubmitError(null);
    onChange({ ...inquiry, ...patch });
  };

  const validate = () => {
    const next: InquiryErrors = {};
    if (inquiry.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!inquiry.guestCount || Number(inquiry.guestCount) < 1 || Number(inquiry.guestCount) > 2000) {
      next.guestCount = "Enter an estimated guest count between 1 and 2,000.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    const result = await onSubmitInquiry(honeypot);
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.message ?? "We could not send your request. Please try again.");
      if (result.errors) {
        setErrors({
          name: result.errors.name,
          email: result.errors.email,
          guestCount: result.errors.guestCount ?? result.errors.guests,
        });
      }
      return;
    }

    onInquirySubmitted(result.reference);
  };

  const errorText = (id: string, message?: string) =>
    message ? (
      <p id={id} className="type-caption mt-1.5 text-[#9b3b2e]">
        {message}
      </p>
    ) : null;

  return (
    <div
      id={isHero ? "inquiry" : undefined}
      className="relative scroll-mt-28 border border-sage/40 bg-white text-night shadow-soft"
    >
      <motion.form
        key={`${prefix}-form`}
        onSubmit={submit}
        noValidate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-8"
        aria-labelledby={`${prefix}-title`}
      >
            <h2 id={`${prefix}-title`} className="font-serif text-[1.6rem] leading-tight tracking-[-0.015em]">
              {text.title}
            </h2>
            <p className="type-body-md mt-2 text-night/70">{text.subtitle}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${prefix}-name`} className="field-label">Full Name *</label>
                <input
                  id={`${prefix}-name`}
                  className={cn("field", errors.name && "field-error")}
                  placeholder="Your full name"
                  value={inquiry.name}
                  onChange={(e) => update({ name: e.target.value })}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
                />
                {errorText(`${prefix}-name-error`, errors.name)}
              </div>

              <div>
                <label htmlFor={`${prefix}-email`} className="field-label">Email Address *</label>
                <input
                  id={`${prefix}-email`}
                  type="email"
                  className={cn("field", errors.email && "field-error")}
                  placeholder="you@example.com"
                  value={inquiry.email}
                  onChange={(e) => update({ email: e.target.value })}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${prefix}-email-error` : undefined}
                />
                {errorText(`${prefix}-email-error`, errors.email)}
              </div>

              <div className={cn(!text.showEventType && "sm:col-span-2")}>
                <label htmlFor={`${prefix}-phone`} className="field-label">Phone / WhatsApp</label>
                <input
                  id={`${prefix}-phone`}
                  type="tel"
                  className="field"
                  placeholder="+212 6 00 00 00 00"
                  value={inquiry.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  autoComplete="tel"
                />
              </div>

              {text.showEventType && (
                <div>
                  <label htmlFor={`${prefix}-type`} className="field-label">Event Type</label>
                  <select
                    id={`${prefix}-type`}
                    className="field"
                    value={inquiry.eventType}
                    onChange={(e) => update({ eventType: e.target.value })}
                  >
                    {eventTypeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor={`${prefix}-date`} className="field-label">Event Date</label>
                <input
                  id={`${prefix}-date`}
                  type="date"
                  min={minDate}
                  className="field"
                  value={inquiry.eventDate}
                  onChange={(e) => update({ eventDate: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor={`${prefix}-guests`} className="field-label">Number of Guests *</label>
                <input
                  id={`${prefix}-guests`}
                  type="number"
                  min="1"
                  max="2000"
                  inputMode="numeric"
                  className={cn("field", errors.guestCount && "field-error")}
                  placeholder="e.g. 120"
                  value={inquiry.guestCount}
                  onChange={(e) => update({ guestCount: e.target.value })}
                  aria-invalid={Boolean(errors.guestCount)}
                  aria-describedby={errors.guestCount ? `${prefix}-guests-error` : undefined}
                />
                {errorText(`${prefix}-guests-error`, errors.guestCount)}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${prefix}-budget`} className="field-label">Estimated Budget</label>
                <input
                  id={`${prefix}-budget`}
                  className="field"
                  placeholder="e.g. €30,000"
                  value={inquiry.budget}
                  onChange={(e) => update({ budget: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor={`${prefix}-message`}
                  className={text.showMessageLabel ? "field-label" : "sr-only"}
                >
                  {text.messageLabel}
                </label>
                <textarea
                  id={`${prefix}-message`}
                  className="field min-h-[6rem] resize-y"
                  placeholder={text.messagePlaceholder}
                  value={inquiry.message}
                  onChange={(e) => update({ message: e.target.value })}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
              <input
                id={`${prefix}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            {submitError && (
              <p
                role="alert"
                className="type-body-md mt-5 border border-[#9b3b2e]/40 bg-[#9b3b2e]/5 px-4 py-3 text-[#9b3b2e]"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-solid group mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Sending…" : text.submit}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
            </button>

            {text.note && <p className="type-caption mt-3 text-center text-night/60">{text.note}</p>}
      </motion.form>
    </div>
  );
}
