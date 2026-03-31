import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { contentLimit, formatDate } from "../../helpers"

const NotesList = ({ notes, setNotes, selectedNote, setSelectedNote }) => {

  const handleSelectedNote = (note) => {
    if (note._id === selectedNote._id) {
      return setSelectedNote({})
    }
    setSelectedNote(note)
  }

  const handleDeleteNote = async (note, e) => {
    e.stopPropagation()
    
    await fetch(`http://localhost:3000/notes/delete/${note._id}`, {
      method: "DELETE"
    })

    setNotes(notes => notes.filter(n => n._id !== note._id))

    if (selectedNote._id === note._id) {
      setSelectedNote({})
    }
  }

  return (
    <div className='w-2/6 bg-zinc-100 p-6'>
      <h1 className='text-xl font-medium mb-4'>Notes List</h1>

      <div className='flex flex-col gap-4'>
        {
          notes.sort((a, b) => new Date(b.editedAt) - new Date(a.editedAt)).map((note, i) => (
            <div key={note._id} 
                 className={`rounded-xl p-3 flex flex-col gap-2 ${selectedNote._id === note._id ? 'border-2 border-blue-500/75' : 'bg-white shadow-xs'}`}
                 onClick={() => handleSelectedNote(note)}
            >
              <div className='flex justify-between items-center'>

                <h2 className='font-medium'>{note.title}</h2>

                <MdDelete
                  onClick={(e) => handleDeleteNote(note, e)}
                  className='hover:text-red-400 transition' />
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