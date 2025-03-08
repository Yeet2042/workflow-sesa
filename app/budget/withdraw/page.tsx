"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WithdrawPage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      description,
      quantity,
      price,
    };

    try {
      const res = await fetch("/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("เบิกงบไม่สำเร็จ!");

      alert("บันทึกคำขอเบิกงบสำเร็จ!");
      router.push("/budget/employee");
    } catch (error) {
      alert("เกิดข้อผิดพลาด! ลองใหม่อีกครั้ง");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">เบิกงบประมาณ</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">รายละเอียด</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">จำนวน</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">ราคาต่อชิ้น (บาท)</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              ราคารวม (บาท)
            </label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={price * quantity}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg shadow-lg ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "กำลังส่ง..." : "ยืนยันการเบิกงบ"}
          </button>
        </form>
      </div>
    </div>
  );
}
