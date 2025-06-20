import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const location = useLocation();

  // TODO: Replace with actual authentication check
  // For now, always return true (user is authenticated)
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

// Hook to check authentication status
const useAuth = (): boolean => {
  // TODO: Implement actual authentication logic
  // This could check:
  // - JWT token in localStorage/sessionStorage
  // - Auth context state
  // - API call to validate session
  
  // For now, always return true
  return true;
};