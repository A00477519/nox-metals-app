// src/App.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import theme from './styles/theme';
import AppRoutes from './routes';
import AuthInitializer from './components/AuthInitializer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <>
          <AuthInitializer />
          <AppRoutes />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
