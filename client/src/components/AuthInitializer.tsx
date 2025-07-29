// src/components/AuthInitializer.tsx
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

const AuthInitializer = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
};

export default AuthInitializer;