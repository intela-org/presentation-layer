"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mail,
  CheckCircle,
  Loader2,
  ArrowLeft,
  AlertOctagon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth_service } from "@/app/api/service/auth.service";

export default function VerifyCodePage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const clear_phone = localStorage.getItem("tel");
      if (clear_phone) {
        const formatted = clear_phone
          .toString()
          .split("+")
          .join("")
          .split("-")
          .join("");
        setPhone(formatted);
      }
    }
  }, []);

  useEffect(() => {
    const idx = digits.findIndex((d) => d === "");
    const focusIdx = idx === -1 ? digits.length - 1 : idx;
    inputsRef.current[focusIdx]?.focus();
  }, [digits]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setError(null);
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    setDigits((d) => {
      const nd = [...d];
      nd[i] = val;
      return nd;
    });
    if (val) {
      const next = i + 1;
      if (next < 6) inputsRef.current[next]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        setDigits((d) => {
          const nd = [...d];
          nd[i] = "";
          return nd;
        });
      } else {
        const prev = i - 1;
        if (prev >= 0) {
          setDigits((d) => {
            const nd = [...d];
            nd[prev] = "";
            return nd;
          });
          inputsRef.current[prev]?.focus();
        }
      }
    } else if (e.key === "ArrowLeft") {
      const prev = i - 1;
      if (prev >= 0) inputsRef.current[prev]?.focus();
    } else if (e.key === "ArrowRight") {
      const next = i + 1;
      if (next < 6) inputsRef.current[next]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    setError(null);
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    if (!pasted.length) return;
    const newDigits = ["", "", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) newDigits[i] = pasted[i];
    setDigits(newDigits);
    const lastIdx = Math.min(pasted.length, 6) - 1;
    inputsRef.current[lastIdx]?.focus();
    e.preventDefault();
  };

  const sendCode = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await auth_service.verify({
        phone: phone || "",
        code: Number(code),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 900);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Kod tekshirilishda xatolik yuz berdi");
      } else {
        setError("Noma'lum xatolik yuz berdi");
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Kod 6 ta raqamdan iborat bo‘lishi kerak.");
      return;
    }
    sendCode(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-purple-700 mb-4"
        >
          <ArrowLeft size={16} /> Orqaga
        </button>

        <div className="flex gap-4 items-center">
          <div className="p-4 rounded-xl bg-purple-100/80">
            <Mail className="text-purple-700" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-900">
              Tasdiqlash kodi
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {phone ? (
                <> {phone} ga yuborilgan 6 xonali kodni kiriting.</>
              ) : (
                <>Telefoningizga yuborilgan 6 xonali kodni kiriting.</>
              )}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <AlertOctagon className="text-green-600" />
              <span className="text-green-800">
                Diqqat — SMS quyidagi raqamdan keladi: <b>+998-20-002-04-46</b>
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-3 justify-center">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                value={d}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl font-medium rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
                aria-label={`digit-${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-4 min-h-[1.5rem]">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-md px-3 py-2">
                <CheckCircle /> Tasdiqlandi. Dashboardga yo‘naltirilmoqda...
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              disabled={loading || success}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <CheckCircle />
                  Tasdiqlash
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-xs text-gray-500">
          {`Agar SMS kelmasa, operatoringizni tekshiring yoki loyiha ma'muriga
          murojaat qiling.`}
        </p>
      </div>
    </div>
  );
}
