import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
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
  title: "Afia's",
  description: "Rooted in nature and guided by purity, our care products are lovingly crafted to restore balance and bring out your natural radiance. Every ingredient is chosen with intention, every formula designed to nurture your skin and soul so you can embrace the beauty of feeling truly cared for",
  icons: {
    icon: '/favicon.ico', // path to your logo (favicon)
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">

        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        <Footer/>

      </body>
    </html>
        </ClerkProvider>
  );
}
