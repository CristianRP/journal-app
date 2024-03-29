import { FormEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'

import { useAppDispatch } from '../../store/hooks';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';


export const LoginPage = () => {

  const dispatch = useAppDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'cristian@google.com',
    password: '123123'
  });

  const onSubmit = ( event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    console.log({ email, password});
    dispatch( checkingAuthentication(email, password) );
  }

  const onGoogleSignIn = () => {
    console.log('google-signin');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              placeholder='email@example.com'
              fullWidth
              autoComplete='email'
              name='email'
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
              autoComplete='current-password'
              name='password'
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button onClick={ onGoogleSignIn } variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to='/auth/register'>
              Create new account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

