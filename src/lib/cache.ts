import { revalidatePath, revalidateTag } from 'next/cache';

const API_BASE = process.env.API_URL || 'http://api.ehealthwares.com/ehealthwares';
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || 'rxsoft-internal-key';

export type CacheScope = 'client' | 'server' | 'all';

/**
 * Clear the Next.js Data Cache entries produced by the eHealthwares fetches
 * (all tagged `ehealthwares`) plus the home route's full-page cache.
 */
export function clearClientCache() {
  revalidatePath('/', 'layout');
  revalidateTag('ehealthwares');
}

/**
 * Clear the backend eHealthwares cache (AppCacheService `ehealthwares:*` keys)
 * via the service-to-service endpoint guarded by the internal API key.
 */
export async function clearServerCache(): Promise<void> {
  const res = await fetch(`${API_BASE}/cache/clear`, {
    method: 'POST',
    headers: { 'x-api-key': INTERNAL_API_KEY },
  });
  if (!res.ok) {
    console.error('clearServerCache: backend returned', res.status, res.statusText);
  }
}

export async function clearCaches(scope: CacheScope): Promise<void> {
  if (scope === 'server' || scope === 'all') {
    await clearServerCache();
  }
  if (scope === 'client' || scope === 'all') {
    clearClientCache();
  }
}