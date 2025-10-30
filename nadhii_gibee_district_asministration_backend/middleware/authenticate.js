import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;
    next();
  } catch (err) {
    // console.error("JWT verification error:", err); // ✅ Debug log
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authenticate;
