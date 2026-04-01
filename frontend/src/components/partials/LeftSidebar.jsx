import { useState } from "react";
import { VITE_API_URL } from "../../helpers"

import { CiSearch } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";


const LeftSidebar = ({ notes, setNotes, setSelectedNote, activeTag, setActiveTag, activeNotebook, setActiveNotebook, setLoading }) => {

  const createNewNote = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${VITE_API_URL}/notes/add`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({})
      })

      if (!response.ok) {
        return console.error("Failed to create note: ", response.status);
      }

      const created = await response.json()
      setSelectedNote(created)
      setNotes(notes => [created, ...notes])
    }
    catch (e) {
      return console.error("Network error: ", e)
    }
    finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchValue) => {
    const response = await fetch(`${VITE_API_URL}/notes/search?q=${searchValue}`)
    const data = await response.json()

    setNotes(data)
  }

  const notebooks = [...new Set(notes.map(note => note.notebook).filter(Boolean))]
  const tags = [...new Set(notes.flatMap(note => note.tags).filter(Boolean))]

  const handleActiveFilter = (value, active, setActive) => {
    setSelectedNote({})
    if (value === active) return setActive(null)
    setActive(value)
  }

  return (
    <div className='lg:h-screen lg:w-1/6 flex flex-col max-lg:gap-4 justify-between bg-zinc-200 p-6'>
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
            {notebooks.map(notebook => 
              <li key={notebook} 
                  onClick={() => handleActiveFilter(notebook, activeNotebook, setActiveNotebook) } 
                  className={`ml-1 px-1 hover:bg-blue-500/25 transition w-fit rounded-xl ${notebook === activeNotebook ? 'bg-blue-500/50 rounded-lg' : ''}`}>
                    { notebook }
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-medium">Tags</h2>
            <ul className="ml-2">
            {tags.map(tag => 
              <li key={tag} 
                  onClick={() => handleActiveFilter(tag, activeTag, setActiveTag)} 
                  className={`ml-1 px-1 hover:bg-blue-500/25 transition w-fit rounded-xl ${tag === activeTag ? 'bg-blue-500/50 rounded-lg' : ''}`}>
                    { tag }
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* <a className="flex items-center gap-2">
        <IoMdSettings />
        <h2>Settings</h2>
      </a> */}
    </div>
  )
}

export default LeftSidebar