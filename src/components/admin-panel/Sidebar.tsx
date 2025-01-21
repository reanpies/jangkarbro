"use client";

import { MdDashboard, MdManageAccounts, MdLogout } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoSettings } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const menus = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      href: "/admin/dashboard",
    },
    {
      title: "Menu",
      icon: <RiShoppingCartLine />,
      href: "/admin/products",
    },
    // {
    //   title: "Accounts",
    //   icon: <MdManageAccounts />,
    //   href: "#",
    // },
    {
      title: "About",
      icon: <GrTransaction />,
      href: "/admin/about",
    },
];

const Sidebar = () => {
    const pathName = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await signOut({ 
          redirect: true,
          callbackUrl: "/login"
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return (
        <div className="bg-white w-[300px] h-screen p-4 shrink-0 flex flex-col justify-between sticky top-0">
          <div>
            <div className="flex items-center gap-4">
              <img className="size-12 rounded-lg" src="/logo_jangkar.png" alt="logo" />
              <h2 className="text-[20px] font-semibold text-[#16325B]">Jangkar</h2>
            </div>

            <ul className="space-y-4 mt-6">
              {menus.map((menu) => (
                <Link 
                  key={menu.title} 
                  href={menu.href} 
                  className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-[#16325B] hover:text-[#E1AF28] ${
                    pathName === menu.href ? "bg-[#16325B] text-[#E1AF28]": "bg-gray-200"
                  }`}
                >
                  <div className="text-[20px]">
                    {menu.icon}
                  </div>
                  <p>{menu.title}</p>
                </Link>
              ))}
            </ul>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center p-4 rounded-lg cursor-pointer bg-gray-200 hover:bg-red-500 hover:text-white mt-auto w-full"
          >
            <div className="text-[20px]">
              <MdLogout />
            </div>
            <p>Logout</p>
          </button>
        </div>
    );
};

export default Sidebar;