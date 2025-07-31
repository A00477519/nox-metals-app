// src/features/auth/Login.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuthStore } from '../../stores/authStore';
import api from '../../api/auth';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login,  setUser } = useAuthStore();

  const from = location.state?.from?.pathname || '/dashboard/user';
    const registrationData = location.state?.userData;


    const role= registrationData?.role === 'user'? '/dashboard/user' : '/dashboard/admin';
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //     const response = await api.login(email, password);

  //       // If we have registration data, use it
  //       if (registrationData) {
  //       if (registrationData.role === 'user') {
  //         setUser({
  //           email: registrationData.email,
  //           firstName: registrationData.firstName,
  //           role: 'user'
  //         });
  //       } else if (registrationData.role === 'admin'
  //       ){
  //         setUser({
  //           email: registrationData.email,
  //           firstName: registrationData.firstName,
  //           role: 'admin'
  //         });
  //       }
  //     }
  //     // console.log(response)
  //     // console.log(response.data.data.token);
  //     login(response.data.data.token);
  //     // navigate(from, { replace: true });
  //     navigate(role, { replace: true });
  //   } catch (err) {
  //     console.error('Login failed:', err);
  //     console.log(err);
  //     setError('Invalid credentials');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await api.login(email, password);
    
    // Set the token first
    login(response.data.data.token);
    
    // For existing users, create user data based on email
    let userData = null;
    
    if (registrationData) {
      userData = registrationData;
    } else {
      // For existing users, determine role based on email or make an API call
      const isAdmin = email.includes('admin') || email === 'admin1@example.com';
      userData = {
        email: email,
        firstName: email.split('@')[0] || 'User', // Extract name from email
        lastName: '',
        role: isAdmin ? 'admin' : 'user',
        company: '',
        phone: ''
      };
    }
    
    setUser(userData);
    
    // Navigate based on role
    if (userData.role === 'admin') {
      navigate('/dashboard/admin', { replace: true });
    } else {
      navigate('/dashboard/user', { replace: true });
    }
    
  } catch (err) {
    console.error('Login failed:', err);
    setError('Invalid credentials');
  }
};


  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign In
        </Button>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to="/register">
          Register
        </Link>
      </Typography>
    </Box>
    </Box>
  );
};

export default Login;