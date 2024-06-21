'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/app/components/settings';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const handleClick = async () => {
    try {
      const response = await axios.post('/api/events', {
        name: 'test'
      })
      console.log(response.data)
    } catch(e) {
      toast.error(e.message)
    }
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page One </Typography>
      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
      <div>
         <Button 
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          onClick={handleClick}
         />
      </div>
    </Container>
  );
}
