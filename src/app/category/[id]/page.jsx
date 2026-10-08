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

export default async function CategoryDetailsPage({ params }) {
  const resolvedParams = await params;
  const products = await getCategoryProducts(resolvedParams.id);

  if (!products || products.length === 0) {
    notFound();
  }

  return <CategoryView initialProducts={products} />;
}