import { SITE_CONFIG } from "./metadata";
import { FAQ_ITEMS } from "@/features/landing/constants";

export const CleaningFairyJsonLd = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HouseCleaning",
    name: SITE_CONFIG.name,
    headline: SITE_CONFIG.headline,
    image: `${SITE_CONFIG.domain}/icon.png`,
    "@id": SITE_CONFIG.domain,
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "₦15,000 - ₦100,000",
    paymentAccepted: "Credit Card, Debit Card, Bank Transfer via Paystack",
    currenciesAccepted: "NGN",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lekki Phase 1",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.45407,
      longitude: 3.39467,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "142",
      reviewCount: "142",
    },
    description: SITE_CONFIG.description,
    areaServed: [
      { "@type": "City", name: "Lekki Phase 1" },
      { "@type": "City", name: "Lekki Phase 2" },
      { "@type": "City", name: "Ikoyi" },
      { "@type": "City", name: "Victoria Island" },
      { "@type": "City", name: "Ikeja" },
      { "@type": "City", name: "Yaba" },
      { "@type": "City", name: "Surulere" },
      { "@type": "City", name: "Lagos" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Fairy Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Home Cleaning",
            description:
              "Routine cleaning including dusting, surface wipe down, bathroom and kitchen sanitization.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deep Home Cleaning",
            description:
              "Intensive deep scrub for tiles, grout, baseboards, appliances, and high-touch areas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Move-in / Move-out Cleaning",
            description:
              "Comprehensive top-to-bottom sanitize for moving into or vacating an apartment or duplex.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Office Cleaning",
            description:
              "Tailored corporate workplace, office, and restaurant sanitation services.",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
