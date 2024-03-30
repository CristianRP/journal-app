import { createSlice } from '@reduxjs/toolkit';

import { Note } from '../../journal/types';

interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note;
}

const initialState: JournalState = {
  isSaving: true,
  messageSaved: '',
  notes: [],
  active: {} as Note,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: () => {},
    setActiveNote: () => {},
    setNotes: () => {},
    setSaving: () => {},
    updateNote: () => {},
    deleteNoteById: () => {},
  }
});
       
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;
