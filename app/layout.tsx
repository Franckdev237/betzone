// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BetZone',
    default: 'BetZone – Paris Sportifs',
  },
  description: 'Plateforme de paris sportifs — Football, Basketball, Tennis et plus encore.',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BetZone',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffc107',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${syne.variable} ${dmSans.variable} font-body bg-dark-900 text-white antialiased`}>
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1f2e',
              border: '1px solid rgba(255,193,7,0.2)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
