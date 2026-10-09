"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineUser, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const toBanglaDigits = (str) => {
  const banglaNumbers = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
  };
  return String(str).replace(/[0-9]/g, (match) => banglaNumbers[match] || match);
};

export default function Navbar({ navLinks, mobileNavLinks }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      toast.success("লগআউট সম্পন্ন হয়েছে!", {
        position: "top-center",
        duration: 2500,
      });
      router.push("/signin");
      router.refresh();
    } catch (error) {
      toast.error("লগআউট করতে সমস্যা হয়েছে!", {
        position: "top-center",
        duration: 2500,
      });
    }
  };

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
            {!isPending && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 relative">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        sizes="40px"
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-(--primary) text-white font-bold text-sm rounded-full">
                        {user.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-slate-800 max-w-36 truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 bg-slate-50/70 border border-slate-100/80 rounded-xl mb-2">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-normal">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        <HiOutlineUser className="w-4 h-4 text-slate-400" />
                        <span>প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <HiOutlineArrowRightOnRectangle className="w-4 h-4 text-red-500" />
                        <span>লগআউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !isPending ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-bold text-slate-800 hover:text-slate-950 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-(--primary) hover:opacity-90 rounded-xl transition-all shadow-xs"
                >
                  সাইন আপ
                </Link>
              </div>
            ) : (
              <div className="hidden sm:block w-32 h-10 bg-slate-100 rounded-xl animate-pulse" />
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
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

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          {!isPending && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200/70">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 relative shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      fill
                      sizes="40px"
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-(--primary) text-white font-bold text-sm rounded-full">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl block transition-all"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl block transition-all shadow-xs cursor-pointer"
              >
                লগআউট
              </button>
            </div>
          ) : !isPending ? (
            <div className="space-y-2">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl block transition-all"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-bold text-white bg-(--primary) hover:opacity-90 rounded-xl block transition-all shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>
          ) : (
            <div className="w-full h-20 bg-slate-200/60 rounded-xl animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}