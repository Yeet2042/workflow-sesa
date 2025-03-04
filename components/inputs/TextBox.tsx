"use client";

import { ReactNode } from "react";

interface Props {
  type: string;
  icon?: ReactNode;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextBox({ type, icon, placeholder, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-300 bg-[#353B45]">
      {icon && <div className="flex-shrink-0 w-6 h-6 text-neutral-400">{icon}</div>}
      <input
        type={type}
        className="w-full bg-transparent focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
