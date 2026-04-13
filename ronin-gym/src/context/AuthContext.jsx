import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../data/gymData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (role) => {
    setCurrentUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
