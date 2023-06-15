import { createContext } from 'react';

export interface User {
  email: string;
  isLoggedIn: boolean;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
