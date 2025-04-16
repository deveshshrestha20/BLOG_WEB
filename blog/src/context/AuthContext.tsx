"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    // Check for auth in localStorage first
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth.isLoggedIn && parsedAuth.user) {
          setAuthState(parsedAuth);
          // Set cookie for middleware with 30-day expiration
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);
          document.cookie = `auth=${JSON.stringify(parsedAuth)}; path=/; expires=${expirationDate.toUTCString()}`;
        } else {
          // Clear invalid auth data
          localStorage.removeItem('auth');
          document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('auth');
        document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.email === email && u.password === password);
      
      if (user) {
        const newAuthState = { isLoggedIn: true, user };
        setAuthState(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        
        // Set cookie with 30-day expiration
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        document.cookie = `auth=${JSON.stringify(newAuthState)}; path=/; expires=${expirationDate.toUTCString()}`;
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const signup = (name: string, email: string, password: string): boolean => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some((u: User) => u.email === email)) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Automatically log in the user after successful signup
      const newAuthState = { isLoggedIn: true, user: newUser };
      setAuthState(newAuthState);
      localStorage.setItem('auth', JSON.stringify(newAuthState));
      
      // Set cookie with 30-day expiration
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      document.cookie = `auth=${JSON.stringify(newAuthState)}; path=/; expires=${expirationDate.toUTCString()}`;

      return true;
    } catch (error) {
      console.error('Error during signup:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, user: null });
    localStorage.removeItem('auth');
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 