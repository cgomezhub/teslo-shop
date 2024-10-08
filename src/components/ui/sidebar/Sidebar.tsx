"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUIStore } from "@/store";
import { logout } from "@/actions";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.CloseSideMenu);

  const { data: session } = useSession();

  // console.log({ session });

  const isAuthenticated = !!session?.user;

  const userRole = session?.user?.role;

  return (
    <div>
      {/* backgraund black */}
      {/* blur */}
      {isSideMenuOpen && (
        <>
          <div className=" fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div
            onClick={() => closeMenu()}
            className=" fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        </>
      )}
      {/* sidebar */}
      <nav //TODO efecto de slide
        className={clsx(
          "fixed p-5 top-0 right-0 w-[500px] h-screen z-20 bg-white shadow-2xl transform transition duration-300",
          { "translate-x-full": !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={50}
          className="cursor-pointer absolute top-5 right-5"
          onClick={() => closeMenu()}
        />

        <div className=" relative mt-14">
          <IoSearchOutline className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="buscar"
            className="w-full bg-gray-50 h-10 pl-10 py-1 pr-10 rounded border borber-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 "
          />
        </div>

        {/* menu */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonAddOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href="/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link
              href="/auth/login"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <button
              onClick={async () => {
                await logout();
                await closeMenu();
                window.location.replace("/");
              }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        )}

        {/* line separator */}
        <div className="w-full h-px bg-gray-300 my-10" />

        {userRole === "admin" && (
          <>
            <Link
              href="/admin/products"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href="/admin/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href="/admin/users"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
