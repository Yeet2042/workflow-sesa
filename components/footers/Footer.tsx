"use cluent"

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t-[1px] border-neutral-600 px-8 py-16">
      <div className="flex flex-col justify-between gap-20">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-4 text-neutral-300">
            <Image src="/logo_full.svg" alt="Logo" width={161} height={32} />
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Work with Us</a>
          </div>
        </div>
        <div className="w-full flex justify-between text-sm text-neutral-300">
          <p>Terms of Use & Privacy Policy</p>
          <p>©2022 Workflow Team. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}