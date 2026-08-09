import { X } from "lucide-react";
import DropdownMenuForm from "./DropdownMenuForm";
import { dummyBrew } from "../data/data";
import icon_rating_on from "../assets/icon_rating_on.svg"
import icon_rating_off from "../assets/icon_rating_off.svg"
import { useState } from "react";
import type { AddEditProps } from "../prop_types";

export default function AddEditForm(
  { brew, methodsData, setShowPopup, onAdded, onEdited, onDeleted } : AddEditProps
) {

  /* When the user clicks the number of stars already selected, the selection clears */
  function updateRatingIcons(indexClicked: number) {
    setRatingIcons(indexClicked + 1 === ratingIcons.filter(icon => icon === icon_rating_on).length ? Array(5).fill(icon_rating_off) : 
    [...Array(indexClicked + 1).fill(icon_rating_on), ...Array(4 - indexClicked).fill(icon_rating_off)])
  }

  const [expanded, setExpanded] = useState(false)

  const [beansInput, setBeansInput] = useState(brew.beans_used)
  const [methodInput, setMethodInput] = useState(brew.brewing_method)
  const [coffeeGramsInput, setCoffeeGramsInput] = useState(brew.coffee_content)
  const [waterGramsInput, setWaterGramsInput] = useState(brew.water_content)
  const [notesInput, setNotesInput] = useState(brew.notes)
  const [ratingIcons, setRatingIcons] = useState([...Array(brew.rating).fill(icon_rating_on), ...Array(5 - brew.rating).fill(icon_rating_off)])

  const newBrew = { ...dummyBrew,
    brew_id: brew.brew_id,
    beans_used: beansInput,
    brewing_method: methodInput,
    coffee_content: coffeeGramsInput,
    water_content: waterGramsInput,
    rating: ratingIcons.filter(icon => icon === icon_rating_on).length,
    notes: notesInput
  }

  function isInvalidEntry(): string {
    if (!beansInput.trim()) {
      return "Please enter a valid name for 'Beans'"
    }
    else if (!methodInput) {
      return "Please enter/select a valid name for 'Brewing method'"
    }
    else if (!coffeeGramsInput || 
      !(parseInt(coffeeGramsInput) >= parseInt(`${1}${"0".repeat(coffeeGramsInput.length-1)}`) && 
      parseInt(coffeeGramsInput) <= parseInt(`${9}${"9".repeat(coffeeGramsInput.length-1)}`))
    ) {
      return "Please enter a valid, positive whole number for 'Coffee (grams)'"
    }
    else if (!waterGramsInput || 
      !(parseInt(waterGramsInput) >= parseInt(`${1}${"0".repeat(waterGramsInput.length-1)}`) && 
      parseInt(waterGramsInput) <= parseInt(`${9}${"9".repeat(waterGramsInput.length-1)}`))
    ) {
      return "Please enter a valid, positive whole number for 'Water (grams)'"
    }
    return ""
  }

  return (
    <div onClick={() => setShowPopup(false)} className="flex items-center justify-center fixed bg-black/40 w-screen min-h-screen z-20">
      <div onClick={e => e.stopPropagation()} className="px-5 pb-5 h-fit w-screen max-w-125 flex flex-col rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between py-5">
          <p className="size-fit text-black text-[1.5rem]">{brew.beans_used.trim() ? "Edit brew" : "Add a brew"}</p>
          <button onClick={() => setShowPopup(false)}>
            <X size={32} className="text-black p-1.5 rounded-md hover:bg-gray-200 hover:cursor-pointer"/>
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-[0.9rem]">Beans<sup>*</sup></p>
          <input onChange={e => setBeansInput(e.target.value)} value={beansInput} className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-[#449eec]"/>
          <p className="text-[0.9rem] mt-2">Brewing method<sup>*</sup></p>
          <DropdownMenuForm
          expanded = {expanded}
          setExpanded={setExpanded}
          brewingMethod={methodInput} 
          methodsData={methodsData} 
          onBrewingMethodSelected={setMethodInput}/>
          <div className="flex items-center justify-between gap-3 mt-2">
            <div className="flex flex-col flex-1">
              <p className="text-[0.9rem]">Coffee (grams)<sup>*</sup></p>
              <input onChange={e => setCoffeeGramsInput(e.target.value.trim())} value={coffeeGramsInput} className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-[#449eec]"/>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-[0.9rem]">Water (grams)<sup>*</sup></p>
              <input onChange={e => setWaterGramsInput(e.target.value.trim())} value={waterGramsInput} className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-[#449eec]"/>
            </div>
          </div>
          <p className="text-[0.9rem] mt-2">Tasting notes</p>
          <input onChange={e => setNotesInput(e.target.value)} value={notesInput} type="text" className="border border-gray-300 rounded-md text-[0.9rem] py-1 px-2 w-full hover:border-[#449eec]"/>
          <p className="text-[0.9rem] mt-4 place-self-center">Select a rating</p>
          <div className="flex w-fit gap-2 place-self-center mt-0.5">
            {ratingIcons.map((icon, index) => <img onClick={() => updateRatingIcons(index)} key={index} src={icon} className="size-8 hover:cursor-pointer hover:scale-[120%] transition-transform duration-150 ease-out"/>)}
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          {brew.beans_used.trim() && <button onClick={() => {onDeleted(brew); setShowPopup(false)}} className="px-6 py-1.5 text-[0.7rem] bg-red-800 rounded-[100px] text-white hover:bg-red-500 hover:cursor-pointer">
            Delete
          </button>}
          <button onClick={() => {
            isInvalidEntry() ? alert(isInvalidEntry()) : 
            brew.brew_id > 0 ? 
            onEdited({
              brew_id: newBrew.brew_id,
              beans_used: newBrew.beans_used.trim(),
              brewing_method: newBrew.brewing_method.trim(),
              coffee_content: newBrew.coffee_content.trim(),
              water_content: newBrew.water_content.trim(),
              rating: newBrew.rating,
              notes: newBrew.notes.trim()
            }) : 
            onAdded({
              brew_id: newBrew.brew_id,
              beans_used: newBrew.beans_used.trim(),
              brewing_method: newBrew.brewing_method.trim(),
              coffee_content: newBrew.coffee_content.trim(),
              water_content: newBrew.water_content.trim(),
              rating: newBrew.rating,
              notes: newBrew.notes.trim()
            });
            !isInvalidEntry() && setShowPopup(false)
            }} className="px-6 py-1.5 text-[0.7rem] bg-black rounded-[100px] text-white hover:bg-gray-800 hover:cursor-pointer">
            Save
          </button>
        </div>
      </div>
      {expanded && <div onClick={e => {setExpanded(false); e.stopPropagation()}} className="h-screen w-screen fixed z-15"></div>}
    </div>
  )
}