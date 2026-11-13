import { useEffect, useState } from "react"
import BrewItem from "./components/BrewItem"
import DropdownMenuHome from "./components/DropdownMenuHome"
import { dummyBrew, type Brew } from "./data/data"
import AddEditForm from "./components/AddEditForm"
import { toast, Toaster } from "react-hot-toast"
import HotCoffeeSVG from "./components/HotCoffeeSVG"

function App() {

  // Separate data into pages and only render one page at a time to boost performance
  // in case there are a lot of records in the database. 
  const pageLimit = 30
  const serverPort = 5000
  const toastDuration = 4000

  const [brewData, setBrewData] = useState<Brew[]>([])
  const [clickedItem, setClickedItem] = useState(dummyBrew)
	const [showForm, setShowForm] = useState(false)
	const [nextId, setNextId] = useState(Math.max(...brewData.map(brew => brew.brew_id), 0) + 1)
	const [methodsData, setMethodsData] = useState(brewData.map(brew => brew.brewing_method))
	const [methodToFilter, setMethodToFilter] = useState("")
	const [dropdownExpanded, setDropdownExpanded] = useState(false)
  const [animateMenuDown, setAnimateMenuDown] = useState(false)

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
        try {
          const result = await fetch(`http://localhost:${serverPort}/brews/:${itemToInsert.brew_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemToInsert)
          })
          if (result.status === 201) {
            setBrewData(oldData => [...oldData, { ...itemToInsert, brew_id: nextId }])
            setMethodsData(oldData => [...oldData, itemToInsert.brewing_method])
            setNextId(previousId => previousId + 1)
            toast.success(`Brew successfully added!`, {duration: toastDuration})
          }
          else {
            toast.error(`Operation failed. Please try again.`, {duration: toastDuration})
          }
        }
        catch {
          toast.error("Connection lost. Please try again later.", {duration: toastDuration})
        }
      }
      insertIntoDB()
    }
    else { setTrackInsertChanges(true) }
  }, [itemToInsert])

  // For performing UPDATE operations on the database
	useEffect(() => {
    if (trackUpdateChanges) {
      async function updateInDB() {
        try {
          const result = await fetch(`http://localhost:${serverPort}/brews/:${itemToUpdate.brew_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemToUpdate)
          })
          if (result.status === 201) {
            toast.success(`Brew successfully updated!`, {duration: toastDuration})
            setBrewData(oldData => oldData.map(brew => brew.brew_id === itemToUpdate.brew_id ? itemToUpdate : brew))
            setMethodsData(oldData => oldData.toSpliced(oldData.indexOf(clickedItem.brewing_method), 1, itemToUpdate.brewing_method))
          }
          else {
            toast.error(`Operation failed. Please try again.`, {duration: toastDuration})
          }
        }
        catch {
          toast.error("Connection lost. Please try again later.", {duration: toastDuration})
        }
      }
      updateInDB()
    }
    else { setTrackUpdateChanges(true) }
  }, [itemToUpdate])

  // For performing DELETE operations on the database
	useEffect(() => {
    if (trackDeleteChanges) {
      async function deleteFromDB() {
        try {
          const result = await fetch(`http://localhost:${serverPort}/brews/:${itemToDelete.brew_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemToDelete.brew_id)
          })
          if (result.status === 201) {
            setBrewData(oldData => oldData.filter(brew => brew.brew_id !== itemToDelete.brew_id))
            setMethodsData(oldData => oldData.toSpliced(oldData.indexOf(itemToDelete.brewing_method), 1))
            toast.success(`Brew successfully deleted!`, {duration: toastDuration})
          }
          else {
            toast.error(`Operation failed. Please try again.`, {duration: toastDuration})
          }
        }
        catch {
          toast.error("Connection lost. Please try again later.", {duration: toastDuration})
        }
      }
      deleteFromDB()
    }
    else { setTrackDeleteChanges(true) }
  }, [itemToDelete])

  // Executed only after successful validation of input fields from the form
	function onBrewAdded(newBrew: Brew) {
		setItemToInsert({ ...newBrew, brew_id: nextId })
		setMethodToFilter("")
		setCurrentPage(0)
	}

  // Executed only after successful validation of input fields from the form
	function onBrewEdited(newBrew: Brew) {
		setItemToUpdate(newBrew)
	}

  // Executed only after clicking 'delete' on the form
	function onBrewDeleted(deletedBrew: Brew) {
		setItemToDelete(deletedBrew)
		setMethodToFilter("")
		setCurrentPage(0)
	}

  // To identify the item to send to the form for editing/deleting
	function setNewClickedItem(itemId: number) {
		setClickedItem(brewData.filter(brew => brew.brew_id === itemId)[0])
	}
  
  useEffect(() => { document.title = `Brews: ${brewData.length}` }, [brewData])

  return (
    <div className="px-3 min-h-screen flex flex-col items-center min-w-fit">
      {/* This toaster displays the success status of CRUD operations */}
      <Toaster position="top-center"/>
      <div className="bg-white flex flex-col items-center gap-3.5 fixed top-0 left-0 w-full px-5 h-32 z-15">
        <div className="flex pt-6 items-center justify-between w-full max-w-195">
          <p className="text-[1.5rem] line-clamp-1">Brew log</p>
          <button onClick={() => { setShowForm(true); setClickedItem(dummyBrew) }} className="text-white bg-black text-[0.75rem] line-clamp-1 font-semibold h-fit w-fit py-1.5 px-6 border-2 transition-colors ease-out duration-200 border-black hover:bg-white hover:text-black hover:cursor-pointer rounded-[100px]">
            Add new
          </button>
        </div>
        {/* This transparent overlay hides the 'add' button when the dropdown menu is expanded */}
        {dropdownExpanded && <div onClick={() => setAnimateMenuDown(false)} className="fixed h-32 w-full left-0 top-0"/>}
        <DropdownMenuHome
          expanded={dropdownExpanded}
					setExpanded={setDropdownExpanded}
          animateMenuDown={animateMenuDown}
          setAnimateMenuDown={setAnimateMenuDown}
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
          setShowForm={setShowForm}
          setClickedItem={setNewClickedItem} />
        )}
        <li className="h-fit py-4 border-gray-300">
          <p className="text-[0.8rem] sm:w-6 sm:h-6 w-7 h-7" />
          {brewData.length === 0 && <p className="text-[1rem] text-gray-300 font-bold place-self-center absolute">
            The log is currently empty
          </p>}
          {brewData.length === 0 && <HotCoffeeSVG/>}
          </li>
      </ul>
      {/* This page indicator footer is scheduled to appear only when there is data to display */}
      {brewData.length > 0 && !methodToFilter && <div className="z-5 fixed left-0 bottom-0 w-full h-fit py-4 px-12 overflow-x-scroll scrollbar-none backdrop-blur-[6px]">
				<div className="flex gap-2 items-center justify-center">
					{Array(Math.floor((brewData.length - 1) / pageLimit) + 1).fill('').map((_, index) => 
            <p
            key={index}
            onClick={() => { if (index !== currentPage) setCurrentPage(index) }}
            className={`${index === currentPage ? "bg-[#111d27] text-white" : "bg-gray-300 hover:scale-[115%] hover:cursor-pointer text-black"} text-[0.8rem] text-center sm:w-6 sm:h-6 w-7 h-7 rounded-[50%] flex items-center justify-center transition-transform duration-100 ease-out`}>
            {index + 1}
            </p>)}
				</div>
			</div>}
      {/* This transparent overlay hides the list items when the dropdown menu is expanded */}
			{dropdownExpanded && <div onClick={() => setAnimateMenuDown(false)} className="h-screen w-screen fixed z-10"></div>}
      {/* I use Set() to get a list of distinct brewing methods for filtering */}
			{showForm && 
        <AddEditForm
        methodsData={[...new Set(methodsData)]}
        brew={clickedItem}
        setShowForm={setShowForm}
        onAdded={onBrewAdded}
        onEdited={onBrewEdited}
        onDeleted={onBrewDeleted} />}
    </div>
  )
}

export default App
