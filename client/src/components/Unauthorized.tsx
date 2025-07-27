// src/components/Unauthorized.tsx
// import { Box, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Unauthorized = () => {
//   return (
//     <Box sx={{ textAlign: 'center', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         403 - Unauthorized
//       </Typography>
//       <Typography variant="body1" paragraph>
//         You don't have permission to access this page.
//       </Typography>
//       <Button component={Link} to="/" variant="contained">
//         Go to Home
//       </Button>
//     </Box>
//   );
// };

// export default Unauthorized;

// src/components/Unauthorized.tsx
import { Box, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Unauthorized = () => {
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        403 - Unauthorized
      </Typography>
      <Typography variant="body1" paragraph>
        You don't have permission to access this page.
      </Typography>
      <Button
        component={Link}
        to={from}
        variant="contained"
        sx={{ mr: 2 }}
      >
        Go Back
      </Button>
      <Button component={Link} to="/" variant="outlined">
        Go to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;