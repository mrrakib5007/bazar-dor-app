
export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-6 mt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 font-normal">
        <p className="text-center sm:text-left">
          বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-center sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}