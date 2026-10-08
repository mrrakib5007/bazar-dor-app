import React from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-280px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-white mt-5 rounded-xl">
      <div className="max-w-md w-full text-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xs">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 text-slate-500 mb-6 border border-slate-100 shadow-2xs">
          <TbError404 className="w-12 h-12" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed font-normal">
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই অথবা হয়তো সরিয়ে ফেলা হয়েছে।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-(--primary) text-white font-bold text-sm hover:opacity-90 transition-all shadow-xs"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            <span>মূল পাতায় ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}