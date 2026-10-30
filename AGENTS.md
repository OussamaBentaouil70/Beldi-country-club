# AGENTS.md — Beldi Country Club (Weddings & Events, Marrakech)

Briefing for AI coding agents and developers. Read fully before editing.

---

## 1. What this project is

A **single-page marketing / lead-generation website** for **Beldi Country Club**, a
Marrakech venue of lush gardens, olive trees, glasshouses, vaulted halls and Moroccan
architecture, positioned for destination weddings and exclusive private events.
Planning and coordination are delivered by **Weddings Planner Morocco** (named in
Section 5 copy and the footer credit — keep that mention).

The site converts visitors into **event enquiries** through:
1. A hero form ("Send Wedding Inquiry") and a final reservation form ("Request your
   personalized proposal"). Both submit to the PHP endpoint, share state and redirect to
   the `/thank-you` page on success.
2. **WhatsApp** links (navbar, mobile menu, footer, sticky button) using the client's
   white glyph on WhatsApp green.

It is **not** a booking engine: the only backend is a PHP mail endpoint for the
reservation form (see §6).

> History: earlier versions were "Riad Azahar", "Nelia Marrakech", "O'Atlas Marrakech",
> "Jnane Tamsna" and "Weddings Planner Morocco" (same design system as now — only the
> content changed for Beldi). Earlier brands were fully replaced. Don't reintroduce their content,
> palettes, Moroccan pattern overlays or arch-shaped frames unless asked.

### Tone
Sophisticated, timeless, European restraint with Moroccan warmth. Copy is
client-supplied — keep it verbatim unless asked to edit.

---

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript 5.9 (strict; `noUnusedLocals`/`noUnusedParameters` → unused imports FAIL type-check) |
| Bundler | Vite 7 + `vite-plugin-singlefile` → one inlined `dist/index.html` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), CSS-first `@theme` in `src/index.css` (no `tailwind.config.js`) |
| Animation | `framer-motion` |
| Icons | `lucide-react`; WhatsApp uses `WhatsAppIcon` (`/images/whatsapp-white-icon.webp`) |
| Utility | `cn()` in `src/utils/cn.ts` (`clsx` + `tailwind-merge`) |
| Fonts | Google Fonts in `index.html`: Playfair Display, Libre Baskerville, Montserrat, Anton (fallback for Impact) |

```bash
npm run dev
npm run build      # -> dist/index.html
npx tsc --noEmit   # always run together with build
```
Rules: never hand-edit `package.json` or `vite.config.ts` (use `npm install`). Entry is `src/App.tsx`.

### CSS gotchas (both have caused real bugs)
1. **Component classes must live in `@layer components`.** Unlayered CSS beats Tailwind
   utilities. When `.btn` was unlayered, `hidden sm:inline-flex` stopped working and the
   header overflowed on mobile.
2. **Never add `@theme` spacing tokens named `xs/sm/md/lg/xl/2xl…`.** They override the
   `max-w-*` size scale and collapse text columns.

---

## 3. File map

```
index.html                       Title, meta description, arch-and-rings favicon, fonts
src/
  App.tsx                        Home composition, /thank-you routing, shared inquiry state, sticky WhatsApp
  index.css                      Tokens, typography/button/field classes (@layer components), gradients
  data/site.ts                   ★ ALL content: photos, brand, nav, sections, form options, WhatsApp
  components/
    Logo.tsx                     LogoMark (arch + interlaced rings) and Wordmark (tone light|dark)
    Navbar.tsx                   87px header: transparent over hero → white on scroll; links at xl+, menu below
    Hero.tsx                     01 — full-bleed photo + gradients; copy left, InquiryForm "hero" right
    InquiryForm.tsx              ★ Shared form; both variants submit then redirect to /thank-you
    ThankYouPage.tsx             Standalone /thank-you hero with 2 CTAs (home + WhatsApp)
    WhatsAppIcon.tsx             White client WhatsApp glyph for green CTAs
    Marquee.tsx                  Near-black phrase band under the hero
    Celebrations.tsx             02 — 3 category cards; image/title open CelebrationGallery
    CelebrationGallery.tsx       Category popup gallery: arrows, thumbnails, swipe, focus trap, image fallback
    EventPromise.tsx             03 — promise pillars over a darkened full-bleed photo
    SignatureExperiences.tsx     04 — 5 photo cards with overlaid titles (2 wide + 3); lightbox
    PhotoLightbox.tsx            ZoomableImage (accepts overlay children) + single-photo lightbox
    Contact.tsx                  05 — copy, tagline, photo + InquiryForm "contact"
    Footer.tsx                   Near-black footer (padding 70px 30px 0)
    Ornament.tsx                 Eyebrow (sage hairline + uppercase label)
    Reveal.tsx                   Scroll reveal
```

---

## 4. Page structure

| # | Component | Anchor | Background | Content |
|---|---|---|---|---|
| – | Navbar | — | transparent → white | Events · Our promise · Experiences · Contact; WhatsApp; "Plan your wedding" |
| 1 | Hero | `#top` (form `#inquiry`) | **Photo 5** (golden-lantern reception) + gradients | **Where Moroccan Charm Meets Timeless Romance**; CTA "Plan your wedding"; form "Tell Us About Your Celebration" |
| – | Marquee | — | night | decorative phrases |
| 2 | Celebrations | `#celebrations` | white → mist | "DISCOVER OUR EVENTS" / **Beautiful Moments, Exceptional Settings** — Weddings & Ceremonies, Private Dinners & Receptions, Private Parties & Special Events; each uses client photography and opens a 5-photo gallery |
| 3 | EventPromise | `#promise` | olive courtyard photo + night overlay | "THE BELDI EXPERIENCE" / **Our Event Promise** — Enchanting Gardens, Distinctive Event Spaces, Tailored Celebrations |
| 4 | SignatureExperiences | `#experiences` | mist → white | "UNFORGETTABLE CELEBRATIONS" / **Extraordinary Ways to Celebrate** — 5 experiences |
| 5 | Contact | `#contact` | mist | "YOUR CELEBRATION BEGINS HERE" / **Your Dream Wedding at Beldi Country Club** + "Wedding & Event Reservation" form |
| – | Footer | — | night | brand, links, "Wedding planning by Weddings Planner Morocco" |
| — | ThankYouPage | `/thank-you` | **Photo 5** + gradients | standalone thank-you hero; reference; "Back to Home" + WhatsApp CTAs |

The sticky WhatsApp button appears only after the hero is ~60% scrolled past (so it never
covers the hero form); the navbar WhatsApp link covers the hero. `/thank-you` is a real
path handled by lightweight pushState routing in `App.tsx`; the SPA fallback serves it on refresh.

---

## 5. Content & photos

All copy and images live in `src/data/site.ts`.

- `photos.photo5` (hero) is still a temporary Pexels placeholder — swap `src` to
  `/images/photo-5.jpg` once the real file is in `public/images/`.
- **Real client photography** (in `public/images/`, optimised JPEG): the five
  `signatureExperiences` images, `photos.dreamWedding` (Contact), and the three
  `celebrations` card images + galleries (reusing those six files).
- Other named photos (ceremonyAisle, courtyardPool, stringLights…) remain unused stock.
- `celebrations` (3, each with `gallery` of 5), `promises` (icons `gardens | spaces | tailored`
  → Trees, Landmark, Gem), `signatureExperiences` (5).

---

## 6. Forms & state

`App.tsx` owns `inquiry` (shared by both forms); each form keeps its own success reference.

`EventInquiry`: `name, email, phone, eventType` (default **Wedding**), `eventDate,
guestCount, budget` (**free text**, e.g. "€30,000" — no currency field), `message`.
Validation (both forms): name ≥ 2 chars, valid email, guests 1–2000.

Variants (`InquiryForm.tsx` → `copy`):
- **hero:** "Tell Us About Your Celebration"; fields incl. Event Type and visible
  **"Your Vision"**; button **"Send Wedding Inquiry"** → submits then redirects to `/thank-you`.
- **contact:** "Wedding & Event Reservation"; **no Event Type field** (stays "Wedding");
  message placeholder "Tell us about your wedding vision..."; button **"Request your
  personalized proposal"** → submits then redirects to `/thank-you`; the reference `BCC-XXXXXX`
  is carried in `sessionStorage` and shown on that page.

⚠️ **PHP mail backend.** Both forms POST JSON to `/api/send-inquiry.php` (PHPMailer, see
`public/api/`), which sends an admin notification and a client thank-you using the SMTP
credentials in the project-root `.env`. The API is copied into `dist/api/` on build and
needs PHP 8+ with `openssl`; `npm run dev` alone cannot execute it (build and serve `dist/`
with PHP — see `PHPMailer-Inquiry-Setup.md`). **WhatsApp:** `whatsappBusinessNumber` is set
in `src/data/site.ts`.

---

## 7. Design system (from thebeautifulmarrakech.com)

### Palette (tokens in `src/index.css`)
| Token | Hex | Role |
|---|---|---|
| `night` | `#131516` | Primary: text, solid CTA, footer, dark bands |
| `mist` | `#F2F3F5` | Canvas: page and alternating sections |
| white | `#FFFFFF` | Surfaces, form panels, text on dark |
| `sage` | `#6E8458` | Hairline: 1px borders, outlines, dividers |
| `sage-ink` | `#55683E` | Sage adjusted for AA text on white/mist (eyebrows, numerals) |
| `sage-light` | `#B4C3A0` | Sage adjusted for AA text on night |
| `slate` / `graphite` | `#212934` / `#212326` | Decorative darks |
| error | `#9B3B2E` | Form errors only (the source has no status colours) |

Gradients: `gradient-photo` (to top, 60% black → 0), `gradient-white-mist`,
`gradient-mist-white`. One shadow only: `shadow-soft` (0 0 6px rgba(20,22,23,.09)).

### Typography (classes in `@layer components`)
- `type-display-xl`: Playfair Display 400, up to 78px, line-height 1.12, tracking -0.015em (hero).
- `type-display`: Libre Baskerville 400, 30–44px, tracking -0.015em (section headings).
- `type-heading`: Montserrat 400, ~21–26px (card titles).
- `type-eyebrow`: Montserrat 700, 12.5px, uppercase, tracking .18em.
- `type-body-xl/lg/md`, `type-caption`: Montserrat, line-height 1.72, tracking .27px.
- Headings are never bold. Serif fonts are for headings and display text only.

### Shape & controls
- **0px radius everywhere.** No rounded corners or arch shapes.
- `.btn` = Impact (Anton fallback), 16px uppercase, tracking 1px, 1px border, padding 13px 29px,
  min height 47px, hover opacity .6. Variants: `.btn-outline` (sage border, sage-ink text, on
  light), `.btn-outline-light` (white, on photos/dark), `.btn-solid` (night, form submit).
- `.btn-icon` = translucent `rgba(19,21,22,.7)`, white (back-to-top, overlays). WhatsApp CTAs
  use solid `#128C4A` with the white client glyph.
- `.field` = white, 1px sage border, 0 radius, Montserrat 16px; focus = night border plus 1px ring.
- Container max-width 1380px; horizontal padding 24px / 40px; section padding 80–112px.
- Client preferences kept: category images are square and open galleries; hero has copy
  left and form right; images support zoom. Design is unchanged from the Weddings Planner
  Morocco version — only content changed.

---

## 8. Conventions
- Edit content in `src/data/site.ts`, not inside components.
- Modals are portaled to `document.body`, lock scroll, close on Esc/backdrop; the category
  gallery traps focus and makes `#root` inert.
- Sections use `scroll-mt-20` so anchors clear the fixed header.
- Keep a11y: `aria-label` on icon buttons, dialog roles, `aria-invalid`/`aria-describedby`,
  visible focus, AA contrast (use `sage-ink`/`sage-light` for text, never raw `sage`).

## 9. Known gaps / TODO
1. Form emails via PHPMailer; not yet connected to a CRM. `.env` holds live SMTP credentials — never commit it.
2. WhatsApp number is set in `src/data/site.ts`; keep it in sync with `.env`.
3. Hero photography is still temporary stock (celebrations, signature experiences and Contact use client photos).
4. No address, phone, email, legal pages, analytics, SEO schema or i18n (French would suit the market).
5. Impact is a system font; on devices without it, Anton is used as the visual stand-in.
