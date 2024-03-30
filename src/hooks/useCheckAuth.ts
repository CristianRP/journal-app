import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../store/auth';

export const useCheckAuth = () => {
  const { status } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged( FirebaseAuth, async(user) =>{
      console.log(user);
      if (!user) return dispatch(logout({}));

      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
    })
  }, [dispatch]);

  return {
    status
  }
}
