import '@mantine/core/styles.css';
import './globals.css';
import '@mantine/carousel/styles.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const theme = createTheme({
  fontFamily: 'Inter, system-ui, sans-serif',
  fontFamilyMonospace: 'ui-monospace, monospace',
  headings: { fontFamily: 'Inter, system-ui, sans-serif' },
  primaryColor: 'teal',
  primaryShade: 6,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
