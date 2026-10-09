import Link from "next/link";
import { Suspense } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import SignInForm from "@/components/Auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12 bg-slate-50/50">
      <Toaster position="top-center" />

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          সাইন ইন
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <Suspense
        fallback={
          <div className="w-full max-w-125 h-96 bg-white rounded-3xl animate-pulse" />
        }
      >
        <SignInForm />
      </Suspense>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium"
        >
          <FaArrowLeftLong className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}