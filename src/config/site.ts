const defaultSiteUrl = "https://cultivatecrest.in";

function resolveSiteUrl(value: string | undefined) {
  const candidate = value?.trim();

  if (!candidate) {
    return defaultSiteUrl;
  }

  const valueWithProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;

  try {
    const url = new URL(valueWithProtocol);
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

export const siteConfig = {
  name: "CultivateCrest",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  description:
    "Premium chia, flax, pumpkin and sunflower seeds, carefully packed in India for everyday wellness.",
  contact: {
    general: "info@cultivatecrest.in",
    support: "support@cultivatecrest.in",
  },
  social: {
    instagram: "https://www.instagram.com/cultivatecrest/",
    facebook: "https://www.facebook.com/profile.php?id=61579096583214",
  },
  amazonStoreUrl: "https://www.amazon.in/s?k=cultivatecrest",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function emailUrl(address: string, subject: string, body?: string) {
  const search = new URLSearchParams({ subject });

  if (body) {
    search.set("body", body);
  }

  return `mailto:${address}?${search.toString()}`;
}
