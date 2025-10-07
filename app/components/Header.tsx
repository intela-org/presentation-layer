import { Bell, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gradient-to-b from-[#faf7ff] to-[#ece6f9] border-b border-purple-300 w-full h-16 px-7 shadow-sm">
      <a href="http://boburov.uz/" className="flex items-center gap-3">
        <img
          src="https://avatars.githubusercontent.com/u/137058543?v=4"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full shadow-md border border-purple-400"
        />
        <h1 className="font-mono text-purple-700 text-lg tracking-widest leading-5  ">
          Created by{" "}
          <span className="bg-purple-700 bg-clip-text text-transparent font-extrabold">
            Shukurullo
          </span>
        </h1>
      </a>
      <form className="flex items-center w-full gap-3 pr-5">
        <input
          type="text"
          placeholder="Type something..."
          className="bg-white/70 border border-purple-300 focus:border-purple-500 rounded-2xl px-4 w-full h-11 outline-none shadow-sm focus:shadow-md transition-all duration-200"
        />
        <button
          type="submit"
          className="px-6 h-11 rounded-2xl bg-purple-800 text-white font-medium hover:bg-purple-600 transition-all duration-200 shadow-sm"
        >
          Submit
        </button>
      </form>

      <div className="flex items-center gap-5">
        <a
          href="#"
          className="p-3.5 rounded-full border-purple-600 border bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm"
        >
          <MessageCircle size={22} />
        </a>
        <a
          href="#"
          className="p-3.5 rounded-full border-purple-600 border bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm"
        >
          <Bell size={22} />
        </a>

        <Link
          href={"/profile"}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-700 text-white font-semibold text-xl shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          B
        </Link>
      </div>
    </header>
  );
};

export default Header;
