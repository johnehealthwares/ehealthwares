# eHealthwares Competitor-Inspired Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the eHealthwares landing page with zero native HTML tags, pure Mantine components, new sections inspired by GE/Philips/Siemens, and new backend schemas for all section data.

**Architecture:** Backend (rxsoft-backend) gets 5 new Mongoose schemas + service methods + controller endpoints + seed data. Frontend gets 14+ Mantine-only components (11 sections + header + footer) wired via API in page.tsx. Iterative Puppeteer screenshots drive visual comparison against competitor references.

**Tech Stack:** NestJS/Mongoose (backend), Next.js 14 App Router + Mantine 7 + Tailwind (frontend), Puppeteer (screenshots)

## Global Constraints
- Zero native HTML tags: no `<section>`, `<div>`, `<header>`, `<img>`, `<span>`, `<a>`, `<nav>`, `<footer>` — every element uses Mantine components
- All landing page sections are API-driven from backend seed data (no hardcoded content)
- New schemas follow existing Mongoose patterns in `src/modules/ehealthwares/schemas/`
- Hero autoplay interval is configurable (default 20s)
- After each task, take a screenshot and compare to competitor references in `temporary_screenshots/competitors/`
- Assets moved from `assets/` to `public/assets/` become git-tracked

---

## File Structure

### Backend (rxsoft-backend `src/modules/ehealthwares/`)
| File | Action | Responsibility |
|------|--------|----------------|
| `schemas/article.schema.ts` | Create | Mongoose schema for Latest Topics articles |
| `schemas/heroslide.schema.ts` | Create | Mongoose schema for hero carousel slides |
| `schemas/category.schema.ts` | Create | Mongoose schema for product/service categories |
| `schemas/investor.schema.ts` | Create | Mongoose schema for investor data points |
| `schemas/career.schema.ts` | Create | Mongoose schema for career position listings |
| `schemas/index.ts` | Modify | Export new schemas, add to mongooseFeatureModels |
| `dto/ehealthwares.dto.ts` | Modify | Add DTOs for new schemas |
| `services/ehealthwares.service.ts` | Modify | Add getCategories(), getHeroSlides(), getArticles(), getInvestorData(), getCareers() |
| `controllers/ehealthwares.controller.ts` | Modify | Add endpoints for new schemas |
| `seed/ehealthwares.seed.ts` | Modify | Add seed data for all new schemas |

### Frontend (ehealthwares `src/`)
| File | Action | Responsibility |
|------|--------|----------------|
| `lib/types.ts` | Modify | Add new TypeScript interfaces |
| `lib/api.ts` | Modify | Add API methods for new endpoints |
| `components/layout/Header.tsx` | Rewrite | Pure Mantine: AppShell, Group, Image, Burger, Drawer, Anchor |
| `components/layout/Footer.tsx` | Rewrite | Pure Mantine: Container, SimpleGrid, Stack, Title, Text, Anchor, Divider |
| `components/sections/Hero.tsx` | Rewrite | Mantine Carousel with autoplay, video/image slides, Overlay |
| `components/sections/StatsBar.tsx` | Rewrite | Pure Mantine: SimpleGrid, Paper, Group, Title, Text |
| `components/sections/Categories.tsx` | Create | GE-style icon cards: SimpleGrid, Card, ThemeIcon, Image |
| `components/sections/ProductsGrid.tsx` | Rewrite | Pure Mantine: SimpleGrid, Card, Image, Title, Text, Badge |
| `components/sections/ServicesGrid.tsx` | Rewrite | Pure Mantine: SimpleGrid, Card, Image, Title, Text |
| `components/sections/LatestTopics.tsx` | Create | Siemens-style article cards: SimpleGrid, Card, Image, Anchor |
| `components/sections/Testimonials.tsx` | Rewrite | Mantine Carousel with Card, Avatar, Blockquote |
| `components/sections/Partners.tsx` | Rewrite | Pure Mantine: Group, Image, Paper |
| `components/sections/Investors.tsx` | Create | GE-style stats grid: SimpleGrid, Paper, Title, RingProgress |
| `components/sections/Careers.tsx` | Create | GE-style job cards: SimpleGrid, Card, Image, Badge, Button |
| `components/sections/CTABanner.tsx` | Rewrite | Pure Mantine: Box, Container, Title, Text, Button |
| `app/page.tsx` | Modify | Wire all new sections with API data |

---

### Task 1: Install Mantine Carousel + update types and API client

**Files:**
- Modify: `package.json` (add `@mantine/carousel`)
- Modify: `lib/types.ts` (add new interfaces)
- Modify: `lib/api.ts` (add new API methods)

**Interfaces:**
- Consumes: existing project setup
- Produces: type definitions and API methods used by all frontend tasks

- [ ] **Step 1: Install @mantine/carousel**

```bash
yarn add @mantine/carousel
```

- [ ] **Step 2: Add new TypeScript types to `lib/types.ts`**

Add after existing types:

```ts
export interface HeroSlide {
  _id: string;
  title: string | null;
  subtitle: string | null;
  mediaUrl: string | null;
  mediaType: 'image' | 'video';
  ctaText: string | null;
  ctaLink: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string | null;
  publishedAt: string | null;
  isActive: boolean;
}

export interface InvestorData {
  _id: string;
  label: string;
  value: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface Career {
  _id: string;
  title: string;
  slug: string;
  location: string | null;
  type: 'full-time' | 'contract' | 'remote';
  department: string | null;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
}
```

- [ ] **Step 3: Add new API methods to `lib/api.ts`**

Add after existing methods in `ehealthwaresApi`:

```ts
  getHeroSlides: () => apiGet<HeroSlide[]>('/api/ehealthwares/hero-slides'),
  getCategories: () => apiGet<ProductCategory[]>('/api/ehealthwares/categories'),
  getArticles: () => apiGet<Article[]>('/api/ehealthwares/articles'),
  getInvestorData: () => apiGet<InvestorData[]>('/api/ehealthwares/investors'),
  getCareers: () => apiGet<Career[]>('/api/ehealthwares/careers'),
```

Also add the imports at top:

```ts
import type { HeroSlide, ProductCategory, Article, InvestorData, Career } from './types';
```

- [ ] **Step 4: Verify no TypeScript errors**

```bash
yarn typecheck
```
Expected: no errors.

- [ ] **Step 5: Screenshot & commit**

```bash
node screenshot.mjs
```
Check screenshot for any layout issues, then commit.

---

### Task 2: Backend — New Mongoose Schemas

**Files:**
- Create: `src/modules/ehealthwares/schemas/article.schema.ts`
- Create: `src/modules/ehealthwares/schemas/heroslide.schema.ts`
- Create: `src/modules/ehealthwares/schemas/category.schema.ts`
- Create: `src/modules/ehealthwares/schemas/investor.schema.ts`
- Create: `src/modules/ehealthwares/schemas/career.schema.ts`
- Modify: `src/modules/ehealthwares/schemas/index.ts`

**Interfaces:**
- Consumes: existing Mongoose patterns from `product.schema.ts`
- Produces: 5 new Mongoose model names used by Task 3, 4

- [ ] **Step 1: Create `article.schema.ts`**

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true, collection: 'ehealthwares_articles' })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  excerpt: string;

  @Prop()
  body: string;

  @Prop()
  imageUrl: string;

  @Prop()
  category: string;

  @Prop()
  publishedAt: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
```

- [ ] **Step 2: Create `heroslide.schema.ts`**

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeroSlideDocument = HydratedDocument<HeroSlide>;

@Schema({ timestamps: true, collection: 'ehealthwares_hero_slides' })
export class HeroSlide {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  mediaUrl: string;

  @Prop({ enum: ['image', 'video'], default: 'image' })
  mediaType: string;

  @Prop()
  ctaText: string;

  @Prop()
  ctaLink: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const HeroSlideSchema = SchemaFactory.createForClass(HeroSlide);
```

- [ ] **Step 3: Create `category.schema.ts`**

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, collection: 'ehealthwares_categories' })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  iconUrl: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
```

- [ ] **Step 4: Create `investor.schema.ts`**

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvestorDataDocument = HydratedDocument<InvestorData>;

@Schema({ timestamps: true, collection: 'ehealthwares_investor_data' })
export class InvestorData {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  value: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const InvestorDataSchema = SchemaFactory.createForClass(InvestorData);
```

- [ ] **Step 5: Create `career.schema.ts`**

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CareerDocument = HydratedDocument<Career>;

@Schema({ timestamps: true, collection: 'ehealthwares_careers' })
export class Career {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  location: string;

  @Prop({ enum: ['full-time', 'contract', 'remote'], default: 'full-time' })
  type: string;

  @Prop()
  department: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const CareerSchema = SchemaFactory.createForClass(Career);
```

- [ ] **Step 6: Update `schemas/index.ts`**

Add imports for all 5 new schemas, export them, add to `mongooseFeatureModels` array:

```ts
import { Article, ArticleSchema } from './article.schema';
import { HeroSlide, HeroSlideSchema } from './heroslide.schema';
import { Category, CategorySchema } from './category.schema';
import { InvestorData, InvestorDataSchema } from './investor.schema';
import { Career, CareerSchema } from './career.schema';
```

Add to exports:
```ts
  Article, ArticleSchema,
  HeroSlide, HeroSlideSchema,
  Category, CategorySchema,
  InvestorData, InvestorDataSchema,
  Career, CareerSchema,
```

Add to mongooseFeatureModels:
```ts
  { name: 'Article', schema: ArticleSchema },
  { name: 'HeroSlide', schema: HeroSlideSchema },
  { name: 'Category', schema: CategorySchema },
  { name: 'InvestorData', schema: InvestorDataSchema },
  { name: 'Career', schema: CareerSchema },
```

Add type exports:
```ts
export type { ArticleDocument } from './article.schema';
export type { HeroSlideDocument } from './heroslide.schema';
export type { CategoryDocument } from './category.schema';
export type { InvestorDataDocument } from './investor.schema';
export type { CareerDocument } from './career.schema';
```

- [ ] **Step 7: Verify compilation**

```bash
cd /Users/john/develop/rxsoft/rxsoft-backend && npx nest build
```
Expected: no errors.

---

### Task 3: Backend — Service methods + Controller endpoints

**Files:**
- Modify: `src/modules/ehealthwares/services/ehealthwares.service.ts`
- Modify: `src/modules/ehealthwares/controllers/ehealthwares.controller.ts`

**Interfaces:**
- Consumes: new model names from Task 2
- Produces: 5 new cached getter methods used by Task 4 (seed) and controller

- [ ] **Step 1: Add model injections to service constructor**

Add after existing `@InjectModel('SiteSetting')`:
```ts
    @InjectModel('HeroSlide') private readonly heroSlideModel: Model<HeroSlideDocument>,
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Article') private readonly articleModel: Model<ArticleDocument>,
    @InjectModel('InvestorData') private readonly investorModel: Model<InvestorDataDocument>,
    @InjectModel('Career') private readonly careerModel: Model<CareerDocument>,
```

Add imports:
```ts
import {
  ...
  HeroSlideDocument,
  CategoryDocument,
  ArticleDocument,
  InvestorDataDocument,
  CareerDocument,
} from '../schemas';
```

- [ ] **Step 2: Add getter methods to service**

Add after `getSettings()` method:

```ts
  getHeroSlides() {
    return this.getCached('ehealthwares:hero-slides', () =>
      this.heroSlideModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getCategories() {
    return this.getCached('ehealthwares:categories', () =>
      this.categoryModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getArticles() {
    return this.getCached('ehealthwares:articles', () =>
      this.articleModel.find({ isActive: true }).sort({ publishedAt: -1 }).exec(),
    );
  }

  getInvestorData() {
    return this.getCached('ehealthwares:investors', () =>
      this.investorModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getCareers() {
    return this.getCached('ehealthwares:careers', () =>
      this.careerModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }
```

Add to `onApplicationBootstrap` cache warmup:
```ts
const [..., heroSlides, categories, articles, investors, careers] = await Promise.all([
  ...existing,
  this.getHeroSlides(),
  this.getCategories(),
  this.getArticles(),
  this.getInvestorData(),
  this.getCareers(),
]);
```

- [ ] **Step 3: Add controller endpoints**

Add to `EhealthwaresController`:

```ts
  @Get('hero-slides')
  @ApiOperation({ summary: 'Get hero carousel slides' })
  getHeroSlides() {
    return this.ehealthwaresService.getHeroSlides();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get product categories' })
  getCategories() {
    return this.ehealthwaresService.getCategories();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Get latest articles/topics' })
  getArticles() {
    return this.ehealthwaresService.getArticles();
  }

  @Get('investors')
  @ApiOperation({ summary: 'Get investor data' })
  getInvestors() {
    return this.ehealthwaresService.getInvestorData();
  }

  @Get('careers')
  @ApiOperation({ summary: 'Get career positions' })
  getCareers() {
    return this.ehealthwaresService.getCareers();
  }
```

- [ ] **Step 4: Verify compilation**

```bash
cd /Users/john/develop/rxsoft/rxsoft-backend && npx nest build
```
Expected: no errors.

---

### Task 4: Backend — Seed data for new schemas

**Files:**
- Modify: `src/modules/ehealthwares/seed/ehealthwares.seed.ts`

**Interfaces:**
- Consumes: Model constructor injections for all 5 new models
- Produces: seed data in MongoDB used by frontend at runtime

- [ ] **Step 1: Add model injections to seed service constructor**

Add after existing injections:
```ts
    @InjectModel('HeroSlide') private readonly heroSlideModel: Model<HeroSlideDocument>,
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Article') private readonly articleModel: Model<ArticleDocument>,
    @InjectModel('InvestorData') private readonly investorModel: Model<InvestorDataDocument>,
    @InjectModel('Career') private readonly careerModel: Model<CareerDocument>,
```

Add imports:
```ts
import {
  ...
  HeroSlideDocument, CategoryDocument,
  ArticleDocument, InvestorDataDocument, CareerDocument,
} from '../schemas';
```

- [ ] **Step 2: Add seed methods**

Add after `seedSettings()`:

```ts
  private async seedHeroSlides() {
    const slides = [
      {
        title: 'Building Connected Healthcare Technology Ecosystems',
        subtitle: 'eHealthwares helps healthcare organizations transform operations through enterprise software solutions, healthcare interoperability, and intelligent automation.',
        mediaUrl: '/assets/pexels-shvetsa-4225925.jpg',
        mediaType: 'image',
        ctaText: 'Explore Products',
        ctaLink: '/products/rxsoft-pharmacy',
        displayOrder: 0,
        isActive: true,
      },
      {
        title: 'Enterprise Software for Modern Healthcare',
        subtitle: 'RxSoft Pharmacy, Laboratory Information System, and Radiology Information System — purpose-built for healthcare organizations.',
        mediaUrl: '/assets/pexels-mart-production-7089011.jpg',
        mediaType: 'image',
        ctaText: 'View Solutions',
        ctaLink: '/products/rxsoft-pharmacy',
        displayOrder: 1,
        isActive: true,
      },
      {
        title: 'Seamless Healthcare Interoperability',
        subtitle: 'Connect your systems with HL7, FHIR, and DICOM standards. Break down data silos across your healthcare organization.',
        mediaUrl: '/assets/pexels-tima-miroshnichenko-6234976.jpg',
        mediaType: 'image',
        ctaText: 'Learn More',
        ctaLink: '/products/healthcare-interoperability',
        displayOrder: 2,
        isActive: true,
      },
      {
        title: 'Innovating Healthcare Through Technology',
        subtitle: 'AI-powered automation, patient engagement platforms, and intelligent workflow solutions for the future of care.',
        mediaUrl: '/assets/8375668-uhd_2160_4096_25fps.mp4',
        mediaType: 'video',
        ctaText: 'Contact Sales',
        ctaLink: '/contact',
        displayOrder: 3,
        isActive: true,
      },
    ];
    await this.heroSlideModel.insertMany(slides);
    this.logger.log('Seeded hero slides');
  }

  private async seedCategories() {
    const categories = [
      {
        name: 'Pharmacy Management',
        slug: 'pharmacy',
        description: 'End-to-end pharmacy management platform for prescription processing, inventory, and dispensing.',
        iconUrl: null,
        imageUrl: '/assets/pexels-shvetsa-4225925.jpg',
        displayOrder: 0,
        isActive: true,
      },
      {
        name: 'Laboratory Systems',
        slug: 'laboratory',
        description: 'Comprehensive lab information systems for workflow automation and result management.',
        iconUrl: null,
        imageUrl: '/assets/pexels-mart-production-7089011.jpg',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Radiology & Imaging',
        slug: 'radiology',
        description: 'Advanced radiology information systems with PACS connectivity and DICOM support.',
        iconUrl: null,
        imageUrl: '/assets/pexels-tima-miroshnichenko-6234976.jpg',
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Interoperability',
        slug: 'interoperability',
        description: 'Seamless data exchange across healthcare systems with HL7, FHIR, and custom integrations.',
        iconUrl: null,
        imageUrl: '/assets/pexels-daliladalprat-5875565.jpg',
        displayOrder: 3,
        isActive: true,
      },
    ];
    await this.categoryModel.insertMany(categories);
    this.logger.log('Seeded categories');
  }

  private async seedArticles() {
    const articles = [
      {
        title: 'The Future of Pharmacy Management: Digital Transformation in 2026',
        slug: 'future-of-pharmacy-management-2026',
        excerpt: 'Explore how digital transformation is reshaping pharmacy operations, from automated dispensing to AI-powered inventory management.',
        body: '<p>Pharmacy management is undergoing a digital revolution...</p>',
        imageUrl: '/assets/pexels-cottonbro-7579832.jpg',
        category: 'Pharmacy',
        publishedAt: new Date('2026-06-15'),
        isActive: true,
      },
      {
        title: 'HL7 vs FHIR: Choosing the Right Interoperability Standard',
        slug: 'hl7-vs-fhir-interoperability-standards',
        excerpt: 'A comprehensive comparison of HL7 and FHIR standards to help healthcare organizations choose the right integration approach.',
        body: '<p>Healthcare interoperability standards continue to evolve...</p>',
        imageUrl: '/assets/pexels-pavel-danilyuk-8442154.jpg',
        category: 'Interoperability',
        publishedAt: new Date('2026-05-20'),
        isActive: true,
      },
      {
        title: 'How LIS Integration Improves Laboratory Efficiency by 40%',
        slug: 'lis-integration-laboratory-efficiency',
        excerpt: 'Discover how modern Laboratory Information Systems with seamless integration capabilities are transforming lab operations.',
        body: '<p>Laboratory efficiency is critical for patient care...</p>',
        imageUrl: '/assets/pexels-karola-g-7195191.jpg',
        category: 'Laboratory',
        publishedAt: new Date('2026-04-10'),
        isActive: true,
      },
      {
        title: 'AI in Healthcare: Beyond the Hype — Real Use Cases in 2026',
        slug: 'ai-healthcare-real-use-cases-2026',
        excerpt: 'From conversational assistants to clinical intelligence, explore the practical AI applications transforming healthcare today.',
        body: '<p>Artificial intelligence in healthcare has moved beyond experimentation...</p>',
        imageUrl: '/assets/pexels-tima-miroshnichenko-6234978.jpg',
        category: 'AI & Automation',
        publishedAt: new Date('2026-03-05'),
        isActive: true,
      },
      {
        title: 'Building a Digital Health Strategy: A Framework for Providers',
        slug: 'digital-health-strategy-framework',
        excerpt: 'A practical framework for healthcare providers developing their digital health strategy and technology roadmap.',
        body: '<p>Developing a digital health strategy requires careful planning...</p>',
        imageUrl: '/assets/pexels-ivan-s-4989164.jpg',
        category: 'Strategy',
        publishedAt: new Date('2026-02-18'),
        isActive: true,
      },
    ];
    await this.articleModel.insertMany(articles);
    this.logger.log('Seeded articles');
  }

  private async seedInvestorData() {
    const data = [
      {
        label: 'Markets Served',
        value: '12+',
        description: 'Countries across Africa with active deployments',
        displayOrder: 0,
        isActive: true,
      },
      {
        label: 'Facilities Empowered',
        value: '500+',
        description: 'Healthcare organizations using our platforms',
        displayOrder: 1,
        isActive: true,
      },
      {
        label: 'Annual Platform Uptime',
        value: '99.97%',
        description: 'Enterprise-grade reliability and availability',
        displayOrder: 2,
        isActive: true,
      },
      {
        label: 'Integrations Delivered',
        value: '200+',
        description: 'HL7, FHIR, DICOM, and custom system connections',
        displayOrder: 3,
        isActive: true,
      },
      {
        label: 'Year-over-Year Growth',
        value: '85%',
        description: 'Sustained revenue growth for the past 3 fiscal years',
        displayOrder: 4,
        isActive: true,
      },
    ];
    await this.investorModel.insertMany(data);
    this.logger.log('Seeded investor data');
  }

  private async seedCareers() {
    const careers = [
      {
        title: 'Senior Software Engineer — Healthcare',
        slug: 'senior-software-engineer',
        location: 'Lagos, Nigeria (Hybrid)',
        type: 'full-time',
        department: 'Engineering',
        description: 'Build and maintain healthcare technology platforms including pharmacy, laboratory, and radiology systems. Work with NestJS, React, PostgreSQL, and MongoDB.',
        imageUrl: '/assets/pexels-gustavo-fring-7446984.jpg',
        isActive: true,
      },
      {
        title: 'Healthcare Integration Specialist',
        slug: 'healthcare-integration-specialist',
        location: 'Remote (Africa)',
        type: 'remote',
        department: 'Professional Services',
        description: 'Lead HL7, FHIR, and DICOM integration projects for healthcare organizations. Design and implement data exchange workflows.',
        imageUrl: '/assets/pexels-mart-production-7089614.jpg',
        isActive: true,
      },
      {
        title: 'Product Manager — Interoperability Platform',
        slug: 'product-manager-interoperability',
        location: 'Lagos, Nigeria',
        type: 'full-time',
        department: 'Product',
        description: 'Define and execute the product roadmap for our healthcare interoperability platform. Work with engineering, sales, and customer teams.',
        imageUrl: '/assets/pexels-gustavo-fring-7446994.jpg',
        isActive: true,
      },
    ];
    await this.careerModel.insertMany(careers);
    this.logger.log('Seeded careers');
  }
```

- [ ] **Step 3: Add new seed steps to the `seed()` method's steps array**

```ts
    const steps: any[] = [
      this.seedSections, this.seedProducts, this.seedServices,
      this.seedTestimonials, this.seedPartners, this.seedTeam, this.seedSettings,
      this.seedHeroSlides, this.seedCategories, this.seedArticles,
      this.seedInvestorData, this.seedCareers,
    ];
```

- [ ] **Step 4: Delete existing seed data and restart backend to test**

```bash
# Drop the ehealthwares collections and restart so seed runs fresh
# The seed check is count > 0, so we need to clear it first
```
For testing: restart backend after deleting the seeded collections via Mongo shell, or set a flag to re-seed.

- [ ] **Step 5: Verify new endpoints return data**

```bash
curl -s http://localhost:8080/api/ehealthwares/hero-slides | python3 -m json.tool | head -10
curl -s http://localhost:8080/api/ehealthwares/categories | python3 -m json.tool | head -10
curl -s http://localhost:8080/api/ehealthwares/articles | python3 -m json.tool | head -10
curl -s http://localhost:8080/api/ehealthwares/investors | python3 -m json.tool | head -10
curl -s http://localhost:8080/api/ehealthwares/careers | python3 -m json.tool | head -10
```
Expected: each returns HTTP 200 with seeded JSON array.

---

### Task 5: Frontend — Header + Footer (pure Mantine)

**Files:**
- Rewrite: `src/components/layout/Header.tsx`
- Rewrite: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: Mantine 7 components
- Produces: Layout components used by `app/layout.tsx`

- [ ] **Step 1: Rewrite `Header.tsx`** — no `<header>`, `<div>`, `<img>`, `<span>`, `<a>`

```tsx
'use client';

import { useState } from 'react';
import {
  AppShell, Group, Burger, Drawer, Stack, Image, Anchor, Title, UnstyledButton, Container, Box,
} from '@mantine/core';
import Link from 'next/link';

const links = [
  { label: 'Products', href: '/products/rxsoft-pharmacy' },
  { label: 'Services', href: '/services/digital-transformation' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <Box component="header" className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="lg">
        <Group h={64} justify="space-between">
          <UnstyledButton component={Link} href="/" style={{ textDecoration: 'none' }}>
            <Group gap="sm">
              <Image src="/logo.jpg" alt="eHealthwares" h={32} w="auto" />
              <Title order={4} c="brand.7">eHealthwares</Title>
            </Group>
          </UnstyledButton>

          <Group visibleFrom="sm" gap="lg">
            {links.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                size="sm"
                c="gray.6"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" title="Menu" size="sm">
        <Stack>
          {links.map((link) => (
            <UnstyledButton
              key={link.href}
              onClick={() => setOpened(false)}
              component={Link}
              href={link.href}
            >
              <Title order={5} c="gray.7">{link.label}</Title>
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
```

- [ ] **Step 2: Rewrite `Footer.tsx`** — no `<footer>`, `<div>`, `<img>`, `<span>`, `<a>`

```tsx
import { Container, SimpleGrid, Stack, Title, Text, Anchor, Image, Group, Box } from '@mantine/core';
import Link from 'next/link';

const productLinks = [
  { label: 'RxSoft Pharmacy', href: '/products/rxsoft-pharmacy' },
  { label: 'Laboratory Information System', href: '/products/lis' },
  { label: 'Radiology Information System', href: '/products/ris' },
  { label: 'Interoperability', href: '/products/healthcare-interoperability' },
];

export function Footer() {
  return (
    <Box component="footer" style={{ backgroundColor: 'var(--mantine-color-gray-9)', color: 'var(--mantine-color-gray-3)' }} py={48}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb={32}>
          <Stack>
            <Group gap="sm">
              <Image src="/logo.jpg" alt="eHealthwares" h={36} w="auto" />
              <Title order={4} c="white">eHealthwares</Title>
            </Group>
            <Text size="sm" c="gray.5" maw={280}>
              Building Connected Healthcare Technology Ecosystems
            </Text>
          </Stack>

          <Stack>
            <Title order={6} c="white" tt="uppercase">Products</Title>
            {productLinks.map((link) => (
              <Anchor key={link.href} component={Link} href={link.href} size="sm" c="gray.5">
                {link.label}
              </Anchor>
            ))}
          </Stack>

          <Stack>
            <Title order={6} c="white" tt="uppercase">Contact</Title>
            <Text size="sm" c="gray.5">info@ehealthwares.com</Text>
            <Text size="sm" c="gray.5">+234-800-HEALTH</Text>
          </Stack>
        </SimpleGrid>

        <Box style={{ borderTop: '1px solid var(--mantine-color-gray-8)', paddingTop: '24px' }}>
          <Text ta="center" size="sm" c="gray.6">
            &copy; {new Date().getFullYear()} eHealthwares. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
yarn build
```
Expected: no errors.

- [ ] **Step 4: Screenshot & compare**

```bash
node screenshot.mjs
```
Compare Header + Footer against competitor references. Check that all text is readable, logo appears, mobile burger works, footer columns are aligned.

---

### Task 6: Frontend — Hero Carousel

**Files:**
- Rewrite: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `HeroSlide[]` from API
- Produces: Carousel component used by page.tsx

- [ ] **Step 1: Rewrite `Hero.tsx`** — Mantine Carousel with autoplay, overlay, video support

```tsx
'use client';

import { Carousel } from '@mantine/carousel';
import { Container, Title, Text, Button, Overlay, AspectRatio, Box, Group } from '@mantine/core';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import type { HeroSlide } from '@/lib/types';

interface HeroProps {
  slides: HeroSlide[];
  interval?: number;
}

export function Hero({ slides, interval = 20000 }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: interval, stopOnInteraction: false }));

  if (!slides?.length) return null;

  return (
    <Box component="section">
      <Carousel
        withIndicators
        withControls
        height="90vh"
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={{
          control: {
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            width: 48,
            height: 48,
          },
        }}
      >
        {slides.map((slide) => (
          <Carousel.Slide key={slide._id}>
            <Box style={{ position: 'relative', height: '90vh', width: '100%', overflow: 'hidden' }}>
              {slide.mediaType === 'video' ? (
                <Box
                  component="video"
                  src={slide.mediaUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${slide.mediaUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <Overlay gradient="linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" zIndex={1} />
              <Container
                size="lg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box maw={640}>
                  {slide.title && (
                    <Title order={1} c="white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                      {slide.title}
                    </Title>
                  )}
                  {slide.subtitle && (
                    <Text size="lg" c="gray.3" mt="md" style={{ maxWidth: 520 }}>
                      {slide.subtitle}
                    </Text>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Group mt="xl">
                      <Button component={Link} href={slide.ctaLink} size="lg" variant="filled" color="brand">
                        {slide.ctaText}
                      </Button>
                    </Group>
                  )}
                </Box>
              </Container>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
```

- [ ] **Step 2: Install embla-carousel-autoplay**

```bash
yarn add embla-carousel-autoplay
```

- [ ] **Step 3: Verify build**

```bash
yarn build
```
Expected: no errors.

- [ ] **Step 4: Screenshot & compare**

Take screenshot and compare against Siemens hero (carousel arrows, video slide, overlay text).

---

### Task 7: Frontend — StatsBar + Categories + LatestTopics

**Files:**
- Rewrite: `src/components/sections/StatsBar.tsx`
- Create: `src/components/sections/Categories.tsx`
- Create: `src/components/sections/LatestTopics.tsx`

**Interfaces:**
- Consumes: `SiteSection[]`, `ProductCategory[]`, `Article[]` from API
- Produces: Section components used by page.tsx

- [ ] **Step 1: Rewrite `StatsBar.tsx`**

```tsx
import { Container, SimpleGrid, Paper, Group, Title, Text, Box } from '@mantine/core';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Healthcare Organizations' },
  { value: '200+', label: 'Integrations Delivered' },
  { value: '99.9%', label: 'Platform Uptime' },
];

export function StatsBar() {
  return (
    <Box component="section" py={64}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
          {stats.map((stat) => (
            <Paper key={stat.label} ta="center" p="md" bg="transparent">
              <Title order={2} c="brand.6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {stat.value}
              </Title>
              <Text size="sm" c="gray.5" tt="uppercase">{stat.label}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Create `Categories.tsx`**

```tsx
import { Container, SimpleGrid, Card, ThemeIcon, Image, Title, Text, Box } from '@mantine/core';
import Link from 'next/link';
import type { ProductCategory } from '@/lib/types';

interface CategoriesProps {
  categories: ProductCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  if (!categories?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Solutions by Category</Title>
          <Text c="gray.6" mt="sm">Enterprise healthcare technology platforms designed for every department</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {categories.map((cat) => (
            <Card
              key={cat._id}
              component={Link}
              href={`/products/${cat.slug}`}
              padding={0}
              radius="md"
              style={{ textDecoration: 'none' }}
            >
              <Card.Section>
                <Image src={cat.imageUrl || ''} alt={cat.name} h={160} fit="cover" />
              </Card.Section>
              <Box p="md">
                <Title order={4} c="gray.9">{cat.name}</Title>
                {cat.description && (
                  <Text size="sm" c="gray.6" mt={4}>{cat.description}</Text>
                )}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 3: Create `LatestTopics.tsx`**

```tsx
import { Container, SimpleGrid, Card, Image, Title, Text, Anchor, Box } from '@mantine/core';
import Link from 'next/link';
import type { Article } from '@/lib/types';

interface LatestTopicsProps {
  articles: Article[];
}

export function LatestTopics({ articles }: LatestTopicsProps) {
  if (!articles?.length) return null;

  return (
    <Box component="section" py={80}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Latest Topics</Title>
          <Text c="gray.6" mt="sm">Insights and innovations in healthcare technology</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {articles.slice(0, 6).map((article) => (
            <Card key={article._id} padding={0} radius="md" withBorder>
              {article.imageUrl && (
                <Card.Section>
                  <Image src={article.imageUrl} alt={article.title} h={180} fit="cover" />
                </Card.Section>
              )}
              <Box p="md">
                {article.category && (
                  <Text size="xs" tt="uppercase" c="brand.6" fw={600} mb={4}>
                    {article.category}
                  </Text>
                )}
                <Title order={4} lh={1.3}>
                  {article.title}
                </Title>
                {article.excerpt && (
                  <Text size="sm" c="gray.6" mt={4}>
                    {article.excerpt}
                  </Text>
                )}
                <Anchor component={Link} href={`/articles/${article.slug}`} size="sm" mt="sm" display="inline-block">
                  Read more →
                </Anchor>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
yarn build
```

- [ ] **Step 5: Screenshot & compare**

---

### Task 8: Frontend — ProductsGrid + ServicesGrid + Testimonials (upgraded)

**Files:**
- Rewrite: `src/components/sections/ProductsGrid.tsx`
- Rewrite: `src/components/sections/ServicesGrid.tsx`
- Rewrite: `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Rewrite `ProductsGrid.tsx`**

```tsx
import { Card, Container, SimpleGrid, Image, Title, Text, Badge, Box } from '@mantine/core';
import Link from 'next/link';
import type { Product } from '@/lib/types';

const FALLBACKS = [
  '/images/img2.jpg', '/images/img3.jpg', '/images/img4.jpg',
  '/images/img5.jpg', '/images/img6.jpg', '/images/img7.jpg',
];

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl" maw={560} mx="auto">
          <Title order={2}>Our Products</Title>
          <Text c="gray.6" mt="sm">Enterprise healthcare technology platforms designed to transform operations</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {products.map((product, i) => (
            <Card
              key={product._id}
              component={Link}
              href={`/products/${product.slug}`}
              padding={0}
              radius="lg"
              withBorder
              style={{ textDecoration: 'none', transition: 'box-shadow 0.2s' }}
            >
              <Card.Section>
                <Image
                  src={product.imageUrl || FALLBACKS[i % FALLBACKS.length]}
                  alt={product.name}
                  h={176}
                  fit="cover"
                />
              </Card.Section>
              <Box p="lg">
                <Title order={4} c="gray.9">{product.name}</Title>
                {product.tagline && (
                  <Text size="sm" c="gray.6" mt={4}>{product.tagline}</Text>
                )}
                {product.features?.length > 0 && (
                  <Box mt="sm">
                    {product.features.slice(0, 3).map((f) => (
                      <Badge key={f} variant="light" color="brand" size="sm" mr={4} mb={4}>
                        {f}
                      </Badge>
                    ))}
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Rewrite `ServicesGrid.tsx`**

```tsx
import { Card, Container, SimpleGrid, Image, Title, Text, Badge, Box } from '@mantine/core';
import Link from 'next/link';
import type { Service } from '@/lib/types';

const FALLBACKS = ['/images/img1.jpg', '/images/img8.jpg', '/images/img9.jpg', '/images/img2.jpg'];

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (!services?.length) return null;

  return (
    <Box component="section" py={80}>
      <Container size="lg">
        <Box ta="center" mb="xl" maw={560} mx="auto">
          <Title order={2}>Our Services</Title>
          <Text c="gray.6" mt="sm">Expert consulting and engineering to accelerate your healthcare technology journey</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {services.map((service, i) => (
            <Card
              key={service._id}
              component={Link}
              href={`/services/${service.slug}`}
              padding={0}
              radius="lg"
              withBorder
              style={{ textDecoration: 'none', transition: 'box-shadow 0.2s' }}
            >
              <Card.Section>
                <Image src={service.imageUrl || FALLBACKS[i % FALLBACKS.length]} alt={service.name} h={192} fit="cover" />
              </Card.Section>
              <Box p="lg">
                <Title order={4} c="gray.9">{service.name}</Title>
                {service.tagline && (
                  <Text size="sm" c="gray.6" mt={4}>{service.tagline}</Text>
                )}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 3: Rewrite `Testimonials.tsx`** — use Carousel

```tsx
'use client';

import { Carousel } from '@mantine/carousel';
import { Container, Card, Avatar, Title, Text, Box } from '@mantine/core';
import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>What Our Clients Say</Title>
          <Text c="gray.6" mt="sm">Trusted by healthcare organizations across Africa</Text>
        </Box>
        <Carousel slideSize="33.333%" slideGap="md" loop withControls withIndicators>
          {testimonials.map((t) => (
            <Carousel.Slide key={t._id}>
              <Card padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                <Text size="sm" c="gray.7" fs="italic" lh={1.6}>
                  &ldquo;{t.text}&rdquo;
                </Text>
                <Box mt="md" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar color="brand" radius="xl" size="md">
                    {t.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Text fw={600} size="sm">{t.name}</Text>
                    {(t.role || t.company) && (
                      <Text size="xs" c="gray.5">
                        {[t.role, t.company].filter(Boolean).join(', ')}
                      </Text>
                    )}
                  </Box>
                </Box>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
yarn build
```

- [ ] **Step 5: Screenshot & compare**

---

### Task 9: Frontend — Partners + Investors + Careers + CTABanner

**Files:**
- Rewrite: `src/components/sections/Partners.tsx`
- Create: `src/components/sections/Investors.tsx`
- Create: `src/components/sections/Careers.tsx`
- Rewrite: `src/components/sections/CTABanner.tsx`

- [ ] **Step 1: Rewrite `Partners.tsx`**

```tsx
import { Container, Group, Paper, Image, Title, Text, Box } from '@mantine/core';
import type { Partner } from '@/lib/types';

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  if (!partners?.length) return null;

  return (
    <Box component="section" py={64} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Title order={3} ta="center" mb="lg">Strategic Partnerships</Title>
        <Group justify="center" gap="lg">
          {partners.map((p) => (
            <Paper key={p._id} p="md" withBorder radius="md" style={{ minWidth: 140, textAlign: 'center' }}>
              {p.logoUrl ? (
                <Image src={p.logoUrl} alt={p.name} h={40} fit="contain" />
              ) : (
                <Text fw={600} c="gray.7">{p.name}</Text>
              )}
            </Paper>
          ))}
        </Group>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Create `Investors.tsx`**

```tsx
import { Container, SimpleGrid, Paper, Title, Text, Box } from '@mantine/core';
import type { InvestorData } from '@/lib/types';

interface InvestorsProps {
  data: InvestorData[];
}

export function Investors({ data }: InvestorsProps) {
  if (!data?.length) return null;

  return (
    <Box component="section" py={80}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Investor Highlights</Title>
          <Text c="gray.6" mt="sm">Key metrics and growth indicators for eHealthwares</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="lg">
          {data.map((d) => (
            <Paper key={d._id} p="xl" radius="md" withBorder ta="center">
              <Title order={1} c="brand.6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {d.value}
              </Title>
              <Text fw={600} size="sm" c="gray.8" mt={4}>{d.label}</Text>
              {d.description && (
                <Text size="xs" c="gray.5" mt={4}>{d.description}</Text>
              )}
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 3: Create `Careers.tsx`**

```tsx
import { Container, SimpleGrid, Card, Image, Title, Text, Badge, Button, Box, Group } from '@mantine/core';
import Link from 'next/link';
import type { Career } from '@/lib/types';

interface CareersProps {
  careers: Career[];
}

export function Careers({ careers }: CareersProps) {
  if (!careers?.length) return null;

  return (
    <Box component="section" py={80} style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Box ta="center" mb="xl">
          <Title order={2}>Career Opportunities</Title>
          <Text c="gray.6" mt="sm">Join our team and help build the future of healthcare technology</Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {careers.map((c) => (
            <Card key={c._id} padding={0} radius="md" withBorder>
              {c.imageUrl && (
                <Card.Section>
                  <Image src={c.imageUrl} alt={c.title} h={160} fit="cover" />
                </Card.Section>
              )}
              <Box p="md">
                <Title order={4}>{c.title}</Title>
                <Group gap="xs" mt="sm">
                  {c.department && <Badge variant="light" color="brand" size="sm">{c.department}</Badge>}
                  {c.location && <Badge variant="outline" color="gray" size="sm">{c.location}</Badge>}
                  <Badge variant="filled" color={c.type === 'remote' ? 'green' : 'blue'} size="sm">
                    {c.type}
                  </Badge>
                </Group>
                {c.description && (
                  <Text size="sm" c="gray.6" mt="sm" lineClamp={3}>
                    {c.description}
                  </Text>
                )}
                <Button component={Link} href={`/careers/${c.slug}`} variant="light" color="brand" fullWidth mt="md">
                  View Position
                </Button>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Rewrite `CTABanner.tsx`**

```tsx
import { Button, Container, Title, Text, Box } from '@mantine/core';
import Link from 'next/link';
import type { SiteSection } from '@/lib/types';

interface CTABannerProps {
  section: SiteSection;
}

export function CTABanner({ section }: CTABannerProps) {
  if (!section) return null;

  return (
    <Box
      component="section"
      py={80}
      style={{
        background: 'linear-gradient(135deg, var(--mantine-color-brand-7) 0%, var(--mantine-color-brand-9) 100%)',
      }}
    >
      <Container size="lg" ta="center">
        <Title order={2} c="white">{section.title}</Title>
        {section.subtitle && (
          <Text size="lg" c="brand.1" mx="auto" maw={560} mt="sm" mb="lg">
            {section.subtitle}
          </Text>
        )}
        <Button component={Link} href="/contact" size="lg" variant="white" c="brand.7">
          Get in Touch
        </Button>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
yarn build
```

- [ ] **Step 6: Screenshot & compare**

---

### Task 10: Frontend — Wire all sections in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite `page.tsx`** — import all new components, fetch all new data

```tsx
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
  let heroSlides = null, categories = null, products = null,
    services = null, articles = null, testimonials = null,
    partners = null, investorData = null, careers = null, ctaSection = null;

  try {
    [
      heroSlides, categories, products, services, articles,
      testimonials, partners, investorData, careers, ctaSection,
    ] = await Promise.all([
      ehealthwaresApi.getHeroSlides(),
      ehealthwaresApi.getCategories(),
      ehealthwaresApi.getProducts(),
      ehealthwaresApi.getServices(),
      ehealthwaresApi.getArticles(),
      ehealthwaresApi.getTestimonials(),
      ehealthwaresApi.getPartners(),
      ehealthwaresApi.getInvestorData(),
      ehealthwaresApi.getCareers(),
      ehealthwaresApi.getSections().then(ss => ss?.find(s => s.key === 'cta') ?? null),
    ]);
  } catch (e) {
    console.error('HomePage data fetch failed:', e);
  }

  const defaultCTA = {
    _id: '', key: 'cta',
    title: 'Ready to Transform Your Healthcare Operations?',
    subtitle: "Let's discuss how eHealthwares can help your organization deliver better care through technology.",
    content: null, imageUrl: null, displayOrder: 0, isActive: true,
  };

  return (
    <>
      <Hero slides={heroSlides ?? []} />
      <StatsBar />
      <Categories categories={categories ?? []} />
      <ProductsGrid products={products ?? []} />
      <ServicesGrid services={services ?? []} />
      <LatestTopics articles={articles ?? []} />
      <Testimonials testimonials={testimonials ?? []} />
      <Partners partners={partners ?? []} />
      <Investors data={investorData ?? []} />
      <Careers careers={careers ?? []} />
      <CTABanner section={ctaSection ?? defaultCTA} />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
yarn build
```
Expected: no errors.

- [ ] **Step 3: Full page screenshot**

```bash
node screenshot.mjs
```
Run the full screenshot and compare against all competitor references.

---

### Task 11: Assets — Selective move to public/assets/

**Files:**
- Modify: file system — copy selected assets

- [ ] **Step 1: Create public/assets/ directory and move selected media**

```bash
mkdir -p /Users/john/develop/rxsoft/ehealthwares/public/assets
# Copy hero images
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-shvetsa-4225925.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-mart-production-7089011.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-tima-miroshnichenko-6234976.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-daliladalprat-5875565.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-tima-miroshnichenko-6234978.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-cottonbro-7579832.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-pavel-danilyuk-8442154.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-karola-g-7195191.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-ivan-s-4989164.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-mart-production-7089614.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-gustavo-fring-7446984.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
cp /Users/john/develop/rxsoft/ehealthwares/assets/pexels-gustavo-fring-7446994.jpg /Users/john/develop/rxsoft/ehealthwares/public/assets/
# Copy one video for hero
cp /Users/john/develop/rxsoft/ehealthwares/assets/8375668-uhd_2160_4096_25fps.mp4 /Users/john/develop/rxsoft/ehealthwares/public/assets/
```

- [ ] **Step 2: Verify assets accessible**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/assets/pexels-shvetsa-4225925.jpg
```
Expected: 200

- [ ] **Step 3: Update seed data asset references**

The seed data already uses `/assets/` paths from Task 4. Verify backend serves correctly with `curl http://localhost:3000/assets/pexels-shvetsa-4225925.jpg` returning 200.

- [ ] **Step 4: Screenshot & verify all images load**

Take full page screenshot and visually check all images render correctly.

---

### Task 12: Screenshot iteration loop — Compare & Refine

**Files:**
- Run: `screenshot.mjs`
- Run: `competitor-screenshots.mjs` (exists)
- Compare: against competitor refs in `temporary_screenshots/competitors/`

- [ ] **Step 1: Take comprehensive screenshots**

```bash
node screenshot.mjs
```

- [ ] **Step 2: For each section, compare against competitor reference**

| eHealthwares Section | Competitor Reference | Key Checks |
|---|---|---|
| Hero (carousel) | siemens-hero.png, philips-hero.png | Arrows visible, overlay text readable, video plays |
| Categories | ge-category.png | Cards with images, responsive grid |
| ProductsGrid | siemens-products.png | Card layout, badges, hover effects |
| ServicesGrid | siemens-products.png | Dual column, images, links |
| LatestTopics | siemens-latest-topics.png | Article cards, excerpt text, category badges |
| Testimonials | (no direct ref) | Carousel works, avatar, text readable |
| Partners | (no direct ref) | Logo grid, centered |
| Investors | ge-investors.png | Stats grid, large numbers |
| Careers | ge-careers.png | Job cards with images, badges, buttons |
| CTA Banner | (no direct ref) | Gradient, centered button |

- [ ] **Step 3: Fix visual issues**

For each section, if visuals don't match the competitor quality, adjust:
- Padding/spacing
- Typography scale
- Color contrast
- Image quality/sizing
- Responsive behavior

- [ ] **Step 4: Repeat screenshot loop**

```bash
node screenshot.mjs
```

Compare again. Repeat until all sections match the spec.

- [ ] **Step 5: Final commit**

```bash
git add . && git commit -m "feat: complete competitor-inspired redesign with Mantine-only components"
```
