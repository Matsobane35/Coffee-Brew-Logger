import image_coffee from "../assets/image_coffee.png";
import image_water from "../assets/image_water.png";
import { ratingColours } from "../data/data";
import type { BrewItemProps } from "../prop_types";

export default function BrewItem({brew, setShowForm, setClickedItem}: BrewItemProps) {
  return (
    <li onClick={() => {setClickedItem(brew.brew_id); setShowForm(true)}} className="flex border border-gray-300 sm:py-3 px-2.5 py-3.5 gap-2.5 items-center rounded-2xl mb-2 hover:cursor-pointer hover:bg-[#f0f0f0]">
      <div className="relative size-8 flex items-center justify-center">
        <svg className="size-full" xmlns="http://w3.org" viewBox="0 0 24 24">
          <path d="M8.22,7.7 l3.11,-5.455 a0.75,0.75 0,0 1,1.34 0 l3.11,5.455 l6.18,1.29 a0.75,0.75 0,0 1,0.4 1.26 l-4.24,4.66 l0.69,6.25 a0.75,0.75 0,0 1,-1.1 0.77 l-5.71,-2.575 l-5.71,2.575 a0.75,0.75 0,0 1,-1.1 -0.77 l0.69,-6.25 l-4.24,-4.66 a0.75,0.75 0,0 1,0.4 -1.26 l6.18,-1.29" fill={`${ratingColours[brew.rating]}`} stroke={`${ratingColours[brew.rating]}`} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="absolute text-[0.8rem] text-black font-semibold">{brew.rating}</p>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="line-clamp-1 font-bold">{brew.beans_used}</p>
        <div className="flex items-center gap-1 bg-[#eeeeee] rounded-[100px] w-fit py-1.5 px-3 border-2 border-white">
          <p className="line-clamp-1 text-[0.75rem]">{brew.brewing_method}</p>
          <svg xmlns="http://w3.org" viewBox="0 0 24 24" height="16"><path d="M12,2 v20" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
          <div className="flex justify-center gap-1 items-center">
            <img src={image_coffee} className="size-3.5"/>
            <p className="line-clamp-1 text-[0.75rem]">{brew.coffee_content}<span>g</span></p>
          </div>
          <svg xmlns="http://w3.org" viewBox="0 0 24 24" height="16"><path d="M12,2 v20" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
          <div className="flex justify-center gap-1 items-center">
            <img src={image_water} className="size-2.5"/>
            <p className="line-clamp-1 text-[0.75rem]">{brew.water_content}<span>g</span></p>
          </div>
          {/* I omitted the edit icon because clicking the whole item achieves the same result */}
        </div>
      </div>
    </li>
  )
}