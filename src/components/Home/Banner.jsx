"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";

const subscribe = () => () => {};

const getBanglaDate = () => {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
};

const Banner = () => {
  const currentDate = useSyncExternalStore(
    subscribe,
    getBanglaDate,
    () => ""
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium border border-emerald-100 min-h-7">
              <span>{currentDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-snug">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম - বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-(--primary) hover:opacity-90 text-white font-semibold text-sm sm:text-base shadow-sm transition-all active:scale-95"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex justify-center items-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 select-none">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর বাস্কেট"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;