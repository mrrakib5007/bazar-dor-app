import React from "react";
import Link from "next/link";
import { FaCaretUp } from "react-icons/fa6";

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

async function getTopRisers() {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return Array.isArray(data)
      ? data
          .filter((item) => item.change?.dir === "up" && Number(item.change?.pct) > 0)
          .sort((a, b) => Number(b.change?.pct) - Number(a.change?.pct))
          .slice(0, 6)
      : [];
  } catch (error) {
    return [];
  }
}

export default async function TopRisers() {
  const risers = await getTopRisers();

  if (!risers || risers.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-2 mb-4">
        <FaCaretUp className="text-red-500 text-lg sm:text-2xl" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {risers.map((item) => {
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

                <div className="inline-flex items-center gap-1 text-red-500 font-bold text-xs sm:text-sm bg-red-50/70 px-2 py-0.5 rounded-md">
                  <FaCaretUp className="text-xs" />
                  <span>{toBanglaNumber(pctVal)}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}