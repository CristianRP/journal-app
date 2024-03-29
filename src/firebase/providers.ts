import { AuthError, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    const result = await signInWithPopup( FirebaseAuth, googleProvider );
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { uid, email, displayName, photoURL } = result.user;
    
    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    }
  } catch( error ) {
    const authError = error as AuthError;
    const errorCode = authError.code;
    const errorMessage = authError.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    }
  }
}
