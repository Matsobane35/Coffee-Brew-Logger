import { useState } from "react";
import type { DropdownProps } from "../prop_types";

export default function DropdownMenuForm(
  {methodsData, brewingMethod, expanded, setExpanded, onBrewingMethodSelected}: DropdownProps
) {

  const [newMethodInput, setNewMethodInput] = useState("")

  return (
    <div className="flex flex-col relative z-30">
      <div onClick={() => setExpanded(!expanded)} className={`z-5 ${expanded ? "outline-2" : "outline-none"} outline-[#449eec] -outline-offset-2 bg-white flex border border-gray-300 rounded-lg items-center justify-between py-1 px-2 w-full hover:border-[#449eec] hover:cursor-pointer`}>
        <p className={`${brewingMethod ? "text-black" : "text-gray-400"} text-[0.95rem]`}>
          {brewingMethod ? brewingMethod : "Select brewing method"}
        </p>
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="1rem" height="1rem">
          <g className={`${expanded ? "translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`} id="left">
            <path d="M4,8 l8,8" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className={`${expanded ? "-translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`} id="right">
            <path d="M12,16 l8,-8" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
      <div className="absolute mt-1 w-full h-[calc(100%-4px)] [clip-path:inset(0px_0px_-216px_0px)]">
        <ul className={`dropdown-menu ${expanded ? "translate-y-[calc(100%+4px)] shadow-md" : "translate-y-0 shadow-[0px]"} absolute bottom-0 transition-transform duration-300 ease-out bg-white border border-gray-100 place-self-center min-w-[95%] flex flex-col p-3 gap-1 rounded-lg max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden`}>
          <li className="flex gap-1">
            <input onChange={e => setNewMethodInput(e.target.value.trim())} placeholder="Add new method" type="text" className="flex-1 py-1 px-3 text-[0.8rem] rounded-[100px] bg-white border-2 border-gray-300 hover:border-[#449eec] focus-visible:outline-[#449eec]"/>
            <button onClick={() => {onBrewingMethodSelected(newMethodInput); setExpanded(false)}} className="text-[0.8rem] aspect-square bg-[#283846] rounded-[50%] px-2 hover:bg-[#464f55] hover:cursor-pointer text-white">
              OK
            </button>
          </li>
          {methodsData.map((method, index) => 
            <li key={index} onClick={() => {onBrewingMethodSelected(method); setExpanded(false)}} className="p-1.5 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">
              {method}
            </li>)}
        </ul>
      </div>
    </div>
  )
}