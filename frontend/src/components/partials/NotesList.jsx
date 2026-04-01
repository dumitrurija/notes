import { VITE_API_URL } from "../../helpers"

import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { contentLimit, formatDate } from "../../helpers"

const NotesList = ({ notes, setNotes, selectedNote, setSelectedNote, activeTag, activeNotebook, setLoading }) => {

  const handleSelectedNote = (note) => {
    if (note._id === selectedNote._id) {
      return setSelectedNote({})
    }
    setSelectedNote(note)
  }

  const handleDeleteNote = async (note, e) => {
    setLoading(true)
    try {
      e.stopPropagation()
      
      setNotes(notes => notes.filter(n => n._id !== note._id))

      if (selectedNote._id === note._id) {
        setSelectedNote({})
      } 

      const response = await fetch(`${VITE_API_URL}/notes/delete/${note._id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        return console.error("Failed to delete note: ", response.status)
      }
    }
    catch (e) {
      return console.error("Network error: ", e)
    }
    finally {
      setLoading(false)
    }
  }

  const visibleNotes = notes.filter(note => {
    if (activeTag) return note.tags.includes(activeTag)
    if (activeNotebook) return note.notebook === activeNotebook
    return true
  })

  return (
    <div className='lg:w-2/6 bg-zinc-100 p-6'>
      <h1 className='text-xl font-medium mb-4'>Notes List</h1>

      <div className='flex flex-col gap-4'>
        {
          [...visibleNotes].sort((a, b) => new Date(b.editedAt) - new Date(a.editedAt)).map((note, i) => (
            <div key={note._id} 
                 className={`rounded-xl p-3 flex flex-col gap-2 ${selectedNote?._id === note._id ? 'border-2 border-blue-500/75' : 'bg-white shadow-xs'}`}
                 onClick={() => handleSelectedNote(note)}
            >
              <div className='flex justify-between items-center'>

                <div className="flex items-center gap-2">
                  <h2 className='font-medium'>{ note.title }</h2>
                  { note.notebook && <span className="p-1 px-2 rounded-lg text-xs font-extralight uppercase bg-blue-400/15 text-blue-500">{ note.notebook }</span>}
                </div>

                <MdDelete
                  onClick={(e) => handleDeleteNote(note, e)}
                  className='hover:text-red-400 transition'
                />
              </div>

              <p className='text-sm wrap-break-word'>{ contentLimit(note.content) }</p>

              <span className='text-black/50 text-xs'>Last edited: { formatDate(note.editedAt, "list") }</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default NotesList