// src/components/LoadingScreen.tsx
// import { CircularProgress, Box } from '@mui/material';
// // import React from 'react';

// const LoadingScreen = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: 'background.default'
//       }}
//     >
//       <CircularProgress size={60} />
//     </Box>
//   );
// };

// export default LoadingScreen;


import { CircularProgress, Box } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;