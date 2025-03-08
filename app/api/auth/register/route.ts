import { RequestRegisterUser } from '@/interface/user'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const newUser: RequestRegisterUser = await request.json()

    const { company, department, ...userData } = newUser

    if (!newUser.email || !newUser.password || !company || !department) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 10)

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        companyId: company.id,
        departmentId: department.id,
      },
    })

    return new Response(JSON.stringify({ message: 'User created', user }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return new Response(JSON.stringify({ error: `User could not be created: ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}