import { useState, useEffect } from "react"
import LeftSidebar from "./components/partials/LeftSidebar"
import NoteEditor from "./components/partials/NoteEditor"
import NotesList from "./components/partials/NotesList"

const App = () => {

  const [notes, setNotes] = useState([]) // all notes
  const [selectedNote, setSelectedNote] = useState({}) // selected to the editor

  const getNotes = async () => {
    const response = await fetch("http://localhost:3000/notes")
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