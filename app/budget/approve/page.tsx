// app/approve/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Budget } from "@/interface/budget";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
export default function ApprovePage() {
  const [requests, setRequests] = useState<Budget[]>([]);

  useEffect(() => {
    fetch("/api/employee")
      .then((res) => res.json())
      .then((data) => {
        setRequests(
          data.requests.filter(
            (req: { status: string }) => req.status === "pending"
          )
        );
      });
  }, []);

  const updateStatus = async (id: number, status: "approve" | "reject") => {
    const res = await fetch(`/api/approve/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setRequests((prev) => prev.filter((req) => req.id !== id)); // ลบออกจากหน้า
      alert(`อัปเดตเป็น ${status} แล้ว!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">รายการคำขอรออนุมัติ</h1>

      {requests.length === 0 ? (
        <p className="text-gray-400">ไม่มีรายการที่รออนุมัติ</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg relative"
            >
              <h2 className="text-xl font-semibold">{req.description}</h2>
              <p className="text-gray-400">จำนวน: {req.quantity}</p>
              <p className="text-green-400 font-bold">
                ฿{req.price.toLocaleString()}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus(req.id, "approve")}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  อนุมัติ
                </button>
                <button
                  onClick={() => updateStatus(req.id, "reject")}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <XCircleIcon className="w-5 h-5" />
                  ไม่อนุมัติ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
