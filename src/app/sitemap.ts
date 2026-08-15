import type { MetadataRoute } from 'next';
import { ehealthwaresApi } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ehealthwares.com';
const LAST_MODIFIED = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/products-services`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/products/emr`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/careers`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/partnerships`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [products, services] = await Promise.all([
      ehealthwaresApi.getProducts(),
      ehealthwaresApi.getServices(),
    ]);
    dynamicRoutes = [
      ...(products ?? []).map((p) => ({
        url: `${SITE_URL}/products/${p.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...(services ?? []).map((s) => ({
        url: `${SITE_URL}/services/${s.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];
  } catch (e) {
    console.error('sitemap: failed to fetch dynamic routes', e);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
