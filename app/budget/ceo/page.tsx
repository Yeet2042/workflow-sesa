"use client";

import SelectTotalExpenditure from "@/components/dropdowns/SelectTotalExpenditure";
import CircularProgressBar from "@/components/graphs/CircularProgressBar";
import AllBudgetsInDepartmentModal from "@/components/modals/AllBudgetsInDepartmentModal";
import UpdateDepartmentBudgetModal from "@/components/modals/UpdateDepartmentBudgetModal";
import Navbar from "@/components/navigators/Navbar";
import { TotalExpenditure } from "@/interface/expenditure";
import { UserWithDepartment } from "@/interface/user";
import PriceFormatter from "@/utils/PriceFormatter";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const session = useSession();

  const [totalExpenditure, setTotalExpenditure] = useState<TotalExpenditure>(
    {} as TotalExpenditure
  );
  const [employees, setEmployees] = useState<UserWithDepartment[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`/api/user/${session.data?.user.companyId}`);
      const data = await response.json();
      setEmployees(data.AllUsersInCompany);
    };

    fetchEmployees();
  }, [session.data?.user.companyId]);

  if (!session.data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center mx-auto gap-20 max-w-7xl w-ful my-20">
        <h1 className="text-5xl font-semibold">สวัสดี, {session.data.user.name}</h1>
        <div className="flex flex-col gap-8 w-full bg-[#262930] p-8 shadow-lg rounded-lg">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-2xl">งบประมาณปี</h1>
            <SelectTotalExpenditure
              companyId={session.data.user.companyId}
              value={totalExpenditure}
              onValueChange={setTotalExpenditure}
            />
          </div>
          <div className="grid grid-cols-2 gap-16 mx-auto">
            <div className="flex flex-col items-center gap-4 w-fit p-4">
              <CircularProgressBar
                type="bath"
                latestUsage={totalExpenditure.remaining}
                quotaUsage={totalExpenditure.amount}
              />
              <div className="flex flex-col gap-2 w-full">
                <h1 className="font-semibold text-xl">ทั้งหมด</h1>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-normal text-neutral-300">
                    คงเหลือ (บาท)
                  </span>
                  <h1 className="text-2xl font-bold text-neutral-100">
                    {PriceFormatter(totalExpenditure.remaining)}
                  </h1>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-normal text-neutral-300">
                    จาก (บาท)
                  </span>
                  <h1 className="text-2xl font-bold text-neutral-100">
                    {PriceFormatter(totalExpenditure.remaining)}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-fit p-4">
              <CircularProgressBar
                type="bath"
                latestUsage={totalExpenditure.remaining}
                quotaUsage={totalExpenditure.amount}
              />
              <div className="flex flex-col gap-2 w-full">
                <h1 className="font-semibold text-xl">จ่ายจริง</h1>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-normal text-neutral-300">
                    คงเหลือ (บาท)
                  </span>
                  <h1 className="text-2xl font-bold text-neutral-100">
                    {PriceFormatter(totalExpenditure.remaining)}
                  </h1>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-normal text-neutral-300">
                    จาก (บาท)
                  </span>
                  <h1 className="text-2xl font-bold text-neutral-100">
                    {PriceFormatter(totalExpenditure.remaining)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full bg-[#262930] p-8 shadow-lg rounded-lg">
          <div className="flex justify-between items-center gap-2 w-full">
            <h1 className="font-semibold text-2xl">แผนกทั้งหมด</h1>
            <button className="flex items-center gap-2 bg-green-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-green-700 transition-all">
              <PlusIcon className="w-6 h-6" />
              <span>เพิ่มแผนก</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-16 justify-center mx-auto">
            {totalExpenditure.expenditure?.map((expenditure) => (
              <div
                key={expenditure.id}
                className="flex flex-col items-center gap-4 w-fit p-4"
              >
                <CircularProgressBar
                  type="bath"
                  latestUsage={expenditure.remaining}
                  quotaUsage={expenditure.amount}
                />
                <div className="flex flex-col gap-2 w-full">
                  <h1 className="font-semibold text-xl">
                    {expenditure.department.name}
                  </h1>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-normal text-neutral-300">
                      คงเหลือ (บาท)
                    </span>
                    <h1 className="text-2xl font-bold text-neutral-100">
                      {PriceFormatter(expenditure.remaining)}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-normal text-neutral-300">
                      จาก (บาท)
                    </span>
                    <h1 className="text-2xl font-bold text-neutral-100">
                      {PriceFormatter(expenditure.amount)}
                    </h1>
                  </div>
                </div>
                <UpdateDepartmentBudgetModal
                  departmentId={expenditure.departmentId}
                  totalRemaining={totalExpenditure.remaining}
                  departmentName={expenditure.department.name}
                  remaining={expenditure.remaining}
                  amount={expenditure.amount}
                />
                <AllBudgetsInDepartmentModal
                  departmentId={expenditure.departmentId}
                  departmentName={expenditure.department.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full bg-[#262930] p-8 shadow-lg rounded-lg">
          <div className="flex justify-between items-center gap-2 w-full">
            <h1 className="font-semibold text-2xl">
              พนักงานทั้งหมด {employees.length > 0 ? employees.length : "0"} คน
            </h1>
            <button className="flex items-center gap-2 bg-green-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-green-700 transition-all">
              <PlusIcon className="w-6 h-6" />
              <span>เพิ่มพนักงาน</span>
            </button>
          </div>
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="text-white">
                <th className="p-3">ID</th>
                <th className="p-3">สร้างเมื่อ</th>
                <th className="p-3">ชื่อ</th>
                <th className="p-3">อีเมลล์</th>
                <th className="p-3">แผนก</th>
                <th className="p-3">Role</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-700">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">
                    {new Date(emp.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.department.name}</td>
                  <td className="p-3">
                    <span
                      className={clsx(
                        "px-3 py-1 text-white font-bold rounded-full",
                        {
                          "bg-blue-500": emp.role === "employee",
                          "bg-green-500": emp.role === "boss",
                          "bg-purple-500": emp.role === "ceo",
                        }
                      )}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      <XMarkIcon className="w-5 h-5" />
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
