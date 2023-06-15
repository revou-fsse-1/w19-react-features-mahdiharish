import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;