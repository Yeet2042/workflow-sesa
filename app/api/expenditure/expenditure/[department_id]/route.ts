import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params } : { params: Promise<{ department_id: string }> }) {
  try {
    const { department_id } = await params;

    const expenditures = await prisma.expenditure.findMany({
      where: {
        departmentId: Number(department_id)
      }
    })

    return NextResponse.json({ expenditures });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลปีงบประมาณทั้งหมด" }, { status: 500 });
  }
}