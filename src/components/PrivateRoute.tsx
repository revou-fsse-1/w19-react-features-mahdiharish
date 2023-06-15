import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from './UserContext';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useContext(UserContext);

  return token ? (
    <Route>{children}</Route>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
