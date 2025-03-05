"use client"
import Navbar from "@/components/navigators/Navbar";
import { useState, useEffect } from "react";
import {Budget} from "@/interface/budget";
import { FaCheckCircle, FaClock, FaTimesCircle, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();
    const [requests, setRequests] = useState<Budget[]>([]);
    const [approvedCount, setApprovedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    useEffect(() => {
    fetch("/api/employee")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.requests);
        setApprovedCount(data.approvedCount);
        setPendingCount(data.pendingCount);
        setRejectedCount(data.rejectedCount);
      });
  }, []);
 return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">รายการทั้งหมด</h1>
          <button
            onClick={() => router.push("/withdraw")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-lg"
          >
            <FaPlus className="mr-2" /> เบิกงบ
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center mb-8">
          <div className="p-6 bg-green-700 rounded-xl shadow-lg flex flex-col items-center">
            <FaCheckCircle className="text-4xl mb-2 text-white" />
            <p className="text-2xl font-bold">{approvedCount}</p>
            <p className="text-white text-sm">อนุมัติ</p>
          </div>
          <div className="p-6 bg-yellow-600 rounded-xl shadow-lg flex flex-col items-center">
            <FaClock className="text-4xl mb-2 text-white" />
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-white text-sm">รอดำเนินการ</p>
          </div>
          <div className="p-6 bg-red-600 rounded-xl shadow-lg flex flex-col items-center">
            <FaTimesCircle className="text-4xl mb-2 text-white" />
            <p className="text-2xl font-bold">{rejectedCount}</p>
            <p className="text-white text-sm">ปฏิเสธ</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">สร้างเมื่อ</th>
                <th className="p-3">รายละเอียด</th>
                <th className="p-3">จำนวนเงิน</th>
                <th className="p-3">สร้างโดย</th>
                <th className="p-3">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-700">
                  <td className="p-3">{req.id}</td>
                  <td className="p-3">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">{req.description}</td>
                  <td className="p-3">{req.price.toLocaleString()}</td>
                  <td className="p-3">{req.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-white font-bold rounded-full ${
                        req.status === "อนุมัติ"
                          ? "bg-green-500"
                          : req.status === "รอดำเนินการ"
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
    </>
  );
}