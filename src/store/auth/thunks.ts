import { Action, ThunkAction } from '@reduxjs/toolkit';

import { checkingCredentials } from '.'
import { RootState } from '..';

export const checkingAuthentication = (email: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch( checkingCredentials() );
  }
}

export const startGoogleSignIn = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch( checkingCredentials() );
  }
}
