"use client";

import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
  departmentId: string;
  departmentName: string;
  totalRemaining: number;
  remaining: number;
  amount: number;
}

export default function UpdateDepartmentBudgetModal({ departmentId, departmentName, totalRemaining, remaining, amount }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [newAmount, setNewAmount] = useState(0);

  useEffect(() => {
    setNewAmount(amount);
  }, [amount]);

  const handleSubmit = async () => {
    console.log("Change!")
  }

  return (
    <>
      <button className="flex justify-center items-center gap-2 w-full bg-yellow-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-yellow-700 transition-all" onClick={() => setIsOpen(!isOpen)}>
        <PencilSquareIcon className="w-5 h-5" />
        <span>เพิ่ม/ลดงบประมาณ</span>
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 bg-black/50 flex justify-center items-center">
          <div className="flex flex-col gap-4 bg-[#252931] p-8 rounded-lg w-[400px]">
            <h1 className="font-semibold text-2xl">แผนก {departmentName}</h1>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="amount">จำนวนเงิน (บาท)</label>
                <input
                  type="number"
                  id="amount"
                  className="p-2 border border-neutral-300 rounded-lg"
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-green-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-green-700 transition-all"
                  onClick={handleSubmit}
                  disabled={newAmount === 0 || newAmount < remaining}
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-700 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
