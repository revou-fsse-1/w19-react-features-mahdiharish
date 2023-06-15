import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}
function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
