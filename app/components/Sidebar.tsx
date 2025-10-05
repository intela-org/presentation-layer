import logo from "@/public/logoo2.png";
import Image from "next/image";
import {
  Home,
  User,
  Settings,
  LogOut,
  Book,
  LayoutDashboard,
  Bell,
  Download,
  BarChart3,
  Wallet,
} from "lucide-react";

const Sidebar = () => {
  const navMain = [
    { id: "home", Icon: Home, href: "#" },
    { id: "book", Icon: Book, href: "#" },
    { id: "dashboard", Icon: LayoutDashboard, href: "#" },
    { id: "notifications", Icon: Bell, href: "#" },
    { id: "wallet", Icon: Wallet, href: "#" },
    { id: "chart", Icon: BarChart3, href: "#" },
  ];

  const navUtils = [
    { id: "download", Icon: Download, href: "#" },
    { id: "user", Icon: User, href: "#" },
    { id: "settings", Icon: Settings, href: "#" },
  ];

  return (
    <aside className="w-20 min-h-screen">
      <div className="w-full min-h-screen bg-gradient-to-b from-[#eae3f8] to-[#e9e0fd] border-r border-gray-300 flex flex-col items-center justify-between py-5">
        <Image
          src={logo}
          alt="logo"
          className="w-12 h-12 rounded-xl p-1.5 bg-gray-900 shadow-md"
        />

        <nav className="flex-1 flex flex-col items-center gap-4 mt-8 text-gray-500">
          {navMain.map(({ id, Icon, href }) => (
            <a
              key={id}
              href={href}
              aria-label={id}
              className="p-3 rounded-xl hover:bg-purple-600/20 hover:text-purple-600 transition-all duration-200"
            >
              <Icon size={26}/>
            </a>
          ))}

          <hr className="w-10 border-t border-gray-300 my-4" />

          {navUtils.map(({ id, Icon, href }) => (
            <a
              key={id}
              href={href}
              aria-label={id}
              className="p-3 rounded-xl hover:bg-purple-600/20 hover:text-purple-600 transition-all duration-200"
            >
              <Icon size={26} />
            </a>
          ))}

          <button
            aria-label="language"
            className="p-1 rounded-md hover:scale-105 transition-transform duration-150"
          >
            <img
              src={"https://flagcdn.com/w40/gb.png"}
              className="w-8 h-6 rounded-sm object-cover shadow-sm"
              alt="lang"
            />
          </button>
        </nav>

        <div>
          <button
            className="p-3 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all duration-200"
            aria-label="logout"
          >
            <LogOut size={26} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
