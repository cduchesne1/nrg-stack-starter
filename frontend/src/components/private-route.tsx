'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedIn) {
      // navigate('/login');
    }
  }, [loading, loggedIn]);

  return children;
};