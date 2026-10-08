"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

const toBanglaDigits = (str) => {
  const banglaNumbers = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
  };
  return String(str).replace(/[0-9]/g, (match) => banglaNumbers[match] || match);
};

export default function Navbar({ navLinks, mobileNavLinks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const banglaDays = [
        "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
      ];
      const banglaMonths = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
      ];

      const day = banglaDays[now.getDay()];
      const dateNum = toBanglaDigits(now.getDate());
      const month = banglaMonths[now.getMonth()];
      const year = toBanglaDigits(now.getFullYear());
      setCurrentDate(`${day}, ${dateNum} ${month}, ${year}`);
    };

    updateDate();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5">
          <Link href="/" className="flex items-center gap-3 select-none">
            <div className="relative w-12 h-12 rounded-2xl bg-(--primary) flex items-center justify-center p-2.5 shadow-xs shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={30}
                height={30}
                className="w-full h-full object-contain brightness-0 invert"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
                বাজার দর
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-normal min-h-4">
                {currentDate}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-bold text-slate-800 hover:text-slate-950 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 text-sm font-bold text-white bg-(--primary) hover:opacity-90 rounded-xl transition-all shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Open Navigation Menu"
            >
              <HiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar min-h-11">
            <Suspense fallback={null}>
              {navLinks}
            </Suspense>
          </nav>
        </div>
      </div>

      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-white border-l border-slate-100 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-(--primary) flex items-center justify-center p-1.5 shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={20}
                height={20}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              বাজার দর
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg transition-colors"
            aria-label="Close Navigation Menu"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 space-y-1"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Suspense fallback={null}>
            {mobileNavLinks}
          </Suspense>
        </div>

        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-2.5 text-center text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl block transition-all"
          >
            সাইন ইন
          </Link>
          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-2.5 text-center text-sm font-bold text-white bg-(--primary) hover:opacity-90 rounded-xl block transition-all shadow-xs"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
    </header>
  );
}