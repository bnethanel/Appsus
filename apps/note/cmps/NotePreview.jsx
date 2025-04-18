import { noteService } from '../services/note.service.js'
import { NoteTxt }   from './types/NoteTxt.jsx'
import { NoteImg }   from './types/NoteImg.jsx'
import { NoteTodos } from './types/NoteTodos.jsx'

const mapCmp = {
  NoteTxt,
  NoteImg,
  NoteTodos,
}

export function NotePreview({ note, onUpdate }) {
  const DynamicCmp = mapCmp[note.type]
  console.log('type:', note.type, 'DynamicCmp:', DynamicCmp)


  function onRemove() {
    noteService.remove(note.id).then(onUpdate)
  }
  function onTogglePin() {
    noteService.save({ ...note, isPinned: !note.isPinned }).then(onUpdate)
  }

  return (
    <article className="note-preview" style={note.style}>
      <DynamicCmp info={note.info} />

      <section className="actions flex space-between">
        <button title="Pin" onClick={onTogglePin}>📌</button>
        <button title="Delete" onClick={onRemove}>🗑️</button>
      </section>
    </article>
  )
}
