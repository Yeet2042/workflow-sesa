import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log(id);

  if (!id || isNaN(Number(id.toString()))) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const budget = await prisma.budget.findUnique({
    where: { id: Number(id) },
  });

  if (!budget) {
    return NextResponse.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
  }

  return NextResponse.json(budget);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log(id);

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { description, quantity, price } = await req.json();

    const updatedBudget = await prisma.budget.update({
      where: { id: Number(id) },
      data: { description, quantity, price },
    });

    return NextResponse.json({
      message: "อัปเดตสำเร็จ!",
      budget: updatedBudget,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด", details: (error as Error).message },
      { status: 500 }
    );
  }
}
