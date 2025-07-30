// const Register = () => {
//   return (
//     <div>
//       <h1>Register</h1>
//     </div>
//   );
// };

// export default Register;

// src/pages/auth/Register.tsx

import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Person, Business } from '@mui/icons-material';
import api from '../../api/auth';
import { useAuthStore } from '../../stores/authStore';

const Register = () => {
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    role: 'user' // Add role field with default value
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
    const response = await api.register(
      formData.email,
      formData.password,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        phone: formData.phone,
        role: formData.role
      }
    );
    
      // Store in localStorage with role
      localStorage.setItem('pendingUserData', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        role: formData.role // Include role in stored data
      }));

      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in.',
          userData: {
            firstName: formData.firstName,
            email: formData.email,
            role: formData.role
          }
        }
      });
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Business color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Join Nox Metals
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your account to access premium metal solutions
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} {...({} as any)}>
              <TextField
                label="First Name"
                fullWidth
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} {...({} as any)}>
              <TextField
                label="Last Name"
                fullWidth
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Company"
                fullWidth
                required
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}{...({} as any)}>
              <TextField
                label="Phone Number"
                fullWidth
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={loading}
              />
            </Grid>
            {/* Add Role Selection */}
            <Grid item xs={12} {...({} as any)}>
              <FormControl fullWidth required>
                <InputLabel>Account Type</InputLabel>
                <Select
                  value={formData.role}
                  label="Account Type"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  disabled={loading}
                >
                  <MenuItem value="user">Standard User</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={loading}
                helperText="Minimum 6 characters"
              />
            </Grid>
            <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                sx={{ textTransform: 'none' }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;