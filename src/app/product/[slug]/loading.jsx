import React from "react";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-4 bg-slate-100 rounded" />
        <div className="w-3 h-3 bg-slate-100 rounded" />
        <div className="w-14 h-4 bg-slate-100 rounded" />
        <div className="w-3 h-3 bg-slate-100 rounded" />
        <div className="w-20 h-4 bg-slate-100 rounded" />
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5 flex-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 shrink-0" />
          <div className="space-y-2.5 flex-1">
            <div className="w-40 sm:w-56 h-7 bg-slate-100 rounded-lg" />
            <div className="w-28 h-4 bg-slate-100 rounded" />
            <div className="w-48 sm:w-64 h-4 bg-slate-100 rounded" />
          </div>
        </div>

        <div className="w-full md:w-36 h-28 bg-slate-50 rounded-2xl border border-slate-100" />
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-8 border-b border-slate-100">
          <div className="w-36 h-6 bg-slate-100 rounded-md mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2.5"
              >
                <div className="w-20 h-4 bg-slate-200/60 rounded" />
                <div className="w-28 h-7 bg-slate-200/60 rounded" />
                <div className="w-36 h-3 bg-slate-200/60 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-8 space-y-4">
          <div className="w-48 h-6 bg-slate-100 rounded-md mb-5" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-slate-50 border border-slate-100 rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}