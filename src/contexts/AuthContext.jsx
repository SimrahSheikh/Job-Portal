import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null, // 'hr' or 'user'
  });

  const login = (role) => {
    setAuthState({ isAuthenticated: true, role });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);