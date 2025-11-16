// Placeholder SEO helper functions
export function buildMetaTitle(title: string, siteName = "Company Name") {
  return `${title} | ${siteName}`;
}

export function buildMetaDescription(excerpt: string, max = 155) {
  if (!excerpt) return "";
  return excerpt.length > max ? excerpt.slice(0, max - 3) + "..." : excerpt;
}

export function breadcrumbJsonLd(segments: string[], baseUrl: string) {
  const itemListElement = segments.map((seg, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: seg,
    item: `${baseUrl}/${segments.slice(0, i + 1).join('/')}`.replace(/\/+$/,'')
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

export function serviceJsonLd(data: { title: string; description: string; slug: string; baseUrl: string; }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.description,
    url: `${data.baseUrl}/services/${data.slug}`
  };
}

export function articleJsonLd(data: {
  title: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
  publishDate?: string;
  modifiedDate?: string;
  baseUrl: string;
  siteName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: data.title,
    description: data.description,
    datePublished: data.publishDate,
    dateModified: data.modifiedDate || data.publishDate,
    image: data.image ? `${data.baseUrl}${data.image}` : undefined,
    mainEntityOfPage: `${data.baseUrl}/industry-information/${data.category}/${data.slug}`,
    author: { '@type': 'Organization', name: data.siteName },
    publisher: {
      '@type': 'Organization',
      name: data.siteName,
      logo: { '@type': 'ImageObject', url: `${data.baseUrl}/images/company.png` }
    }
  };
}

export function caseJsonLd(data: {
  title: string;
  description: string;
  slug: string;
  baseUrl: string;
  image?: string;
  publishDate?: string;
  siteName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    description: data.description,
    url: `${data.baseUrl}/cases/${data.slug}`,
    datePublished: data.publishDate,
    image: data.image ? `${data.baseUrl}${data.image}` : undefined,
    publisher: { '@type': 'Organization', name: data.siteName }
  };
}

export function organizationJsonLd(data: { name: string; url: string; logo: string; phone?: string; address?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    contactPoint: data.phone ? [{ '@type': 'ContactPoint', telephone: data.phone, contactType: 'customer service' }] : undefined,
    address: data.address ? { '@type': 'PostalAddress', streetAddress: data.address } : undefined
  };
}
