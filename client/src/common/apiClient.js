// apiClient.js
import axios from "axios";

/**
 * Navigation handler reference
 * Used to perform redirects from Axios interceptors
 * (because hooks like useNavigate cannot be used here)
 */
let navigationHandler = null;

/**
 * Setter to inject navigation function (useNavigate)
 * from React components during app initialization
 */
export const setNavigationHandler = (handler) => {
  navigationHandler = handler;
};

/**
 * Create Axios instance
 */
const api = axios.create({});

/* ----------------------------------------
   REQUEST INTERCEPTOR
---------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // If token exists, attach it to Authorization header
    // Otherwise, allow the request to proceed as Guest access
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------------
   RESPONSE INTERCEPTOR
---------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const currentPath = window.location.pathname;

    // If backend returns 401 (Unauthorized)
    if (status === 401) {
      // Clear invalid or expired token
      localStorage.removeItem("token");
      
      // If user is currently inside admin routes, redirect to Unauthorized page
      if (currentPath.startsWith("/admin-panel")) {
        if (navigationHandler) {
          navigationHandler("/un-authorized");
        } else {
          // Fallback navigation if handler is not set
          window.location.href = "/un-authorized";
        }
      } else {
        // For non-admin routes, redirect to login page
        if (navigationHandler) {
          navigationHandler("/login");
        } else {
          // Fallback navigation if handler is not set
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
