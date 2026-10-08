import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import PriceMarquee from "@/components/Shared/PriceMarquee";
import Footer from "@/components/Shared/Footer";
import NavLinks from "@/components/Shared/NavLinks";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-anek-bangla",
});

export const metadata = {
  title: "বাজার দর - আজকের বাজারের দাম",
  description: "আজকের নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর ও সর্বশেষ আপডেট জানুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${anekBangla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-gray-100">
        <Navbar
          navLinks={<NavLinks />}
          mobileNavLinks={<NavLinks isMobile={true} />}
        />
        <PriceMarquee />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}