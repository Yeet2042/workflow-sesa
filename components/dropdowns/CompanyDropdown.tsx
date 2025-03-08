"use client"

import { Company } from "@/interface/company";
import { BuildingOffice2Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
  value: Company;
  onValueChange: (value: Company) => void;
}

export default function CompanyDropdown({ value, onValueChange }: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/api/companies");
      const data = await response.json();
      setCompanies(data.companies);
    }

    fetchCompanies()
  }, [])
    
  return (
    <div className="relative w-full">
      <button className="flex items-center justify-between gap-2 px-4 py-2 w-full rounded-lg bg-[#353B45]" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <BuildingOffice2Icon className="w-6 h-6 text-neutral-400"/>
          <span className="text-neutral-300">{value.name || "บริษัท"}</span>
        </div>
        <ChevronDownIcon className={`w-6 h-6 transition duration-100 ${isOpen ? "rotate-180" : "rotate-0"}`}/>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 rounded-lg shadow-lg">
          <div className="flex flex-col py-2 bg-[#353B45] rounded-lg">
            {companies.length > 0 && companies.map((company) => (
              <button key={company.id} className=" px-4 py-2 text-left hover:font-semibold" onClick={() => onValueChange(company)}>{company.name}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}