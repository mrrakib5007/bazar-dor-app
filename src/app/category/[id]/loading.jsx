import React from "react";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs mb-8 flex items-center gap-4 animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 shrink-0" />
        <div className="space-y-2">
          <div className="w-28 h-7 bg-slate-100 rounded-lg" />
          <div className="w-48 h-4 bg-slate-100 rounded" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-pulse">
        <div className="w-40 h-5 bg-slate-100 rounded" />
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="w-10 h-4 bg-slate-100 rounded" />
          <div className="w-24 h-8 bg-slate-100 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs animate-pulse h-36 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-100 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="w-28 h-4 bg-slate-100 rounded" />
                <div className="w-16 h-3 bg-slate-100 rounded" />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-50 flex items-end justify-between">
              <div className="space-y-1.5">
                <div className="w-14 h-3 bg-slate-100 rounded" />
                <div className="w-24 h-5 bg-slate-100 rounded" />
              </div>
              <div className="w-16 h-6 bg-slate-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}