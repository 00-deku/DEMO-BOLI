import { Fraunces, Rubik, Tiro_Devanagari_Hindi } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/motion/SmoothScroll';
import { site } from '@/data/site';
import './globals.css';

// Fonts are downloaded at build time and self-hosted by next/font.
const display = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const serif = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const deva = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  variable: '--font-deva',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Boli: learn Kumaoni',
    template: '%s · Boli',
  },
  description: site.tagline,
  icons: { icon: '/brand/favicon.png', apple: '/brand/apple-touch-icon.png' },
};

export const viewport = {
  themeColor: '#c4271b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${deva.variable}`}>
      <body>
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
