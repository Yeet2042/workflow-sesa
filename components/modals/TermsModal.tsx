"use client"

import { XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: Props) {
  return (
    <>
      {isOpen && (
        <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="container max-w-[500px] w-full h-fit bg-[#252931] rounded-lg shadow-lg px-16 py-8 flex flex-col gap-6 relative z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-neutral-50">Terms of Use</h1>
              <XMarkIcon onClick={onClose} className="h-6 w-6"/>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis excepturi error culpa suscipit praesentium eveniet natus quo quidem maiores, repellendus eaque delectus voluptates consequatur expedita eos veniam, earum incidunt harum?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea alias dignissimos optio? Asperiores, tempore ipsum quo quasi accusantium error libero, minus provident enim similique iusto, voluptas dolores illo quae et.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error veniam aliquid harum, laborum atque, nostrum molestiae maxime explicabo, provident ea consectetur distinctio corporis iste cum quibusdam magni laboriosam ducimus? A?</p>
          </div>
        </div>
      )}
    </>
  )
}