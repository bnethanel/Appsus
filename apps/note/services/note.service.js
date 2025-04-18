import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
  query,
  get,
  save,
  remove,
  duplicate,
  getEmptyNote,
}

const NOTE_KEY = 'missKeepDB'

_initNotes()

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY).then((notes) => {
      const { txt = '', type = '' } = filterBy
  
      return notes.filter((note) => {
        const noteTxt   = (note.info && note.info.txt)   || ''
        const noteTitle = (note.info && note.info.title) || ''
        const matchesTxt   = noteTxt.includes(txt) || noteTitle.includes(txt)
        const matchesType  = !type || note.type === type
        return matchesTxt && matchesType
      })
    })
  }  

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) return storageService.put(NOTE_KEY, note)
  note.id = utilService.makeId()
  note.createdAt = Date.now()
  return storageService.post(NOTE_KEY, note)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function duplicate(noteId) {
  return get(noteId).then((note) => {
    const copy = structuredClone(note)
    copy.id = utilService.makeId()
    copy.isPinned = false
    return storageService.post(NOTE_KEY, copy)
  })
}

function getEmptyNote(type = 'NoteTxt') {
  return {
    type,
    isPinned: false,
    style: { backgroundColor: '#ffffff' },
    info: { txt: '' },
  }
}

function _initNotes() {
  storageService.query(NOTE_KEY).then((notes) => {
    if (notes && notes.length) return
    const demo = [
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#f28b82' },
        info: { txt: 'Fullstack me baby!' },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#fff475' },
        info: {
          url: 'https://picsum.photos/300/200?random=1',
          title: 'Bobi and Me',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ]
    utilService.saveToStorage(NOTE_KEY, demo)
  })
}
  