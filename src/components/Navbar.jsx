"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HiMenuAlt3, HiX } from "react-icons/hi";

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

const CategoryNav = ({ categories }) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2.5 no-scrollbar">
      {categories.map((cat) => {
        const targetPath = `/category/${cat.slug}`;
        const isActive =
          pathname === targetPath || (pathname === "/" && cat.slug === "chal");

        return (
          <Link
            key={cat.id}
            href={targetPath}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all shrink-0 cursor-pointer ${
              isActive
                ? "bg-(--primary) text-white shadow-sm font-semibold"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200/60"
            }`}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");
  const pathname = usePathname();

  const currentDate = useSyncExternalStore(
    subscribe,
    getBanglaDate,
    () => ""
  );

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setCategories([
          { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
        ]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <header className="w-full bg-base-100 border-b border-base-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-(--primary) flex items-center justify-center p-2.5 shadow-sm">
                  <Image
                    src="/logo-icon.png"
                    alt="বাজার দর লোগো"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain brightness-0 invert"
                    priority
                  />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-base-content block">
                    বাজার দর
                  </span>
                  <p className="text-xs text-base-content/60 font-medium min-h-4">
                    {currentDate}
                  </p>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="btn btn-ghost text-base font-semibold text-base-content hover:bg-base-200">
                সাইন ইন
              </Link>
              <Link href="/register" className="btn bg-(--primary) hover:opacity-90 text-white border-none rounded-xl text-base px-5 shadow-sm">
                সাইন আপ
              </Link>
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-ghost btn-circle text-base-content"
                aria-label="মেনু খুলুন"
              >
                <HiMenuAlt3 className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block border-t border-base-200/80 bg-base-100/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryNav categories={categories} />
          </div>
        </div>
      </header>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-70 max-w-[85vw] bg-base-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-base-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-(--primary) flex items-center justify-center p-2 shadow-sm">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-base-content block leading-tight">
                  বাজার দর
                </span>
                <span className="text-[11px] text-base-content/60">
                  দৈনিক পণ্যমূল্য
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle btn-ghost text-base-content"
              aria-label="মেনু বন্ধ করুন"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40 px-3 mb-2">
              ক্যাটাগরি সমূহ
            </p>
            {categories.map((cat) => {
              const targetPath = `/category/${cat.slug}`;
              const isActive =
                pathname === targetPath || (pathname === "/" && cat.slug === "chal");

              return (
                <Link
                  key={cat.id}
                  href={targetPath}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-(--primary) text-white font-semibold shadow-xs"
                      : "text-base-content/80 hover:bg-base-200"
                  }`}
                >
                  <span className="text-lg leading-none">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-base-200 space-y-2 shrink-0">
            <Link href="/login" className="btn btn-outline border-base-300 w-full rounded-xl text-base-content font-medium">
              সাইন ইন
            </Link>
            <Link href="/register" className="btn bg-(--primary) hover:opacity-90 text-white border-none w-full rounded-xl font-medium shadow-xs">
              সাইন আপ
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;