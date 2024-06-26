import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';
import { Container } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();


  return (
      <Container
       sx={{
         minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
       }}
      >
        <Box
            sx={{
              boxShadow: theme.shadows[5],
              borderRadius: theme.shape,
              padding: 4,
              minWidth: {
                xs: 400,
                lg: 400,
                xl: 480,
              
              },
              maxWidth: {
                xs: 480,
                lg: 560,
                xl: 720,
              },
            }}
        >
          {children}
        </Box>
      </Container>
  );
}
