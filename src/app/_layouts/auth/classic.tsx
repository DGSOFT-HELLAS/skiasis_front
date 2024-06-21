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

  const mdUp = useResponsive('up', 'md');

  
  const renderContent = (
    <Box
      sx={{
        width: 1,
        maxWidth: 480,
        mx: 'auto',
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Box>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
    
    </Stack>
  );

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
                xs: 320,
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
