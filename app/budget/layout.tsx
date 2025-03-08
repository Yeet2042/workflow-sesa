"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Layout({ children } : { children: React.ReactNode }) {
  const router = useRouter()
  const session = useSession()

  if (session.status === "loading") {
    return <div>Loading...</div>
  }

  if (session.status === "unauthenticated") {
    router.replace("/login")
    return null
  }

  return (
    <>{children}</>
  )
}