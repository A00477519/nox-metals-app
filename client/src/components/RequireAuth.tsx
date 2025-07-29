// src/components/RequireAuth.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import LoadingScreen from '../components/common/LoadingScreen';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user')[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role as 'admin' | 'user')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireAuth;