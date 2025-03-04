import { RequestRegisterUser } from '@/interface/user'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const newUser: RequestRegisterUser = await request.json()

    const { companyName, departmentName, ...userData } = newUser

    void companyName
    void departmentName

    const hashedPassword = bcrypt.hashSync(newUser.password, 10)

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    })

    return new Response(JSON.stringify({ message: 'User created', user }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: `User could not be created: ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}