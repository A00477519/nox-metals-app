// src/providers/ThemeProvider.tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import CssBaseline from '@mui/material/CssBaseline';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS and apply theme background */}
      {children}
    </ThemeProvider>
  );
}