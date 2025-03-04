"use client"

import { PaperAirplaneIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function AIModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed z-10 inset-0 w-full h-full flex justify-end items-end p-12">
      <button
        className="flex gap-2 bg-primary-950 text-neutral-100 px-4 py-3 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256"><path fill="currentColor" d="M224.32 114.24a56 56 0 0 0-60.07-76.57a56 56 0 0 0-96.32 13.77a56 56 0 0 0-36.25 90.32A56 56 0 0 0 69 217a56.4 56.4 0 0 0 14.59 2a56 56 0 0 0 8.17-.61a56 56 0 0 0 96.31-13.78a56 56 0 0 0 36.25-90.32Zm-41.47-59.81a40 40 0 0 1 28.56 48a51 51 0 0 0-2.91-1.81L164 74.88a8 8 0 0 0-8 0l-44 25.41V81.81l40.5-23.38a39.76 39.76 0 0 1 30.35-4M144 137.24l-16 9.24l-16-9.24v-18.48l16-9.24l16 9.24ZM80 72a40 40 0 0 1 67.53-29c-1 .51-2 1-3 1.62L100 70.27a8 8 0 0 0-4 6.92V128l-16-9.24ZM40.86 86.93a39.75 39.75 0 0 1 23.26-18.36A56 56 0 0 0 64 72v51.38a8 8 0 0 0 4 6.93l44 25.4L96 165l-40.5-23.43a40 40 0 0 1-14.64-54.64m32.29 114.64a40 40 0 0 1-28.56-48c.95.63 1.91 1.24 2.91 1.81L92 181.12a8 8 0 0 0 8 0l44-25.41v18.48l-40.5 23.38a39.76 39.76 0 0 1-30.35 4M176 184a40 40 0 0 1-67.52 29.05c1-.51 2-1.05 3-1.63L156 185.73a8 8 0 0 0 4-6.92V128l16 9.24Zm39.14-14.93a39.75 39.75 0 0 1-23.26 18.36c.07-1.14.12-2.28.12-3.43v-51.38a8 8 0 0 0-4-6.93l-44-25.4l16-9.24l40.5 23.38a40 40 0 0 1 14.64 54.64"></path></svg>
        <span>Ask AI</span>
      </button>
      {isOpen && (
        <div className="absolute bottom-28 max-w-[300px] w-full">
          <div className="flex justify-between items-center bg-primary-950 text-neutral-100 p-3 rounded-t-lg shadow-lg">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256"><path fill="currentColor" d="M224.32 114.24a56 56 0 0 0-60.07-76.57a56 56 0 0 0-96.32 13.77a56 56 0 0 0-36.25 90.32A56 56 0 0 0 69 217a56.4 56.4 0 0 0 14.59 2a56 56 0 0 0 8.17-.61a56 56 0 0 0 96.31-13.78a56 56 0 0 0 36.25-90.32Zm-41.47-59.81a40 40 0 0 1 28.56 48a51 51 0 0 0-2.91-1.81L164 74.88a8 8 0 0 0-8 0l-44 25.41V81.81l40.5-23.38a39.76 39.76 0 0 1 30.35-4M144 137.24l-16 9.24l-16-9.24v-18.48l16-9.24l16 9.24ZM80 72a40 40 0 0 1 67.53-29c-1 .51-2 1-3 1.62L100 70.27a8 8 0 0 0-4 6.92V128l-16-9.24ZM40.86 86.93a39.75 39.75 0 0 1 23.26-18.36A56 56 0 0 0 64 72v51.38a8 8 0 0 0 4 6.93l44 25.4L96 165l-40.5-23.43a40 40 0 0 1-14.64-54.64m32.29 114.64a40 40 0 0 1-28.56-48c.95.63 1.91 1.24 2.91 1.81L92 181.12a8 8 0 0 0 8 0l44-25.41v18.48l-40.5 23.38a39.76 39.76 0 0 1-30.35 4M176 184a40 40 0 0 1-67.52 29.05c1-.51 2-1.05 3-1.63L156 185.73a8 8 0 0 0 4-6.92V128l16 9.24Zm39.14-14.93a39.75 39.75 0 0 1-23.26 18.36c.07-1.14.12-2.28.12-3.43v-51.38a8 8 0 0 0-4-6.93l-44-25.4l16-9.24l40.5 23.38a40 40 0 0 1 14.64 54.64"></path></svg>
              <span>Ask AI</span>
            </div>
            <div className="flex gap-2">
              <TrashIcon className="w-5 h-5"/>
              <XMarkIcon className="w-5 h-5" onClick={() => setIsOpen(!open)}/>
            </div>
          </div>
          <div className="bg-[#262930] h-[300px] p-3 shadow-lg">
            
          </div>
          <div className="bg-[#262930] p-3 shadow-lg">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-300 bg-[#353B45]">
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none"
                placeholder="Ask me anything..."
                // value={value}
                // onChange={(e) => onChange?.(e.target.value)}
              />
              <PaperAirplaneIcon className="h-5 w-5"/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}