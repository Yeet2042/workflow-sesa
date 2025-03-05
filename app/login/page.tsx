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
      <div className="container max-w-[500px] max-h-[650px] w-full h-fit bg-[#252931] rounded-lg shadow-lg px-16 py-8 flex flex-col gap-6 relative z-10">
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
        <div className="flex gap-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M15.725 22v-7.745h2.6l.389-3.018h-2.99V9.31c0-.874.243-1.47 1.497-1.47h1.598v-2.7a21 21 0 0 0-2.33-.12c-2.304 0-3.881 1.407-3.881 3.99v2.227H10v3.018h2.607V22H3.104C2.494 22 2 21.506 2 20.896V3.104C2 2.494 2.494 2 3.104 2h17.792C21.506 2 22 2.494 22 3.104v17.792c0 .61-.494 1.104-1.104 1.104z"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
        </div>
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
