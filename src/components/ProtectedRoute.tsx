
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean; // Default true - route requires authentication
  redirectTo?: string; // Default to /login
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAuth = true,
  redirectTo = '/login'
}) => {
  const { currentUser, loading } = useAuth();
  
  // If auth is still loading, show nothing or a loading spinner
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin text-emerald-500">
        {/* You can add a loading spinner component here */}
        Loading...
      </div>
    </div>;
  }
  
  // If the route requires auth and user is not logged in
  if (requiresAuth && !currentUser) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // If the route is for non-authenticated users only (like login page)
  // and the user is logged in, redirect to dashboard
  if (!requiresAuth && currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If all conditions are satisfied, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
