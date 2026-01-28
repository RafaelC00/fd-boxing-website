import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
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

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: any;
}) {
  try {
    const { lang } = await props.params;
    console.log('RootLayout rendering for lang:', lang);

    return (
      <html lang={lang}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header lang={lang} />
          {props.children}
          <Footer />
        </body>
      </html>
    );
  } catch (err: any) {
    console.error('LAYOUT ERROR:', err);
    return (
      <html>
        <body className="p-10 bg-red-50 text-red-900">
          <h1 className="text-2xl font-bold">Layout Error</h1>
          <pre className="mt-4 p-4 bg-white rounded">{err.message}</pre>
          <pre className="mt-2 text-xs opacity-50">{err.stack}</pre>
        </body>
      </html>
    );
  }
}
