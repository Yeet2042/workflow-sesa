"use client";

import { ChevronDownIcon, UserIcon, Cog8ToothIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";


export default function UserProfileDropdown() {
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {session.status === "authenticated" && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 bg-[#262930] px-3 py-2 rounded-lg transition duration-100 ease-in-out hover:bg-[#3a3d47]"
          >
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full transition duration-300 ease-in-out hover:scale-105"
            />
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-sm transition duration-100 ease-in-out hover:text-white">
                {session.data.user.name}
              </h1>
              <h2 className="text-xs text-neutral-300 transition duration-100 ease-in-out hover:text-neutral-100">
                {session.data.user.email}
              </h2>
            </div>
            <ChevronDownIcon className={`w-5 h-5 transition duration-300 ease-in-out hover:text-neutral-100 ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {isOpen && (
            <div className="absolute flex flex-col gap-1 right-0 mt-2 w-48 bg-[#262930] rounded-md shadow-lg py-2 z-20">
              <a
                className="flex px-4 py-2 text-sm hover:font-semibold"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                Profile
              </a>
              <a
                className="flex px-4 py-2 text-sm hover:font-semibold"
              >
                <Cog8ToothIcon className="w-5 h-5 mr-2" />
                Settings
              </a>
              <div className="border-t-[1px] border-neutral-600 mx-3"/>
              <a
                className="flex px-4 py-2 text-sm hover:font-semibold text-red-400"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
                Logout
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
