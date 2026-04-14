"use client";

import { publicItems } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import { useUserInfo } from "@/utils/logics/userinfo";
import { ArrowForward } from "./ui/svg";

function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const userInfo = useUserInfo()

  return (
    <div className="bg-[#000000] text-white md:py-3 py-2  fixed top-0 left-0 w-full z-50">
      {/* container  */}
      <section className="flex items-center justify-center gap-2 md:w-[90%] w-[98%] mx-auto">
        {/* Logo   */}
        <div className="flex flex-1 items-center relative ">
          <span className="flex items-center w-full rounded-lg px-4 md:text-[20px] text-xl font-extrabold text-[#5E13FD] tracking-wide">
            <Link
              href="/"
              className=" border-2 border-[#5E13FD] rounded-full p-2 mr-2 flex items-center justify-center"
            >
              <img src="/logo.png" alt="" className=" w-8 h-8 object-cover" />
            </Link>
            <p className="text-white  ">eer.</p>Circle
          </span>
        </div>

        {/* Navigation */}
        <div className="md:flex hidden flex-1 items-center justify-center">
          <nav className="w-fit flex items-center gap-8 py-3 px-6 rounded-lg">
            {publicItems.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className={
                  item.link === pathname
                    ? "text-[#5E13FD] text-[14px] font-medium duration-300"
                    : " text-white hover:text-gray-300 duration-100"
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Auth Button  */}

        <div className="md:flex hidden flex-1 items-center justify-end gap-5">
          {userInfo?.displayName ? (
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-sm">

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-[#5E13FD] flex items-center justify-center text-white font-bold">
                {userInfo?.displayName?.charAt(0) || "C"}
              </div>

              {/* Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400">Welcome back</span>
                <span className="text-xs font-semibold text-white">
                  {userInfo?.displayName || "Creator"}
                </span>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-white/10 mx-2" />

              {/* CTA */}
              <Link
                href="/dashboard"
                className="text-xs font-semibold text-[#5E13FD] hover:text-[#5E13FD]/80 transition"
              >
                Dashboard →
              </Link>
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="text-white w-29.5 h-11 flex items-center justify-center bg-[#5E13FD] hover:bg-[#5E13FD]/90 shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033] font-bold rounded-xl cursor-pointer"
            >
              GetStarted
            </Link>
          )}
        </div>


        {/* mobile menu button  */}
        <div className="flex md:hidden  items-center justify-end gap-5 ">
          <button
            className=" text-white  cursor-pointer w-fit pr-4"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <Close /> : <DragHandleIcon />}
          </button>
        </div>
      </section>
      {/* Mobile menu */}
      <AnimatePresence>
        {openMenu && (
          <section
            onClick={() => setOpenMenu(false)}
            className="fixed top-17.5 left-0 w-full h-screen bg-black/50 mx-auto flex  justify-end md:hidden"
          >
            <motion.aside
              initial={{ x: 170, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 170, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#16181B] flex flex-col gap-2 text-[10px] w-[70%] p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {publicItems.map((item) => (
                <Link
                  href={item.link}
                  key={item.name}
                  onClick={() => setOpenMenu(false)}
                  className={
                    pathname === item.link
                      ? "text-white font-bold bg-[#5E13FD] py-3 px-4  rounded-lg flex items-center gap-2"
                      : "text-gray-400 py-3 px-4  rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-2"
                  }
                >
                  {item.name}
                </Link>
              ))}
              <hr className=" w-full h-[0.1px] bg-gray-600 border-none" />
              <div className="px-3 py-2">
                {userInfo?.displayName ? (
                  <div className="flex flex-col justify-between bg-white/5 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 gap-2">

                    {/* Left: Avatar + Name */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#5E13FD] flex items-center justify-center text-white text-sm font-bold">
                        {userInfo.displayName.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {userInfo.displayName}
                      </span>
                    </div>

                    {/* Right: Dashboard */}
                    <Link
                      href="/dashboard"
                      className="text-sm font-semibold text-[#5E13FD] active:scale-95 transition"
                    >
                      Dashboard <ArrowForward />
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/auth/sign-in"
                    className="w-29.5 ml-auto h-9 flex items-center justify-center text-white bg-[#5E13FD] active:scale-95 transition font-semibold py-3 rounded-xl shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]"
                  >
                    GetStarted
                  </Link>
                )}
              </div>
            </motion.aside>
          </section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
