import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Afia's Herbal Oil | Pure, Natural & Organic Oils in Pakistan",
    template: "%s | Afia's Herbal Oil"
  },
  description: "Shop premium quality herbal oils, organic hair care, and natural skin care products at Afia's Herbal Oil in Pakistan. 100% natural, cold-pressed, and organic.",
  keywords: ["herbal oil", "organic hair oil", "natural skin care", "cold-pressed oils", "Pakistan", "Afia's herbal", "pure essential oils", "hair growth oil", "skin glow oil"],
  authors: [{ name: "Afia's Herbal Oil" }],
  creator: "Afia's Herbal Oil",
  publisher: "Afia's Herbal Oil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.afias.pk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
    description: "Discover the power of nature with Afia's Herbal Oil. Premium hair and skin care products crafted to restore balance and bring out your natural radiance.",
    url: 'https://www.afias.pk',
    siteName: "Afia's Herbal Oil",
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: "Afia's Herbal Oil Logo",
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
    description: "100% natural, cold-pressed, and organic oils for hair and skin care.",
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.jpg',
  },
  verification: {
    google: "aOvx6LD9u_TnyzXI3zqvzubFyTV81TIx_a6BXaUtP1U",
  },
};

import { CartProvider } from "@/lib/CartContext";

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Afia's Herbal Oil",
    url: 'https://www.afias.pk',
    logo: 'https://www.afias.pk/logo.jpg',
    description: "Pure, natural and organic oils for hair, skin and wellness.",
    sameAs: [
      'https://www.facebook.com/afiasherbaloil', // UPDATE with your actual links
      'https://www.instagram.com/afiasherbaloil',
      'https://twitter.com/afiasherbaloil'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Pakistan'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu']
    }
  };

  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <head>
            {/* Google Analytics - Placeholder ID: ADD_YOUR_GA_ID_HERE */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=ADD_YOUR_GA_ID_HERE`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'ADD_YOUR_GA_ID_HERE');
              `}
            </Script>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
