import { useEffect, useState } from "react"
import BrewItem from "./components/BrewItem"
import DropdownMenuHome from "./components/DropdownMenuHome"
import { dummyBrew, type Brew } from "./data/data"
import AddEditForm from "./components/AddEditForm"
import { toast, Toaster } from "react-hot-toast"

function App() {

  // Set the maximum number of items shown on each page
  const pageLimit = 30
  const backendPort = 5000

  const [brewData, setBrewData] = useState<Brew[]>([])

	useEffect(() => {
		async function getCoffeeData() {
			const response = await fetch(`http://localhost:${backendPort}/brews`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			})
			const retrievedBrewData: Brew[] = await response.json()
			setBrewData(retrievedBrewData)
			setMethodsData(retrievedBrewData.map(brew => brew.brewing_method))
			setNextId(Math.max(...retrievedBrewData.map(brew => brew.brew_id), 0) + 1)
		}
		getCoffeeData()
	}, [])

	const [clickedItem, setClickedItem] = useState(dummyBrew)
	const [showPopup, setShowPopup] = useState(false)
	const [nextId, setNextId] = useState(Math.max(...brewData.map(brew => brew.brew_id), 0) + 1)
	const [methodsData, setMethodsData] = useState(brewData.map(brew => brew.brewing_method))
	const [methodToFilter, setMethodToFilter] = useState("")
	const [dropdownExpanded, setDropdownExpanded] = useState(false)

	const [itemToInsert, setItemToInsert] = useState(dummyBrew)
	const [itemToUpdate, setItemToUpdate] = useState(dummyBrew)
	const [itemToDelete, setItemToDelete] = useState(dummyBrew)
	const [trackInsertChanges, setTrackInsertChanges] = useState(false)
	const [trackUpdateChanges, setTrackUpdateChanges] = useState(false)
	const [trackDeleteChanges, setTrackDeleteChanges] = useState(false)

	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		if (trackInsertChanges) {
			async function insertIntoDB() {
				const result = await fetch(`http://localhost:${backendPort}/brews/:${itemToInsert.brew_id}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(itemToInsert)
				})
        showToaster(result, "added", 4000)
			}
			insertIntoDB()
		}
		else { setTrackInsertChanges(true); return }
	}, [itemToInsert])

	useEffect(() => {
		if (trackUpdateChanges) {
			async function updateInDB() {
				const result = await fetch(`http://localhost:${backendPort}/brews/:${itemToUpdate.brew_id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(itemToUpdate)
				})
        showToaster(result, "updated", 4000)
			}
			updateInDB()
		}
		else { setTrackUpdateChanges(true) }
	}, [itemToUpdate])

	useEffect(() => {
		if (trackDeleteChanges) {
			async function deleteFromDB() {
				const result = await fetch(`http://localhost:${backendPort}/brews/:${itemToDelete.brew_id}`, {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(itemToDelete.brew_id)
				})
        showToaster(result, "deleted", 4000)
			}
			deleteFromDB()
		}
		else { setTrackDeleteChanges(true) }
	}, [itemToDelete])

	function onBrewAdded(newBrew: Brew) {
		setBrewData(oldData => [...oldData, { ...newBrew, brew_id: nextId }])
		setItemToInsert({ ...newBrew, brew_id: nextId })
		setMethodsData(oldData => [...oldData, newBrew.brewing_method])
		setMethodToFilter("")
		setCurrentPage(0)
		setNextId(previousId => previousId + 1)
	}

	function onBrewEdited(newBrew: Brew) {
		setBrewData(oldData => oldData.map(brew => brew.brew_id === newBrew.brew_id ? newBrew : brew))
		setMethodsData(oldData => oldData.toSpliced(oldData.indexOf(clickedItem.brewing_method), 1, newBrew.brewing_method))
		setItemToUpdate(newBrew)
	}

	function onBrewDeleted(deletedBrew: Brew) {
		setBrewData(oldData => oldData.filter(brew => brew.brew_id !== deletedBrew.brew_id))
		setMethodsData(oldData => oldData.toSpliced(oldData.indexOf(deletedBrew.brewing_method), 1))
		setItemToDelete(deletedBrew)
		setMethodToFilter("")
		setCurrentPage(0)
	}

	function setNewClickedItem(itemId: number) {
		setClickedItem(brewData.filter(brew => brew.brew_id === itemId)[0])
	}

  function showToaster(result: Response, action: string, length: number) {
    if (result.status === 201) {
      toast.success(`Brew successfully ${action}!`, {duration: length})
    }
    else {
      toast.error(`Brew could not be ${action}. Please try again.`, {duration: length})
    }
  }
  
  document.title = `Brews: ${brewData.length}`

  return (
    <div className="px-3 min-h-screen flex flex-col items-center min-w-fit">
      <Toaster position="top-center"/>
      <div className="bg-white flex flex-col gap-4 fixed top-0 w-full px-3 h-32 max-w-200 z-15">
        <div className="flex pt-6 items-center justify-between">
          <p className="text-[1.5rem]">Brew log</p>
          <button onClick={() => { setShowPopup(true), setClickedItem(dummyBrew) }} className="text-white text-[0.8rem] h-fit w-fit py-1.5 px-8 bg-black hover:cursor-pointer hover:bg-[#283846] rounded-[100px]">Add</button>
        </div>
        {dropdownExpanded && <div onClick={() => setDropdownExpanded(false)} className="fixed h-32 w-full left-0 top-0"/>}
        <DropdownMenuHome
          expanded={dropdownExpanded}
					setExpanded={setDropdownExpanded}
					brewingMethod={methodToFilter}
					methodsData={[...new Set(methodsData)]}
					onBrewingMethodSelected={setMethodToFilter} />
      </div>
      <ul className="flex-1 w-full max-w-200">
        <li className="h-32" />
        {(methodToFilter ? brewData.filter(brew => brew.brewing_method === methodToFilter) : brewData.slice(currentPage * pageLimit, (currentPage * pageLimit) + pageLimit)).map(brew =>
          <BrewItem
          key={brew.brew_id}
          brew={brew}
          setShowPopup={setShowPopup}
          setClickedItem={setNewClickedItem} />
        )}
        <li className="h-fit py-4 border-t border-gray-300"><p className="text-[0.8rem] w-6 h-6" /></li>
      </ul>
      {brewData.length > pageLimit && !methodToFilter && <div className="z-5 fixed left-0 bottom-0 bg-black/30 w-full h-fit py-4 px-12 overflow-x-scroll scrollbar-none">
				<div className="flex gap-2 items-center justify-center">
					{Array(Math.floor((brewData.length - 1) / pageLimit) + 1).fill('').map((_, index) => 
            <p
            key={index}
            onClick={() => { if (index !== currentPage) setCurrentPage(index) }}
            className={`${index === currentPage ? "bg-[#111d27] text-white" : "bg-gray-200 hover:bg-gray-400 hover:cursor-pointer text-black"} text-[0.8rem] text-center w-6 h-6 rounded-md pt-0.5`}>
            {index + 1}
            </p>)}
				</div>
			</div>}
			{dropdownExpanded && <div onClick={() => setDropdownExpanded(false)} className="h-screen w-screen fixed z-10"></div>}
			{showPopup && 
        <AddEditForm
        methodsData={[...new Set(methodsData)]}
        brew={clickedItem}
        setShowPopup={setShowPopup}
        onAdded={onBrewAdded}
        onEdited={onBrewEdited}
        onDeleted={onBrewDeleted} />}
    </div>
  )
}

export default App
