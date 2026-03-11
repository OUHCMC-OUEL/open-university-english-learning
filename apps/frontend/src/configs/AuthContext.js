import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance, { endpoints } from "@/configs/apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null); 
  const [isInitializing, setIsInitializing] = useState(!!localStorage.getItem("access_token"));
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsInitializing(false);
        return;
      }
      try {
        const res = await axiosInstance.get(endpoints['current-user'], {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        console.log("Token hết hạn hoặc không hợp lệ");
        localStorage.removeItem("access_token");
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
      } finally{
        setIsInitializing(false);
      }
    };
    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");
    params.append("client_id", import.meta.env.VITE_OAUTH_CLIENT_ID);
    params.append("client_secret", import.meta.env.VITE_OAUTH_CLIENT_SECRET);

    const response = await axiosInstance.post(endpoints.login, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const newToken = response.data.access_token;
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    
    return response.data; 
  };

  const register = async (payload) => {
    const response = await axiosInstance.post(endpoints.register, payload);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
  };

  if (isInitializing) {
    return React.createElement(
      "div",
      { className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4" },

      React.createElement("div", {
        className: "w-18 h-18 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4",
        role: "status",
        "aria-label": "Đang tải dữ liệu"
      }),

      React.createElement(
        "h2",
        { className: "text-xl font-semibold text-gray-800 text-center" },
        "Vui lòng đợi trong giây lát"
      ),
      
      React.createElement(
        "p",
        { className: "text-lg text-gray-500 mt-2 text-center animate-pulse" },
        "Đang chuẩn bị nội dung cần thiết"
      )
    );
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { token, isAuthenticated, user, setUser, login, register, logout } }, 
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};