import React from "react";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-white p-6 sm:p-10 lg:p-12 shadow-sm animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="h-7 w-40 rounded-full bg-base-200" />

            <div className="space-y-2.5 pt-1">
              <div className="h-10 sm:h-12 w-3/4 rounded-xl bg-base-200" />
              <div className="h-10 sm:h-12 w-1/2 rounded-xl bg-base-200" />
            </div>

            <div className="space-y-2 pt-2 max-w-2xl">
              <div className="h-4 w-full rounded bg-base-200" />
              <div className="h-4 w-5/6 rounded bg-base-200" />
            </div>

            <div className="pt-4">
              <div className="h-11 w-36 rounded-xl bg-base-200" />
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex justify-center items-center">
            <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-base-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
}