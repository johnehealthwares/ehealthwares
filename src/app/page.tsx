import { ehealthwaresApi } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';
import { ProductsGrid } from '@/components/sections/ProductsGrid';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { Testimonials } from '@/components/sections/Testimonials';
import { Partners } from '@/components/sections/Partners';
import { CTABanner } from '@/components/sections/CTABanner';

export default async function HomePage() {
  let sections = null, products = null, services = null, testimonials = null, partners = null,
      heroSlides = null;
  try {
    [sections, products, services, testimonials, partners, heroSlides] = await Promise.all([
      ehealthwaresApi.getSections(),
      ehealthwaresApi.getProducts(),
      ehealthwaresApi.getServices(),
      ehealthwaresApi.getTestimonials(),
      ehealthwaresApi.getPartners(),
      ehealthwaresApi.getHeroSlides(),
    ]);
  } catch (e) {
    console.error('HomePage data fetch failed:', e);
  }

  const sectionList = sections ?? [];
  const productList = products ?? [];
  const serviceList = services ?? [];
  const testimonialList = testimonials ?? [];
  const partnerList = partners ?? [];
  const slideList = heroSlides ?? [];

  const ctaSection =
    sectionList.find((s) => s.key === 'cta') ?? {
      _id: '',
      key: 'cta',
      title: 'Ready to transform your healthcare technology?',
      subtitle: 'Talk to our solutions team about RxSoft and our interoperability services.',
      content: null,
      imageUrl: null,
      displayOrder: 0,
      isActive: true,
    };

  return (
    <>
      <Hero slides={slideList} />
      <StatsBar />
      <ProductsGrid products={productList} />
      <ServicesGrid services={serviceList} />
      <Testimonials testimonials={testimonialList} />
      <Partners partners={partnerList} />
      <CTABanner section={ctaSection} />
    </>
  );
}
