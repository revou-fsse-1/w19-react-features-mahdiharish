import React, { useState } from 'react';
import UserContext from './UserContext';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; isLoggedIn: boolean }>({
    email: '',
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={{ token, setToken, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
