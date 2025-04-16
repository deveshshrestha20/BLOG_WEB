'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
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
          <div className="flex items-center">
            <Link href="/" className="text-xl font-medium text-[#0B3619]">
              E-Bazar Nepal 
            </Link>
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <Link 
                href="/blogs" 
                className="text-[#435166] hover:text-[#0B3619] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                All blogs
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0B3619] hover:text-[#0B3619]/80 hover:bg-[#0B3619]/5 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link 
              href="/blogs" 
              className="block px-3 py-2 rounded-md text-base font-medium text-[#435166] hover:text-[#0B3619] hover:bg-[#0B3619]/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              All blogs
            </Link>
            
            {user ? (
              <>
                <div className="px-3 py-2 text-[#0B3619]/60">
                  Welcome, {user.name}
                </div>
                <Link
                  href="/blogs/new"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#0B3619] hover:bg-[#0B3619]/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Write Article
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#0B3619] hover:bg-[#0B3619]/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 