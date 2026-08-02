import { createContext, useContext, useState } from "react";
import { login as apiLogin } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("mahogany_admin_token"));
  const [username, setUsername] = useState(() => localStorage.getItem("mahogany_admin_username"));

  async function login(u, p) {
    const result = await apiLogin(u, p);
    localStorage.setItem("mahogany_admin_token", result.token);
    localStorage.setItem("mahogany_admin_username", result.username);
    setToken(result.token);
    setUsername(result.username);
  }

  function logout() {
    localStorage.removeItem("mahogany_admin_token");
    localStorage.removeItem("mahogany_admin_username");
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
