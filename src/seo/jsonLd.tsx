import { SITE_CONFIG } from "./metadata";

export const CleaningFairyJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HouseCleaning",
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.domain}/og-image.png`,
    "@id": SITE_CONFIG.domain,
    url: SITE_CONFIG.domain,
    telephone: "",
    priceRange: "₦18,000 - ₦100,000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
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
      opens: "08:00",
      closes: "18:00",
    },
    description: SITE_CONFIG.description,
    areaServed: [
      { "@type": "City", name: "Lekki" },
      { "@type": "City", name: "Ikoyi" },
      { "@type": "City", name: "Victoria Island" },
      { "@type": "City", name: "Ikeja" },
      { "@type": "City", name: "Lagos" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Cleaning",
            description: "Routine professional home and apartment cleaning.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deep Cleaning",
            description: "Thorough deep cleaning service for home interiors.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Move-in / Move-out Cleaning",
            description: "Comprehensive move-in or move-out space cleaning.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
