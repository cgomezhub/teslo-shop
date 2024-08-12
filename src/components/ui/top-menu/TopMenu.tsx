"use client";

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline, IoSendOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.OpenSideMenu);


  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            {" "}
            Teslo{" "}
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          {" "}
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          {" "}
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          {" "}
          Niños
        </Link>
      </div>
      {/* right menu */}
      <div className="flex items-center">
        <Link
          className="m-2 rounded-md transition-all hover:bg-gray-100"
          href="/search"
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          className="m-2 rounded-md transition-all hover:bg-gray-100"
          href="/cart"
        >
          <div className="relative">
            <span className="absolute text-xs -top-2 -right-2 bg-blue-500 text-white rounded-full px-1 font-bold">
              2
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button 
        onClick={() => openMenu()}
        className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menu
        </button>
      </div>

      {/* menu */}
    </nav>
  );
};
