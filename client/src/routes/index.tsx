// src/routes.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/layout/PrivateRoute';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/layout/Layout';
import Unauthorized from './components/Unauthorized';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Products = lazy(() => import('./pages/Products'));

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
        </Route>

        {/* Admin-only routes */}
        <Route element={<PrivateRoute roles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;