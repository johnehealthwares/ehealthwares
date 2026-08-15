import type { Metadata, Viewport } from 'next';
import '@mantine/core/styles.css';
import './globals.css';
import '@mantine/carousel/styles.css';
import './products/emr/landing.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { AppShell } from '@/components/layout/AppShell';

const theme = createTheme({
  fontFamily: 'Inter, system-ui, sans-serif',
  fontFamilyMonospace: 'ui-monospace, monospace',
  headings: { fontFamily: 'Urbanist, Inter, system-ui, sans-serif', fontWeight: '700' },
  primaryColor: 'blue',
  primaryShade: 6,
  colors: {
    brand: [
      '#EFF4FF',
      '#DBE6FE',
      '#B7CCFC',
      '#8FABF9',
      '#5A7EF2',
      '#2563EB',
      '#1E50C8',
      '#173FA5',
      '#102F7D',
      '#0B2157',
    ],
  },
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ehealthwares.com';
const CONTACT_EMAIL = 'info@ehealthwares.com';
const CONTACT_PHONE = '+234-80-2222-4166';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F2A43',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'eHealthwares — Connected Healthcare Technology Ecosystems',
    template: '%s | eHealthwares',
  },
  description:
    'eHealthwares designs and delivers enterprise healthcare technology solutions — EMR, pharmacy, laboratory, radiology, telemedicine, interoperability, and digital health platforms that connect patients, providers, and operations.',
  applicationName: 'eHealthwares',
  generator: 'Next.js',
  keywords: [
    'healthcare software',
    'eHealthwares',
    'EMR',
    'electronic medical records',
    'PrognoCare EMR',
    'RxSoft pharmacy management system',
    'healthcare interoperability',
    'HL7',
    'FHIR',
    'laboratory information system',
    'radiology information system',
    'telemedicine',
    'digital health',
    'healthcare technology',
  ],
  authors: [{ name: 'eHealthwares' }],
  creator: 'eHealthwares',
  publisher: 'eHealthwares',
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'eHealthwares',
    title: 'eHealthwares — Connected Healthcare Technology Ecosystems',
    description:
      'Enterprise healthcare technology solutions — EMR, pharmacy, laboratory, radiology, telemedicine, interoperability, and digital health platforms.',
    images: [
      {
        url: '/logo-rect.png',
        width: 512,
        height: 512,
        alt: 'eHealthwares',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eHealthwares — Connected Healthcare Technology Ecosystems',
    description:
      'Enterprise healthcare technology solutions — EMR, pharmacy, laboratory, radiology, telemedicine, interoperability, and digital health platforms.',
    images: ['/logo-rect.png'],
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo-rect.png',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'eHealthwares',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-rect.png`,
  description:
    'eHealthwares designs and delivers enterprise healthcare technology solutions — EMR, pharmacy, laboratory, radiology, telemedicine, interoperability, and digital health platforms.',
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  sameAs: [SITE_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell>{children}</AppShell>
        </MantineProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
