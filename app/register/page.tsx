"use client";

import TextBox from "@/components/inputs/TextBox";
import { UserIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BoxReveal } from "@/components/magicui/box-reveal";

export default function Page() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-violet-800 to-black animate-gradient-move">
      <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] -z-10"></div>
      <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[100px] -z-10"></div>

      <div className="container max-w-[500px] max-h-[650px] w-full h-full bg-[#252931] rounded-lg shadow-lg px-16 py-8 flex flex-col gap-6 relative z-10">
        <Image
          src="/logo_full.svg"
          alt="Logo"
          width={161}
          height={32}
          onClick={() => router.push("/")}
        />
        <div className="flex flex-col gap-4">
          <BoxReveal boxColor={"#5C0771"} duration={0.5}>
            <h1 className="text-3xl text-neutral-50">สวัสดี!</h1>
          </BoxReveal>
          <BoxReveal boxColor={"#5C0771"} duration={0.5}>
            <span className="text-neutral-300">
              สมัครบัญชีเพื่อดำเนินการต่อ
            </span>
          </BoxReveal>
        </div>
        <TextBox
          type="text"
          icon={<UserIcon />}
          placeholder="ชื่อบัญชี"
          value={username}
          onChange={setUsername}
        />
        <TextBox
          type="password"
          icon={<LockClosedIcon />}
          placeholder="รหัสผ่าน"
          value={password}
          onChange={setPassword}
        />
        <TextBox
          type="password"
          icon={<LockClosedIcon />}
          placeholder="ยืนยันรหัสผ่าน"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <button
          className="relative bg-primary-950 text-white px-8 py-3 rounded-lg whitespace-nowrap overflow-hidden shadow-lg transition-shadow duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => console.log("asdas")}
        >
          <motion.div
            className="flex items-center justify-center w-full"
            animate={{ x: isHovered ? -12 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-medium tracking-wide">สมัครใช้งาน</span>
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                initial={{ x: 20, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                🚀
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            className="absolute inset-0 rounded-lg z-0"
            transition={{ duration: 0.4 }}
          />
        </button>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="acceptTerms" className="w-4 h-4" />
          <label htmlFor="acceptTerms" className="text-neutral-300">
            ฉันยอมรับ{" "}
            <a href="#" className="font-semibold hover:underline">
              ข้อตกลง
            </a>{" "}
            &{" "}
            <a href="#" className="font-semibold hover:underline">
              เงื่อนไขการใช้งาน
            </a>
          </label>
        </div>
        <div className="flex gap-2 w-full items-center">
          <div className="w-full border-t-[1px] border-neutral-600" />
          <span className="text-xs text-neutral-300">หรือ</span>
          <div className="w-full border-t-[1px] border-neutral-600" />
        </div>
        <div></div>
        <div className="flex justify-center">
          <label htmlFor="login" className="text-neutral-300">
            มีบัญชีอยู่แล้ว?{" "}
            <a href="/login" className="font-semibold hover:underline">
              เข้าสู่ระบบ
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}
