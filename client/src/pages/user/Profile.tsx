// const UserProfile = () => {
//   return (
//     <div>
//       <h1>User Profile</h1>
//     </div>
//   );
// };

// export default UserProfile;

// src/pages/user/Profile.tsx

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Card,
  CardContent,
  Chip,
  Alert
} from '@mui/material';
import { Edit, Save, Cancel, Person } from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar?: string;
}

const UserProfile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Metal Works Inc.',
    role: user?.role || 'user',
    avatar: ''
  });

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid xs={12} md={4} {...({} as any)}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mr: 3,
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Profile" />
                ) : (
                  <Person sx={{ fontSize: '3rem' }} />
                )}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Chip 
                  label={userData.role.toUpperCase()} 
                  color={userData.role === 'admin' ? 'secondary' : 'primary'}
                  sx={{ mb: 1 }}
                />
              </Box>
              <Button
                variant={isEditing ? "outlined" : "contained"}
                startIcon={isEditing ? <Cancel /> : <Edit />}
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                sx={{ ml: 2 }}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Profile Details */}
        <Grid xs={12} md={8} {...({} as any)}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid xs={12} sm={6} {...({} as any)}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={userData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid xs={12} sm={6} {...({} as any)}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={userData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid xs={12} {...({} as any)}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid xs={12} sm={6} {...({} as any)}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid xs={12} sm={6} {...({} as any)}>
                <TextField
                  label="Company"
                  fullWidth
                  value={userData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "filled"}
                />
              </Grid>
            </Grid>

            {isEditing && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Account Summary */}
        {/* Account Summary and Quick Actions - Same Row */}
<Grid xs={12} md={6} {...({} as any)}>
  <Grid container spacing={3}>
    {/* Account Summary */}
    <Grid xs={12} md={6} {...({} as any)}>
      <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Account Summary
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Account Status
          </Typography>
          <Chip label="Active" color="success" size="small" sx={{ mt: 1 }} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Account Type
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {userData.role === 'admin' ? 'Administrator' : 'Standard User'}
          </Typography>
        </Box>
      </Paper>
    </Grid>

    {/* Quick Actions */}
    <Grid xs={12} md={6} {...({} as any)}>
      <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="outlined" fullWidth>
            Change Password
          </Button>
          <Button variant="outlined" color="error" fullWidth>
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Grid>
  </Grid>
</Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;