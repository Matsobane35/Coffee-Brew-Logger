import { useEffect, useState } from "react"
import BrewItem from "./components/BrewItem"
import DropdownMenuHome from "./components/DropdownMenuHome"
import { dummyBrew, type Brew } from "./data/data"
import AddEditForm from "./components/AddEditForm"
import { toast, Toaster } from "react-hot-toast"

function App() {

  // Separate data into pages and only render one page at a time to boost performance
  // in case there are a lot of records in the database. Page numbers will appear on the footer 
  // only when the data size exceeds the page limit
  const pageLimit = 30
  const serverPort = 5000

  const [brewData, setBrewData] = useState<Brew[]>([])

  // Retrieving data from the database on initial app start
	useEffect(() => {
		async function getCoffeeData() {
			const response = await fetch(`http://localhost:${serverPort}/brews`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }  // Headers are necessary for preflight CORS verification
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

  // I could've used useRef() here for variables that are used to update the database
  // but it was behaving unreliably on initial app start
	const [itemToInsert, setItemToInsert] = useState(dummyBrew)
	const [itemToUpdate, setItemToUpdate] = useState(dummyBrew)
	const [itemToDelete, setItemToDelete] = useState(dummyBrew)
	const [trackInsertChanges, setTrackInsertChanges] = useState(false)
	const [trackUpdateChanges, setTrackUpdateChanges] = useState(false)
	const [trackDeleteChanges, setTrackDeleteChanges] = useState(false)

	const [currentPage, setCurrentPage] = useState(0)

  // For performing INSERT operations on the database
	useEffect(() => {
		if (trackInsertChanges) {
			async function insertIntoDB() {
				const result = await fetch(`http://localhost:${serverPort}/brews/:${itemToInsert.brew_id}`, {
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

  // For performing UPDATE operations on the database
	useEffect(() => {
		if (trackUpdateChanges) {
			async function updateInDB() {
				const result = await fetch(`http://localhost:${serverPort}/brews/:${itemToUpdate.brew_id}`, {
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

  // For performing DELETE operations on the database
	useEffect(() => {
		if (trackDeleteChanges) {
			async function deleteFromDB() {
				const result = await fetch(`http://localhost:${serverPort}/brews/:${itemToDelete.brew_id}`, {
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

  // Executed only after successful validation of input fields from the form
	function onBrewAdded(newBrew: Brew) {
		setBrewData(oldData => [...oldData, { ...newBrew, brew_id: nextId }])
		setItemToInsert({ ...newBrew, brew_id: nextId })
		setMethodsData(oldData => [...oldData, newBrew.brewing_method])
		setMethodToFilter("")
		setCurrentPage(0)
		setNextId(previousId => previousId + 1)
	}

  // Executed only after successful validation of input fields from the form
	function onBrewEdited(newBrew: Brew) {
		setBrewData(oldData => oldData.map(brew => brew.brew_id === newBrew.brew_id ? newBrew : brew))
		setMethodsData(oldData => oldData.toSpliced(oldData.indexOf(clickedItem.brewing_method), 1, newBrew.brewing_method))
		setItemToUpdate(newBrew)
	}

  // Executed only after clicking 'delete' on the form
	function onBrewDeleted(deletedBrew: Brew) {
		setBrewData(oldData => oldData.filter(brew => brew.brew_id !== deletedBrew.brew_id))
		setMethodsData(oldData => oldData.toSpliced(oldData.indexOf(deletedBrew.brewing_method), 1))
		setItemToDelete(deletedBrew)
		setMethodToFilter("")
		setCurrentPage(0)
	}

  // To identify the item to send to the form for editing/deleting
	function setNewClickedItem(itemId: number) {
		setClickedItem(brewData.filter(brew => brew.brew_id === itemId)[0])
	}

  // Displays a toaster showing the success status of CRUD operations based on the returned status code
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
      {/* This toaster displays the success status of CRUD operations */}
      <Toaster position="top-center"/>
      <div className="bg-white flex flex-col gap-3.5 fixed top-0 w-full px-3 h-32 max-w-200 z-15">
        <div className="flex pt-6 items-center justify-between">
          <p className="text-[1.5rem]">Brew log</p>
          <button onClick={() => { setShowPopup(true), setClickedItem(dummyBrew) }} className="text-white text-[0.75rem] font-semibold h-fit w-fit py-1.5 px-6 bg-black hover:cursor-pointer hover:bg-[#283846] rounded-[100px]">
            Add
          </button>
        </div>
        {/* This transparent overlay hides the 'add' button when the dropdown menu is expanded */}
        {dropdownExpanded && <div onClick={() => setDropdownExpanded(false)} className="fixed h-32 w-full left-0 top-0"/>}
        <DropdownMenuHome
          expanded={dropdownExpanded}
					setExpanded={setDropdownExpanded}
					brewingMethod={methodToFilter}
					methodsData={methodsData}
					onBrewingMethodSelected={setMethodToFilter} />
      </div>
      {/* This is the list view that displays the Brew data */}
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
      {/* This page indicator footer is scheduled to appear only when the data size exceeds the page limit */}
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
      {/* This transparent overlay hides the list items when the dropdown menu is expanded */}
			{dropdownExpanded && <div onClick={() => setDropdownExpanded(false)} className="h-screen w-screen fixed z-10"></div>}
      {/* I use Set() to get a list of distinct brewing methods for filtering */}
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
