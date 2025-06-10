'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Next.js Auth App
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            A secure authentication system built with Next.js and JWT
          </p>
          {user ? (
            <div className="mt-8">
              <p className="text-lg text-gray-600">
                Welcome back, {user.username}!
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-lg text-gray-600">
                Please login or register to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
