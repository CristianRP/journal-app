import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActiveNote } from '../../store/journal/journalSlice';
import { SideBarItem } from '.';

interface SideBarProps {
  drawerWidth: number;
}

export const SideBar = ({ drawerWidth }: SideBarProps) => {

  const { displayName } = useAppSelector(state => state.auth);
  const { notes } = useAppSelector(state => state.journal);
  
  const dispatch = useAppDispatch();

  const onSelectNote = (noteId: string) => {
    const note = notes.find(note => note.id === noteId);
    dispatch(setActiveNote(note));
  }

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            notes.map( note => (
              <SideBarItem key={ note.id } note={note} onSelectNote={ onSelectNote } />
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
