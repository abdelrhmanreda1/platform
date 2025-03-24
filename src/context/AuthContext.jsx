import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

const getStoredData = (key, defaultValue = null) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return defaultValue;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredData("user"));
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const loginUser = (data) => {
    // نغير من async لـ function عادي وناخد data
    try {
      const { user, token } = data; // نستخدم الـ data اللي جاية من loginMutation
      const decoded = jwtDecode(token);
      setUser(user);
      setRole(decoded.role);
      setToken(token);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      queryClient.invalidateQueries(["profile"]);
    } catch (error) {
      console.error("Login error details:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.invalidateQueries(["profile"]);
  };

  return <AuthContext.Provider value={{ user, role, isAuthenticated, login: loginUser, logout, token }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
