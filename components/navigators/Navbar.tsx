import Image from "next/image";
import Button from "../buttons/Button";
import SearchBox from "../inputs/SearchBox";
import { useSession } from "next-auth/react";
import UserProfileDropdown from "../dropdowns/UserProfileDropdown";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  const session = useSession();

  return (
    <nav className="w-full border-b-[1px] border-neutral-600">
      <div className="container max-w-7xl w-full mx-auto flex justify-between items-center px-8 py-3">
        <Image src="/logo_full.svg" alt="Logo" width={161} height={32} onClick={() => router.push("/")} />
        <div className="flex gap-8">
          <SearchBox />
          {session.status === "authenticated" ? <UserProfileDropdown/> : <Button/>}
        </div>
      </div>
    </nav>
  );
}
