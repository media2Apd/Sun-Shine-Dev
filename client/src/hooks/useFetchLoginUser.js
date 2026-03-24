import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { jwtDecode } from "jwt-decode";
import ROLE from "../common/role";

const useFetchLoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentPath = location.pathname;
    const token = localStorage.getItem("token");

    // Check whether the current route is an admin route
    const isAdminPath = currentPath.startsWith("/admin-panel");

    const validateAndFetch = async () => {

      /* ----------------------------------
         1. IF TOKEN IS NOT AVAILABLE
      ---------------------------------- */
      if (!token) {
        // Block access if user tries to access admin routes without token
        if (isAdminPath) {
          navigate("/un-authorized");
        }

        // Allow guest access for public routes (Home, Product listing, etc.)
        setLoading(false);
        return;
      }

      /* ----------------------------------
         2. IF TOKEN EXISTS
      ---------------------------------- */
      try {
        // Decode token and check expiry time
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // If token is expired, clear it and block admin access
        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");

          if (isAdminPath) {
            navigate("/un-authorized");
          }

          setLoading(false);
          return;
        }

        // Fetch logged-in user details from backend
        const res = await api.get(SummaryApi.getProfile.url);
        const userData = res.data.data;

        // Store user details in Redux store
        dispatch(setUserDetails(userData));

        // Admin route protection:
        // If user is not ADMIN, block access to admin routes
        if (isAdminPath && userData?.role.toLowerCase() !== ROLE.ADMIN) {
          navigate("/un-authorized");
        }

      } catch (error) {
        console.error("Authentication error:", error);

        // Remove invalid/expired token
        localStorage.removeItem("token");

        // Block admin routes on any authentication error
        if (isAdminPath) {
          navigate("/un-authorized");
        }
      } finally {
        // Stop loading state after validation completes
        setLoading(false);
      }
    };

    validateAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate]);

  return loading;
};

export default useFetchLoginUser;
