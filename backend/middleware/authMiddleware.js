const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authMiddleware = (req, res, next) => {
  console.log("Checking authorization...");
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Extracted token:", token);

  if (!token) {
    console.error("No token provided.");
    return res
      .status(401)
      .json({ message: "Authorization denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    console.log("Token is valid. Decoded userId:", req.userId);
    next();
  } catch (err) {
    console.error("Token verification failed:", err.name, err.message);
    return res.status(401).json({ message: "Token is invalid or expired." });
  }
};

module.exports = authMiddleware;
