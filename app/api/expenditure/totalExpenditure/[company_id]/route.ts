import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params } : { params: Promise<{ company_id: string }> }) {
  try {
    const { company_id } = await params;

    const totalExpenditures = await prisma.totalExpenditure.findMany({
      where: {
        companyId: Number(company_id)
      },
      include: {
        expenditure: {
          include: {
            department: true
          }
        }
      }
    })

    console.log(totalExpenditures);

    return NextResponse.json({ totalExpenditures });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลปีงบประมาณทั้งหมด" }, { status: 500 });
  }
}