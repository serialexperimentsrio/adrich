import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ProposalModalProvider from "@/components/ProposalModalProvider";
import SmoothScroll from "@/components/SmoothScroll";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adrich.com.bd"),
  title: {
    default: "Adrich — Think. Create. Influence.",
    template: "%s — Adrich",
  },
  description:
    "Adrich is an advertising agency in Dhaka, making TV commercials, corporate films and digital campaigns since 1997.",
  keywords: [
    "Adrich",
    "Advertising agency Dhaka",
    "TVC production Bangladesh",
    "Corporate film production",
    "Digital marketing Bangladesh",
  ],
  openGraph: {
    title: "Adrich — Think. Create. Influence.",
    description: "TV commercials, corporate films and digital campaigns from Dhaka, since 1997.",
    type: "website",
    siteName: "Adrich",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>
          <ProposalModalProvider>
            <Navbar />
            <main id="main-content" className="outline-none" tabIndex={-1}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ProposalModalProvider>
        </SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
