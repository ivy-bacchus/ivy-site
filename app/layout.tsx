import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
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
      <body className={`${nunito.variable} font-sans bg-cream text-gray-800 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
