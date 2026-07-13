import type {
  Article,
  Career,
  ContactPayload,
  HeroSlide,
  InvestorData,
  Partner,
  Product,
  ProductCategory,
  Service,
  SiteSection,
  SiteSettings,
  TeamMember,
  Testimonial,
} from './types';

const isServer = typeof window === 'undefined';
const API_BASE = isServer
  ? (process.env.API_URL || 'http://rxsoft-backend:8080')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

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
  getSections: () => apiGet<SiteSection[]>(`${EH_PREFIX}/sections`),
  getProducts: () => apiGet<Product[]>(`${EH_PREFIX}/products`),
  getProductBySlug: (slug: string) => apiGet<Product>(`${EH_PREFIX}/products/${slug}`),
  getServices: () => apiGet<Service[]>(`${EH_PREFIX}/services`),
  getServiceBySlug: (slug: string) => apiGet<Service>(`${EH_PREFIX}/services/${slug}`),
  getTestimonials: () => apiGet<Testimonial[]>(`${EH_PREFIX}/testimonials`),
  getPartners: () => apiGet<Partner[]>(`${EH_PREFIX}/partners`),
  getTeam: () => apiGet<TeamMember[]>(`${EH_PREFIX}/team`),
  submitContact: (data: ContactPayload) =>
    apiPost<ContactPayload>(`${EH_PREFIX}/contact`, data),
  getSettings: () => apiGet<SiteSettings>(`${EH_PREFIX}/settings`),
  getHeroSlides: () => apiGet<HeroSlide[]>('/api/ehealthwares/hero-slides'),
  getCategories: () => apiGet<ProductCategory[]>('/api/ehealthwares/categories'),
  getArticles: () => apiGet<Article[]>('/api/ehealthwares/articles'),
  getInvestorData: () => apiGet<InvestorData[]>('/api/ehealthwares/investors'),
  getCareers: () => apiGet<Career[]>('/api/ehealthwares/careers'),
};
