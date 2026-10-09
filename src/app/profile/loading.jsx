import React from "react";

export default function Loading() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="w-44 h-8 bg-slate-200/70 rounded-xl" />
        <div className="w-64 h-4 bg-slate-200/60 rounded-lg" />
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200/70 shrink-0" />
          <div className="space-y-2">
            <div className="w-36 h-6 bg-slate-200/70 rounded-lg" />
            <div className="w-48 h-4 bg-slate-200/60 rounded-md" />
          </div>
        </div>
        <div className="w-28 h-10 bg-slate-200/70 rounded-xl self-stretch sm:self-auto" />
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="w-16 h-6 bg-slate-200/70 rounded-lg" />
        <div className="space-y-2">
          <div className="w-12 h-4 bg-slate-200/60 rounded" />
          <div className="w-full h-11 bg-slate-100 rounded-xl" />
        </div>
        <div className="w-full h-11 bg-slate-200/70 rounded-xl" />
      </div>
    </div>
  );
}