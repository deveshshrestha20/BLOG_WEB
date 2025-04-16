'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-medium text-[#0B3619]">
                E-Bazar Nepal 
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/blogs" 
                  className="text-[#435166] hover:text-[#0B3619] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  All blogs
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0B3619]"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-medium text-[#0B3619]">
              E-Bazar Nepal 
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/blogs" 
                className="text-[#435166] hover:text-[#0B3619] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                All blogs
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-[#0B3619]/60">Welcome, {user.name}</span>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  onClick={() => window.location.href = '/blogs/new'}
                >
                  Write Article
                </Button>
              </>
            ) : (
              <Button
                onClick={() => window.location.href = '/login'}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 