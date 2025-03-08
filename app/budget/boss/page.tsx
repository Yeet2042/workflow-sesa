"use client"

import Navbar from "@/components/navigators/Navbar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Page() {
  const session = useSession()
  const router = useRouter()

  if (session.status === "authenticated" && session.data.user.role !== "boss") {
    router.replace("/")
  }

  return (
    <div>
      <Navbar/>
      
    </div>
  )
}