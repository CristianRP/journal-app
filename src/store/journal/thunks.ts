import { Action, ThunkAction } from '@reduxjs/toolkit'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore/lite'

import { RootState } from '..'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, updateNote } from './journalSlice'
import { Note } from '../../journal/types'
import { FirebaseDB } from '../../firebase/config'
import { loadNotes } from '../../helpers'

export const startNewNote = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async(dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote: Note = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: []
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }
}

export const startUpdateNote = (note: Note): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth; 
    const { active } = getState().journal;
    const { id, body, date, imageUrls, title } = active;

    console.log('active', { id, body, date, imageUrls, title });
    

    const updatedNote = {
      ...active,
      ...note,
    }

    console.log('updatednote', updatedNote);
    
    const document = doc(collection(FirebaseDB, `${uid}/journal/notes`), id);

    await updateDoc(document, updatedNote);

    dispatch(updateNote(updatedNote));
    dispatch(setActiveNote(updatedNote));
  }
}

export const startLoadingNotes = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}
