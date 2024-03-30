import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Note } from '../types'
import { useMemo } from 'react';

interface SideBarItemProps {
  note: Note;
  onSelectNote: (noteId: string) => void;
}

export const SideBarItem = ({ note: { title, body, id }, onSelectNote }:SideBarItemProps) => {
  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title])

  return (
    <ListItem key={ id } disablePadding onClick={ () => onSelectNote(id!) }>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
