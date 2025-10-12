"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Phone, Key, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth_service } from "@/app/api/service/auth.service";

export default function SignInPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (!digits.startsWith("998")) {
      if (digits.length <= 3) digits = "998";
      else digits = "998" + digits.replace(/^998/, "");
    }

    let formatted = "+998";
    if (digits.length > 3) formatted += "-" + digits.slice(3, 5);
    if (digits.length > 5) formatted += "-" + digits.slice(5, 8);
    if (digits.length > 8) formatted += "-" + digits.slice(8, 10);
    if (digits.length > 10) formatted += "-" + digits.slice(10, 12);

    if (formatted.length > 17) formatted = formatted.slice(0, 17);

    setPhone(formatted);
  };

  const normalizePhoneForServer = (masked: string) => masked.replace(/\D/g, ""); // +ni va -larni olib tashlaymiz

  const validateForm = () => {
    setError(null);
    if (!username || username.trim().length < 3) {
      setError("Foydalanuvchi nomi kamida 3 belgidan iborat bo'lishi kerak.");
      return false;
    }

    const digits = normalizePhoneForServer(phone);
    if (!/^998\d{9}$/.test(digits)) {
      setError("Telefon raqam +998-XX-XXX-XX-XX ko‘rinishida bo‘lishi kerak.");
      return false;
    }

    if (!password || password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        username: username.trim(),
        phone: normalizePhoneForServer(phone),
        password,
      };

      console.log(payload.phone);
      const res = await auth_service.signin(payload);

      const data = await res;
      console.log(data);

      if (data.access_token)
        localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token)
        localStorage.setItem("refresh_token", data.refresh_token);

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Tanish bo‘lmagan xatolik yuz berdi.");
      }
    }
  };

  return (
    <div className="min-h-[98vh] flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 p-4 rounded-2xl">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-8">
        <h1 className="text-2xl font-extrabold text-center text-purple-900 mb-6">
          Kirish
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-400 bg-white">
            <AtSign className="text-purple-500" />
            <input
              name="username"
              placeholder="Foydalanuvchi nomi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              aria-label="username"
              autoComplete="username"
            />
          </label>

          {/* Telefon */}
          <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-400 bg-white">
            <Phone className="text-purple-500" />
            <input
              name="phone"
              placeholder="+998-XX-XXX-XX-XX"
              value={phone}
              onChange={handlePhoneInput}
              maxLength={17}
              className="w-full bg-transparent outline-none text-sm"
              aria-label="phone"
              inputMode="tel"
              autoComplete="tel"
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-400 bg-white">
            <Key className="text-purple-500" />
            <input
              name="password"
              placeholder="Parol"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              aria-label="password"
              autoComplete="current-password"
            />
          </label>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full px-4 py-3 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white rounded-xl text-md font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Kirilmoqda...
              </>
            ) : (
              <>
                <span>Platformaga Kirish</span>
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            {`Hisobingiz yo‘qmi?`}
            <Link href="/auth/signup" className="text-purple-700 font-semibold">
              {`Ro'yxatdan o'tish`}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
