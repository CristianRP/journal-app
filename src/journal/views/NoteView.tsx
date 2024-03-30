import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startUpdateNote } from '../../store/journal/thunks'
import { FormValidations, useForm } from '../../hooks'
import { Note } from '../types'

interface NoteViewForm {
  title: string;
  body: string;
}

interface NoteViewValidations {
  title: [(value: string) => boolean, string];
  body: [() => boolean, string];
}

const noteViewValidatons: FormValidations<NoteViewValidations> = {
  title: [(value: string) => value?.length <= 1, 'Title lenght must be greather than 1'],
  body: [() => true, ''],
}

export const NoteView = () => {

  const { active } = useAppSelector(state => state.journal);
  const dispatch = useAppDispatch();

  const currentNote = {
    ...active,
    title: ''
  }

  const { title, body, onInputChange } = useForm(currentNote as NoteViewForm, noteViewValidatons);

  const onSaveNote = () => {
    dispatch(startUpdateNote({ title, body} as Note));
  }

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>March, 28</Typography>
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
