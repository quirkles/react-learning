import {Note, notesReducer} from './notesReducer'
import {SyntheticEvent, useEffect, useReducer, useState} from "react";
import {v4} from "uuid";

const notesKey = 'NOTES'

function initializeNotes(initializer: []): Note[] {
    const fromStorage = localStorage.getItem(notesKey)
    if(fromStorage) {
        return JSON.parse(fromStorage)
    }
    return initializer
}

export function NotePage() {
    const [newNote, updateNewNote] = useState<Note>(initNote())
    const [notes, dispatch] = useReducer(notesReducer, [], initializeNotes)
    useEffect(() => {
        if(notes && notes.length) {
            localStorage.setItem(notesKey, JSON.stringify(notes))
        }
    },  [notes])
    const handleAddNote = (e: SyntheticEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({
            type: "ADD_NOTE",
            note: newNote
        })
        updateNewNote(initNote())
    }
    return (
        <div className="grid-x">
            <div className="cell">
                <div className="card">
                    <form>
                        <label>Title
                            <input
                                type="text"
                                placeholder="Note title"
                                value={newNote.title}
                                onChange={(e) => updateNewNote({...newNote, title: e.target.value})}
                            />
                        </label>
                        <label>
                            Note body
                            <textarea
                                placeholder="None"
                                value={newNote.content}
                                onChange={(e) => updateNewNote({...newNote, content: e.target.value})}
                            ></textarea>
                        </label>
                        <button className="button" onClick={handleAddNote}>Add</button>
                    </form>
                </div>
            </div>
            {notes.map((note) => (
                <div className="cell" key={note.id}>
                    <div className="card">
                        <div className="card-divider">
                            {note.title}
                        </div>
                        <div className="card-section">
                            <p>{note.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function initNote(): Note{
    return {
        id: v4(),
        title: '',
        content: '',
        isEditing: true
    }
}
