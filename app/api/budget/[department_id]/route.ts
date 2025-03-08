import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: Promise<{ department_id: string }> }) {
  const { department_id } = await params;

  const AllBudgetsInDepartment = await prisma.budget.findMany({
    where: {
      departmentId: Number(department_id)
    },
    include: {
      user: true
    }
  })

  return NextResponse.json({ AllBudgetsInDepartment });
}