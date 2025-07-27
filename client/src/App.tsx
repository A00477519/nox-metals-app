// src/App.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import theme from './styles/theme';
import AppRoutes from './routes';
import AuthInitializer from './components/AuthInitializer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <AuthInitializer />
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;