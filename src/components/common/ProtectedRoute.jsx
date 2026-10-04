import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
