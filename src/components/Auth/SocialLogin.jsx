"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

export default function SocialLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || `${provider === "google" ? "Google" : "GitHub"} সাইন ইনে সমস্যা হয়েছে!`, {
          position: "top-center",
          duration: 3000,
        });
        setLoadingProvider(null);
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হচ্ছে...", {
          position: "top-center",
          duration: 2500,
        });
      }
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন!", {
        position: "top-center",
        duration: 3000,
      });
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-xs text-slate-400 font-medium absolute">
          অথবা
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("google")}
          className="flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-60 transition-colors shadow-2xs cursor-pointer"
        >
          <FcGoogle className="w-4 h-4 shrink-0" />
          <span>
            {loadingProvider === "google"
              ? "চালিয়ে যাওয়া হচ্ছে..."
              : "Google দিয়ে চালিয়ে যান"}
          </span>
        </button>

        <button
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("github")}
          className="flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-60 transition-colors shadow-2xs cursor-pointer"
        >
          <FaGithub className="w-4 h-4 shrink-0 text-slate-900" />
          <span>
            {loadingProvider === "github"
              ? "চালিয়ে যাওয়া হচ্ছে..."
              : "GitHub দিয়ে চালিয়ে যান"}
          </span>
        </button>
      </div>
    </div>
  );
}