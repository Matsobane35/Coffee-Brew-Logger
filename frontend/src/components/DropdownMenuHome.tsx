import type { DropdownProps } from "../prop_types";

export default function DropdownMenuHome(
  {methodsData, brewingMethod, expanded, setExpanded, onBrewingMethodSelected}: DropdownProps
) {
  return (
    <div className="flex flex-col relative z-5">
      <div onClick={() => setExpanded(!expanded)} className={`z-5 ${expanded ? "outline-2" : "outline-none"} outline-[#449eec] -outline-offset-2 bg-white flex items-center justify-between border-gray-500 border-2 rounded-[100px] px-3 py-1.5 hover:border-[#449eec] hover:cursor-pointer`}>
        <p className="text-[0.9rem] text-black line-clamp-1">
          {brewingMethod ? `${brewingMethod} (${methodsData.filter(method => method === brewingMethod).length})` : "- All brewing methods -"}
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
        <ul className={`${expanded ? "translate-y-[calc(100%+4px)] shadow-md" : `translate-y-0 shadow-[0px]`} absolute bottom-0 transition-transform duration-300 ease-out bg-white border border-gray-100 place-self-center min-w-[95%] flex flex-col p-3 gap-1 rounded-lg max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden`}>
          <li onClick={() => {onBrewingMethodSelected(""); setExpanded(false)}} className="p-1.5 text-[0.8rem] text-gray-500 w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">
              - All brewing methods -
          </li>
          {/* Use Set() to get a list of distinct brewing methods for filtering */}
          {[...new Set(methodsData)].map((method, index) => 
            <li key={index} onClick={() => {onBrewingMethodSelected(method); setExpanded(false)}} className="p-1.5 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">
              {method}
            </li>)}
        </ul>
      </div>
    </div>
  )
}