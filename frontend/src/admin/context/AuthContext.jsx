import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, registerAuthListeners } from "../lib/api";

const TOKEN_KEY = "rhino_admin_token";
const REFRESH_KEY = "rhino_admin_refresh_token";
const USERNAME_KEY = "rhino_admin_username";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [username, setUsername] = useState(() => localStorage.getItem(USERNAME_KEY));

  function persist(newToken, newRefreshToken) {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    if (newRefreshToken) {
      localStorage.setItem(REFRESH_KEY, newRefreshToken);
    }
  }

  async function login(u, p) {
    const result = await apiLogin(u, p);
    persist(result.token, result.refreshToken);
    localStorage.setItem(USERNAME_KEY, result.username);
    setUsername(result.username);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setToken(null);
    setUsername(null);
  }

  useEffect(() => {
    registerAuthListeners({
      onNewToken: persist,
      onSessionExpired: logout,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
