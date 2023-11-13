export interface Note {
    id: string;
    title?: string;
    content?: string;
    isEditing: boolean
}

interface BaseAction {
    type: string
}

interface AddNoteAction extends BaseAction {
    type: 'ADD_NOTE';
    note: Note;
}

interface EditNoteAction extends BaseAction {
    type: 'EDIT_NOTE',
    id: string;
    noteUpdates: Partial<Omit<Note, 'id'>>;
}

interface DeleteNoteAction extends BaseAction {
    type: 'DELETE_NOTE',
    id: string;
}

type Action = AddNoteAction | EditNoteAction | DeleteNoteAction

export function notesReducer(notes: Note[], action: Action): Note[] {
    console.log('notes', notes)
    console.log('action', action)
    switch (action.type) {
        case "ADD_NOTE":
            return [...notes, action.note]
        case "DELETE_NOTE":
            return notes.filter(n => n.id !== action.id);
        case "EDIT_NOTE":
            return notes.map(n => {
                if (n.id !== action.id) {
                    return n
                }
                return {
                    ...n,
                    ...action.noteUpdates
                }
            })
    }
}
