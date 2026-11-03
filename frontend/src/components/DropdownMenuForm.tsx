import { useState } from "react";
import type { DropdownProps } from "../prop_types";

export default function DropdownMenuForm(
  {
    methodsData, 
    brewingMethod, 
    expanded, 
    setExpanded, 
    animateMenuDown,
    setAnimateMenuDown,
    onBrewingMethodSelected, 
    methodValidation
  }: DropdownProps) {

  const [newMethodInput, setNewMethodInput] = useState("")

  return (
    <div className="flex flex-col relative z-30">
      <div onClick={() => {setAnimateMenuDown(!animateMenuDown); if (!expanded) setExpanded(true)}} className={`z-5 ${animateMenuDown ? "outline-2" : "outline-none"} ${methodValidation ? "border-[#d1d5dc] hover:border-[#449eec]" : "animate-red-flash border-[#ff6666] hover:border-[#ff6666]"} outline-[#449eec] -outline-offset-2 bg-white flex border rounded-lg items-center justify-between h-9.5 px-2.5 sm:h-8.5 sm:px-2 w-full hover:cursor-pointer`}>
        <p className={`${brewingMethod ? "text-black" : "text-gray-400"} text-[0.95rem] line-clamp-1`}>
          {brewingMethod ? brewingMethod : "Select brewing method"}
        </p>
        <svg className="min-h-4 sm:min-h-3 min-w-4 sm:min-w-3" xmlns="http://w3.org" viewBox="0 0 24 24" width="1rem" height="1rem">
          <g className={`${animateMenuDown ? "translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`}>
            <path d="M4,8 l8,8" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className={`${animateMenuDown ? "-translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`}>
            <path d="M12,16 l8,-8" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
      <div className="absolute mt-1 w-full h-[calc(100%-4px)] [clip-path:inset(0px_0px_-216px_0px)]">
        {expanded && <ul 
          onAnimationEnd={e => {if (e.animationName === "menu-slide-up") setExpanded(animateMenuDown)}} 
          className={`${animateMenuDown ? "animate-menu-slide-down" : "animate-menu-slide-up"} absolute bottom-0 shadow-md bg-white border border-gray-100 place-self-center min-w-[95%] flex flex-col p-3 gap-1 rounded-xl max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden`}>
          <li className="flex gap-1">
            <input onChange={e => setNewMethodInput(e.target.value.trim())} placeholder="Add new method" type="text" className="flex-1 h-9 sm:h-8 px-3 text-[0.8rem] rounded-[100px] bg-white border-2 border-gray-300 hover:border-[#449eec] focus-visible:outline-[#449eec]"/>
            <button onClick={() => {onBrewingMethodSelected(newMethodInput); setAnimateMenuDown(false)}} className="h-9 sm:h-8 text-[0.8rem] aspect-square bg-[#283846] rounded-[50%] hover:bg-[#464f55] hover:cursor-pointer text-white">
              OK
            </button>
          </li>
          {methodsData.map((method, index) => 
            <li key={index} onClick={() => {onBrewingMethodSelected(method); setAnimateMenuDown(false); setNewMethodInput(method)}}>
              <p className="flex items-center h-9 sm:h-8 px-2 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">{method}</p>
            </li>)}
        </ul>}
      </div>
    </div>
  )
}