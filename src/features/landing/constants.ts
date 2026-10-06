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
    description: "Choose from real, available slots based on cleaner capacity.",
    icon: "Calendar",
  },
  {
    number: "03",
    title: "Pay securely online",
    description:
      "See your full price breakdown before you pay. No hidden costs.",
    icon: "CreditCard",
  },
  {
    number: "04",
    title: "Relax, your Fairy is on the way",
    description:
      "Get instant confirmation and real-time updates for your cleaning.",
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
    question: "What areas do you currently serve?",
    answer:
      "We currently serve major residential and commercial hubs across Lagos, including Lekki Phase 1 & 2, Ikoyi, Victoria Island, Yaba, Ikeja, Surulere, and surrounding neighborhoods. Enter your address during checkout to confirm instant coverage.",
  },
  {
    id: "faq-3",
    question: "Can I book recurring cleanings?",
    answer:
      "Yes! You can choose one-time, weekly, every 2 weeks, or monthly frequencies during checkout to keep your home consistently fresh with preferred scheduling.",
  },
  {
    id: "faq-4",
    question: "Is payment secure?",
    answer:
      "Yes. All online payments are handled securely through our encrypted payment gateway (Paystack), ensuring safe card, transfer, or USSD transactions.",
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
    { label: "FAQs", href: "#faqs" },
    { label: "Contact Us", href: "mailto:hello@cleaningfairy.com" },
    { label: "Transparent Pricing", href: "#pricing" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};
