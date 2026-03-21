import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-vietnam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ivy',
  description: 'ポメのivyの毎日',
  openGraph: {
    title: 'ivy',
    description: 'ポメのivyの毎日',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${jakarta.variable} ${vietnam.variable} font-sans bg-cream text-bark-600 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
