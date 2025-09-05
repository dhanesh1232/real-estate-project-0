import { keywords } from "./keywords";

const SITE_URL = process.env.NEXTAUTH_URL || "https://luxestate.com";
const SITE_NAME = "LuxEstate";

export const defaultMeta = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LuxEstate – Buy, Sell & Rent Properties",
    template: "%s | LuxEstate – Real Estate Plots, Apartments & Villas",
  },
  description:
    "Discover affordable plots, luxury villas, apartments, and commercial properties with LuxEstate. Buy, sell, or rent real estate with trusted builders and verified listings.",
  keywords: [...keywords],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: "LuxEstate – Buy, Sell & Rent Properties",
    description:
      "Find the best real estate deals with LuxEstate. From affordable housing to luxury villas, explore verified property listings, trusted builders, and investment opportunities.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME || "LuxEstate Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxEstate | Real Estate Plots, Apartments & Villas",
    description:
      "LuxEstate helps you find affordable plots, apartments, villas, and commercial properties. Verified listings with trusted builders for your next real estate investment.",
    creator: "@luxestate",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  category: "real estate",
  applicationName: "LuxEstate",
  creator: "LuxEstate Team",
  publisher: "LuxEstate Realty Pvt. Ltd.",
};

function getSafe(obj, prop, fallback = undefined) {
  return obj && prop in obj ? obj[prop] : fallback;
}

export function generateMetadata(config = {}) {
  const title = getSafe(config, "title", defaultMeta.title.default);
  const description = getSafe(config, "description", defaultMeta.description);
  const keywords = getSafe(config, "keywords", []);
  const alternates = getSafe(config, "alternates", {});
  const openGraph = getSafe(config, "openGraph", {});
  const twitter = getSafe(config, "twitter", {});
  const robots = getSafe(config, "robots", {});

  const titleString =
    typeof title === "object" ? getSafe(title, "default", "") : String(title);
  const fullTitle = `${titleString} | ${SITE_NAME}`;

  const fullKeywords = [
    ...(Array.isArray(defaultMeta.keywords) ? defaultMeta.keywords : []),
    ...(Array.isArray(keywords) ? keywords : []),
  ].filter(Boolean);

  const canonicalUrl = getSafe(alternates, "canonical", SITE_URL);

  const defaultOgImages = getSafe(defaultMeta, "openGraph", {}).images || [];
  const ogImages = getSafe(openGraph, "images", defaultOgImages);
  const twitterImages = getSafe(
    twitter,
    "images",
    ogImages.map((img) => ({
      url: getSafe(img, "url", ""),
      alt: getSafe(img, "alt", SITE_NAME),
    }))
  );

  return {
    ...defaultMeta,
    title: {
      default:
        typeof title === "object" ? getSafe(title, "default", "") : title,
      template: getSafe(defaultMeta.title, "template", `%s | ${SITE_NAME}`),
    },
    description: description,
    keywords: fullKeywords.length ? fullKeywords : undefined,
    alternates: {
      ...getSafe(defaultMeta, "alternates", {}),
      canonical: canonicalUrl,
      ...alternates,
    },
    openGraph: {
      ...getSafe(defaultMeta, "openGraph", {}),
      title: fullTitle,
      description,
      ...openGraph,
      images: Array.isArray(ogImages) ? ogImages : [],
    },
    twitter: {
      ...getSafe(defaultMeta, "twitter", {}),
      title: fullTitle,
      description,
      ...twitter,
      images: Array.isArray(twitterImages) ? twitterImages : [],
    },
    robots: {
      ...getSafe(defaultMeta, "robots", {}),
      ...robots,
    },
    metadataBase: new URL(SITE_URL),
  };
}

export function metadataForPath(path, config = {}) {
  return generateMetadata({
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      url: `${SITE_URL}${path}`,
    },
    ...config,
  });
}
