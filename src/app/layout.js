import { Anek_Bangla } from "next/font/google";
import "./globals.css";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-anek-bangla",
});

export const metadata = {
  title: "বাজার দর - আজকের বাজারের দাম",
  description: "আজকের নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর ও সর্বশেষ আপডেট জানুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${anekBangla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}