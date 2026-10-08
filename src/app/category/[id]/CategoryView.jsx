"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { HiChevronDown, HiCheck, HiOutlineInbox } from "react-icons/hi2";

const toBanglaNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[d]);
};

const getUnitName = (unit) => {
  const units = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return units[unit] || `প্রতি ${unit}`;
};

export default function CategoryView({ initialProducts = [] }) {
  const [sortBy, setSortBy] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price-low") {
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, sortBy]);

  const sortOptions = [
    { label: "ডিফল্ট", value: "default" },
    { label: "দাম: কম থেকে বেশি", value: "price-low" },
    { label: "দাম: বেশি থেকে কম", value: "price-high" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "ডিফল্ট";

  const categoryName = initialProducts[0]?.categoryNameBn || "ক্যাটাগরি";
  const categoryIcon = initialProducts[0]?.categoryIcon || initialProducts[0]?.image || "📦";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl select-none shrink-0 border border-slate-100">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
            {toBanglaNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto" ref={dropdownRef}>
          <span className="text-xs sm:text-sm text-slate-600 font-medium">
            সাজান
          </span>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <span>{currentSortLabel}</span>
              <HiChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left transition-colors ${
                      sortBy === option.value
                        ? "text-slate-900 font-semibold bg-slate-50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && (
                      <HiCheck className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="w-full bg-white border border-slate-100 rounded-2xl p-10 shadow-xs flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
            <HiOutlineInbox className="w-7 h-7" />
          </div>
          <p className="text-base font-semibold text-slate-700">
            কোনো পণ্য পাওয়া যায়নি
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xs font-normal">
            এই ক্যাটাগরিতে কোনো পণ্য এই মুহূর্তে খুঁজে পাওয়া যাচ্ছে না।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((item) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";
            const pctVal = Math.abs(Number(item.change?.pct) || 0).toFixed(1);

            return (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-2xl select-none shrink-0 border border-slate-100/80">
                    {item.image}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base leading-snug">
                      {item.nameBn}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-normal">
                      {getUnitName(item.unit)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-normal">
                      আজকের দাম
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                      {toBanglaNumber(item.today)}{" "}
                      <span className="text-sm font-semibold text-slate-600">
                        টাকা
                      </span>
                    </div>
                  </div>

                  {isUp && (
                    <div className="inline-flex items-center gap-1 text-red-500 font-bold text-xs sm:text-sm bg-red-50/70 px-2 py-0.5 rounded-md">
                      <FaCaretUp className="text-xs" />
                      <span>{toBanglaNumber(pctVal)}%</span>
                    </div>
                  )}

                  {isDown && (
                    <div className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs sm:text-sm bg-emerald-50 px-2 py-0.5 rounded-md">
                      <FaCaretDown className="text-xs" />
                      <span>{toBanglaNumber(pctVal)}%</span>
                    </div>
                  )}

                  {!isUp && !isDown && (
                    <div className="inline-flex items-center gap-1 text-slate-400 font-medium text-xs sm:text-sm px-2 py-0.5">
                      <span>- ০.০%</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}