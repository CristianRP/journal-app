import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
}

const initialState: AuthState = {
  status: 'not-authenticated',
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  errorMessage: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: () => {
    },
    logout: () => {

    },
    checkingCredentials: () => {

    }
  }
});
       
export const { login, logout, checkingCredentials } = authSlice.actions;
