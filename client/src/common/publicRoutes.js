// src/common/publicRoutes.js

// All public routes (no auth / CSRF validation)
export const PUBLIC_PATHS = [
  "/",                 // root
  "/login",
  "/sign-up",
  "/un-authorized",
  "/register",
  "/forgot-password",
  "/reset-password",   // dynamic: /reset-password/:token
  "/not-found",
];

/**
 * Checks whether given path is public (no auth validation).
 * Handles dynamic patterns like:
 *   - /reset-password/:token
 *   - /accept-invitation (with or without query/extra segments)
 *
 * @param {string} [pathname=window.location.pathname]
 * @returns {boolean}
 */
export const isPublicPath = (pathname) => {
  if (!pathname) {
    if (typeof window !== "undefined") {
      pathname = window.location.pathname;
    } else {
      pathname = "/";
    }
  }

  return PUBLIC_PATHS.some((path) => {
    // Dynamic segments handled here
    if (path === "/reset-password" || path === "/accept-invitation" || path === "/student/password-setup") {
      return pathname.startsWith(path);
    }

    // Exact matches for other paths
    return pathname === path;
  });
};
