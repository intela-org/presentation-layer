"use client";
import { useEffect, useState } from "react";
import { Mail, Phone, Award, Star, Trophy, Crown } from "lucide-react";
import Image from "next/image";

import badgePng from "@/public/badge/badge.png";
import headshotPng from "@/public/badge/headshot.png";
import fastest from "@/public/badge/fastest.png";
import nothing from "@/public/badge/nothing.png";
import neverGiveUp from "@/public/badge/never_give_up.png";
import nightOwl from "@/public/badge/nigt_owl.svg";
import twoHundredPulIq from "@/public/badge/200_pul_iq.png";
import useAuth from "@/hooks/useAuth";

const UserProfile = () => {
  useAuth();
  const [activity, setActivity] = useState<{ date: Date; level: string }[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01`);
    const endDate = new Date(`${currentYear}-12-31`);
    const days: { date: Date; level: string }[] = [];

    while (startDate <= endDate) {
      const rand = Math.random();
      let level = "low";
      if (rand > 0.7) level = "high";
      else if (rand > 0.4) level = "medium";

      days.push({ date: new Date(startDate), level });
      startDate.setDate(startDate.getDate() + 1);
    }

    setActivity(days);
  }, []);

  const badges = [
    { name: "200 Pul IQ", src: twoHundredPulIq },
    { name: "Never Give Up", src: neverGiveUp },
    { name: "Badge", src: badgePng },
    { name: "Night Owl", src: nightOwl },
    { name: "Fastest", src: fastest },
    { name: "Nothing", src: nothing },
    { name: "Headshot", src: headshotPng },
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const today = new Date();

  // haftalarga ajratish
  const weeks: { date: Date; level: string }[][] = [];
  let currentWeek: { date: Date; level: string }[] = [];

  activity.forEach((day, index) => {
    currentWeek.push(day);
    if (day.date.getDay() === 0 || index === activity.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f9f7ff] to-[#ece6f9] flex flex-col items-center py-10 px-5 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-3xl p-8 flex flex-col gap-6 border border-purple-200 transition-all">
        {/* Profil Header */}
        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-purple-700 flex items-center justify-center text-white font-extrabold text-5xl shadow-lg">
            B
            <span className="absolute bottom-1 right-1 bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
              lvl 12
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Boburov Shukurillo
            </h2>
            <p className="text-purple-600 font-medium">@frontendmaster</p>
            <p className="text-gray-600 mt-1 text-sm">
              Frontend developer 🚀 | React.js & TailwindCSS ustasi 💜 |
              O‘qituvchi
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="text-purple-600" size={18} />
                <span>boburov@mail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-purple-600" size={18} />
                <span>+998 90 123 45 67</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat blok */}
        <div className="flex flex-wrap gap-4 justify-between bg-purple-50 rounded-xl p-4 text-purple-700 font-semibold text-sm shadow-inner">
          <div>
            🔥 Faollik darajasi: <span className="font-bold">Yuqori</span>
          </div>
          <div>🏅 Badges: {badges.length}</div>
          <div>📅 Yil: {new Date().getFullYear()}</div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Yutuqlaring</h3>
          <div className="flex flex-wrap justify-start gap-3">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 p-[3px] shadow-md hover:shadow-[0_4px_15px_rgba(160,100,255,0.4)] hover:scale-110 transition-all duration-300"
              >
                <div className="w-full h-full bg-white border border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={badge.src}
                    alt={badge.name}
                    className="object-contain w-[70%] h-[70%] group-hover:rotate-6 transition-transform duration-300"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faollik kalendari */}
        <div className="mt-8 w-full overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Faollik kalendari ({new Date().getFullYear()})
          </h3>

          {activity.length === 0 ? (
            <p className="text-gray-400 text-sm">Yuklanmoqda...</p>
          ) : (
            <div className="flex">
              <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
                {daysOfWeek.map((day, i) => (
                  <span
                    key={i}
                    className={`${
                      i === (today.getDay() === 0 ? 6 : today.getDay() - 1)
                        ? "font-bold text-purple-700"
                        : ""
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="flex gap-1">
                {weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1">
                    {daysOfWeek.map((_, dIndex) => {
                      const dayData = week.find(
                        (d) =>
                          (d.date.getDay() === 0 ? 6 : d.date.getDay() - 1) ===
                          dIndex
                      );

                      if (!dayData)
                        return (
                          <div
                            key={dIndex}
                            className="w-3 h-3 rounded-sm bg-transparent"
                          ></div>
                        );

                      const isToday =
                        dayData.date.toDateString() === today.toDateString();

                      const color =
                        dayData.level === "high"
                          ? "bg-purple-800"
                          : dayData.level === "medium"
                          ? "bg-purple-500"
                          : "bg-purple-100";

                      return (
                        <div
                          key={dIndex}
                          title={`${dayData.date.toDateString()} — ${
                            dayData.level
                          } activity`}
                          className={`w-3 h-3 rounded-sm ${color} ${
                            isToday
                              ? "border-[2px] border-purple-700 scale-125 shadow-md"
                              : ""
                          } transition-all duration-200`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
