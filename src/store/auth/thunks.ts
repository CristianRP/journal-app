import { Action, ThunkAction } from '@reduxjs/toolkit';

import { checkingCredentials, login, logout } from '.'
import { RootState } from '..';
import { registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';

export type AuthParams = {
  email: string;
  password: string;
  displayName: string;
}

export const checkingAuthentication = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch( checkingCredentials() );
  }
}

export const startGoogleSignIn = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch( checkingCredentials() );
    const result = await signInWithGoogle();

    console.log(result);
    
    if ( !result.ok ) return dispatch( logout( result ) );

    dispatch( login( result ) )
  }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }: AuthParams): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({ displayName, email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  }
}
