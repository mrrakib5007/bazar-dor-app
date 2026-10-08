import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { HiChevronRight } from "react-icons/hi2";

const toBanglaNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[d]);
};

const getUnitName = (unit) => {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[unit] || unit;
};

async function getProduct(slug) {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products"
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    return data.find((item) => item.slug === slug) || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি | বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজার দাম | বাজার দর`,
    description: `${product.nameBn} এর আজকের বাজার দাম, সর্বনিম্ন ও সর্বোচ্চ দাম এবং বিভিন্ন বাজারের দাম বিশ্লেষণ।`,
  };
}

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const rawMarkets = product.markets || [];

  const sortedMarkets = [...rawMarkets].sort((a, b) => {
    const avgA = (a.min + a.max) / 2;
    const avgB = (b.min + b.max) / 2;
    return avgA - avgB;
  });

  let minMarketPrice = 0;
  let maxMarketPrice = 0;
  let avgPrice = 0;

  if (sortedMarkets.length > 0) {
    const minValues = sortedMarkets.map((m) => m.min);
    const maxValues = sortedMarkets.map((m) => m.max);
    minMarketPrice = Math.min(...minValues);
    maxMarketPrice = Math.max(...maxValues);

    const totalAvg = sortedMarkets.reduce(
      (acc, cur) => acc + (cur.min + cur.max) / 2,
      0
    );
    avgPrice = Math.round(totalAvg / sortedMarkets.length);
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctVal = Math.abs(Number(product.change?.pct) || 0).toFixed(1);
  const diffYesterday = Math.abs(Number(product.today) - Number(product.yesterday));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav className="flex items-center gap-1.5 text-base text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-slate-800 transition-colors">
          হোম
        </Link>
        <HiChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-slate-800 transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <HiChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-700 font-semibold">{product.nameBn}</span>
      </nav>

      <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl sm:text-5xl select-none shrink-0 border border-slate-100">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              প্রতি {getUnitName(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium flex items-center flex-wrap gap-1.5">
              <span>গতকালকের তুলনায় আজ দাম</span>
              {isUp && (
                <>
                  <span>বেড়েছে</span>
                  <span className="text-slate-300 font-bold px-0.5">·</span>
                  <span>+ {toBanglaNumber(diffYesterday)} টাকা</span>
                </>
              )}
              {isDown && (
                <>
                  <span>কমেছে</span>
                  <span className="text-slate-300 font-bold px-0.5">·</span>
                  <span>- {toBanglaNumber(diffYesterday)} টাকা</span>
                </>
              )}
              {!isUp && !isDown && <span>অপরিবর্তিত রয়েছে</span>}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto bg-slate-50/70 border border-slate-100 rounded-2xl p-4 sm:px-8 sm:py-5 flex flex-row md:flex-col items-center justify-between md:justify-center text-center">
          <div>
            <span className="text-[11px] text-slate-400 block font-normal">
              আজকের দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              {toBanglaNumber(product.today)}
            </div>
            <span className="text-xs font-semibold text-slate-500 block mt-0.5">
              টাকা / {getUnitName(product.unit)}
            </span>
          </div>

          <div className="mt-0 md:mt-2">
            {isUp && (
              <span className="inline-flex items-center gap-1 text-red-500 font-bold text-xs bg-red-50 px-2 py-0.5 rounded-md">
                <FaCaretUp className="text-xs" />
                <span>{toBanglaNumber(pctVal)}%</span>
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-md">
                <FaCaretDown className="text-xs" />
                <span>{toBanglaNumber(pctVal)}%</span>
              </span>
            )}
            {!isUp && !isDown && (
              <span className="text-slate-400 font-medium text-xs">
                — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-8 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-5">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5">
              <span className="text-xs text-slate-500 font-medium block">
                সর্বনিম্ন দাম
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {toBanglaNumber(minMarketPrice)} টাকা
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-normal">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5">
              <span className="text-xs text-slate-500 font-medium block">
                সর্বাধিক দাম
              </span>
              <div className="text-2xl font-black text-red-500 mt-1">
                {toBanglaNumber(maxMarketPrice)} টাকা
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-normal">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5">
              <span className="text-xs text-slate-500 font-medium block">
                গড় দাম
              </span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {toBanglaNumber(avgPrice)} টাকা
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-normal">
                প্রতি {getUnitName(product.unit)}-এর হিসাব
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-5">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="grid grid-cols-1 gap-3 md:hidden">
            {sortedMarkets.map((m, idx) => {
              const rowAvg = ((m.min + m.max) / 2).toFixed(2);
              const displayAvg = rowAvg.endsWith(".00")
                ? parseInt(rowAvg, 10)
                : rowAvg;

              return (
                <div
                  key={idx}
                  className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200/50 pb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">
                        {m.market}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {m.division}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-normal">
                        গড় দর
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {toBanglaNumber(displayAvg)} টাকা
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">সর্বনিম্ন</span>
                      <span className="font-bold text-emerald-600">
                        {toBanglaNumber(m.min)} টাকা
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">সর্বোচ্চ</span>
                      <span className="font-bold text-red-500">
                        {toBanglaNumber(m.max)} টাকা
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium text-xs">
                  <th className="pb-3 font-medium">বাজার</th>
                  <th className="pb-3 font-medium">বিভাগ</th>
                  <th className="pb-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="pb-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="pb-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedMarkets.map((m, idx) => {
                  const rowAvg = ((m.min + m.max) / 2).toFixed(2);
                  const displayAvg = rowAvg.endsWith(".00")
                    ? parseInt(rowAvg, 10)
                    : rowAvg;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3.5 font-bold text-slate-800">
                        {m.market}
                      </td>
                      <td className="py-3.5 text-slate-500 font-medium">
                        {m.division}
                      </td>
                      <td className="py-3.5 text-right font-bold text-slate-800">
                        {toBanglaNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 text-right font-bold text-slate-800">
                        {toBanglaNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 text-right font-bold text-slate-800">
                        {toBanglaNumber(displayAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}