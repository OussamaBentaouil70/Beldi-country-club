/* ------------------------------------------------------------------ */
/*  Beldi Country Club — all site content lives here                   */
/* ------------------------------------------------------------------ */

export interface Photo {
  src: string;
  alt: string;
}

const stock = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

/**
 * Venue photography. Numbered client photos (1, 4, 5, 9) are still temporary stock
 * placeholders; hero and gallery photography uses the client's own files in
 * /public/images where available.
 */
export const photos = {
  /** Photo 5 — spectacular reception glowing with golden lanterns (hero) */
  photo5: { src: stock(37958132, 2200), alt: "A spectacular evening reception glowing beneath golden lantern light" },
  /** Photo 9 — ceremony in the glasshouse with a flower-lined aisle */
  photo9: { src: stock(37710451), alt: "A wedding ceremony set beneath a glasshouse canopy with a flower-lined aisle" },
  /** Photo 1 — candlelit dinner in the tropical glasshouse */
  photo1: { src: stock(16823275), alt: "A candlelit dinner table dressed with greenery in the tropical glasshouse" },
  /** Photo 4 — private evening party around the pool */
  photo4: { src: stock(34597472), alt: "A private evening party set around the pool beneath warm lights" },

  ceremonyAisle: { src: stock(17315417), alt: "A ceremony aisle lined with chairs and white floral arrangements" },
  ceremonyGreenery: { src: stock(17315420), alt: "A ceremony space framed by lush greenery and flowers" },
  ceremonyPastel: { src: stock(37828118), alt: "An outdoor ceremony setting with soft floral décor" },
  ceremonyFlorals: { src: stock(17315418), alt: "Elegant floral arrangements along the ceremony aisle" },
  receptionFlorals: { src: stock(35985205), alt: "A reception with candlelit tables and elegant floral arrangements" },
  candleTable: { src: stock(17022991), alt: "A romantic reception table adorned with candles and flowers" },
  tableDetail: { src: stock(7705403), alt: "A table setting with lit candles and flowers" },
  lanternTable: { src: stock(37190291), alt: "A table setting with a floral centrepiece and lantern" },
  terraceCandles: { src: stock(17023007), alt: "A terrace decorated with flowers and candles for a wedding reception" },
  poolTwilight: { src: stock(19075393), alt: "A villa pool and lounge at twilight" },
  courtyardPool: { src: stock(7391720), alt: "A Moroccan courtyard with a decorative pool and lush greenery" },
  gardenParty: { src: stock(27025521), alt: "An evening garden party with a decorated dessert table and soft lighting" },
  stringLights: { src: stock(1341883), alt: "Warm string lights glowing in a garden at dusk" },
  vaultedHall: { src: stock(38228797), alt: "A vaulted stone hall set for an elegant reception" },
  firePerformance: { src: stock(31056173), alt: "A fire performer entertaining guests at night" },
  musician: { src: stock(39895065), alt: "A traditional Moroccan musician playing a stringed instrument" },
  lanterns: { src: stock(27773551), alt: "Ornate lanterns casting a warm golden glow" },
  oliveCourtyard: { src: stock(36176254), alt: "A sunny courtyard with an olive tree and traditional architecture" },

  /* Real client photography (see /public/images). */
  candlelitWeddingReceptions: {
    src: "/images/candlelit-wedding-receptions.jpg",
    alt: "A candlelit wedding reception table dressed with flowers and warm light",
  },
  gardenPoolsideCelebrations: {
    src: "/images/garden-poolside-celebrations.jpg",
    alt: "A garden and poolside celebration at Beldi Country Club",
  },
  elegantIndoorReceptions: {
    src: "/images/elegant-indoor-receptions.jpg",
    alt: "An elegant indoor reception in a vaulted Moroccan hall",
  },
  spectacularEveningEntertainment: {
    src: "/images/spectacular-evening-entertainment.jpg",
    alt: "Spectacular evening entertainment beneath the Marrakech sky",
  },
  authenticMoroccanWelcomes: {
    src: "/images/authentic-moroccan-welcomes.jpg",
    alt: "An authentic Moroccan welcome with lanterns and traditional details",
  },
  dreamWedding: {
    src: "/images/dream-wedding-beldi-country-club.jpg",
    alt: "Your dream wedding at Beldi Country Club in Marrakech",
  },
} satisfies Record<string, Photo>;

/* ------------------------------ Brand ------------------------------- */

export const brand = {
  name: "Beldi Country Club",
  wordmarkTop: "Beldi Country Club",
  wordmarkBottom: "Marrakech",
  tagline: "Weddings & Events",
  location: "Marrakech",
  planner: "Weddings Planner Morocco",
};

// Session key used to carry the submission reference onto /thank-you.
export const inquiryReferenceStorageKey = "bcc-inquiry-reference";

// Local number 0728585823, normalized for WhatsApp in international format.
export const whatsappBusinessNumber = "212728585823";

export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(message)}`;

export const defaultWhatsappMessage =
  "Hello, I would like information about a wedding or event at Beldi Country Club.";

export const navLinks = [
  { label: "Events", href: "#celebrations" },
  { label: "Our promise", href: "#promise" },
  { label: "Experiences", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

/* --------------------------- Section 2 ------------------------------ */

export interface Celebration {
  title: string;
  description: string;
  photo: Photo;
  gallery: Photo[];
}

// Each category opens its own popup gallery. The first photo is the card image.
export const celebrations: Celebration[] = [
  {
    title: "Weddings & Ceremonies",
    description:
      "Exchange vows in a romantic garden setting or beneath a glasshouse canopy surrounded by greenery and natural light.",
    photo: photos.dreamWedding,
    gallery: [
      photos.dreamWedding,
      photos.authenticMoroccanWelcomes,
      photos.elegantIndoorReceptions,
      photos.candlelitWeddingReceptions,
      photos.gardenPoolsideCelebrations,
    ],
  },
  {
    title: "Private Dinners & Receptions",
    description:
      "Celebrate with elegant table settings, beautiful floral arrangements and intimate candlelit dining experiences.",
    photo: photos.candlelitWeddingReceptions,
    gallery: [
      photos.candlelitWeddingReceptions,
      photos.elegantIndoorReceptions,
      photos.dreamWedding,
      photos.authenticMoroccanWelcomes,
      photos.gardenPoolsideCelebrations,
    ],
  },
  {
    title: "Private Parties & Special Events",
    description:
      "Bring family, friends or colleagues together for atmospheric celebrations filled with Moroccan character and charm.",
    photo: photos.gardenPoolsideCelebrations,
    gallery: [
      photos.gardenPoolsideCelebrations,
      photos.spectacularEveningEntertainment,
      photos.candlelitWeddingReceptions,
      photos.authenticMoroccanWelcomes,
      photos.elegantIndoorReceptions,
    ],
  },
];

/* --------------------------- Section 3 ------------------------------ */

export const promises = [
  {
    title: "Enchanting Gardens",
    description:
      "A lush landscape of olive trees, flowering gardens and peaceful courtyards creates a romantic atmosphere for every occasion.",
    icon: "gardens",
  },
  {
    title: "Distinctive Event Spaces",
    description:
      "From light-filled glasshouses to vaulted reception halls and intimate garden settings, each space has its own character.",
    icon: "spaces",
  },
  {
    title: "Tailored Celebrations",
    description:
      "Thoughtful styling, personalized experiences and exceptional attention to detail bring your unique vision to life.",
    icon: "tailored",
  },
] as const;

/* --------------------------- Section 4 ------------------------------ */

export interface SignatureExperience {
  title: string;
  description: string;
  photo: Photo;
}

export const signatureExperiences: SignatureExperience[] = [
  {
    title: "Candlelit Wedding Receptions",
    description: "Dine beneath glowing Moroccan lanterns in an enchanting atmosphere of warmth and romance.",
    photo: photos.candlelitWeddingReceptions,
  },
  {
    title: "Garden & Poolside Celebrations",
    description:
      "Enjoy beautiful open-air receptions surrounded by lush gardens, peaceful water features and timeless Moroccan charm.",
    photo: photos.gardenPoolsideCelebrations,
  },
  {
    title: "Elegant Indoor Receptions",
    description: "Celebrate in magnificent vaulted halls where traditional architecture meets sophisticated event styling.",
    photo: photos.elegantIndoorReceptions,
  },
  {
    title: "Spectacular Evening Entertainment",
    description:
      "Create magical moments with captivating performances and unforgettable entertainment beneath the Marrakech sky.",
    photo: photos.spectacularEveningEntertainment,
  },
  {
    title: "Authentic Moroccan Welcomes",
    description:
      "Immerse your guests in the spirit of Morocco with traditional music, lantern-lit pathways and memorable cultural experiences.",
    photo: photos.authenticMoroccanWelcomes,
  },
];

/* ----------------------------- Inquiry ------------------------------ */

export interface EventInquiry {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  /** Free text so guests can include their currency, e.g. "€30,000". */
  budget: string;
  message: string;
}

export const eventTypeOptions = [
  "Wedding",
  "Wedding ceremony",
  "Wedding reception",
  "Engagement party",
  "Private dinner",
  "Birthday celebration",
  "Private party",
  "Corporate event",
  "Other",
];

export const defaultEventInquiry = (): EventInquiry => ({
  name: "",
  email: "",
  phone: "",
  eventType: "Wedding",
  eventDate: "",
  guestCount: "",
  budget: "",
  message: "",
});

export const formatEventDate = (iso: string) => {
  if (!iso) return "Date to be confirmed";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export interface InquirySubmitResult {
  ok: boolean;
  message?: string;
  reference?: string;
  errors?: Record<string, string>;
}

/** JSON body sent to /api/send-inquiry.php by both inquiry forms. */
export const formatInquiryPayload = (inquiry: EventInquiry, reference: string) => ({
  name: inquiry.name.trim(),
  email: inquiry.email.trim(),
  phone: inquiry.phone.trim(),
  subject: inquiry.eventType,
  eventType: inquiry.eventType,
  eventDate: formatEventDate(inquiry.eventDate),
  guestCount: inquiry.guestCount.trim(),
  budget: inquiry.budget.trim() || "To be discussed",
  message: inquiry.message.trim(),
  reference,
});
