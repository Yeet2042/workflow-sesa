"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

export default function SearchBox() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-[1px] border-neutral-600 rounded-lg text-neutral-300">
      <MagnifyingGlassIcon className="w-5 h-5"/>
      <input type="text" className="w-[200px] bg-transparent focus:outline-none" placeholder="ค้นหา..." />
      <span className="px-2 py-1 bg-[#353B45] text-[12px] rounded-sm whitespace-nowrap">
        CTRL + K
      </span>
    </div>
  )
}