import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Note } from '../../journal/types';

interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [] as Note[],
  active: {} as Note,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    },
    deleteNoteById: () => {},
  }
});
       
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;
