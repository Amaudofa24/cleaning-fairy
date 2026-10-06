import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Cleaning Fairy",
  domain: "https://cleaningfairy.com.ng",
  headline: "Not magic. Just perfect cleaning.",
  defaultTitle: "Cleaning Fairy | Professional Home & Commercial Cleaning in Lagos",
  titleTemplate: "%s | Cleaning Fairy",
  description:
    "Book trusted, vetted home and commercial cleaning in Lagos in under 60 seconds. 100% upfront pricing for standard cleaning, deep cleaning, and move-in/move-out services with instant online booking.",
  phone: "+23480000FAIRY",
  displayPhone: "+234 (0) 800 FAIRY",
  email: "hello@cleaningfairy.com.ng",
  keywords: [
    "Cleaning Fairy",
    "home cleaning service Lagos",
    "house cleaning Lekki",
    "deep cleaning Lagos",
    "apartment cleaning Nigeria",
    "move-in cleaning Lagos",
    "move-out cleaning Lagos",
    "commercial cleaning Lagos",
    "office cleaning Victoria Island",
    "professional cleaner Ikoyi",
    "maid service Lagos",
    "book home cleaning online",
    "residential cleaning service",
    "recurring home cleaning",
    "Lekki home cleaners",
    "Ikoyi house cleaning",
    "Victoria Island cleaning service",
    "Yaba apartment cleaning",
    "Ikeja residential cleaners",
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
  applicationName: SITE_CONFIG.name,
  category: "Home & Commercial Cleaning Services",
  classification: "Business, Home Services, Professional Cleaning",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.domain,
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    creator: "@cleaningfairy",
    site: "@cleaningfairy",
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
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Lagos",
    "geo.position": "6.45407;3.39467",
    "ICBM": "6.45407, 3.39467",
  },
};
