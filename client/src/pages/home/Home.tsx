// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//     </div>
//   );
// };

// export default Home;
// src/pages/home/Home.tsx

import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  Grid,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import heroImage from '../../assets/images/homepage.jpeg';

const Home = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, my: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Nox Metals
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Your trusted partner in premium metal solutions
            </Typography>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mr: 2 }}
            >
              View Products
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              color="inherit"
              size="large"
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} {...({} as any)}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                Quality Products
              </Typography>
              <Typography color="text.secondary">
                Premium metals sourced from trusted suppliers worldwide.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} {...({} as any)}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                Expert Service
              </Typography>
              <Typography color="text.secondary">
                Professional guidance and support from our experienced team.
              </Typography>
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;