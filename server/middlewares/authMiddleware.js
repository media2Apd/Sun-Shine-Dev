import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Get JWT token
    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret missing in server config",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user exists
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid user",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.log("AUTH ERROR ->", err);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      const userRole = req.user.role.toLowerCase(); // << YOUR STRUCTURE

      if (!allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized for this action"
        });
      }

      next();
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Authorization failed"
      });
    }
  };
};
