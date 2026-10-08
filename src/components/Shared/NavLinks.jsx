"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const defaultCategories = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
];

export default function NavLinks({ isMobile = false }) {
  const [categories, setCategories] = useState(defaultCategories);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories.map((cat) => {
        const targetPath = `/category/${cat.slug}`;
        const isActive =
          pathname === targetPath || (pathname === "/" && cat.slug === "chal");

        if (isMobile) {
          return (
            <Link
              key={cat.id || cat.slug}
              href={targetPath}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-(--primary) text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg leading-none">{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          );
        }

        return (
          <Link
            key={cat.id || cat.slug}
            href={targetPath}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm transition-all shrink-0 font-bold ${
              isActive
                ? "bg-(--primary) text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </>
  );
}