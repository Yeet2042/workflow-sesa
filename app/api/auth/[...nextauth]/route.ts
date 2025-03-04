import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      companyId: string;
      departmentId: string;
    };
  }
  interface User {
    id: string;
    email: string;
    companyId: string;
    departmentId: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) { 
        if (!credentials) {
          return null;
        }

        void req;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            ...user,
            id: user.id.toString(),
            companyId: user.companyId ? user.companyId.toString() : '',
            departmentId: user.departmentId ? user.departmentId.toString() : '',
          };
        } else {
          return null;
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.companyId = token.companyId as string;
        session.user.departmentId = token.departmentId as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.companyId = user.companyId;
        token.departmentId = user.departmentId;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };