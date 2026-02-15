import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user info exists in localStorage
    const token = localStorage.getItem("access");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username, token });
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem("access", token);
    localStorage.setItem("username", username);
    setUser({ token, username });
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
