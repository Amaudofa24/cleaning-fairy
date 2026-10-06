export interface ITrustMarker {
  id: string;
  icon: "Clock" | "CreditCard" | "ShieldCheck" | "MapPin";
  label: string;
  title: string;
}

export interface INavLink {
  name: string;
  href: string;
}

export interface ICleaningService {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  features: string[];
}

export interface IHowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: "Home" | "Calendar" | "CreditCard" | "Smile";
}

export interface IWhyCleaningFairyItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: "Clock" | "Lock" | "ShieldCheck";
}

export interface ICustomerReview {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  avatarBg: string;
}

export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HERO_TRUST_MARKERS: ITrustMarker[] = [
  {
    id: "fast-booking",
    icon: "Clock",
    label: "Fast Booking",
    title: "Book in 60 Seconds",
  },
  {
    id: "upfront-pricing",
    icon: "CreditCard",
    label: "Upfront Price",
    title: "Transparent Pricing",
  },
  {
    id: "vetted-cleaners",
    icon: "ShieldCheck",
    label: "Verified Staff",
    title: "Vetted Cleaners",
  },
  {
    id: "service-location",
    icon: "MapPin",
    label: "Location",
    title: "Serving Lagos",
  },
];

export const NAV_LINKS: INavLink[] = [
  { name: "What We Clean", href: "#what-we-clean" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Why Us", href: "#why-us" },
  { name: "Pricing", href: "#pricing" },
];

export const COMMERCIAL_CALENDLY_URL =
  "https://calendly.com/cleanfairy-info/commercial-cleaning";

export const CLEANING_SERVICES: ICleaningService[] = [
  {
    id: "residential",
    title: "Residential Cleaning",
    description: "Fresh, clean spaces you’ll love coming home to.",
    image: "/assets/imgs/residential.jpeg",
    tag: "Most Popular",
    features: ["Standard cleaning", "Deep Cleaning", "Move- in /out"],
  },
  {
    id: "commercial",
    title: "Commercial Cleaning",
    description:
      "Professional cleaning that keeps your workspace looking its best.",
    image: "/assets/imgs/commercial.jpeg",
    tag: "Thorough Care",
    features: ["Office spaces", "Airbnb & hotel space", "Restaurants"],
  },
];

export const HOW_IT_WORKS_STEPS: IHowItWorksStep[] = [
  {
    number: "01",
    title: "Tell us about your space",
    description:
      "Answer a few quick questions about your home (bedrooms, bathrooms, service type).",
    icon: "Home",
  },
  {
    number: "02",
    title: "Pick a date and time",
    description: "Choose from real, available slots (minimum 48h notice, up to 90 days in advance).",
    icon: "Calendar",
  },
  {
    number: "03",
    title: "Pay securely via Paystack",
    description:
      "See your full price breakdown before you pay. No hidden costs or surprise invoices.",
    icon: "CreditCard",
  },
  {
    number: "04",
    title: "Relax, your Fairy is on the way",
    description:
      "Get instant email confirmation and live cleaner assignment tracking for your booking.",
    icon: "Smile",
  },
];

export const WHY_CLEANING_FAIRY_FEATURES: IWhyCleaningFairyItem[] = [
  {
    id: "book-anytime",
    title: "Book Anytime 24/7",
    description:
      "Discover us at 11pm, book for Saturday morning. No phone calls or WhatsApp back-and-forth required.",
    highlight: "Instant Confirmation",
    icon: "Clock",
  },
  {
    id: "pay-online",
    title: "Pay Online, Safely",
    description:
      "Secure payment processed inside the booking flow with transparent line items upfront. Zero hidden fees.",
    highlight: "100% Upfront Pricing",
    icon: "Lock",
  },
  {
    id: "vetted-cleaners",
    title: "Vetted, Reliable Cleaners",
    description:
      "Every Fairy is background-checked, assigned, and tracked. You always know exactly who is coming to your space.",
    highlight: "Trusted Professionals",
    icon: "ShieldCheck",
  },
];

export const PRICING_CONFIG = {
  transportFee: 2000,
  basePrices: {
    standard: { "1bed": 15000, "2bed": 18000, "3bed": 25000, "4bed": 35000 },
    deep: { "1bed": 28000, "2bed": 35000, "3bed": 48000, "4bed": 65000 },
    move: { "1bed": 35000, "2bed": 45000, "3bed": 60000, "4bed": 80000 },
  },
  addonsList: [
    { key: "fridge" as const, label: "Inside Fridge", price: 5000 },
    { key: "oven" as const, label: "Oven Clean", price: 5000 },
    { key: "balcony" as const, label: "Balcony", price: 5000 },
  ],
  homeSizesList: [
    { key: "1bed" as const, label: "1 Bedroom" },
    { key: "2bed" as const, label: "2 Bedrooms" },
    { key: "3bed" as const, label: "3 Bedrooms" },
    { key: "4bed" as const, label: "4+ Bedrooms" },
  ],
  serviceTypesList: [
    { key: "standard" as const, label: "Standard" },
    { key: "deep" as const, label: "Deep Clean" },
    { key: "move" as const, label: "Move-in/Out" },
  ],
};

export const CUSTOMER_REVIEWS: ICustomerReview[] = [
  {
    id: "review-1",
    quote:
      "Booked at midnight, cleaner showed up Saturday morning exactly on time. Didn't have to send a single follow-up message.",
    author: "Ada",
    location: "Lekki Phase 1",
    rating: 5,
    avatarBg: "from-teal-400 to-teal-600",
  },
  {
    id: "review-2",
    quote:
      "Finally, a cleaning service where I know the price before I book. No surprises.",
    author: "Tunde",
    location: "Ikoyi",
    rating: 5,
    avatarBg: "from-teal-300 to-teal-600",
  },
  {
    id: "review-3",
    quote:
      "The app made it so easy to add extras like the oven and fridge. Worth it.",
    author: "Chioma",
    location: "Yaba",
    rating: 5,
    avatarBg: "from-teal-400 to-teal-700",
  },
];

export const FAQ_ITEMS: IFaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need to chat on WhatsApp to book?",
    answer:
      "No. You can configure your space, see transparent pricing, select your date and time, pay, and get immediate confirmation entirely on the website without sending a single WhatsApp message.",
  },
  {
    id: "faq-2",
    question: "What is your booking notice period?",
    answer:
      "We require a minimum of 48 hours advance notice to assign your vetted cleaner, confirm equipment availability, and arrange logistics. You can schedule cleanings up to 90 days in advance.",
  },
  {
    id: "faq-3",
    question: "What is your cancellation and refund policy?",
    answer:
      "Cancellations made more than 24 hours before your appointment receive a 100% refund. Cancellations between 12 and 24 hours receive a 50% refund. Cancellations under 12 hours are non-refundable. If a cleaner ever fails to show up, you receive a guaranteed 100% refund or free rebooking.",
  },
  {
    id: "faq-4",
    question: "Can I reschedule my booking?",
    answer:
      "Yes! Free rescheduling is available if requested at least 12 hours prior to your scheduled appointment. Rescheduling requested under 12 hours incurs a standard ₦5,000 late logistics fee.",
  },
  {
    id: "faq-5",
    question: "What happens if there is property damage or loss?",
    answer:
      "In the rare event of damage or loss, customers must report the incident within 24 hours of service. Our operations team guarantees investigation resolution within 5 business days.",
  },
  {
    id: "faq-6",
    question: "How does payment work?",
    answer:
      "All payments are handled securely through our Paystack integration using debit/credit cards or dedicated virtual bank transfer accounts.",
  },
];

export const FOOTER_SECTIONS = {
  company: [
    { label: "What We Clean", href: "#what-we-clean" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Cleaning Fairy", href: "#why-us" },
    { label: "Customer Reviews", href: "#reviews" },
  ],
  support: [
    { label: "Track My Booking", action: "track-booking" },
    { label: "FAQs", href: "#faqs" },
    { label: "Transparent Pricing", href: "#pricing" },
    { label: "Contact Us", href: "mailto:hello@cleaningfairy.com.ng" },
  ],
  legal: [
    { label: "Cancellation & Refund Policy", policy: "cancellation" as const },
    { label: "Rescheduling Policy", policy: "rescheduling" as const },
    { label: "Damage & Loss Policy", policy: "damage" as const },
    { label: "Booking Notice Period", policy: "notice" as const },
    { label: "Terms of Service", policy: "terms" as const },
  ],
};
