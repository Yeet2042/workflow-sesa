"use client";

import { TotalExpenditure } from "@/interface/expenditure";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
  companyId: string;
  value: TotalExpenditure;
  onValueChange: (value: TotalExpenditure) => void;
}

export default function SelectTotalExpenditure({
  companyId,
  value,
  onValueChange,
}: Props) {
  const [totalExpenditures, setTotalExpenditures] = useState<TotalExpenditure[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchExpenditures = async () => {
      const response = await fetch(
        `/api/expenditure/totalExpenditure/${companyId}`
      );
      const data = await response.json();
      setTotalExpenditures(data.totalExpenditures);

      if (data.totalExpenditures.length > 0) {
        const latestExpenditure = data.totalExpenditures.reduce((prev: { id: number; }, current: { id: number; }) =>
          prev.id > current.id ? prev : current
        );
        onValueChange(latestExpenditure);
      }
    };

    fetchExpenditures();
  }, [companyId, onValueChange]);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between gap-2 px-4 py-2 w-full rounded-lg bg-[#353B45]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-neutral-300">{value.year || ""}</span>
        </div>
        <ChevronDownIcon
          className={`w-6 h-6 transition duration-100 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 rounded-lg shadow-lg">
          <div className="flex flex-col py-2 bg-[#353B45] rounded-lg">
            {totalExpenditures.map((totalExpenditure) => (
              <button
                key={totalExpenditure.id}
                className="px-4 py-2 text-left hover:font-semibold"
                onClick={() => onValueChange(totalExpenditure)}
              >
                {totalExpenditure.year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
