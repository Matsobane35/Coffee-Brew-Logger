import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { DropdownProps } from "../prop_types";

export default function DropdownMenuForm(
  {methodsData, brewingMethod, expanded, setExpanded, onBrewingMethodSelected}: DropdownProps
) {

  const [newMethodInput, setNewMethodInput] = useState("")

  return (
    <div className="flex flex-col relative z-30">
      <div onClick={() => setExpanded(!expanded)} className="flex border border-gray-300 rounded-md items-center justify-between py-1 px-2 w-full hover:border-[#449eec] hover:cursor-pointer">
        <p className={brewingMethod ? "text-[0.95rem] text-black" : "text-[0.95rem] text-gray-400"}>
          {brewingMethod ? brewingMethod : "Select brewing method"}
        </p>
        <button className="hover:cursor-pointer">
          {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </button>
      </div>
      {expanded && <ul className="bg-white border border-gray-100 absolute place-self-center min-w-[95%] flex flex-col p-3 gap-1 mt-10 rounded-lg shadow-md max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden">
        <li className="flex gap-1">
          <input onChange={e => setNewMethodInput(e.target.value.trim())} placeholder="Add new method" type="text" className="flex-1 py-1 px-3 text-[0.8rem] rounded-[100px] bg-white border-2 border-gray-300 hover:border-[#449eec]"/>
          <button onClick={() => {onBrewingMethodSelected(newMethodInput); setExpanded(false)}} className="text-[0.8rem] aspect-square bg-[#283846] rounded-[50%] px-2 hover:bg-[#464f55] hover:cursor-pointer text-white">
            OK
          </button>
        </li>
        {methodsData.map((method, index) => 
          <li key={index} onClick={() => {onBrewingMethodSelected(method); setExpanded(false)}} className="p-1.5 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">
            {method}
          </li>)}
      </ul>}
    </div>
  )
}