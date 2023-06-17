import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function PrivateRoute({ children }: { children: JSX.Element }) {
  // const { token } = useContext(UserContext);
  const token = localStorage.getItem('token')

  return token ? (
    <Route>{children}</Route>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;