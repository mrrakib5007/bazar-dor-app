"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

const toBanglaNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .replace(/\d/g, (d) => bnDigits[d]);
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

const PriceMarquee = () => {
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        
        const filtered = Array.isArray(data)
          ? data.filter((item) => {
              const dir = item.change?.dir;
              const pct = Number(item.change?.pct);
              return (dir === "up" || dir === "down") && dir !== "flat" && Math.abs(pct) > 0;
            })
          : [];

        setProducts(filtered);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (hasError) {
    return (
      <div className="w-full bg-base-100/90 border-b border-base-200 py-2 px-4 text-center">
        <p className="text-xs text-error/80 font-medium">
          সার্ভার বা এপিআই সংযোগে সমস্যা হচ্ছে। তথ্য লোড করা যায়নি।
        </p>
      </div>
    );
  }

  if (isLoading || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-base-100/90 border-b border-base-200 py-2.5 overflow-hidden text-sm">
      <Marquee pauseOnHover={true} speed={100} gradient={false}>
        {products.map((item) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          if (!isUp && !isDown) return null;

          const pctVal = Math.abs(Number(item.change?.pct) || 0).toFixed(1);

          return (
            <div
              key={item.id}
              className="inline-flex items-center gap-2 px-5 border-r border-base-200/90 whitespace-nowrap"
            >
              <span className="text-base select-none">{item.image}</span>
              <span className="font-medium text-base-content/90">
                {item.nameBn}
              </span>
              <span className="font-semibold text-base-content">
                {toBanglaNumber(item.today)} টাকা/{getUnitName(item.unit)}
              </span>

              {isUp && (
                <span className="inline-flex items-center gap-0.5 text-error font-medium">
                  <FaCaretUp className="text-xl" />
                  <span>{toBanglaNumber(pctVal)}%</span>
                </span>
              )}

              {isDown && (
                <span className="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
                  <FaCaretDown className="text-xl" />
                  <span>{toBanglaNumber(pctVal)}%</span>
                </span>
              )}
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default PriceMarquee;