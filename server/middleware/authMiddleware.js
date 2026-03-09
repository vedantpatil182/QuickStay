import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    if (!req.auth) {
      console.error("Auth Middleware Error: req.auth is undefined. Check clerkMiddleware configuration.");
      return res.json({ success: false, message: "Authentication configuration error" });
    }
    const { userId } = req.auth;
    if (!userId) {
      return res.json({ success: false, message: "not authenticated" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.json({ success: false, message: "Authentication internal error", error: error.message });
  }
};
