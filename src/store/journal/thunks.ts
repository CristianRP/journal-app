import { Action, ThunkAction } from '@reduxjs/toolkit'
import { collection, doc, setDoc } from 'firebase/firestore/lite'

import { RootState } from '..'
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice'
import { Note } from '../../journal/types'
import { FirebaseDB } from '../../firebase/config'

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
