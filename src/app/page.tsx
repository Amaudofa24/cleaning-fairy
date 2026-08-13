import { Metadata } from "next";
import { SHARED_METADATA, SITE_CONFIG } from "@/seo";
import { Landing } from "@/features";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const protocol = (await headers()).get("x-forwarded-proto") || "http";
  const fullHost = host ? `${protocol}://${host}` : SITE_CONFIG.domain;

  return {
    ...SHARED_METADATA,
    metadataBase: new URL(fullHost),
    openGraph: {
      ...SHARED_METADATA.openGraph,
      url: fullHost,
    },
  };
}

export default function Home() {
  return <Landing />;
}
