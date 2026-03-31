import { useState, useEffect } from "react"
import LeftSidebar from "./components/partials/LeftSidebar"
import NoteEditor from "./components/partials/NoteEditor"
import NotesList from "./components/partials/NotesList"
import { VITE_API_URL } from "./helpers"

const App = () => {

  const [notes, setNotes] = useState([]) // all notes
  const [selectedNote, setSelectedNote] = useState({}) // selected to the editor

  const getNotes = async () => {
    const response = await fetch(`${VITE_API_URL}/notes`)
    const data = await response.json()

    setNotes(data)
  }

  // takes all data on first launch
  useEffect(() => {
    getNotes()
  }, [])

  return (
    <section className="flex">
      <LeftSidebar setNotes={setNotes} setSelectedNote={setSelectedNote} />
      <NotesList notes={notes} setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      <NoteEditor setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
    </section>
  )
}

export default App