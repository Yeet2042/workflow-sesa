import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params } : { params: Promise<{ company_id: string }> }) {
  const { company_id } = await params;

  const AllUsersInCompany = await prisma.user.findMany({
    where: {
      companyId: Number(company_id)
    },
    include: {
      department: true
    }
  })

  return NextResponse.json({ AllUsersInCompany });
}