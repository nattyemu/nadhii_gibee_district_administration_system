// middleware/adminAuth.js
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message:
        "Forbidden: You do not have the required role to perform this action.",
    });
  }
  next();
};

export default requireAdmin;
