import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem("adminToken");
    const loginTime = localStorage.getItem("adminLoginTime");
    
    if (token && loginTime) {
      const hoursPassed =
        (new Date().getTime() - parseInt(loginTime)) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        return { token };
      } else {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminLoginTime");
      }
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Left empty if we don't need additional async init
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token } = res.data;
      const now = new Date().getTime();

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminLoginTime", now.toString());

      setAdmin({ token });
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoginTime");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
