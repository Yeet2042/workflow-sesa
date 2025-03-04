"use client";

import TextBox from "@/components/inputs/TextBox";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { signIn } from 'next-auth/react'

export default function Page() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError(true)
      } else if (result) {
        router.push('/profile')
      }
    } catch (error) {
      console.log('error', error)
      setError(true)
    }
  }

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
            <h1 className="text-3xl text-neutral-50">ยินดีต้อนรับกลับ!</h1>
          </BoxReveal>
          <BoxReveal boxColor={"#5C0771"} duration={0.5}>
            <span className="text-neutral-300">
              เข้าสู่ระบบเพื่อดำเนินการต่อ
            </span>
          </BoxReveal>
        </div>
        <TextBox
          type="email"
          icon={<EnvelopeIcon />}
          placeholder="อีเมลล์"
          value={email}
          onChange={setEmail}
        />
        <TextBox
          type="password"
          icon={<LockClosedIcon />}
          placeholder="รหัสผ่าน"
          value={password}
          onChange={setPassword}
        />
        <button
          className="relative bg-primary-950 text-white px-8 py-3 rounded-lg whitespace-nowrap overflow-hidden shadow-lg transition-shadow duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSubmit}
          disabled={!email || !password}
        >
          <motion.div
            className="flex items-center justify-center w-full"
            animate={{ x: isHovered ? -12 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-medium tracking-wide">เข้าสู่ระบบ</span>
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
        {error && <p className="text-end text-sm text-red-500">อีเมลล์หรือหรัสผ่านไม่ถูกต้อง</p>}
        <div className="flex justify-between text-neutral-300">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" className="w-4 h-4" />
            <label htmlFor="rememberMe">
              จดจำการเข้าสู่ระบบ
            </label>
          </div>
          <a href="/register" className="hover:underline">
            ลืมรหัสผ่าน?
          </a>
        </div>
        <div className="flex gap-2 w-full items-center">
          <div className="w-full border-t-[1px] border-neutral-600" />
          <span className="text-xs text-neutral-300">หรือ</span>
          <div className="w-full border-t-[1px] border-neutral-600" />
        </div>
        <div></div>
        <div className="flex justify-center">
          <label htmlFor="login" className="text-neutral-300">
            ยังไม่มีบัญชี?{" "}
            <a href="/register" className="font-semibold hover:underline">
              สร้างบัญชี
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}
