import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';
import { FormValidations, useForm } from '../../hooks';
import { FormEvent, useState } from 'react';

type FormData = {
  email: string;
  password: string;
  displayName: string;
}

type FormDataValidations = {
  email: [() => boolean, string],
  password: [() => boolean, string],
  displayName: [() => boolean, string],
}

const formData: FormData = {
  email: 'cristian@gmail.com',
  password: '123123',
  displayName: 'Cristian Ramirez',
}

const formValidations: FormValidations<FormDataValidations> = {
  email: [(value: string) => value.includes('@'), 'Email has to contain an @'],
  password: [(value: string) => value.length >= 6, 'Password lenght must be greater than 6 letters'],
  displayName: [(value: string) => value.length >= 1, 'Name is required'],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState, email, password, displayName, onInputChange,
    isFormValid, emailValid, passwordValid, displayNameValid
  } = useForm(formData, formValidations);
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;
    console.log(formState);
  }

  return (
    <AuthLayout title='Register'>
      <h1>FormValid { JSON.stringify(isFormValid) }</h1>
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label='Full Name'
              type='text'
              placeholder='Your Name'
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>
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
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
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
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 }>
              <Button type='submit' variant='contained' fullWidth>
                Create Account
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Have an account?</Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'>
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

