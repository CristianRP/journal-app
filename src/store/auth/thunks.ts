import { Action, ThunkAction } from '@reduxjs/toolkit';

import { checkingCredentials, login, logout } from '.'
import { RootState } from '..';
import { signInWithGoogle } from '../../firebase/providers';

export const checkingAuthentication = (email: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => {
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
