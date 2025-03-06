import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// อัปเดตสถานะ (อนุมัติ / ไม่อนุมัติ)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const updatedBudget = await prisma.budget.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(updatedBudget);
  } catch {
    return NextResponse.json(
      { error: "Failed to update budget" },
      { status: 500 }
    );
  }
}
