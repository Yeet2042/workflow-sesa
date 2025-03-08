"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBudget() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    description: "",
    quantity: 1,
    price: 0,
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/edit/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: name === "quantity" || name === "price" ? Number(value) : value, // ✅ แปลงเป็น number ถ้าจำเป็น
  });
};

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/edit/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
  console.log("📌 Response:", data);
    if (res.ok) {
         alert("บันทึกคำขอเบิกงบสำเร็จ!");
        router.push("/budget/employee");}
        setLoading(false);
    
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">แก้ไขประมาณ</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">รายละเอียด</label>
            <input
            name="description"
              type="text"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">จำนวน</label>
            <input
            name="quantity"
              type="number"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">จำนวนเงิน (บาท)</label>
            <input
            name="price"
              type="number"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg shadow-lg ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "กำลังส่ง..." : "ยืนยันการเเก้ไข"}
          </button>
        </form>
      </div>
    </div>
  );
}
