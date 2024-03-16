'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const COOKIE_USERNAME = 'username';

interface AuthContextType {
  username: string | null;
  loading: boolean;
  loggedIn: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = async () => {
    // setUsername(null);
    // setLoggedIn(false);
    // await logoutSession();
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      setLoading(true);
      const username = localStorage.getItem(COOKIE_USERNAME);

      if (!username) {
        setUsername(null);
        setLoggedIn(false);
      } else {
        setUsername(username);
        setLoggedIn(true);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ username, loading, loggedIn, logout }}>
        {children}
    </AuthContext.Provider>
  );
};