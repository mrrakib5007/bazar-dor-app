import React from "react";
import { notFound } from "next/navigation";
import CategoryView from "./CategoryView";

async function getCategoryProducts(id) {
  try {
    const res = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products?category=${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const products = await getCategoryProducts(resolvedParams.id);

  const categoryName = products[0]?.categoryNameBn;

  if (!categoryName) {
    return {
      title: "ক্যাটাগরি | বাজার দর",
      description: "দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের বাজার দাম",
    };
  }

  return {
    title: `${categoryName} এর আজকের বাজার দাম | বাজার দর`,
    description: `${categoryName} ক্যাটাগরির সকল পণ্যের আজকের দাম ও পরিবর্তনের তালিকা দেখুন।`,
  };
}

export default async function CategoryDetailsPage({ params }) {
  const resolvedParams = await params;
  const products = await getCategoryProducts(resolvedParams.id);

  if (!products || products.length === 0) {
    notFound();
  }

  return <CategoryView initialProducts={products} />;
}