import image_coffee from "../assets/image_coffee.png";
import image_water from "../assets/image_water.png";
import icon_rating_on from "../assets/icon_rating_on.svg"
import type { BrewItemProps } from "../prop_types";

export default function BrewItem({brew, setShowPopup, setClickedItem}: BrewItemProps) {
  return (
    <li onClick={() => {setClickedItem(brew.brew_id); setShowPopup(true)}} className="flex border-t border-gray-300 py-3 gap-3 items-center hover:cursor-pointer hover:bg-[#f0f0f0]">
      <div className="grid grid-cols-1 grid-rows-1 size-9">
        <img className="col-start-1 row-start-1 place-self-center" src={icon_rating_on}/>
        <p className="col-start-1 row-start-1 text-[0.8rem] place-self-center text-black font-semibold">{brew.rating}</p>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="size-fit font-bold">{brew.beans_used}</p>
        <div className="flex gap-2">
          <p className="px-3 py-1 text-[0.7rem] flex border-2 border-gray-300 rounded-[100px]">{brew.brewing_method}</p>
          <div className="px-3 py-1 border-2 border-gray-300 rounded-[100px] flex justify-center gap-1 items-center">
            <img src={image_coffee} className="size-3.5"/>
            <p className="text-[0.7rem]">{brew.coffee_content}<span>g</span></p>
          </div>
          <div className="px-3 py-1 border-2 border-gray-300 rounded-[100px] flex justify-center gap-1 items-center">
            <img src={image_water} className="size-2.5"/>
            <p className="text-[0.7rem]">{brew.water_content}<span>g</span></p>
          </div>
        </div>
      </div>
    </li>
  )
}