import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const requests = await prisma.budget.findMany();

  const approvedCount = requests.filter((r) => r.status === "approve").length;
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const rejectedCount = requests.filter((r) => r.status === "reject").length;

  return NextResponse.json({
    requests,
    approvedCount,
    pendingCount,
    rejectedCount,
  });
}
export async function POST(req: Request) {
  try {
    const { description, quantity, price } = await req.json();

    if (!description || !quantity || !price) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const newRequest = await prisma.budget.create({
      data: {
        description,
        quantity,
        price,
        status: "pending",
        createdAt: new Date(),
        name: "user",
        total: 1,
        userId: 1,
      },
    });

    return NextResponse.json(
      { message: "บันทึกคำขอเบิกงบสำเร็จ!", request: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด!" }, { status: 500 });
  }
}
