import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
}

function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/login" replace />}
    />
  );
}

export default PrivateRoute;