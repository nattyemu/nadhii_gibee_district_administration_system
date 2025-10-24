import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import compression from "compression";
import appRouter from "./routes/index.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
connectDB();

const PORT = process.env.PORT || 5001;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);

const allowedOrigins =
  process.env.CORS_ORIGIN === "*"
    ? "*"
    : process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.options("*", cors());

// Serve static files from public directory - ADDED THIS LINE
app.use("/img", express.static(path.join(__dirname, "public/img")));

app.use(
  express.json({
    limit: "1mb", // Limit JSON payload to 1MB
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.use(mongoSanitize());

app.use(
  hpp({
    whitelist: ["achievements"],
  })
);

app.use(compression());

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Request logging middleware (safe)
// app.use((req, res, next) => {
//   console.log(
//     `${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`
//   );
//   next();
// });

// Root route
app.get("/", (req, res) => {
  res.send("Express app working with .env configuration! 🚀");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api", appRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  const isDevelopment = process.env.NODE_ENV === "development";

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      ...(isDevelopment && {
        errors: Object.values(err.errors).map((e) => e.message),
      }),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value entered",
      ...(isDevelopment && {
        details: "This value already exists in the database",
      }),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Resource not found",
      ...(isDevelopment && { details: `Invalid ${err.path}: ${err.value}` }),
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: isDevelopment ? err.message : "Internal server error",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
