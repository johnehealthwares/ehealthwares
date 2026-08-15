import type { Metadata } from 'next';
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { ehealthwaresApi } from '@/lib/api';
import { notFound } from 'next/navigation';
import { SiteImage } from '@/components/shared';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articles = await ehealthwaresApi.getArticles();
  const article = articles?.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt || article.title,
    alternates: { canonical: `/articles/${slug}` },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = await ehealthwaresApi.getArticles();
  const article = articles?.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 hex-pattern opacity-25" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white">
            <IconArrowLeft size={16} />
            Back to home
          </Link>
          {article.category && (
            <span className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              {article.category}
            </span>
          )}
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          {article.publishedAt && (
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-white/60">
              <IconCalendar size={15} />
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-6">
          {article.imageUrl && (
            <div className="relative mb-10 h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <SiteImage
                src={article.imageUrl}
                alt={article.title}
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          )}
          {article.excerpt && (
            <p className="text-lg font-medium leading-relaxed text-navy-700">{article.excerpt}</p>
          )}
          <div className="mt-8">
            <div
              className="prose max-w-none leading-relaxed text-navy-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-navy-900 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: (articles?.find((a) => a.slug === slug) as any)?.body || `<p>${article.excerpt ?? ''}</p>` }}
            />
          </div>
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-6 text-center">
            <p className="font-semibold text-navy-800">Want to see these ideas in practice?</p>
            <Link href="/contact" className="btn-gradient mt-4 inline-flex !px-6 !py-2.5">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
