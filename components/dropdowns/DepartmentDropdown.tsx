"use client"

import { Department } from "@/interface/department";
import { UsersIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
  value: Department;
  onValueChange: (value: Department) => void;
}

export default function DepartmentDropdown({ value, onValueChange }: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch("/api/departments");
      const data = await response.json();
      setDepartments(data.departments);
    }

    fetchDepartments()
  }, [])
    
  return (
    <div className="relative w-full">
      <button className="flex items-center justify-between gap-2 px-4 py-2 w-full rounded-lg bg-[#353B45]" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <UsersIcon className="w-6 h-6 text-neutral-400"/>
          <span className="text-neutral-300">{value.name || "แผนก"}</span>
        </div>
        <ChevronDownIcon className={`w-6 h-6 transition duration-100 ${isOpen ? "rotate-180" : "rotate-0"}`}/>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 rounded-lg shadow-lg">
          <div className="flex flex-col py-2 bg-[#353B45] rounded-lg">
            {departments.length > 0 && departments.map((Department) => (
              <button key={Department.id} className=" px-4 py-2 text-left hover:font-semibold" onClick={() => onValueChange(Department)}>{Department.name}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}