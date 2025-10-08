"use client";

import { auth_service } from "@/app/api/service/auth.service";
import { AtSign, User, Phone, UserRound, LogIn, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value.startsWith("998")) value = "998" + value;

    let formatted = "+998";
    if (value.length > 3) formatted += "-" + value.slice(3, 5);
    if (value.length > 5) formatted += "-" + value.slice(5, 8);
    if (value.length > 8) formatted += "-" + value.slice(8, 10);
    if (value.length > 10) formatted += "-" + value.slice(10, 12);

    setPhone(formatted);
  };

  // Formani yuborish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      return;
    }

    if (password !== confirm) {
      setError("Parollar mos emas!");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    const data = {
      name,
      surname: surname,
      username,
      phone: cleanPhone,
      password,
    };

    localStorage.setItem("tel", phone);

    console.log("📦 Yuborilayotgan data:", data);

    try {
      const res = await auth_service.signup(data);
      console.log("✅ Server javobi:", res);
      router.push("verify");
      alert("Ro‘yxatdan o‘tish muvaffaqiyatli ✅");
    } catch (err: any) {
      console.error("❌ Xatolik:", err);
      setError("Ro‘yxatdan o‘tishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="flex min-h-[98vh] rounded-xl items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
        <h1 className="text-3xl font-extrabold text-center text-purple-900 mb-8">
          Ro‘yxatdan o‘tish
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <UserRound className="text-purple-500" />
            <input
              type="text"
              placeholder="Ism"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <User className="text-purple-500" />
            <input
              type="text"
              placeholder="Familya"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <AtSign className="text-purple-500" />
            <input
              type="text"
              placeholder="Foydalanuvchi nomi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <Phone className="text-purple-500" />
            <input
              type="tel"
              placeholder="+998-XX-XXX-XX-XX"
              value={phone}
              onInput={handlePhoneInput}
              maxLength={17}
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <KeyRound className="text-purple-500" />
            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none bg-transparent"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-2 bg-white focus-within:ring-2 focus-within:ring-purple-500">
            <KeyRound className="text-purple-500" />
            <input
              type="password"
              placeholder="Parolni tasdiqlang"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full outline-none bg-transparent"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white rounded-xl text-md font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg"
          >
            <LogIn size={20} />
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Hisobingiz bormi?{" "}
          <Link
            href="/auth/signin"
            className="text-purple-700 font-semibold hover:underline hover:text-purple-900 transition-all"
          >
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
