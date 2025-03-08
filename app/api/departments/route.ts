import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const departments = await prisma.department.findMany();

    return NextResponse.json({ departments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลแผนก" }, { status: 500 });
  }
}