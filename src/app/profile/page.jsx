"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import Loading from "./loading";

function ProfileEditForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateName = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("নাম খালি রাখা যাবে না!", {
        position: "top-center",
        duration: 2500,
      });
      return;
    }

    if (trimmedName === user?.name) {
      toast("কোনো পরিবর্তন করা হয়নি।", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে!", {
          position: "top-center",
          duration: 3000,
        });
        setIsUpdating(false);
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!", {
        position: "top-center",
        duration: 2500,
      });

      router.refresh();
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন!", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdateName} className="space-y-4">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
          নাম
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full py-3 px-4 rounded-xl bg-(--primary) hover:opacity-90 disabled:opacity-60 text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
      >
        {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      toast.success("লগআউট সম্পন্ন হয়েছে!", {
        position: "top-center",
        duration: 2500,
      });      
      router.refresh();
    } catch (err) {
      toast.error("লগআউট করতে সমস্যা হয়েছে!", {
        position: "top-center",
        duration: 2500,
      });
      setIsSigningOut(false);
    }
  };

  if (isPending || !user) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 relative shadow-2xs">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-(--primary) text-white font-extrabold text-2xl">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 rounded-xl text-xs sm:text-sm font-semibold text-red-600 bg-red-50/40 hover:bg-red-50 transition-colors shadow-2xs cursor-pointer self-stretch sm:self-auto justify-center disabled:opacity-60"
        >
          <HiOutlineArrowRightOnRectangle className="w-4 h-4 text-red-500 rotate-180" />
          <span>{isSigningOut ? "বের হওয়া হচ্ছে..." : "সাইন আউট"}</span>
        </button>
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
          তথ্য
        </h3>

        <ProfileEditForm key={user.name} user={user} />
      </div>
    </div>
  );
}