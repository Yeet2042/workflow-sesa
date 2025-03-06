import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // แก้ไข typing ให้รองรับ Promise
) {
  const { id } = await params;
  const budget = await prisma.budget.findUnique({ where: { id: Number(id) } });

  if (!budget) {
    return NextResponse.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
  }

  return NextResponse.json(budget);
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const params = await context.params;
  const id = params.id;
  const { description, quantity, price } = await req.json();

  try {
    const updatedBudget = await prisma.budget.update({
      where: { id: Number(id) },
      data: { description, quantity, price },
    });

    return NextResponse.json({
      message: "อัปเดตสำเร็จ!",
      budget: updatedBudget,
    });
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
