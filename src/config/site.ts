/**
 * Central site configuration for MAZ.
 *
 * Swap these placeholder values for real ones before launch.
 * Anything read from `import.meta.env` can be overridden via a local `.env`
 * without touching source.
 */

const env = import.meta.env;

export const site = {
  brand: "MAZ",
  tagline: "Amazon Ads Agency",
  legalName: "CJS Global LTD",
  foundedYear: 2017,
  url: "https://www.wearemaz.com",
  legal: {
    companyNumber: "10664657",
    registeredAddress: "8 Henfron, Caerphilly, CF83 2NU, United Kingdom",
  },

  metaDescription:
    "Profitable Amazon ads, managed daily since 2017. MAZ is a specialist Amazon Ads agency for ambitious eCommerce brands - transparent reporting, real analysts, sustainable growth.",

  // Booking - paste your Calendly event URL here. If blank, /book-a-call
  // still renders a styled fallback CTA.
  calendlyUrl:
    env.PUBLIC_CALENDLY_URL ??
    "https://calendly.com/amzppcmanagement/30min",

  // Phase-2 audit tool (external). UTMs are auto-appended.
  auditToolUrl:
    env.PUBLIC_AUDIT_TOOL_URL ?? "https://audit.maz.agency",

  // VSL - paste a YouTube or Vimeo watch URL; component handles both.
  vslUrl: env.PUBLIC_VSL_URL ?? "https://www.youtube.com/watch?v=8l2GVedgpP0",

  // Plausible analytics - set the domain to enable. Leave blank to disable.
  plausibleDomain: env.PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  tracking: {
    googleAnalyticsId: env.PUBLIC_GA_MEASUREMENT_ID ?? "",
    googleAdsId: env.PUBLIC_GOOGLE_ADS_ID ?? "",
    metaPixelId: env.PUBLIC_META_PIXEL_ID ?? "",
  },

  contact: {
    email: "amazon@wearemaz.com",
    phone: "+44 7874 423606",
    location: "Cardiff Bay, United Kingdom",
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/amz-ppc-management/",
    x: "https://x.com/Amazon_PPC_Ads",
  },

  // High-level track record claims surfaced in the hero / stat strip.
  // Update annually.
  stats: {
    yearsManaging: new Date().getFullYear() - 2017,
    adSpendManagedGbp: "\u00a38M",
    adSpendManagedUsd: "$10M",
  },
} as const;

export type SiteConfig = typeof site;

/**
 * Append MAZ-standard UTMs to any outbound link (typically the audit tool).
 */
export function withUtm(
  url: string,
  source: string,
  medium = "website",
  campaign = "maz_site",
): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}
