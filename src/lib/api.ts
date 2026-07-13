const isServer = typeof window === 'undefined';
const API_BASE = isServer
  ? (process.env.API_URL || 'http://rxsoft-backend:8080/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api/backend');

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

const EH_PREFIX = '/api/ehealthwares';

export const ehealthwaresApi = {
  getSections: () => apiGet<import('./types').SiteSection[]>(`${EH_PREFIX}/sections`),
  getProducts: () => apiGet<import('./types').Product[]>(`${EH_PREFIX}/products`),
  getProductBySlug: (slug: string) => apiGet<import('./types').Product>(`${EH_PREFIX}/products/${slug}`),
  getServices: () => apiGet<import('./types').Service[]>(`${EH_PREFIX}/services`),
  getServiceBySlug: (slug: string) => apiGet<import('./types').Service>(`${EH_PREFIX}/services/${slug}`),
  getTestimonials: () => apiGet<import('./types').Testimonial[]>(`${EH_PREFIX}/testimonials`),
  getPartners: () => apiGet<import('./types').Partner[]>(`${EH_PREFIX}/partners`),
  getTeam: () => apiGet<import('./types').TeamMember[]>(`${EH_PREFIX}/team`),
  submitContact: (data: import('./types').ContactPayload) =>
    apiPost<import('./types').ContactPayload>(`${EH_PREFIX}/contact`, data),
  getSettings: () => apiGet<import('./types').SiteSettings>(`${EH_PREFIX}/settings`),
};
