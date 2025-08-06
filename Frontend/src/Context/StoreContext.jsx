// client/src/context/storeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const StoreContext = createContext();


export const useStore = () => useContext(StoreContext);

// Provider component
export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // { id, name, role }
  const [token, setToken] = useState(null);    // JWT token
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    setToken(token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <StoreContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </StoreContext.Provider>
  );
};
