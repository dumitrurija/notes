import { CiSearch } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";

const LeftSidebar = ({ setNotes, setSelectedNote }) => {

  const createNewNote = async () => {
    const response = await fetch("http://localhost:3000/notes/add", {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({})
    })

    const created = await response.json()
    setSelectedNote(created)

    setNotes(notes => [created, ...notes])
  }

  const handleSearch = async (searchValue) => {
    const response = await fetch(`http://localhost:3000/notes/search?q=${searchValue}`)
    const data = await response.json()

    setNotes(data)
  }

  return (
    <div className='h-screen w-1/6 flex flex-col justify-between bg-zinc-200 p-6'>
      <div className="flex flex-col gap-4">
        <button 
          onClick={createNewNote}
          className='bg-blue-500 rounded-xl text-white px-2 py-3 hover:bg-blue-600 transition cursor-pointer'>
            New Note
        </button>

        <div onClick={() => setSelectedNote({})} className="bg-white flex justify-between items-center rounded-xl ">
          <input 
            onChange={(e) => handleSearch(e.target.value)}
            type="text" 
            className="h-full w-full outline-none px-2 py-3" placeholder='Search' />
          <button className="pr-2"><CiSearch /></button>
        </div>
      </div>

      <div id='categories' className="flex flex-col gap-4">
        <h2 className="bg-blue-500/25 p-2 text-blue-500 rounded-md">All Notes</h2>
        <div>
          <h2 className="font-medium">Notebooks</h2>
          <ul className="ml-2">
            <li>Work</li>
            <li>Personal</li>
            <li>Ideads</li>
          </ul>
        </div>

        <div>
          <h2 className="font-medium">Tags</h2>
        </div>
      </div>

      <a className="flex items-center gap-2">
        <IoMdSettings />
        <h2>Settings</h2>
      </a>
    </div>
  )
}

export default LeftSidebar