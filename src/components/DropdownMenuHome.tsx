import { ChevronDown, ChevronUp } from "lucide-react";
import type { DropdownProps } from "../prop_types";

export default function DropdownMenuHome(
  {methodsData, brewingMethod, expanded, setExpanded, onBrewingMethodSelected}: DropdownProps
) {
  return (
    <div className="flex flex-col z-5">
      <div onClick={() => setExpanded(!expanded)} className="flex items-center justify-between border-gray-500 border-2 rounded-[100px] px-3 py-1 hover:border-[#449eec] hover:cursor-pointer">
        <p className="text-[0.95rem] text-black">
          {brewingMethod ? brewingMethod : "-- All brewing methods --"}
        </p>
        <button>{expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</button>
      </div>
      {expanded && <ul className="bg-white border border-gray-100 flex flex-col p-3 gap-1 mt-1 mx-2 rounded-lg shadow-md max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden">
        <li onClick={() => {onBrewingMethodSelected(""); setExpanded(false)}} className="p-1.5 text-[0.8rem] text-gray-500 w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">
            -- All brewing methods --
        </li>
        {methodsData.map((method, index) => 
          <li key={index} onClick={() => {onBrewingMethodSelected(method); setExpanded(false)}} className="p-1.5 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">
            {method}
          </li>)}
      </ul>}
    </div>
  )
}