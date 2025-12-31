'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  redirectTo = '/sign-in'
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // User is not authenticated, redirect to sign-in
        router.push(redirectTo);
        return;
      }

      if (requireAdmin && user?.role !== 'admin') {
        // User is authenticated but not admin, redirect to home or unauthorized page
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requireAdmin, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated or doesn't have required role, don't render children
  if (!isAuthenticated || (requireAdmin && user?.role !== 'admin')) {
    return null;
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
}
