import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from './UserContext';

function Dashboard() {
  const { user } = useContext(UserContext);

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>This is the dashboard.</p>
    </div>
  );
}

export default Dashboard