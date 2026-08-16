import { X, XCircle } from "lucide-react";
import DropdownMenuForm from "./DropdownMenuForm";
import { dummyBrew, type Brew } from "../data/data";
import icon_rating_on from "../assets/icon_rating_on.svg"
import icon_rating_off from "../assets/icon_rating_off.svg"
import { useState } from "react";
import type { AddEditProps } from "../prop_types";
import { trimAll, validateEntries, validInteger } from "../functions";

export default function AddEditForm(
  { brew, methodsData, setShowForm, onAdded, onEdited, onDeleted } : AddEditProps
) {

  const [dropdownExpanded, setDropdownExpanded] = useState(false)
  const [animateMenuDown, setAnimateMenuDown] = useState(false)
  const [beansInput, setBeansInput] = useState(brew.beans_used)
  const [methodInput, setMethodInput] = useState(brew.brewing_method)
  const [coffeeGramsInput, setCoffeeGramsInput] = useState(brew.coffee_content)
  const [waterGramsInput, setWaterGramsInput] = useState(brew.water_content)
  const [notesInput, setNotesInput] = useState(brew.notes)
  const [ratingIcons, setRatingIcons] = useState([...Array(brew.rating).fill(icon_rating_on), ...Array(5 - brew.rating).fill(icon_rating_off)])
  const [animateFormIn, setAnimateFormIn] = useState(true)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const newBrew: Brew = { ...dummyBrew,
    brew_id: brew.brew_id,
    beans_used: beansInput.trim(),
    brewing_method: methodInput.trim(),
    coffee_content: coffeeGramsInput.trim(),
    water_content: waterGramsInput.trim(),
    rating: ratingIcons.filter(icon => icon === icon_rating_on).length,
    notes: notesInput.trim()
  }
  
  const [requiredFields, setRequiredFields] = useState([newBrew.beans_used.trim().length > 0, newBrew.brewing_method.trim().length > 0, validInteger(newBrew.coffee_content), validInteger(newBrew.water_content)])

  function handleMethodSelection(newMethod: string) {
    setMethodInput(newMethod)
    requiredFields[1] = newMethod.length > 0
  }

  function updateRatingIcons(indexClicked: number) {
    setRatingIcons([...Array(indexClicked + 1).fill(icon_rating_on), ...Array(4 - indexClicked).fill(icon_rating_off)])
  }

  return (
    <div onAnimationEnd={(e) => {if (e.animationName === "form-slide-out") setShowForm(false)}} className={`${animateFormIn ? "animate-form-slide-in" : "animate-form-slide-out"} flex items-center justify-center fixed bg-white w-screen min-h-screen z-20`}>
      <div onClick={e => e.stopPropagation()} className="px-5 min-h-screen w-screen max-w-125 flex flex-col bg-white relative">
        <div className="z-5 px-5 h-18 absolute w-full top-0 left-0 flex items-center justify-between">
          <p className="size-fit text-black text-[1.5rem] line-clamp-1">{brew.beans_used.trim() ? "Edit brew" : "Add a brew"}</p>
          <button onClick={() => setAnimateFormIn(false)}>
            <X size={32} className="text-black p-1.5 rounded-[50%] hover:bg-[#eaeaea] hover:cursor-pointer"/>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="h-18"/>
          <p className="text-[0.9rem]">Beans<sup>*</sup></p>
          <input 
            value={beansInput}
            onChange={e => {setBeansInput(e.target.value); requiredFields[0] = e.target.value.trim().length > 0}} 
            className={`${requiredFields[0] || !showErrorMessage ? "border-[#d1d5dc] hover:border-[#449eec]" : "animate-red-flash border-[#ff6666] hover:border-[#ff6666]"} sm:py-1 sm:px-2 form-input-field`}/>
          <p className="text-[0.9rem] mt-2">Brewing method<sup>*</sup></p>
          <DropdownMenuForm
          expanded={dropdownExpanded}
          setExpanded={setDropdownExpanded}
          animateMenuDown={animateMenuDown}
          setAnimateMenuDown={setAnimateMenuDown}
          brewingMethod={methodInput} 
          methodsData={methodsData} 
          onBrewingMethodSelected={handleMethodSelection}
          methodValidation={requiredFields[1] || !showErrorMessage}/>
          <div className="flex items-center justify-between gap-3 mt-2">
            <div className="flex flex-col flex-1">
              <p className="text-[0.9rem] line-clamp-1">Coffee (grams)<sup>*</sup></p>
              <input 
                value={coffeeGramsInput}
                onChange={e => {setCoffeeGramsInput(e.target.value.trim()); requiredFields[2] = validInteger(e.target.value.trim())}} 
                className={`${requiredFields[2] || !showErrorMessage ? "border-[#d1d5dc] hover:border-[#449eec]" : "animate-red-flash border-[#ff6666] hover:border-[#ff6666]"} sm:py-1 sm:px-2 form-input-field`}/>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-[0.9rem] line-clamp-1">Water (grams)<sup>*</sup></p>
              <input 
                value={waterGramsInput}
                onChange={e => {setWaterGramsInput(e.target.value.trim()); requiredFields[3] = validInteger(e.target.value.trim())}}  
                className={`${requiredFields[3] || !showErrorMessage ? "border-[#d1d5dc] hover:border-[#449eec]" : "animate-red-flash border-[#ff6666] hover:border-[#ff6666]"} sm:py-1 sm:px-2 form-input-field`}/>
            </div>
          </div>
          <p className="text-[0.9rem] mt-2">Tasting notes</p>
          <input 
            value={notesInput}
            onChange={e => setNotesInput(e.target.value)}  
            className="sm:py-1 sm:px-2 form-input-field border-[#d1d5dc] hover:border-[#449eec]"/>
          <p className="text-[0.9rem] mt-2">Select a rating</p>
          <div className="flex w-fit gap-2">
            {ratingIcons.map((icon, index) => <img onClick={() => updateRatingIcons(index)} key={index} src={icon} className="size-8 hover:cursor-pointer hover:scale-[120%] transition-transform duration-150 ease-out"/>)}
          </div>
          <div className="h-40"/>
        </div>
        <div className="z-5 absolute left-0 bottom-0 w-full flex flex-col pb-4 px-4">
          {showErrorMessage && (!requiredFields[0] || !requiredFields[1] || !requiredFields[2] || !requiredFields[3]) && <div className="flex items-center bg-[#ff0000]/20 rounded-[100px] p-3 mb-5">
            <XCircle size={18} color="#ff2525"/>
            <p className="flex-1 py-2 text-[#ff2525] font-semibold text-xs mx-2 text-nowrap overflow-x-auto custom-scrollbar">
              {validateEntries(beansInput, methodInput, coffeeGramsInput, waterGramsInput)[1]}
            </p>
          </div>}
          <div className="flex gap-2">
            {brew.beans_used.trim() && <button onClick={() => {onDeleted(brew); setAnimateFormIn(false)}} className="px-6 py-1.5 sm:text-[0.7rem] text-[0.75rem] bg-red-800 rounded-[100px] text-white hover:bg-red-500 hover:cursor-pointer">
              Delete
            </button>}
            <button onClick={() => {
              validateEntries(beansInput, methodInput, coffeeGramsInput, waterGramsInput)[1] ? 
              (setRequiredFields(validateEntries(beansInput, methodInput, coffeeGramsInput, waterGramsInput)[0] as boolean[]), setShowErrorMessage(true)) : 
              brew.brew_id > 0 ? onEdited(trimAll(newBrew)) : onAdded(trimAll(newBrew));
              !validateEntries(beansInput, methodInput, coffeeGramsInput, waterGramsInput)[1] && setAnimateFormIn(false)
              }} className="px-6 py-1.5 sm:text-[0.7rem] text-[0.75rem] bg-black rounded-[100px] text-white hover:bg-gray-800 hover:cursor-pointer">
              Save
            </button>
            <button onClick={() => setAnimateFormIn(false)} className="px-6 py-1.5 sm:text-[0.7rem] text-[0.75rem] border-2 border-black bg-white rounded-[100px] text-black hover:bg-gray-500 hover:border-gray-500 hover:cursor-pointer ml-auto">
              Cancel
            </button>
          </div>
        </div>
      </div>
      {dropdownExpanded && <div onClick={e => {setAnimateMenuDown(false); e.stopPropagation()}} className="h-screen w-screen fixed z-15"></div>}
    </div>
  )
}