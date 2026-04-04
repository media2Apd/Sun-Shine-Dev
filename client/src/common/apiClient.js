// apiClient.js
import axios from "axios";

/**
 * Navigation handler reference
 */
let navigationHandler = null;

export const setNavigationHandler = (handler) => {
  navigationHandler = handler;
};

const api = axios.create({});

/* ----------------------------------------
   REQUEST INTERCEPTOR
---------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    // RULE: If path starts with /admin-panel, token is MANDATORY
    if (currentPath.startsWith("/admin-panel") && !token) {
      // Redirect to un-authorized immediately
      if (navigationHandler) {
        navigationHandler("/un-authorized");
      } else {
        window.location.href = "/un-authorized";
      }
      
      // Cancel the request by throwing an error
      return Promise.reject(new Error("Unauthorized: No token found for admin route."));
    }

    // Standard behavior: Attach token if it exists
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

    // If backend returns 401 (Unauthorized) - Token expired or invalid
    if (status === 401) {
      localStorage.removeItem("token");
      
      if (currentPath.startsWith("/admin-panel")) {
        if (navigationHandler) {
          navigationHandler("/un-authorized");
        } else {
          window.location.href = "/un-authorized";
        }
      } else {
        if (navigationHandler) {
          navigationHandler("/login");
        } else {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;