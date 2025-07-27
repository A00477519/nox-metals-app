// src/components/layout/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingScreen from '../LoadingScreen';

interface PrivateRouteProps {
  /**
   * Array of allowed roles
   * If undefined, any authenticated user can access
   */
  roles?: ('admin' | 'user')[];
  /**
   * Redirect path when unauthorized (default: '/login')
   */
  redirectTo?: string;
  /**
   * Show loading state while checking auth (default: true)
   */
  showLoading?: boolean;
}

const PrivateRoute = ({
  roles,
  redirectTo = '/login',
  showLoading = true,
}: PrivateRouteProps) => {
  const location = useLocation();
  const { token, user, isLoading } = useAuthStore();

  if (isLoading && showLoading) {
    return <LoadingScreen />;
  }

  // Not authenticated
  if (!token) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check roles if specified
  if (roles && !roles.includes(user?.role as 'admin' | 'user')) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Authorized
  return <Outlet />;
};

export default PrivateRoute;