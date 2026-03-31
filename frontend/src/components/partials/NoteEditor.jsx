import { useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../helpers";

const NoteEditor = ({ setNotes, selectedNote, setSelectedNote }) => {

  const [editTitle, setEditTitle] = useState()

  const handleUpdateNote = async (type, value) => {
    const updated = {...selectedNote, editedAt: Date.now(), [type]: value}

    setSelectedNote(updated)
    setNotes(notes => notes.map(note => note._id === selectedNote._id ? updated : note))
    
    await fetch(`http://localhost:3000/notes/edit/${selectedNote._id}`, {
      headers: {"Content-Type": "application/json"},
      method: "PUT",
      body: JSON.stringify(updated)
    })
  }

  const handleDeleteNote = async (selectedNote) => {
    await fetch(`http://localhost:3000/notes/delete/${selectedNote._id}`, {
      method: "DELETE"
    })

    setSelectedNote(null)
  }  

  return (
    <div className='bg-zinc-50 w-3/6 p-6 flex flex-col'>
      <h2 className='text-xl font-medium mb-5'>Note Editor</h2>

      { selectedNote._id && 
        <div id="container" className="flex flex-col flex-1 rounded-xl border-2 border-gray-200">
        <div id="top" className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              {
                editTitle 
                  ? <input 
                      className="outline-none"
                      onChange={(e) => handleUpdateNote("title", e.target.value)}
                      onBlur={() => setEditTitle(false)}
                      onKeyDown={(e) => e.key === "Enter" && setEditTitle(false)}
                      placeholder={selectedNote.title} autoFocus/> 

                  : <div 
                      onClick={() => setEditTitle(true)} 
                      className="flex items-center gap-2"> 
                      {selectedNote.title} 
                      <FaRegEdit 
                        className="text-sm text-gray-400" 
                      />
                    </div>
              }
            </h1>

            <div className="flex items-center gap-2 text-sm">
              {/* <a href="" className="flex gap-2 items-center text-white bg-blue-500 px-3 py-2 rounded-xl">
                <CiShare2 />
                Share
              </a> */}
              <MdDelete
                onClick={() => handleDeleteNote(selectedNote)}
                className="text-xl text-red-400" />
            </div>
          </div>

          <span className="text-sm text-black/50">Last edited: { formatDate(selectedNote.editedAt, "edit") }</span>
        </div>

        {/* Content Textarea */}
        <div id="text" className="flex-1 border-t border-t-gray-200">
          <textarea value={selectedNote.content || ""} 
                    onChange={(e) => handleUpdateNote("content", e.target.value)}
                    className="w-full h-full p-4 outline-none resize-none bg-white" id="">
          </textarea>
        </div>

        <div id="bottom" className="flex items-center justify-between">
          <div id="category-chooser" className="flex flex-1 flex-col gap-1 p-4">
            <label className="text-sm font-medium text-zinc-600">Notebook</label>
            <select className="outline-none bg-white p-2 rounded border border-gray-200">
              <option value="Work">Work</option>
              <option value="College">College</option>
            </select>
          </div>

          <div id="tag-chooser" className="flex flex-2 flex-col gap-1 p-4">
            <label className="text-sm font-medium text-zinc-600">Tags</label>

            <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg">
              <span className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded-md">
                Plan
                <button className="hover:text-red-500 font-bold ml-1">×</button>
              </span>

              <span className="flex items-center gap-1 px-2 py-1 text-sm bg-zinc-200 text-zinc-700 rounded-md">
                Fitness
                <button className="hover:text-red-500 font-bold ml-1">×</button>
              </span>

              <input 
                type="text" 
                placeholder="Add tag +" 
                className="grow outline-none text-sm text-zinc-500 bg-transparent min-w-25"
              />
            </div>
          </div>
        </div>
        </div>
      }
    </div>
  )
}

export default NoteEditor