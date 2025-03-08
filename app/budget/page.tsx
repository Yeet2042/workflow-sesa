"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated" && session.data.user.role === "boss") {
    router.push("budget/boss");
  } else if (session.status === "authenticated" && session.data.user.role === "employee") {
    router.push("budget/employee");
  } else {
    router.push("login");
  }
}