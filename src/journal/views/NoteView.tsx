import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startUpdateNote } from '../../store/journal/thunks'
import { FormValidations, useForm } from '../../hooks'
import { Note } from '../types'
import { useMemo } from 'react'

interface NoteViewForm {
  title: string;
  body: string;
  date: number;
}

interface NoteViewValidations {
  title: [(value: string) => boolean, string];
  body: [() => boolean, string];
  date: [() => boolean, string];
}

const noteViewValidatons: FormValidations<NoteViewValidations> = {
  title: [(value: string) => value?.length <= 1, 'Title lenght must be greather than 1'],
  body: [() => true, ''],
  date: [() => true, ''],
}

export const NoteView = () => {

  const { active:note } = useAppSelector(state => state.journal);
  const dispatch = useAppDispatch();

  const { title, body, date, onInputChange } = useForm(note as NoteViewForm, noteViewValidatons);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch(startUpdateNote({ title, body} as Note));
  }

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={30} fontWeight='light'>{ dateString }</Typography>
      </Grid>
      <Grid item>
        <Button onClick={ onSaveNote }>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Insert a title'
          label='Title'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={ title }
          onChange={ onInputChange }
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder="What's up today?"
          minRows={ 5 }
          name='body'
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <ImageGallery />
    </Grid>
  )
}
