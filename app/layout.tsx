import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProposalModalProvider from "@/components/ProposalModalProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adrich.agency"),
  title: {
    default: "Adrich | Think. Create. Influence.",
    template: "%s | Adrich",
  },
  description:
    "Adrich is a premium Dhaka-based advertising agency delivering TVC, corporate AV, digital campaigns, and performance media since 1997.",
  keywords: [
    "Adrich",
    "Advertising agency Dhaka",
    "TVC production Bangladesh",
    "Digital marketing agency",
    "Corporate AV production",
  ],
  openGraph: {
    title: "Adrich | Think. Create. Influence.",
    description:
      "Premium campaign strategy, production, and digital performance from Dhaka, Bangladesh.",
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface-0 text-ink-900">
        <ProposalModalProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ProposalModalProvider>
      </body>
    </html>
  );
}
