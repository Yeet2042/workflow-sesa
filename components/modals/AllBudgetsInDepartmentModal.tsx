"use client";

import { BudgetWithUser } from "@/interface/budget";
import PriceFormatter from "@/utils/PriceFormatter";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
  departmentId: string;
  departmentName: string;
}

export default function AllBudgetsInDepartmentModal({
  departmentId,
  departmentName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [budgets, setBudgets] = useState<BudgetWithUser[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch(`/api/budget/${departmentId}`);
      const data = await response.json();
      setBudgets(data.AllBudgetsInDepartment);
    }

    fetchBudgets();
  }, [departmentId]);

  console.log(budgets);

  return (
    <>
      <button
        className="flex justify-center items-center gap-2 w-full text-white hover:font-semibold px-3 py-2 rounded-lg transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>ดูรายการเบิกทั้งหมด</span>
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 bg-black/50 flex justify-center items-center">
          <div className="flex flex-col gap-4 bg-[#252931] p-8 rounded-lg max-w-7xl w-full">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-2xl">แผนก {departmentName}</h1>
              <XMarkIcon onClick={() => setIsOpen(false)} className="w-6 h-6" />
            </div>
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="text-white">
                  <th className="p-3">ID</th>
                  <th className="p-3">สร้างเมื่อ</th>
                  <th className="p-3">รายละเอียด</th>
                  <th className="p-3">จำนวน</th>
                  <th className="p-3">ราคาต่อชิ้น</th>
                  <th className="p-3">ราคารวม</th>
                  <th className="p-3">สร้างโดย</th>
                  <th className="p-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((req) => (
                  <tr key={req.id} className="border-b border-gray-700">
                    <td className="p-3">{req.id}</td>
                    <td className="p-3">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">{req.description}</td>
                    <td className="p-3">{req.quantity}</td>
                    <td className="p-3">{PriceFormatter(req.price)} ฿</td>
                    <td className="p-3">{PriceFormatter(req.total)} ฿</td>
                    <td className="p-3">{req.user.name}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-white font-bold rounded-full ${
                          req.status === "approve"
                            ? "bg-green-500"
                            : req.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
