// src/components/RequireAuth.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoadingScreen from './LoadingScreen';

interface RequireAuthProps {
  children: JSX.Element;
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