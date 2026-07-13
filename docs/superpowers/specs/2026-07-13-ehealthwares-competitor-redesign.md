# eHealthwares Landing Page — Competitor-Inspired Enterprise Redesign

## Goal
Redesign the eHealthwares marketing landing page inspired by GE Healthcare, Philips Nigeria, and Siemens Healthineers. Zero native HTML tags — every element uses Mantine components. New backend schemas feed API-driven sections.

## Section Order (top to bottom)
1. Hero (carousel — images + videos, 20s configurable interval)
2. StatsBar (stats grid)
3. Categories (GE-style icon cards)
4. Products Grid (upgraded cards)
5. Services Grid (upgraded cards)
6. Latest Topics (Siemens-style article cards)
7. Testimonials (carousel)
8. Partners (logo grid)
9. Investors (GE-style stats + data)
10. Careers (GE-style job cards)
11. CTA Banner

## Architecture

### Backend — New Mongoose Schemas (rxsoft-backend `ehealthwares` module)
All in `src/modules/ehealthwares/schemas/`:

- **Article** (`article.schema.ts`): `title`, `slug`, `excerpt`, `body`, `imageUrl`, `category`, `publishedAt`, `isActive`
- **HeroSlide** (`heroslide.schema.ts`): `title`, `subtitle`, `mediaUrl`, `mediaType` (`image`|`video`), `ctaText`, `ctaLink`, `displayOrder`, `isActive`
- **Category** (`category.schema.ts`): `name`, `slug`, `description`, `iconUrl`, `imageUrl`, `displayOrder`, `isActive`
- **InvestorData** (`investor.schema.ts`): `label`, `value`, `description`, `displayOrder`, `isActive` (also a `financials` sub-object for GE-style financial highlights)
- **Career** (`career.schema.ts`): `title`, `slug`, `location`, `type` (full-time|contract|remote), `department`, `description`, `imageUrl`, `isActive`

Existing schemas remain unchanged: Product, Service, Testimonial, Partner, TeamMember, SiteSection, ContactSubmission

### Backend — Seed Data
Idempotent seed function adds:
- 5-6 HeroSlides (mix of image/video slide configs, referencing assets in `public/assets/`)
- 4 Categories (matching existing product/service groupings)
- 6-8 Articles for Latest Topics
- 4-5 InvestorData points
- 3 Career positions
- Updated SiteSection entries matching new section keys

### Frontend — Mantine Component Mapping
Every HTML tag in the current components replaced with Mantine:

| Native Tag | Mantine Replacement |
|---|---|
| `<section>` | `<Box component="section">` |
| `<div>` | `<Box>`, `<Group>`, `<Stack>`, `<Flex>`, `<Paper>` |
| `<header>` | `<Box component="header">` |
| `<img>` | `<Image>` |
| `<span>` | `<Text span>`, `<Badge>` |
| `<a>` | `<Anchor>`, or `<UnstyledButton component={Link}>` |
| `<nav>` | `<NavLink>` |

### Frontend — Component List
All files in `src/components/sections/`:

| Component | Key Features | Mantine Usage |
|---|---|---|
| `Header` | Sticky top bar, logo, nav links, mobile drawer | `AppShell`, `Group`, `Burger`, `Drawer`, `Image`, `Anchor`, `UnstyledButton` |
| `Hero` | Carousel with autoplay, video/image slides, overlay text, arrows | `Carousel`, `AspectRatio`, `Overlay`, `Container`, `Title`, `Text`, `Button`, `Badge` |
| `StatsBar` | 4-column stat grid | `SimpleGrid`, `Paper`, `Group`, `Title`, `Text` |
| `Categories` | Icon + title + desc cards | `SimpleGrid`, `Card`, `ThemeIcon`, `Image`, `Title`, `Text` |
| `ProductsGrid` | Product cards with hover effects | `SimpleGrid`, `Card`, `Image`, `Title`, `Text`, `Badge` |
| `ServicesGrid` | Service cards | `SimpleGrid`, `Card`, `Image`, `Title`, `Text` |
| `LatestTopics` | Article cards with excerpt | `SimpleGrid`, `Card`, `Image`, `Title`, `Text`, `Anchor` |
| `Testimonials` | Sliding testimonial cards | `Carousel`, `Card`, `Avatar`, `Title`, `Text`, `Blockquote` |
| `Partners` | Logo grid | `Group`, `Image`, `Paper` |
| `Investors` | Stats + financial data grid | `SimpleGrid`, `Paper`, `Title`, `Text`, `RingProgress` |
| `Careers` | Job listing cards | `SimpleGrid`, `Card`, `Image`, `Title`, `Text`, `Badge`, `Button` |
| `CTABanner` | Gradient CTA with button | `Box`, `Container`, `Title`, `Text`, `Button` |
| `Footer` | Multi-column footer | `Container`, `SimpleGrid`, `Stack`, `Title`, `Text`, `Anchor`, `Divider` |
| `Page` (layout) | Root layout wrapper | `MantineProvider`, `ColorSchemeScript`, `Container` |

### Asset Management
- Selectively move ~15 images + 2-3 videos from `assets/` to `public/assets/`
- Reference via `/assets/filename` in seed data and components
- Keep unused originals in `assets/` (gitignored)

### Hero Carousel Behavior
- `Carousel` from `@mantine/carousel`
- `autoplay` with configurable interval (props.default: 20000ms)
- Arrows on both sides (Siemens-style)
- Each slide: `AspectRatio(16/9)` > media (image or video with `autoPlay muted loop`) > `Overlay` gradient > text content
- `mediaType` field on HeroSlide schema controls whether to render `<Image>` or `<video>`

## Data Flow
1. Next.js server component calls API at build/SSR time
2. API returns JSON from Mongoose (cached via EhealthwaresService memory cache)
3. Server component passes data as props to section components
4. Each section component renders Mantine-only UI with null-safe fallbacks

## Success Criteria
- Zero `<section>`, `<div>`, `<header>` or other native HTML in any component file
- All 5 competitor reference pages have corresponding sections on the landing page
- Hero carousel plays videos and transitions between slides
- All sections render API data from backend seed
- Backend seeds all new schemas idempotently
