import { ehealthwaresApi } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';
import { Categories } from '@/components/sections/Categories';
import { ProductsGrid } from '@/components/sections/ProductsGrid';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { LatestTopics } from '@/components/sections/LatestTopics';
import { Testimonials } from '@/components/sections/Testimonials';
import { Partners } from '@/components/sections/Partners';
import { Investors } from '@/components/sections/Investors';
import { Careers } from '@/components/sections/Careers';
import { CTABanner } from '@/components/sections/CTABanner';

export default async function HomePage() {
  let sections = null, products = null, services = null, testimonials = null,
      partners = null, heroSlides = null, categories = null, articles = null,
      investorData = null, careers = null;
  try {
    [sections, products, services, testimonials, partners, heroSlides, categories, articles, investorData, careers] =
      await Promise.all([
        ehealthwaresApi.getSections(),
        ehealthwaresApi.getProducts(),
        ehealthwaresApi.getServices(),
        ehealthwaresApi.getTestimonials(),
        ehealthwaresApi.getPartners(),
        ehealthwaresApi.getHeroSlides(),
        ehealthwaresApi.getCategories(),
        ehealthwaresApi.getArticles(),
        ehealthwaresApi.getInvestorData(),
        ehealthwaresApi.getCareers(),
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
  const categoryList = categories ?? [];
  const articleList = articles ?? [];
  const investorList = investorData ?? [];
  const careerList = careers ?? [];

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
      <Categories categories={categoryList} />
      <ProductsGrid products={productList} />
      <ServicesGrid services={serviceList} />
      <LatestTopics articles={articleList} />
      <Testimonials testimonials={testimonialList} />
      <Partners partners={partnerList} />
      <Investors data={investorList} />
      <Careers careers={careerList} />
      <CTABanner section={ctaSection} />
    </>
  );
}
