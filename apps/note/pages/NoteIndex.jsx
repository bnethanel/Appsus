import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import '../../../assets/css/apps/note/pages/NoteIndex.css'


const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then(setNotes)
  }

  return (
    <section className="note-index main-layout">
      <input
        type="search"
        placeholder="Search…"
        onInput={(ev) => setFilterBy({ ...filterBy, txt: ev.target.value })}
      />

      <NoteList notes={notes} onUpdate={loadNotes} />
    </section>
  )
}
