import type { DropdownProps } from "../prop_types";

export default function DropdownMenuHome(
  {
    methodsData, 
    brewingMethod, 
    expanded, 
    setExpanded, 
    animateMenuDown,
    setAnimateMenuDown,
    onBrewingMethodSelected
  }: DropdownProps) {
  return (
    <div className="flex flex-col relative z-5 w-full max-w-195">
      <div onClick={() => {setAnimateMenuDown(!animateMenuDown); if (!expanded) setExpanded(true)}} className={`z-5 ${expanded ? "outline-2" : "outline-none"} outline-[#449eec] -outline-offset-2 bg-white flex items-center justify-between border-gray-300 border-2 rounded-[100px] px-3 py-1.5 hover:border-[#449eec] hover:cursor-pointer`}>
        <p className="text-[0.9rem] text-black line-clamp-1">
          {brewingMethod ? `${brewingMethod} (${methodsData.filter(method => method === brewingMethod).length})` : "- All brewing methods -"}
        </p>
        <svg className="min-h-4 sm:min-h-3 min-w-4 sm:min-w-3" xmlns="http://w3.org" viewBox="0 0 24 24" width="1rem" height="1rem">
          <g className={`${animateMenuDown ? "translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`} id="left">
            <path d="M4,8 l8,8" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className={`${animateMenuDown ? "-translate-x-2": "translate-x-0"} transition-transform duration-300 ease-out`} id="right">
            <path d="M12,16 l8,-8" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
      <div className="absolute mt-1 w-full h-[calc(100%-4px)] [clip-path:inset(0px_0px_-216px_0px)]">
        {expanded && <ul 
          onAnimationEnd={e => {if (e.animationName === "menu-slide-up") setExpanded(animateMenuDown)}} 
          className={`${animateMenuDown ? "animate-menu-slide-down" : "animate-menu-slide-up"} absolute bottom-0 shadow-md bg-white border border-gray-100 place-self-center min-w-[95%] flex flex-col p-3 gap-1 rounded-xl max-h-50 overflow-scroll [&::-webkit-scrollbar]:hidden`}>
          <li onClick={() => {onBrewingMethodSelected(""); setAnimateMenuDown(false)}}>
            <p className="flex items-center h-9 sm:h-8 px-2 text-[0.8rem] text-gray-500 w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">- All brewing methods -</p>
          </li>
          {/* Use Set() to get a list of distinct brewing methods for filtering */}
          {[...new Set(methodsData)].map((method, index) => 
            <li key={index} onClick={() => {onBrewingMethodSelected(method); setAnimateMenuDown(false)}}>
              <p className="flex items-center h-9 sm:h-8 px-2 text-[0.8rem] w-full bg-[#f0f0f0] hover:bg-[#283846] rounded-md hover:text-white hover:cursor-pointer">{method}</p>
            </li>)}
        </ul>}
      </div>
    </div>
  )
}