import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

function PrivateRoute({ element, ...rest }: PrivateRouteProps) {
  // Check if user is authenticated, e.g., by using useContext or checking if there is a logged-in user in your state management system
  const isAuthenticated = true; // Replace with your authentication logic

  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
