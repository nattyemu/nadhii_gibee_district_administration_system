import rateLimit from "express-rate-limit";

const rateLimiters = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 30, // 10 attempts per IP
  message: "Too many attempts. Please try again in 30 minutes.",
});
export default rateLimiters;
