import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Home;
