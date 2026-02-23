"use client";
import { adminSideBarItems, sideBarItems, sideBarItems2 } from "@/utils/routes";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface mobileNavProps {
  setOpenMenu: (open: boolean) => void;
}
function Mobilenav({ setOpenMenu }: mobileNavProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // effect to handle closing nav on page.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenu]);

  return (
    <motion.div
      initial={{ x: 170, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      ref={menuRef}
      className="bg-[#16181B] absolute top-13 right-0 w-40 flex flex-col  flex-none  items-end  justify-end  border-[0.1px] border-gray-700 rounded-lg py-2 z-20"
    >
      <section className="w-[90%] mx-auto flex flex-col gap-2 text-[10px]">
        {/* Link Section  */}
        {sideBarItems.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            onClick={() => setOpenMenu(false)}
            className={
              pathname === item.link
                ? "text-white font-bold bg-[#8F4AE3] py-3 px-4  rounded-lg flex items-center gap-2"
                : "text-gray-400 py-3 px-4  rounded-lg hover:bg-[#8F4AE3]/10 flex items-center gap-2"
            }
          >
            {item.icon} {item.name}
          </Link>
        ))}
        <hr className=" w-full h-[0.1px] bg-gray-600 border-none" />
        {adminSideBarItems.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            onClick={() => setOpenMenu(false)}
            className={
              pathname === item.link
                ? "text-white font-bold bg-[#8F4AE3] py-3 px-4  rounded-lg flex items-center gap-2"
                : "text-gray-400 py-3 px-4  rounded-lg hover:bg-[#8F4AE3]/10 flex items-center gap-2"
            }
          >
            {item.icon} {item.name}
          </Link>
        ))}
        <hr className=" w-full h-[0.1px] bg-gray-600 border-none" />
        {sideBarItems2.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            onClick={() => setOpenMenu(false)}
            className={
              pathname === item.link
                ? "text-white font-bold bg-[#8F4AE3] py-3 px-4  rounded-lg flex items-center gap-2"
                : "text-gray-400 py-3 px-4  rounded-lg hover:bg-[#8F4AE3]/10 flex items-center gap-2"
            }
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </section>
    </motion.div>
  );
}

export default Mobilenav;
