import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Cleaning Fairy",
  domain: "https://cleaningfairy.com.ng",
  headline: "We make your space feel brand new.",
  defaultTitle: "Cleaning Fairy | Professional Home & Apartment Cleaning Services in Lagos",
  titleTemplate: "%s | Cleaning Fairy",
  description:
    "Book trusted, professional home cleaning in Lagos in under 60 seconds. Transparent pricing for standard cleaning, deep cleaning, and move-in/move-out services with instant online booking.",
  keywords: [
    "Cleaning Fairy",
    "home cleaning service Lagos",
    "house cleaning Lekki",
    "deep cleaning Lagos",
    "apartment cleaning Nigeria",
    "move-in cleaning Lagos",
    "move-out cleaning Lagos",
    "professional maid service Lagos",
    "book home cleaning online",
    "residential cleaning service",
    "recurring home cleaning",
    "Lekki home cleaners",
    "Ikoyi house cleaning",
    "Victoria Island cleaning service",
  ],
};

export const SHARED_METADATA: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [
    {
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
  ],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Home Services",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.domain,
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: "en_NG",
    images: [
      {
        url: `${SITE_CONFIG.domain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cleaning Fairy - Professional Home Cleaning Services in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    creator: "@cleaningfairy",
    site: "@cleaningfairy",
    images: [`${SITE_CONFIG.domain}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};
