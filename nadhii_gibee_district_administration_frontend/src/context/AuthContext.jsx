import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

const decodeJWT = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isLoading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const setupLogoutTimer = (expirationTime) => {
      if (logoutTimer) clearTimeout(logoutTimer);
      const remainingTime = expirationTime - Date.now();
      if (remainingTime > 0) {
        logoutTimer = setTimeout(() => {
          handleAutoLogout();
        }, remainingTime);
      } else {
        handleAutoLogout();
      }
    };

    const handleAutoLogout = () => {
      sessionStorage.removeItem("authToken");
      setAuthState({ token: null, user: null, isLoading: false });
      navigate("/admin", { replace: true });
      toast.info("Session expired. Please login again.");
    };

    if (authState.token) {
      const decoded = decodeJWT(authState.token);
      if (decoded && decoded.exp) {
        setupLogoutTimer(decoded.exp * 1000);
      }
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [authState.token, navigate]);

  useEffect(() => {
    const initializeAuth = () => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          setAuthState({
            token,
            user: {
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              firstName: decoded.firstName,
              lastName: decoded.lastName,
            },
            isLoading: false,
          });
          return;
        }
        sessionStorage.removeItem("authToken");
      }
      setAuthState({ token: null, user: null, isLoading: false });
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    // console.log("Attempting login with:", email, password);
    console.log(BASE_URL);
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      });
      // console.log("Login response:", response);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      if (response.data.success) {
        const { token } = response.data;
        const decoded = decodeJWT(token);

        if (!decoded) throw new Error("Invalid token");

        sessionStorage.setItem("authToken", token);

        setAuthState({
          token,
          user: {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
          },
          isLoading: false,
        });

        // Redirect to frontend base URL after successful login
        window.location.href = FRONTEND_URL || "/";

        return { success: true, role: decoded.role };
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed",
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setAuthState({ token: null, user: null, isLoading: false });
    navigate("/", { replace: true });
  };

  const isAuthenticated = () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return false;
    const decoded = decodeJWT(token);
    if (!decoded || decoded.exp * 1000 <= Date.now()) {
      sessionStorage.removeItem("authToken");
      setAuthState({ token: null, user: null, isLoading: false });
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
