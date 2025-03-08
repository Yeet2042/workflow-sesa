"use client"

import SelectTotalExpenditure from "@/components/dropdowns/SelectTotalExpenditure"
import Navbar from "@/components/navigators/Navbar"
import { TotalExpenditure } from "@/interface/expenditure"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const session = useSession()
  const router = useRouter()

  const [totalExpenditure, setTotalExpenditure] = useState<TotalExpenditure>({} as TotalExpenditure)

  if (!session.data) {
    return null
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto py-20">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl">ปีงบประมาณ</h1>
          <SelectTotalExpenditure
            companyId={session.data.user.companyId}
            value={totalExpenditure}
            onValueChange={setTotalExpenditure}
          />
        </div>
      </div>
    </div>
  )
}