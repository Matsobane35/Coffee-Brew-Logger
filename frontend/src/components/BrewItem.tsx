import image_coffee from "../assets/image_coffee.png";
import image_water from "../assets/image_water.png";
import icon_rating_on from "../assets/icon_rating_on.svg"
import type { BrewItemProps } from "../prop_types";

export default function BrewItem({brew, setShowPopup, setClickedItem}: BrewItemProps) {
  return (
    <li onClick={() => {setClickedItem(brew.brew_id); setShowPopup(true)}} className="flex border-t border-gray-300 py-3 gap-3 items-center hover:cursor-pointer hover:bg-[#f0f0f0]">
      <div className="relative size-8 flex items-center justify-center">
        <img className="size-full" src={icon_rating_on}/>
        <p className="absolute text-[0.8rem] text-black font-semibold">{brew.rating}</p>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="line-clamp-1 font-bold">{brew.beans_used}</p>
        <div className="flex gap-2">
          <p className="line-clamp-1 px-2.5 py-1 text-[0.7rem] border-2 border-gray-300 rounded-[100px] one-line">{brew.brewing_method}</p>
          <div className="px-2.5 py-1 border-2 border-gray-300 rounded-[100px] flex justify-center gap-1 items-center">
            <img src={image_coffee} className="size-3.5"/>
            <p className="text-[0.7rem]">{brew.coffee_content}<span>g</span></p>
          </div>
          <div className="px-2.5 py-1 border-2 border-gray-300 rounded-[100px] flex justify-center gap-1 items-center">
            <img src={image_water} className="size-2.5"/>
            <p className="text-[0.7rem]">{brew.water_content}<span>g</span></p>
          </div>
          {/* I omitted the edit icon because clicking the whole item achieves the same result */}
        </div>
      </div>
    </li>
  )
}