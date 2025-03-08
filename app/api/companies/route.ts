import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const companies = await prisma.company.findMany();
    return NextResponse.json({ companies });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบริษัท" }, { status: 500 });
  }
}