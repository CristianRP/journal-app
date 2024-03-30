import { createSlice } from '@reduxjs/toolkit';

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
  notes: [],
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
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: () => {},
    setSaving: () => {},
    updateNote: () => {},
    deleteNoteById: () => {},
  }
});
       
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;
