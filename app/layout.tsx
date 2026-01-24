import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FD-Boxing | Real Boxing For Everyone",
  description: "Professional boxing coach bringing world-class training seminars across Europe. Book Federico De Vesa for your academy today.",
  keywords: "boxing, coaching, seminars, training, Europe, FD-Boxing, Federico De Vesa",
  authors: [{ name: "FD-Boxing" }],
  openGraph: {
    title: "FD-Boxing | Real Boxing For Everyone",
    description: "Professional boxing coach bringing world-class training seminars across Europe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
