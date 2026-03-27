import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token = null;

    // ✅ 1. Try to get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ 2. Fallback: Authorization header (for Safari/mobile)
    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
    }

    // ❌ If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};