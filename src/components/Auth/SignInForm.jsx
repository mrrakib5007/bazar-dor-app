"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import SocialLogin from "@/components/Auth/SocialLogin";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent duplicate requests synchronously.
  const submitLock = useRef(false);

  // Reset stale loading state when the page mounts
  // or the browser restores it through Back/Forward navigation.
  useEffect(() => {
    const resetFormState = () => {
      submitLock.current = false;
      setIsSubmitting(false);
    };

    resetFormState();
    window.addEventListener("pageshow", resetFormState);

    return () => {
      window.removeEventListener("pageshow", resetFormState);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailVal = formData.email.trim();
    const passwordVal = formData.password;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailVal) {
      newErrors.email = "ইমেইল প্রদান করা আবশ্যক";
    } else if (!emailRegex.test(emailVal)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন";
    }

    if (!passwordVal) {
      newErrors.password = "পাসওয়ার্ড প্রদান করা আবশ্যক";
    } else if (passwordVal.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop duplicate submissions.
    if (submitLock.current) return;

    if (!validate()) return;

    submitLock.current = true;
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়!");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      setFormData({
        email: "",
        password: "",
      });

      const targetUrl =
        callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
          ? callbackUrl
          : "/";

      window.location.replace(targetUrl);
      router.refresh();
    } catch (error) {
      console.error("Sign-in error:", error);

      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন!");
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-125 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="signin-email"
            className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5"
          >
            ইমেইল
          </label>

          <input
            id="signin-email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden transition-all bg-white ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-slate-200 focus:border-(--primary) focus:ring-1 focus:ring-(--primary)"
            }`}
          />

          {errors.email && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5"
          >
            পাসওয়ার্ড
          </label>

          <div className="relative">
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="কমপক্ষে ৬ অক্ষর"
              required
              className={`w-full pl-4 pr-11 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden transition-all bg-white ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-slate-200 focus:border-(--primary) focus:ring-1 focus:ring-(--primary)"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
              }
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              {showPassword ? (
                <HiOutlineEyeSlash className="w-5 h-5" />
              ) : (
                <HiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-(--primary) hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-xs cursor-pointer mt-2"
        >
          {isSubmitting ? "প্রবেশ করা হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      <SocialLogin />

      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-(--primary) font-bold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
