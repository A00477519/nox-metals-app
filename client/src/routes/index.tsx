// src/routes.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/layout/PrivateRoute';
import LoadingScreen from '../components/common/LoadingScreen';
import Layout from '../components/layout/Layout';
import Unauthorized from '../components/Unauthorized';


// Lazy load pages
const Home = lazy(() => import('../pages/home/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const UserDashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const UserProfile = lazy(() => import('../pages/user/Profile'));
const Products = lazy(() => import('../pages/products/ProductsPage'));
const Admin = lazy(() => import('../pages/dashboard/Admin'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
        </Route>

        {/* Admin-only routes */}
        <Route element={<PrivateRoute roles={['admin']} />}>
          <Route path="/dashboard/Admin" element={<Admin />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;