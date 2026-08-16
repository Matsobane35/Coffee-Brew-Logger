import type { Brew } from "./data/data"

export function validateEntries(a: string, b: string, c: string, d: string): (boolean[] | string)[] {
  const validationArray = [true, true, true, true]
  const errorStringArray: string[][][] = []
  let errorString = ""
  if (!(a.trim().length > 0)) {
    validationArray[0] = false
    errorStringArray.push([["Please enter"], [" a valid name for 'Beans'"]])
  }
  if (!(b.length > 0)) {
    validationArray[1] = false
    errorStringArray.push([errorStringArray.length === 0 ? ["Please enter"] : [" and", ","], [" a valid name for 'Brewing method'"]])
  }
  if (!validInteger(c)) {
    validationArray[2] = false
    errorStringArray.push([errorStringArray.length === 0 ? ["Please enter"] : [" and", ","], [" a positive whole number for 'Coffee'"]])
  }
  if (!validInteger(d)) {
    validationArray[3] = false
    errorStringArray.push([errorStringArray.length === 0 ? ["Please enter"] : [" and", ","], [" a positive whole number for 'Water'"]])
  }
  
  if (errorStringArray) {
    for (let outerIndex = 0; outerIndex < errorStringArray.length; outerIndex++) {
      for (let innerIndex = 0; innerIndex < 2; innerIndex++) {
        errorString += errorStringArray[outerIndex][innerIndex][innerIndex === 1 || outerIndex === 0 || outerIndex === errorStringArray.length-1 ? 0 : 1]
      }
    }
  }
  return [validationArray, errorString]
}

export function trimAll(brew: Brew): Brew {
  return {
    brew_id: brew.brew_id,
    beans_used: brew.beans_used.trim(),
    brewing_method: brew.brewing_method.trim(),
    coffee_content: brew.coffee_content.trim(),
    water_content: brew.water_content.trim(),
    rating: brew.rating,
    notes: brew.notes.trim()
  }
}

export function validInteger(numString: string): boolean {
  return numString.length > 0 && 
  (parseInt(numString) >= parseInt(`${1}${"0".repeat(numString.length-1)}`) && 
  parseInt(numString) <= parseInt(`${9}${"9".repeat(numString.length-1)}`))
}