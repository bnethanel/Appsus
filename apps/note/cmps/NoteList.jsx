import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onUpdate }) {
  if (!notes.length) return <p>No notes yet…</p>

  const sorted = [...notes].sort((a, b) => b.isPinned - a.isPinned)

  return (
    <ul className="note-list clean-list grid">
      {sorted.map((note) => (
        <li key={note.id}>
          <NotePreview note={note} onUpdate={onUpdate} />
        </li>
      ))}
    </ul>
  )
}
