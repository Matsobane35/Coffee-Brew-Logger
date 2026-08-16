import type { Brew } from "./data/data"

export interface BrewItemProps {
  brew: Brew
  setShowForm: (showPopup: boolean) => void
  setClickedItem: (itemId: number) => void
}

export interface AddEditProps {
  brew: Brew
  methodsData: string[]
  setShowForm: (showPopup: boolean) => void
  onAdded: (brew: Brew) => void
  onEdited: (brew: Brew) => void
  onDeleted: (brew: Brew) => void
}

export interface DropdownProps {
  methodsData: string[]
  brewingMethod: string
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  animateMenuDown: boolean
  setAnimateMenuDown: (animateDown: boolean) => void
  onBrewingMethodSelected: (value: string) => void
  methodValidation?: boolean
}