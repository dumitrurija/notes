import { useState, useEffect } from "react"
import LeftSidebar from "./components/partials/LeftSidebar"
import NoteEditor from "./components/partials/NoteEditor"
import NotesList from "./components/partials/NotesList"
import { VITE_API_URL } from "./helpers"
import LoadingSpinner from "./components/partials/LoadingSpinner"

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

  const [activeTag, setActiveTag] = useState(null)
  const [activeNotebook, setActiveNotebook] = useState(null)

  const [loading, setLoading] = useState(false)

  return (
    <section className="flex max-lg:flex-col relative">
      <LeftSidebar notes={notes} setNotes={setNotes} setSelectedNote={setSelectedNote} activeTag={activeTag} setActiveTag={setActiveTag} activeNotebook={activeNotebook} setActiveNotebook={setActiveNotebook} setLoading={setLoading} />
      <NotesList notes={notes} setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} activeTag={activeTag} activeNotebook={activeNotebook} setLoading={setLoading} />
      <NoteEditor setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} setLoading={setLoading} />
      { loading && <LoadingSpinner /> }
    </section>
  )
}

export default App