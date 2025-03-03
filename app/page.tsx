"use client";

import Button from "@/components/buttons/Button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { CheckIcon } from "@heroicons/react/20/solid";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  return (
    <div className="flex flex-col items-center gap-[120px] max-w-7xl w-full container mx-auto px-8 py-[100px]">
      <div className="flex flex-col gap-12">
        <h1 className="text-8xl space-y-4">
          <BlurFade delay={0.25} inView>
            <span>ระบบจัดการงบประมาณ</span>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <span>ที่แสนเรียบง่าย</span>
          </BlurFade>
          <BlurFade delay={0.25 * 3} inView>
            <span>และสะดวก</span>
          </BlurFade>
        </h1>
        <BoxReveal boxColor={"#5C0771"} duration={0.5}>
          <span className="font-semibold text-5xl underline">ง่าย</span>
          <span className="text-5xl"> </span>
          <span className="font-semibold text-5xl underline">ครบ</span>
          <span className="text-5xl"> </span>
          <span className="font-semibold text-5xl underline">จบ</span>
          <span className="text-5xl"> </span>
          <span className="text-5xl">ในที่เดียว </span>
        </BoxReveal>
        <div className="flex gap-4">
          <Button />
          <button className="hover:underline text-neutral-100">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
      <div className="flex gap-[76px]">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="font-semibold text-neutral-100 text-5xl">
            <NumberTicker
              value={8868923}
              className="whitespace-pre-wrap tracking-tighter"
            />
          </h2>
          <p className="text-neutral-300">ผู้ใช้งานทั้งหมด</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="font-semibold text-neutral-100 text-5xl">
            <NumberTicker
              value={99.99}
              decimalPlaces={2}
              className="whitespace-pre-wrap tracking-tighter"
            />
            %
          </h2>
          <p className="text-neutral-300">ลดเวลาในการทำงาน</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="font-semibold text-neutral-100 text-5xl">
            <SparklesText text="FREE" />
          </h2>
          <p className="text-neutral-300">ค่าใช้จ่ายในการใช้งาน</p>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-5xl text-neutral-100">Pricing</h2>
          <p className="text-2xl text-neutral-100">ทุกอย่างฟรี ไม่ต้องกังวล</p>
        </div>

        <div className="flex gap-8" ref={ref}>
          {["Trial", "Basic", "Pro", "Pro Max"].map((plan, index) => (
            <motion.div
              key={plan}
              className={`w-[250px] h-[400px] border-[1px] rounded-lg flex flex-col gap-4 px-4 py-6 shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                plan === "Basic" ? "border-neutral-200" : "border-neutral-600"
              }`}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              custom={index}
            >
              <h3 className="font-semibold text-2xl text-neutral-100">
                {plan}
              </h3>
              <p>แพ็จเกจพื้นฐาน</p>
              {plan === "Basic" ? (
                <Button />
              ) : (
                <button className="border-[1px] border-neutral-600 text-neutral-100 px-6 py-3 rounded-lg whitespace-nowrap">
                  สมัครใช้งาน
                </button>
              )}
              <h3 className="font-semibold text-2xl text-neutral-100">FREE</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <CheckIcon className="h-5 w-5 text-neutral-100" />
                  <span className="text-neutral-300 text-sm">
                    ใช้งานได้เต็มระบบ
                  </span>
                </div>
                <div className="flex gap-2">
                  <CheckIcon className="h-5 w-5 text-neutral-100" />
                  <span className="text-neutral-300 text-sm">
                    ไม่มีค่าใช้จ่ายเพิ่มเติม
                  </span>
                </div>
                <div className="flex gap-2">
                  <CheckIcon className="h-5 w-5 text-neutral-100" />
                  <span className="text-neutral-300 text-sm">AI Assistant</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}